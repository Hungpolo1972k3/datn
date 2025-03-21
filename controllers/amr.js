const amrService = require("../services/amr");

const runAmrFinder = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    amrService.runAmrFinder(req.file.path, res);
};

module.exports = {
    runAmrFinder
};
