const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const aws = require('aws-sdk');
const mysql = require('mysql');
const spawn = require("child_process").spawn;
const archiver = require('archiver');
const { AppIntegrations } = require('aws-sdk');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
//app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

// Allows headers to allow for file transfer.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

var insert_id = 0;
// REQUEST KEYS FROM OWNER. WILL NOT BE POSTED ON GITHUB. (security reasons)
const s3 = new aws.S3({
    accessKeyId: '',
    secretAccessKey: '',
    signatureVersion: 'v4',
    region: 'us-east-2'
});

// Configuration for SQL connection to AWS RDS servers.
const connection = mysql.createConnection({
    host        : 'cen3907database.c2ulacfq2lky.us-east-2.rds.amazonaws.com',
    user        : 'admin',
    password    : 'Mirksu2001',
    port        : '3306',
    database    : 'image_database'
});

// Connects to SQL using config.
connection.connect(function(err) {
    if (err) {
        throw err
    } else {
        console.log('Connected to mySQL');
    }
});

// App listens on port 5000.
const server = app.listen(port, function () {
    const port = server.address().port;

    console.log('Server listening at %s', port);

});

// Uploading an image to the server, stores it locally.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// Multer config
var upload = multer({storage: storage});

// s3 multer config for connection to the S3 file storage.
var uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cen3907imagedb',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            // Image identified in the database.
            cb(null, Date.now().toString() + '.jpg')
        }
    })
})

// Uploads image to neural network for processing. Returns what it thinks it sees in the image.
// Credit to: https://pylessons.com/YOLOv3-custom-data/ for the CNN, aside from small modifications.
// Credit also to: https://pjreddie.com/darknet/yolo/
app.post('/detect_image', upload.single('file'), async function(req, res) {
    console.log("Image uploaded for detection...");
    // Calls python script to automatically detect objects in the image
    const python = spawn('python', ['CNN/image_detect.py', req.file.path]);
    python.on('close', (code) => {
        // On the CNN finishing detection, returns the image to the frontend to be displayed.
        console.log('Finished detection')
        res.sendFile(__dirname + "/uploads/result.jpg")
    });
});

// Uploads image to S3 & image key to SQL
app.post('/upload', uploadS3.single('file'), function(req, res) {
    var key = req.file.key;
    console.log(key)
    var data_to_post = {
        Image_Filepath: key
    }

    // Upload image filepath to database
    connection.query("INSERT INTO Images SET ?;", data_to_post, function(err, result) {
        if (err) throw err;
        insert_id = result.insertId;
        console.log("ID inserted: " + insert_id);
        return res.send({"image_id": "" + insert_id})
    });
});


// Uploads the annotation file sent from user into SQL table.
app.post('/upload_annotation_results', function(req, res) {
    
    var sql = "INSERT INTO Annotation_Table SET ?;"
    console.log(insert_id);
    for (var i = 0; i < req.body.length; i++) {
        var data_to_post = {
            ImageID: insert_id,
            SectionID: req.body[i].SectionID,
            x_min: req.body[i].x_min,
            y_min: req.body[i].y_min,
            x_max: req.body[i].x_max,
            y_max: req.body[i].y_max,
            class_id: req.body[i].class_id
        }

        connection.query(sql, [data_to_post], function(err, result) {
            if (err) throw err;
            console.log("Section inserted.")
        })
    }
})

// Delete image result from neural network after it's returned.
app.delete('/delete_result', function(req, res) {
    console.log("Deleting result")
    const python = spawn('python', ['python_helpers/delete_result.py']);

    python.on('close', (code) => {
        console.log('Result deleted')
        res.send("Deleted ")
    });
});

// API call that downloads the annotations.
app.get('/annotations', function(req, res) {
    // SQL query
    var sql = "SELECT * FROM Annotation_Table INNER JOIN Images ON Annotation_Table.ImageID = Images.ID"
    var stream = fs.openSync(__dirname + "/uploads/annotations.txt", 'a')

    // Tried promise chaining. It didn't work, because I'm not touching recursion, lol.
    // This solution might be a little unworkable at scale but... this is a prototype, right?
    // I'll learn promises later.

    // Loops through query results, appending all the form data in accordance to a specific format (image_path x_min,y_min,x_max,y_max,class_id etc...)
    connection.query(sql, function(err, result) {
        if (err) throw err;

        if (result.length < 0) throw err;
        // First image line
        var curr = result[0];
        var curr_ID = curr.ImageID;
        var imgpath = curr.Image_Filepath;
        var annotation = curr.x_min + "," + curr.x_max + "," + curr.x_max + "," + curr.x_min + "," + curr.class_id + " "
        var imgpath_and_annotations = imgpath + " " + annotation;

        for (var i = 1; i < result.length; i++) {
            console.log(curr_ID)
            curr = result[i]
            // If the current ID does not match the new ID, add entire line to text file and add new line. Then switch from old key to new key.
            if (curr_ID !== curr.ImageID) {
                imgpath = curr.Image_Filepath;
                curr_ID = curr.ImageID;
                console.log(imgpath_and_annotations);
                fs.appendFileSync(stream, imgpath_and_annotations);
                fs.appendFileSync(stream, '\n');
                // Restart new line with new image
                imgpath_and_annotations = imgpath;
            }
            // Separate annotation in accordance to specifications.
            var annotation = curr.x_min + "," + curr.x_max + "," + curr.x_max + "," + curr.x_min + "," + curr.class_id + " "
            // Append annotation
            var imgpath_and_annotations = imgpath_and_annotations + " " + annotation;
        }
        // Append last file
        fs.appendFileSync(stream, imgpath_and_annotations);
        fs.appendFileSync(stream, '\n');
        fs.close(stream);
        
        var filepath = __dirname + "/uploads/annotations.txt";

        res.download(filepath) 
    })
})

// Deletes annotation after file is downloaded to user.
app.delete("/delete_annotation", function(req, res) {
    fs.unlinkSync("uploads/annotations.txt");
    console.log("Deleting annotations after download")
})

// Function gets S3 data blob.
const getS3Object = (key, archive) => {
    return new Promise((resolve, reject) => {
      s3.getObject({
          // Get data from this database.
          Bucket: "cen3907imagedb", 
          // Key is the image name.
          Key: key
        }, (err, data) => {
          if (err){
            resolve(err)
          } else {
            resolve(
                // Appends the image data with the name of the key from S3.
                archive.append(data.Body, { name: key })
            )
          }
        })
    })
}

// downloads image database in zip file
app.get('/image_zip_download', function (req, res) {
    var sql = "SELECT * FROM Images"
    var result_keys = [];

    // Create zip file the images will be sent to.
    const output = fs.createWriteStream(__dirname + '/uploads/image_set.zip');
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    output.on('close', function() {
        // On archive download finish, send zip file to user.
        console.log(archive.pointer() + ' total bytes');
        var filepath = __dirname + "/uploads/image_set.zip";
        res.download(filepath)
    })
    // Archive is piped to the output file stream.
    archive.pipe(output);

    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result.length)
        for (var i = 0; i < result.length; i++) {
            // Push function calls into this array.
            result_keys.push(getS3Object(result[i].Image_Filepath, archive));
        }

        let promises = result_keys
        
        // Promises wait for all data to be "got" and then finalizes the archive to be sent.
        return Promise.all(promises)
        .then(() => {
            archive.finalize();
        })
    })
})

// download weights file from S3
app.get('/get_weights', function(req, res) {
    const url = s3.getSignedUrl('getObject', {
        Bucket: "cen3907imagedb", 
        Key: 'yolov3_weights.h5',
        Expires: 300
    })
    res.send(url)
})




// Test api calls

app.get('/test_py', function(req, res) {
    console.log("Image uploaded for detection...");
    // Calls python script to automatically detect objects in the image
    const python = spawn('python', ['CNN/image_detect.py', "/uploads/test.jpg"]);
    python.stdout.on('data', function(data) {
        console.log(data);
    })
    python.on('error', function(err) {
        console.log(err);
    });
    python.on('close', (code) => {
        console.log('Finished detection')
        res.send("Process ended")
    });
})

app.get('/test2_py', function(req, res) {
    console.log("Image uploaded for detection...");
    // Calls python script to automatically detect objects in the image
    const python = spawn('python', ['test.py']);
    python.stdout.on('data', function(data) {
        console.log(data);
    })
    python.on('error', function(err) {
        console.log(err);
    });
    python.on('close', (code) => {
        console.log('Finished detection')
        res.send("Process ended")
    });
})

// Intentional crash
app.get('/crash-async', function (req, res) {
    console.log('async crashing')
    setTimeout(function () {
      throw new Error('Async error')
    }, 100)
    // this code runs fine
    res.send('after async crash\n')
  })