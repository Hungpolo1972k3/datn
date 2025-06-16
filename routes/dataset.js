const express = require('express');
const router = express.Router();
const datasetController = require("../controllers/dataset");

router.get('/downloadfolder', datasetController.downloadFolder);

router.get('/getfolderinfo', datasetController.getFolderInfo);
router.get('/getfileinfo', datasetController.getFileInfo);
router.get('/downloadfile', datasetController.downloadFile);
router.get('/getzipfile', datasetController.getZipFile );
router.get('/getzipfile2', datasetController.getZipFile2 );
module.exports = router;