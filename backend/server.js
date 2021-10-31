const express = require('express');
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('image');

const port = process.env.PORT || 5000;


app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log('Listening on port ' + port));

app.get('/express_backend', (req, res) => {
    res.send({express: 'Your express backend is connected to React'});
});

app.post('/send_data', (req, res) => {
    console.log(req.body);
    res.set({"Access-Control-Allow-Origin" : "*", 
    "Access-Control-Allow-Credentials" : true })
    res.send(req.body);
});

app.post('/image_upload', upload.single('uploaded_file'), function (req, res) {
    console.log(req.file, req.body)
})