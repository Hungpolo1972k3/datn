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

const runAmrFinderString = (nucleicSequence, res) => {
    if (!nucleicSequence || typeof nucleicSequence !== 'string' || nucleicSequence.trim().length === 0) {
        return res.status(400).json({ error: 'Chuỗi nucleotide không hợp lệ hoặc rỗng' });
    }

    const fastaFilePath = path.resolve('/tmp/amr_sequence.fasta');
    const fastaContent = `>NODE_1_length_312632_cov_38.851190\n${nucleicSequence.replace(/(.{60})/g, '$1\n')}`;

    try {
        fs.writeFileSync(fastaFilePath, fastaContent, { encoding: 'utf8' });
        console.log(`FASTA file created: ${fastaFilePath}`);
        console.log(fastaContent);
    } catch (err) {
        console.error(`Lỗi khi ghi file FASTA: ${err.message}`);
        return res.status(500).json({ error: 'Lỗi khi ghi tệp FASTA' });
    }

    const outputFilePath = `${fastaFilePath}_amrfinder.tsv`;
    const command = `amrfinder -n ${fastaFilePath} -o ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Lỗi khi chạy amrfinder', details: stderr });
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
