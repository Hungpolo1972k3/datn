const virulenceService = require("../services/virulence");

const runAbricate = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    virulenceService.runAbricate(req.file.path, res);
};

const runAbricateString = (req, res) => {
    const { string } = req.body;
    if (!string || typeof string!== "string") {
        return res.status(400).json({ error: "Chuỗi FASTA không hợp lệ hoặc bị thiếu" });
    }
    
    virulenceService.runAbricateString(string, res);
};

module.exports = {
    runAbricate, 
    runAbricateString
};
