const { messaging } = require('firebase-admin');
const virulenceService = require('../services/virulence');

const getVirulenceInfo = async (req, res) => {
    try {
        const file = req.file;
        const response = await virulenceService.getVirulenceInfo(file);
        return res.status(200).json({
            message: 'File successfully uploaded and processed',
            data: response,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const saveVirulenceInfo = async(req,res) =>{
    try {
        const {result, sample_id}= req.body;
        const response = await virulenceService.saveVirulenceInfo(result, sample_id);
        return res.status(200).json({
            message: 'Save Virulence Info successfully',
            data: response,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

const getAllVirulencesBySampleId = async(req, res) =>{
    try {
        const {sample_id} = req.query;
        if(!sample_id){
            return res.status(400).json({message: "Chưa có sample_id"})
        }
        const virulences = await virulenceService.getAllVirulencesBySampleId(sample_id)
        return res.status(200).json({
            message: "Lấy danh sách gen độc lực thành công",
            data: virulences
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

const getVirulenceById = async(req,res) =>{
    try {
        const {id} = req.query
        const virulence = await virulenceService.getVirulenceById(id)
        return res.status(200).json({
            message: "Lấy thông tin gen độc lực thành công",
            data: virulence
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}
module.exports = {
    getVirulenceInfo,
    saveVirulenceInfo,
    getAllVirulencesBySampleId,
    getVirulenceById
};