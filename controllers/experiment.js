const experimentService = require('../services/experiment.js');

const createExperiment = async (req, res) => {
    try {
        const {name, code, engineer, createdTime} = req.body
        const {user_id} = req.query
        if(!name || !code || !engineer){
            return res.status(400).json({message: "Thiếu thông tin"})
        }
        const newExperiment = await experimentService.createExperiment({user_id,name, code, engineer, createdTime})
        return res.status(200).json({
            message: "Thêm mẫu thí nghiệm thành công",
            data: newExperiment
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getExperimentsByUserId = async(req,res) =>{
    try {
        const {user_id} = req.query;
        const experiments = await experimentService.getExperimentsByUserId(user_id);
        return res.status(200).json({
            message: "Lấy thông tin thành công",
            data: experiments
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const editExperiment = async(req, res) =>{
    try {
        const {id} = req.query;
        const {name, code, engineer, createdTime} = req.body;
        if(!name || !code || !engineer){
            return res.status(400).json({message: "Thiếu thông tin"})
        }
        const newExperiment = await experimentService.editExperiment(id,name, code, engineer, createdTime)
        return res.status(200).json({
            message: "Chỉnh sửa mẫu thí nghiệm thành công",
            data: newExperiment
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const experimentStatistic = async(req, res) => {
    try {
        const {user_id} = req.query;
        const data = await experimentService.experimentStatistic(user_id);
        return res.status(200).json({
            message: "Thống kê thành công",
            data: data
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllExperiments = async(req, res) => {
    try {
        const experiments = await experimentService.getAllExperiments();
        return res.status(200).json({
            message: "Lấy danh sách thí nghiệm thành công",
            data: experiments
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteExperiment = async (req, res) => {
    try {
        const {id} = req.query;
        await experimentService.deleteExperiment(id);
        return res.status(200).json({
            message: "Xóa thí nghiệm thành công"
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getExperimentStatisticAdmin = async (req, res) => {
    try {
        const result = await experimentService.getExperimentStatisticAdmin();
        return res.status(200).json({
            message: "Lấy thí nghiệm thành công",
            data: result
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports = { createExperiment, getExperimentsByUserId, editExperiment, experimentStatistic, getAllExperiments, deleteExperiment, getExperimentStatisticAdmin };