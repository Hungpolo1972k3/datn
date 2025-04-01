const express = require("express");
const multer = require("multer");
const plasmidController = require("../controllers/plasmid");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/plasmid", upload.single("fasta"), plasmidController.runBlastn);
module.exports = router;
