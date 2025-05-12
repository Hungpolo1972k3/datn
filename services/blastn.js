const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const dataset = require('../utils/datasetFasta.json');
const pLimit = require('p-limit');

const removeFiles = (files) => {
    files.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};

const dataDir = path.join(__dirname, '../data');
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
                            coverage: 'Error: ' + (stderr || error.message),
                            _coverageValue: -1
                        });
                    }

                    fs.readFile(outputFilePath, 'utf8', (err, data) => {
                        if (err) {
                            return resolve({
                                name,
                                coverage: 'Error: Lỗi khi đọc file kết quả',
                                _coverageValue: -1
                            });
                        }

                        let totalMatchLength = 0;
                        const lines = data.trim().split('\n').filter(Boolean);

                        for (const line of lines) {
                            const cols = line.split('\t');
                            const alignLen = Math.abs(parseInt(cols[7]) - parseInt(cols[6])) + 1;
                            totalMatchLength += alignLen;
                        }

                        const coverageRaw = queryLength > 0
                            ? (totalMatchLength / queryLength) * 100
                            : 0;

                        resolve({
                            name,
                            coverage: `${coverageRaw.toFixed(2)}%`,
                            _coverageValue: coverageRaw
                        });
                    });
                });
            }))
        );

        const results = await Promise.all(tasks);

        results.sort((a, b) => b._coverageValue - a._coverageValue);
        const finalResults = results.map(({ _coverageValue, ...rest }) => rest);

        removeFiles([queryPath]);
        res.json(finalResults);
    } catch (err) {
        removeFiles([queryPath]);
        console.error(err);
        res.status(500).json({ error: err.message || 'Lỗi không xác định' });
    }
};

module.exports = {
    runBlastn
};
