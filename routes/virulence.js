const express = require('express');
const virulenceController = require("../controllers/virulence")
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

router.post('/getvirulenceinfo', requireLogin, upload.single('fasta'), virulenceController.getVirulenceInfo);

router.get("/findvirulencesbykey", requireLogin, virulenceController.findVirlencesByKey);
router.get('/getvirulencesbysampleid', requireLogin, virulenceController.getVirulencesBySampleId);

router.get("/getallvirulencesgroup", requireLogin, virulenceController.getAllVirulenceGroup);

router.post('/runvirulencetool', upload.single('fasta'), virulenceController.runVirulenceTool);

module.exports = router;