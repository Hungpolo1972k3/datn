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
const runBlastn = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}.blastout`;  
    const command = `blastn -query ${fastaFilePath} -out ${outputFilePath} -outfmt 6`; 

    exec(command, (error, stdout, stderr) => {
        if (error) {
            removeFiles([fastaFilePath, outputFilePath]);
            return res.status(500).json({ error: `Error executing blastn: ${error.message}` });
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
    runBlastn
};
