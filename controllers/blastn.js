const blastnService = require("../services/blastn");

const runBlastn = async(req, res) => {
    const {id} = req.params;
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    await blastnService.runBlastn(req.file.path, id, res);
};

module.exports = {
    runBlastn
};
