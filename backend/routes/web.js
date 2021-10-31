const path = require('path');
const express = require('express');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})

const router = express.Router();

router.post("/photo", (req, res, next) => {
    return res.json({
        image: null
    });
});

module.exports = router;