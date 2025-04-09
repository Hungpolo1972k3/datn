const plasmidService = require('../services/plasmid');

const getPlasmidInfo = async (req, res) => {
    try {
        const file = req.file;
        const {sample_id} = req.query
        const response = await plasmidService.getPlasmidInfo(file, sample_id);
        return res.status(200).json({
            message: 'File successfully uploaded and processed',
            data: response,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
// const savePlasmidInfo = async(req,res) =>{
//     try {
//         const {result}= req.body;
//         const {sample_id} = req.query;
//         const response = await plasmidService.savePlasmidInfo(sample_id, result);
//         return res.status(200).json({
//             status: 1,
//             message: 'Save Plasmid info successfully',
//             data: response,
//         });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error', error: error.message })
//     }
// }

const getAllPlasmidBySampleId = async(req, res) =>{
    try {
        const {sample_id} = req.query;
        if(!sample_id){
            return res.status(400).json({message: "Chưa có sample_id"})
        }
        const plasmids = await plasmidService.getAllPlasmidBySampleId(sample_id)
        return res.status(200).json({
            message: "Lấy danh sách plasmid thành công",
            data: plasmids
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}

const getPlasmidById = async(req,res) =>{
    try {
        const {id} = req.query
        const plasmid = await plasmidService.getPlasmidById(id)
        return res.status(200).json({
            message: "Lấy thông tin plasmid thành công",
            data: plasmid
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message })
    }
}
module.exports = {
    getPlasmidInfo,
    getAllPlasmidBySampleId,
    getPlasmidById
};