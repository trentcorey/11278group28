"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var multer = require('multer');

var multerS3 = require('multer-s3');

var fs = require('fs');

var aws = require('aws-sdk');

var mysql = require('mysql');

var spawn = require("child_process").spawn;

var path = require('path');

var archiver = require('archiver');

var app = express();
var port = process.env.PORT || 8081;
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express["static"]("uploads"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
app.use(express["static"](path.join(__dirname, 'client', 'build')));
var insert_id; // REQUEST KEYS FROM OWNER. WILL NOT BE POSTED ON GITHUB.

var s3 = new aws.S3({
  accessKeyId: 'AKIATOWZ4AJ36A2KSKMU',
  secretAccessKey: '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'
}); // Configuration for SQL connection to AWS RDS servers.

var connection = mysql.createConnection({
  host: 'cen3907database.c2ulacfq2lky.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Mirksu2001',
  port: '3306',
  database: 'image_database'
});
connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log('Connected to mySQL');
  }
});
var server = app.listen(port, function () {
  var port = server.address().port;
  console.log('Server listening at %s', port);
}); // Uploading an image to the server

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({
  storage: storage
});
var uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'cen3907imagedb',
    acl: 'public-read',
    metadata: function metadata(req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function key(req, file, cb) {
      cb(null, Date.now().toString() + '.jpg');
    }
  })
});
app.post('/detect_image', upload.single('file'), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var python;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("Image uploaded for detection..."); // Calls python script to automatically detect objects in the image

            python = spawn('python', ['CNN/image_detect.py', req.file.path]);
            python.on('close', function (code) {
              console.log('Finished detection');
              res.sendFile(__dirname + "/uploads/result.jpg");
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post('/upload', uploadS3.single('file'), function (req, res) {
  var key = req.file.key;
  console.log(key);
  var data_to_post = {
    Image_Filepath: key
  }; // Upload image filepath to database

  connection.query("INSERT INTO Images SET ?;", data_to_post, function (err, result) {
    if (err) throw err;
    insert_id = result.insertId;
    console.log("ID inserted: " + insert_id);
    return res.send({
      "image_id": "" + insert_id
    });
  });
});
app.post('/upload_annotation_results', function (req, res) {
  var sql = "INSERT INTO Annotation_Table SET ?;";
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
    };
    connection.query(sql, [data_to_post], function (err, result) {
      if (err) throw err;
      console.log("Section inserted.");
    });
  }
});
app["delete"]('/delete_result', function (req, res) {
  console.log("Deleting result");
  var python = spawn('python', ['python_helpers/delete_result.py']);
  python.on('close', function (code) {
    console.log('Result deleted');
    res.send("Deleted ");
  });
});
app.get('/annotations', function (req, res) {
  // SQL query
  var sql = "SELECT * FROM Annotation_Table INNER JOIN Images ON Annotation_Table.ImageID = Images.ID";
  var stream = fs.openSync(__dirname + "/uploads/annotations.txt", 'a'); // Tried promise chaining. It didn't work, because I'm not touching recursion, lol.
  // This solution might be a little unworkable at scale but... this is a prototype, right?
  // I'll learn promises later.

  connection.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length < 0) throw err;
    var curr = result[0];
    var curr_ID = curr.ImageID;
    var imgpath = curr.Image_Filepath;
    var annotation = curr.x_min + "," + curr.x_max + "," + curr.x_max + "," + curr.x_min + "," + curr.class_id + " ";
    var imgpath_and_annotations = imgpath + " " + annotation;

    for (var i = 1; i < result.length; i++) {
      console.log(curr_ID);
      curr = result[i];

      if (curr_ID !== curr.ImageID) {
        imgpath = curr.Image_Filepath;
        curr_ID = curr.ImageID;
        console.log(imgpath_and_annotations);
        fs.appendFileSync(stream, imgpath_and_annotations);
        fs.appendFileSync(stream, '\n');
        imgpath_and_annotations = imgpath;
      }

      var annotation = curr.x_min + "," + curr.x_max + "," + curr.x_max + "," + curr.x_min + "," + curr.class_id + " ";
      var imgpath_and_annotations = imgpath_and_annotations + " " + annotation;
    } // Append last file


    fs.appendFileSync(stream, imgpath_and_annotations);
    fs.appendFileSync(stream, '\n');
    var filepath = __dirname + "/uploads/annotations.txt";
    res.download(filepath);
  });
});
app["delete"]("/delete_annotation", function (req, res) {
  fs.unlinkSync("uploads/annotations.txt");
  console.log("Deleting annotations after download");
});

var getS3Object = function getS3Object(key, archive) {
  return new Promise(function (resolve, reject) {
    s3.getObject({
      Bucket: "cen3907imagedb",
      Key: key
    }, function (err, data) {
      if (err) {
        resolve(err);
      } else {
        resolve(archive.append(data.Body, {
          name: key
        })); // resolve(fs.writeFile(__dirname + '/uploads/' + key, data.Body, function(err, result) {
        //     if (err) throw err;
        // }))
      }
    });
  });
};

app.get('/image_zip_download', function (req, res) {
  var sql = "SELECT * FROM Images";
  var result_keys = [];
  var output = fs.createWriteStream(__dirname + '/uploads/image_set.zip');
  var archive = archiver('zip', {
    zlib: {
      level: 9
    } // Sets the compression level.

  });
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
  });
  archive.pipe(output);
  console.log(__dirname);
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.length);

    for (var i = 0; i < result.length; i++) {
      result_keys.push(getS3Object(result[i].Image_Filepath, archive));
    }

    var promises = result_keys;
    return Promise.all(promises).then(function () {
      archive.finalize();
      var filepath = __dirname + "/uploads/image_set.zip";
      res.download(filepath);
    });
  });
});
