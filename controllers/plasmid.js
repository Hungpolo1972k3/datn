const plasmidService = require("../services/plasmid");

const runBlastn = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    plasmidService.runBlastn(req.file.path, res);
};

module.exports = {
    runBlastn
};