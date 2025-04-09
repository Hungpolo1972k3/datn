const express = require('express');
const sampleController = require('../controllers/sample');
const router = express.Router();

router.post('/createsample', sampleController.createSample);

router.get('/getsamplesbyexperimentid', sampleController.getSamplesByExperimentId);

router.put('/editsample', sampleController.editSample)

module.exports = router;