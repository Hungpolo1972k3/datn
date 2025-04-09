const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const removeFiles = (files) => {
    files.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};


const runAmrFinder = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}_amrfinder.csv`;
    const command = `amrfinder -n ${fastaFilePath} -o ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            removeFiles([fastaFilePath, outputFilePath]);
            return res.status(500).json({ error: `Error executing AMRFinder: ${error.message}` });
        }

        fs.readFile(outputFilePath, 'utf8', (err, data) => {
            removeFiles([fastaFilePath, outputFilePath]);
            if (err) {
                return res.status(500).json({ error: 'Lỗi khi đọc tệp kết quả' });
            }
            res.json({ result: data });
        });
    });
};


module.exports = {
    runAmrFinder
};
