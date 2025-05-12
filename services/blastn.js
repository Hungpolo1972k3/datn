const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const dataset = require('../utils/datasetFasta.json');
const readline = require("readline");

const removeFiles = (files) => {
    files.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};

const dataDir = path.join("D:/NguyenThoHung", '../FastA');
const getFastaLength = (fastaPath) => {
    return new Promise((resolve, reject) => {
        let totalLength = 0;
        let currentSeq = '';
        const rl = readline.createInterface({
            input: fs.createReadStream(fastaPath),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            if (line.startsWith('>')) {
                if (currentSeq) {
                    totalLength += currentSeq.length;
                    currentSeq = '';
                }
            } else {
                currentSeq += line.trim();
            }
        });

        rl.on('close', () => {
            if (currentSeq) totalLength += currentSeq.length;
            resolve(totalLength);
        });

        rl.on('error', reject);
    });
};

const runBlastn = async (queryFastaPath, res) => {
    const queryPath = path.resolve(queryFastaPath);
    const { default: pLimit } = await import('p-limit');
    const limit = pLimit(10);

    try {
        const queryLength = await getFastaLength(queryPath);

        const tasks = dataset.map(({ name, fastaUrl }) =>
            limit(() => new Promise((resolve) => {
                const subjectPath = path.join(dataDir, fastaUrl);
                const outputFileName = `${path.basename(queryPath)}.${name}.blastout`;
                const outputFilePath = path.join(os.tmpdir(), outputFileName);

                const command = `blastn -query "${queryPath}" -subject "${subjectPath}" -out "${outputFilePath}" -outfmt 6`;

                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        return resolve({
                            name,
                            result: 'Error: ' + (stderr || error.message),
                        });
                    }

                    fs.readFile(outputFilePath, 'utf8', (err, data) => {
                        if (err) {
                            return resolve({
                                name,
                                result: 'Error: Lỗi khi đọc file kết quả',
                            });
                        }
                        resolve({
                            name,
                            result: data.trim(), 
                        });
                    });
                });
            }))
        );

        const results = await Promise.all(tasks);
        removeFiles([queryPath]);
        res.json(results);
    } catch (err) {
        removeFiles([queryPath]);
        console.error(err);
        res.status(500).json({ error: err.message || 'Lỗi không xác định' });
    }
};

module.exports = {
    runBlastn
};
