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

const runAmrFinder = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}_amrfinder.tsv`;
    const command = `amrfinder -n ${fastaFilePath} -o ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running AMRFinder+: ${stderr}`);
            return res.status(500).json({ error: "Failed to process FASTA file with AMRFinder+" });
        }

        fs.readFile(outputFilePath, "utf8", (err, data) => {
            removeFiles([fastaFilePath, outputFilePath]);
            if (err) {
                return res.status(500).json({ error: "Failed to read AMRFinder+ output file" });
            }
            res.json({ result: data });
        });
    });
};

module.exports = {
    runAmrFinder
};
