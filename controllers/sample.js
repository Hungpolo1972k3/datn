const sampleService = require('../services/sample');

const createSample = async (req, res) => {
    try {
        const {name, header, length, file_name, fastaFilePath} = req.body
        const {user_id, experiment_id} = req.query
        if(!name || !header || !length){
            return res.status(400).json({message: "Thiếu thông tin"})
        }
        let existName = await sampleService.checkExistSample(experiment_id, name);
        if(existName){
            return res.status(400).json({
                message: "Đã tồn tại tên thí nghiệm",
                status: -1,
                data: ""
            })
        }
        const newsample = await sampleService.createSample(user_id, experiment_id,name, header, length, file_name, fastaFilePath)
        return res.status(200).json({
            message: "Thêm mẫu thí nghiệm thành công",
            status: 0,
            data: newsample
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSamplesByExperimentId = async(req, res) =>{
    try {
        const {experiment_id} = req.query;
        const samples = await sampleService.getSamplesByExperimentId(experiment_id)
        return res.status(200).json({
            message: "Lấy thông tin mẫu thí nghiệm thành công",
            data: samples
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const editSample = async (req, res) => {
    try {
        const {name} = req.body
        const {experiment_id} = req.query
        if(!name){
            return res.status(400).json({message: "Thiếu thông tin"})
        }
        const newsample = await sampleService.editSample(experiment_id, name)
        return res.status(200).json({
            message: "Chỉnh sửa mẫu thí nghiệm thành công",
            data: newsample
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const deleteSample = async (req, res) => {
    try {
        const {id} = req.query;
        await sampleService.deleteSample(id);
        return res.status(200).json({
            message: "Xóa mẫu thí nghiệm thành công"
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllSamples = async(req, res) => {
    try {
        const samples = await sampleService.getAllSamples();
        return res.status(200).json({
            message: "Lấy danh sách mẫu thí nghiệm thành công",
            data: samples
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const getSampleStatisticAdmin = async (req, res) => {
    try {
        const result = await sampleService.getSampleStatisticAdmin();
        return res.status(200).json({
            message: "Lấy mẫu thí nghiệm thành công",
            data: result
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports = { createSample, getSamplesByExperimentId, editSample, deleteSample, getAllSamples, getSampleStatisticAdmin };