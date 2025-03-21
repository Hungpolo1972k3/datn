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

const runAbricate = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}.csv`;
    const command = `abricate --db vfdb --csv ${fastaFilePath} > ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running Abricate: ${stderr}`);
            return res.status(500).json({ error: "Failed to process FASTA file" });
        }

        fs.readFile(outputFilePath, "utf8", (err, data) => {
            removeFiles([fastaFilePath, outputFilePath]);
            if (err) {
                return res.status(500).json({ error: "Failed to read output file" });
            }
            res.json({ result: data });
        });
    });
};

module.exports = {
    runAbricate
};


