const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uploadDir = path.join("/app", 'Blastn');
const blastnController = require("../controllers/blastn");

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

router.post('/runblastntool/:id', upload.single('fasta'), blastnController.runBlastmTool);

router.get('/downloadfolder', blastnController.downloadFolder);

router.get('/getfolderinfo', blastnController.getFolderInfo);
router.get('/getfileinfo', blastnController.getFileInfo);
router.get('/downloadfile', blastnController.downloadFile);
router.get('/getzipfile', blastnController.getZipFile );

router.post('/blastn', blastnController.runBlastn);
module.exports = router;