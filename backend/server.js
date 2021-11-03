const express = require('express');
const cors = require('cors')
const multer = require('multer');   
const {spawn} = require('child_process');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log('Listening on port ' + port));

app.get('/express_backend', (req, res) => {
    var dataToSend;
    const python = spawn('python', ['test.py']);
    python.stdout.on('data', function(data) {
        dataToSend = data.toString();
    });
    python.on('close', (code) => {
        res.send(dataToSend); 
    });
});

app.post('/send_data', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({storage: storage}).single('file')

app.post('/upload', function(req, res) {
    console.log("Hello!")
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});