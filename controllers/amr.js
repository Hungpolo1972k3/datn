const amrService = require('../services/amr');

const getAmrInfo = async (req, res) => {
    try {
        const file = req.file;
        const {sample_id} = req.query;
        const response = await amrService.getAmrInfo(file, sample_id);
        return res.status(200).json({
            message: 'File successfully uploaded and processed',
            data: response,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getAmrsBySampleId = async(req, res) => {
    try {
        const {sample_id} = req.query;
        const amrs = await amrService.getAmrsBySampleId(sample_id);
        return res.status(200).json({
            message: 'Get Amrs Success',
            data: amrs,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const runAmrTool = async (req, res) => {
    try {
        const file = req.file;
        const response = await amrService.runAmrTool(file);
        return res.status(200).json({
            message: 'File successfully uploaded and processed',
            data: response,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    getAmrInfo,
    getAmrsBySampleId,
    runAmrTool
};