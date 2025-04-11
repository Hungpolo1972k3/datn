const express = require('express');
const experimentController = require('../controllers/experiment');
const router = express.Router();
const requireLogin = require('../utils/requireLogin')

router.post('/createexperiment', requireLogin, experimentController.createExperiment);

router.get("/getexperimentsbyuserid", requireLogin, experimentController.getExperimentsByUserId);

router.put('/editexperiment', requireLogin, experimentController.editExperiment);

router.get('/experimentstatistic', requireLogin, experimentController.experimentStatistic);

// ADMIN
router.get('/getallexperiments', requireLogin, experimentController.getAllExperiments)

module.exports = router;