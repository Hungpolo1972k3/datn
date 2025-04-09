const virulenceService = require("../services/virulence");

const runAbricate = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    virulenceService.runAbricate(req.file.path, res);
};

module.exports = {
    runAbricate
};
