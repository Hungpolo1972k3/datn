const fs = require('fs');
const blastnService = require("../services/blastn");

const runBlastn = async(req, res) => {
    const {id} = req.params;
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    await blastnService.runBlastn(req.file.path, id, res);
};

const getZipFile = async (req, res) => {
    const {url} = req.query;
    const filePath = url;
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            message: "Không tồn tại file",
            data: filePath,
            status: 0
        });
    }
    let result = await blastnService.getGzipFile(url);
    return res.status(200).json({
        message: "Lấy thông tin file thành công",
        data: result,
        status: 1
    })
}
module.exports = {
    runBlastn,
    getZipFile
};
