const express = require("express");
const multer = require("multer");
const virulenceController = require("../controllers/virulence");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/abricate", upload.single("fasta"), virulenceController.runAbricate);

module.exports = router;
