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

const cutFastaSequence = (fastaFilePath, start, end, sequenceId) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fastaFilePath, 'utf8', (err, data) => {
            if (err) reject("Lỗi đọc file FASTA: " + err.message);
            
            const regex = new RegExp(`^>${sequenceId}[\\s\\S]+?^>`, 'gm'); 
            const match = data.match(regex);

            if (match && match[0]) {
                const sequence = match[0].replace(/^>.*\n/, '').replace(/\n/g, ''); 
                const subSequence = sequence.slice(start - 1, end); 
                resolve(subSequence);
            } else {
                reject("Không tìm thấy chuỗi tương ứng với ID: " + sequenceId);
            }
        });
    });
};

const runBlastn = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}_blastn_results.txt`;
    const command = `blastn -query acinetobacterplasmidtype_feb2025.fasta -subject ${fastaFilePath} -out ${outputFilePath} -outfmt 6 -perc_identity 95`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            throw new Error("Lỗi " + error.message);
        }
        fs.readFile(outputFilePath, 'utf8', (err, data) => {
            if (err) {
                throw new Error("Lỗi đọc kết quả blastn: " + err.message);
            }
            const results = data.split('\n').map(line => {
                const cols = line.split('\t');
                return {
                    sequenceId: cols[1],
                    subjectStart: parseInt(cols[8]),
                    subjectStop: parseInt(cols[9])
                };
            });
            Promise.all(results.map(result => {
                return cutFastaSequence(fastaFilePath, result.subjectStart, result.subjectStop, result.sequenceId);
            }))
            .then(subSequences => {
                res.json({ result: subSequences });
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
        });
    });
};
module.exports = {
    runBlastn,
};