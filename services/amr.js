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

    exec(command, async (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: `Error executing command: ${error.message}` });
        }

        if (stderr) {
            return res.status(500).json({ error: `Error in AMR Finder: ${stderr}` });
        }
        try {
            const data = fs.readFileSync(outputFilePath, "utf8");
            res.json({ result: data });
        } catch (err) {
            res.status(500).json({ error: `Error reading output file: ${err.message}` });
        } finally {
            removeFiles([fastaFilePath, outputFilePath]);
        }
    });
};

module.exports = {
    runAmrFinder
};
