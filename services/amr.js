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
    const outputFilePath = `${fastaFilePath}_amrfinder.tsv`;
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

const runAmrFinderString = (nucleicString, res) => {
    const fastaContent = `>temp_sequence\n${nucleicString.replace(/\n/g, "").trim()}`;
    const tempFastaFilePath = path.resolve(__dirname, "temp_sequence_input.fasta");
    fs.writeFileSync(tempFastaFilePath, fastaContent);
    const outputFilePath = `${tempFastaFilePath}_amrfinder.tsv`;
    const command = `amrfinder -n ${tempFastaFilePath} -o ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("AMRFinder error:", stderr); 
            return res.status(500).json({ error: "Lỗi khi chạy AMRFinder" });
        }
        fs.readFile(outputFilePath, "utf8", (err, data) => {
            removeFiles([tempFastaFilePath, outputFilePath]);
            if (err) {
                return res.status(500).json({ error: "Lỗi khi đọc kết quả AMRFinder" });
            }
            res.json({ result: data });
        });
    });
};
module.exports = {
    runAmrFinder,
    runAmrFinderString
};
