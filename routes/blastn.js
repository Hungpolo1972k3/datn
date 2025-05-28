const express = require("express");
const multer = require("multer");
const blastnController = require("../controllers/blastn");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post('/blastn/:id', upload.single('fasta'), blastnController.runBlastn);

router.post(
  '/blastntwofile',
  upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]),
  blastnController.runBlastnTwoFile
);

router.get('/getzipfile',blastnController.getZipFile )
module.exports = router;