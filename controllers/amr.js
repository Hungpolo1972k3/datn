const amrService = require("../services/amr");

const runAmrFinder = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    amrService.runAmrFinder(req.file.path, res);
};
const runAmrFinderString = (req,res) =>{
    const {string} = req.body;
    if (!string || typeof string!== "string") {
        return res.status(400).json({ error: "Chuỗi FASTA không hợp lệ hoặc bị thiếu" });
    }
    amrService.runAmrFinderString(string, res)
}
module.exports = {
    runAmrFinder,
    runAmrFinderString
};
