const express = require('express');
const sampleController = require('../controllers/sample');
const router = express.Router();

router.post('/createsample', sampleController.createSample);
router.get('/getsamplebyid', sampleController.getSampleById);
router.put('/updatesamplebyid', sampleController.updateSampleById);
router.get('/getallsamplesbyuserid', sampleController.getAllSamplesByUserId)

module.exports = router;