const express = require('express');
const experimentController = require('../controllers/experiment');
const router = express.Router();

router.post('/createexperiment', experimentController.createExperiment);

router.get("/getexperimentsbyuserid", experimentController.getExperimentsByUserId);

router.put('/editexperiment', experimentController.editExperiment);

router.get('/experimentstatistic', experimentController.experimentStatistic);

module.exports = router;