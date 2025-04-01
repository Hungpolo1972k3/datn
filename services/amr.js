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
    const tempFastaFilePath = path.resolve(__dirname, 'temp_input.fasta');
    const fastaContent = `>temp_sequence\n${nucleicString}`;
    fs.writeFile(tempFastaFilePath, fastaContent, (writeErr) => {
        if (writeErr) {
            throw new Error("Lỗi khi ghi vào file: " + writeErr.message);
        }
        const outputFilePath = `${tempFastaFilePath}_amrfinder.tsv`;
        const command = `amrfinder -n ${tempFastaFilePath} -o ${outputFilePath}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                throw new Error("Lỗi khi chạy amrfinder: " + error.message);
            }
            fs.readFile(outputFilePath, "utf8", (err, data) => {
                removeFiles([tempFastaFilePath, outputFilePath]);
                if (err) {
                    throw new Error("Lỗi khi đọc file kết quả: " + err.message);
                }
                res.json({ result: data });
            });
        });
    });
};
module.exports = {
    runAmrFinder,
    runAmrFinderString
};
