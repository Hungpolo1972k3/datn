const { messaging } = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const virulenceService = require('../services/virulence');

const getVirulenceInfo = async (req, res) => {
    try {
        const file = req.file;
        const {sample_id} = req.query;
        const response = await virulenceService.getVirulenceInfo(file,sample_id);
        return res.status(200).json({
            message: 'File successfully uploaded and processed',
            data: response,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const findVirlencesByKey = async(req, res) =>{
    try {
        const {sample_id, key} = req.query;
        const virulences = await virulenceService.findVirlencesByKey(sample_id, key);
        return res.status(200).json({
            message: 'Get virulences by key successfully',
            data: virulences,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getAllVirulenceGroup = async(req, res) => {
    try {
        const {sample_id} = req.query;
        const groups = await virulenceService.getAllVirulenceGroup(sample_id);
        return res.status(200).json({
            message: 'Get virulences by key successfully',
            data: groups,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getVirulencesBySampleId = async(req, res) => {
    try {
        const {sample_id} = req.query;
        const virulences = await virulenceService.getVirulencesBySampleId(sample_id);
        return res.status(200).json({
            message: 'Get virulences successfully',
            data: virulences,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
module.exports = {
    getVirulenceInfo,
    findVirlencesByKey,
    getAllVirulenceGroup,
    getVirulencesBySampleId
};