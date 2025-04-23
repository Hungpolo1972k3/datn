const express = require("express");
const multer = require("multer");
const blastnController = require("../controllers/blastn");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post('/blastn', upload.array('fasta', 850), blastnController.runBlastn);

module.exports = router;