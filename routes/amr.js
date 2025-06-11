const express = require('express');
const amrController = require("../controllers/amr")
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uploadDir = path.join("/app", 'Blastn');
const requireLogin = require('../utils/requireLogin')

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

router.post('/getamrinfo', requireLogin, upload.single('fasta'), amrController.getAmrInfo);

router.get('/getamrsbysampleid', requireLogin, amrController.getAmrsBySampleId);

router.post('/runamrtool', upload.single('fasta'), amrController.runAmrTool);

module.exports = router;