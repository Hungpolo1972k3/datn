const express = require('express');
const amrController = require("../controllers/amr")
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); 
  }
const multer = require('multer'); 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/getamrinfo', upload.single('fasta'), amrController.getAmrInfo);
module.exports = router;