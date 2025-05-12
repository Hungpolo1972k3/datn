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
const runBlastn = async (queryFastaPath, res) => {
    const queryPath = path.resolve(queryFastaPath);
    const { default: pLimit } = await import('p-limit');
    const limit = pLimit(10);

    try {
        const tasks = dataset.map(({ name, fastaUrl }) =>
            limit(() => new Promise((resolve) => {
                const subjectPath = path.join("/mnt/d/NguyenThoHung/FastA", fastaUrl);
                const outputFileName = `${path.basename(queryPath)}.${name}.blastout`;
                const outputFilePath = path.join(os.tmpdir(), outputFileName);

                const command = `blastn -query "${queryPath}" -subject "${subjectPath}" -out "${outputFilePath}" -outfmt 6`;

                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        return resolve({
                            name,
                            result: `Error: ${stderr || error.message}`,
                        });
                    }
                    fs.readFile(outputFilePath, 'utf8', (err, data) => {
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
        res.json(results.filter(item => item.success));
    } catch (err) {
        removeFiles([queryPath]);
        console.error(err);
        res.status(500).json({
            status: 'error',
            error: err.message || 'Lỗi không xác định'
        });
    }
};

module.exports = {
    runBlastn
};
