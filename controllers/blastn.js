const blastnService = require("../services/blastn");

const runBlastn = async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    await blastnService.runBlastn(req.file.path, res);
};

module.exports = {
    runBlastn
};
