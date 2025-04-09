const express = require("express");
const multer = require("multer");
const amrController = require("../controllers/amr");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/amrfinder", upload.single("fasta"), amrController.runAmrFinder);

module.exports = router;
