const plasmidService = require('../services/plasmid');

const getPlasmidInfo = async (req, res) => {
    try {
        const file = req.file;
        const response = await plasmidService.getPlasmidInfo(file);
        return res.status(200).json({
            message: 'File successfully uploaded and processed',
            data: response,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
module.exports = {
    getPlasmidInfo
};