const express = require('express');
const sampleController = require('../controllers/sample');
const router = express.Router();
const requireLogin = require('../utils/requireLogin')

router.post('/createsample', requireLogin, sampleController.createSample);

router.get('/getsamplesbyexperimentid', requireLogin, sampleController.getSamplesByExperimentId);

router.put('/editsample', requireLogin, sampleController.editSample)

router.delete('/deletesample', requireLogin, sampleController.deleteSample);

//ADMIN
router.get('getallsamples', requireLogin, sampleController.getAllSamples);
// Admin
router.get('/samplestatisticadmin', requireLogin, sampleController.getSampleStatisticAdmin);
module.exports = router;