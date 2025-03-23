const amrService = require('../services/amr');

const getAmrInfo = async (req, res) => {
    try {
        const file = req.file;
        const response = await amrService.getAmrInfo(file);
        return res.status(200).json({
            message: 'File successfully uploaded and processed',
            data: response,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const saveAmrInfo = async(req,res) =>{
    try {
        const {result}= req.body;
        const {sample_id} = req.query
        if(!sample_id || !result){
            return res.status(400).json({message: "Chưa đủ dữ liệu"})
        }
        const response = await amrService.saveAmrInfo(result, sample_id);
        return res.status(200).json({
            message: 'Save AmrInfo successfully',
            data: response,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

const getAllAmrsBySampleId = async(req, res)=>{
    try {
        const {sample_id} = req.query;
        if(!sample_id){
            return res.status(400).json({message: "Chưa có sample_id"})
        }
        const amrs = await amrService.getAllAmrsBySampleId(sample_id)
        return res.status(200).json({
            message: 'Lấy thông tin amr thành công',
            data: amrs,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

const getAmrById = async(req,res) =>{
    try {
        const {id} = req.query
        const amr = await amrService.getAmrById(id)
        return res.status(200).json({
            message: "Lấy thông tin amr thành công",
            data: amr
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

module.exports = {
    getAmrInfo,
    saveAmrInfo,
    getAllAmrsBySampleId,
    getAmrById
};