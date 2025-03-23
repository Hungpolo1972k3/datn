const sampleService = require('../services/sample');

const createSample = async (req, res) => {
    try {
        const {name, strain, header, sequence, length} = req.body
        const {user_id} = req.query
        if(!user_id || !name || !strain || !header || !sequence || !length){
            return res.status(400).json({message: "Thiếu thông tin"})
        }
        const newsample = await sampleService.createSample(user_id,name, strain, header, sequence, length)
        return res.status(200).json({
            message: "Thêm mẫu thí nghiệm thành công",
            data: newsample
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSampleById = async (req, res) => {
    try {
        const {sample_id} = req.query
        if(!sample_id){
            return res.status(400).json({message: "Thiếu thông tin"})
        }
        const sample = await sampleService.getSampleById(sample_id)
        return res.status(200).json({
            message: "Lấy thông tin mẫu thí nghiệm thành công",
            data: sample
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const updateSampleById = async (req, res) => {
    try {
        const {sample_id} = req.query
        const {name, strain, header, sequence, length} = req.body
        if(!sample_id){
            return res.status(400).json({message: "Thiếu thông tin"})
        }
        const sample = await sampleService.updateSampleById(sample_id,name, strain, header, sequence, length)
        return res.status(200).json({
            message: "Cập nhật thông tin mẫu thí nghiệm thành công",
            data: sample
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllSamplesByUserId = async (req, res) => {
    try {
        const {user_id} = req.query
        if(!user_id){
            return res.status(400).json({message: "Thiếu thông tin"})
        }
        const sample = await sampleService.getAllSamplesByUserId(user_id)
        return res.status(200).json({
            message: "Lấy các thông tin mẫu thí nghiệm thành công",
            data: sample
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createSample, getSampleById, updateSampleById, getAllSamplesByUserId };