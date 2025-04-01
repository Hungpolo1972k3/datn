const { exec } = require("child_process");
const { error } = require("console");
const fs = require("fs");
const path = require("path");

const removeFiles = (files) => {
    files.forEach((file) => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};

const extractNucleicSequence = (fastaData, start, stop) => {
    return fastaData.substring(start - 1, stop);
};

const runBlastn = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}_blastn_results.txt`;
    const command = `blastn -query acinetobacterplasmidtype_feb2025.fasta -subject ${fastaFilePath} -out ${outputFilePath} -outfmt 6 -perc_identity 95`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            throw new Error("Lỗi: " + error.message);
        }

        fs.readFile(outputFilePath, "utf8", (err, blastResult) => {
            if (err) {
                throw new Error("Lỗi: " + err.message);
            }

            fs.readFile(fastaFilePath, "utf8", (err, fastaData) => {
                if (err) {
                    throw new Error("Lỗi: " + err.message);
                }
                const blastLines = blastResult.split("\n");
                const sequences = [];

                blastLines.forEach((line) => {
                    const fields = line.split("\t");
                    if (fields.length < 12) return; 
                    const query = fields[0]; 
                    const querystart = parseInt(fields[6]); 
                    const querystop = parseInt(fields[7]);
                    const nucleicSequence = extractNucleicSequence(fastaData, querystart, querystop);
                    sequences.push({ query, querystart, querystop, nucleicSequence });
                });                
                removeFiles([fastaFilePath, outputFilePath]);
                res.json({ 
                    data: blastLines,
                    sequences 
                });
            });
        });
    });
};

module.exports = {
    runBlastn,
};