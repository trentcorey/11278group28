const express = require('express');
const cors = require('cors')
const multer = require('multer');   
const {spawn} = require('child_process');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/uploads", express.static("uploads"));

var server = app.listen(port, function () {
    var port = server.address().port;

    console.log('Server listening at http://localhost:%s', port);

});

// Uploading an image to the server
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({storage: storage});

app.post('/upload', upload.single('file'), function(req, res) {
    console.log("Image uploaded!")
    console.log(req.file.path)

    // Calls python script to automatically detect objects in the image
    const python = spawn('python', ['CNN/image_detect.py', req.file.path]);
    python.on('close', (code) => {
        console.log('Finished detection')
        res.send("Detection finished"); 
    });
});

app.delete('/delete_result', function(req, res) {
    console.log("Deleting result")
    const python = spawn('python', ['python_helpers/delete_result.py']);
    python.on('close', (code) => {
        console.log('Result deleted')
        res.send("Deleted result")
    });
});