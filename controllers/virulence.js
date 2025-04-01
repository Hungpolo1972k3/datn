const virulenceService = require("../services/virulence");

const runAbricate = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    virulenceService.runAbricate(req.file.path, res);
};

const runAbricateString = (req,res) => {
    const {string} = req.body;
    virulenceService.runAbricateString(string, res)
}
module.exports = {
    runAbricate, 
    runAbricateString
};
