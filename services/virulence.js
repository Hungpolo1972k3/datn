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

const runAbricate = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}.csv`;
    const command = `abricate --db vfdb --csv ${fastaFilePath} > ${outputFilePath}`;

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

const runAbricateString = (nucleicSequence, res) => {
    const fastaFilePath = path.resolve('virulence_sequence.fasta');
    const fastaContent = `>sequence\n${nucleicSequence.replace(/\n/g, '')}`; 
    fs.writeFileSync(fastaFilePath, fastaContent);  

    const outputFilePath = `${fastaFilePath}.csv`;  

    const command = `abricate --db vfdb --mincov 50 --minid 70 --csv ${fastaFilePath} > ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing abricate: ${error.message}`);
            return res.status(500).json({ error: 'Lỗi khi chạy abricate' });
        }

        fs.readFile(outputFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading output file: ${err.message}`);
                return res.status(500).json({ error: 'Lỗi khi đọc tệp kết quả' });
            }
            fs.unlinkSync(fastaFilePath);
            fs.unlinkSync(outputFilePath);
            res.json({ result: data });
        });
    });
};

module.exports = {
    runAbricate,
    runAbricateString
};


