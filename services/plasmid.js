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
    const dbPath = "../../db/acinetobacterplasmidtype_feb2025.fasta";
    const command = `blastn -query ${dbPath} -subject ${fastaFilePath} -out ${outputFilePath} -outfmt 6 -perc_identity 95`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running BLASTn: ${stderr}`);
            return res.status(500).json({ error: "Failed to run BLASTn" });
        }

        fs.readFile(outputFilePath, "utf8", (err, data) => {
            removeFiles([fastaFilePath, outputFilePath]);
            if (err) {
                return res.status(500).json({ error: "Failed to read BLAST output file" });
            }
            res.json({ result: data });
        });
    });
};

module.exports = {
    runBlastn
};