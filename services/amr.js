const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const removeFiles = (files) => {
    files.forEach((file) => {
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
            throw new Error("Lỗi" + error.message)
        }

        fs.readFile(outputFilePath, "utf8", (err, data) => {
            removeFiles([fastaFilePath, outputFilePath]);
            if (err) {
                throw new Error("Lỗi" + error.message)
            }
            res.json({ result: data });
        });
    });
};
const runAmrFinderString = (nucleicSequence, res) => {
    const fastaFilePath = path.resolve('amr_sequence.fasta');
    const fastaContent = `>sequence\n${nucleicSequence.replace(/\n/g, '')}`; 
    fs.writeFileSync(fastaFilePath, fastaContent);  

    const outputFilePath = `${fastaFilePath}.csv`;  

    const command = `amrfinder -n ${fastaFilePath} -o ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ error: 'Lỗi khi chạy amrfinder' });
        }

        fs.readFile(outputFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Lỗi khi đọc tệp kết quả' });
            }
            fs.unlinkSync(fastaFilePath);
            fs.unlinkSync(outputFilePath);
            res.json({ result: data });
        });
    });
};

module.exports = {
    runAmrFinder,
    runAmrFinderString
};
