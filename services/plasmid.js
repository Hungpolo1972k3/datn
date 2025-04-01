const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const removeFiles = (files) => {
    files.forEach((file) => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};

const runBlastn = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}_blastn_results.txt`;
    const command = `blastn -query acinetobacterplasmidtype_feb2025.fasta -subject ${fastaFilePath} -out ${outputFilePath} -outfmt 6 -perc_identity 95`;

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

module.exports = {
    runBlastn,
};