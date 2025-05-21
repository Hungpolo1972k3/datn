const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads');
const requireLogin = require('../utils/requireLogin');
const blastnController = require("../controllers/blastn");
const blastnService = require('../services/blastn');

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

router.post('/runblastntool', upload.single('fasta'), blastnController.runBlastmTool);

router.get('/downloadfolder', blastnController.downloadFolder);

router.get('/getfolderinfo', blastnController.getFolderInfo);
router.get('/getfileinfo', blastnController.getFileInfo);
router.get('/downloadfile', blastnController.downloadFile);
router.get('/getzipfile', blastnController.getZipFile );
module.exports = router;