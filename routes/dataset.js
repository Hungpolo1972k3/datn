const express = require('express');
const router = express.Router();
const datasetController = require("../controllers/dataset");

router.get('/downloadfolder', datasetController.downloadFolder);

router.get('/getfolderinfo', datasetController.getFolderInfo);
router.get('/getfileinfo', datasetController.getFileInfo);
router.get('/downloadfile', datasetController.downloadFile);
router.get('/getzipfile', datasetController.getZipFile );

module.exports = router;