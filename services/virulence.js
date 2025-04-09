const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const removeFiles = (files) => {
    files.forEach((file) => {
        fs.unlink(file, (err) => {
            if (err) console.error(`Error deleting file ${file}: ${err.message}`);
        });
    });
};

const runAbricate = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const command = `abricate --db vfdb --csv ${fastaFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: `Error executing Abricate: ${error.message}` });
        }

        if (stderr) {
            return res.status(500).json({ error: `Error in Abricate: ${stderr}` });
        }
        res.json({ result: stdout });

        removeFiles([fastaFilePath]);
    });
};

module.exports = {
    runAbricate
};
