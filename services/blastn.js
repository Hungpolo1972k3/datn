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

const dataDir = path.join('/app', 'FastA');
const parseBlastResults = (blastText) => {
    const lines = blastText.trim().split('\n');
    return lines.map(line => {
        const fields = line.split('\t');
        return {
            queryId: fields[0],
            subjectId: fields[1],
            identity: parseFloat(fields[2]),
            alignmentLength: parseInt(fields[3], 10),
            mismatches: parseInt(fields[4], 10),
            gapOpens: parseInt(fields[5], 10),
            qStart: parseInt(fields[6], 10),
            qEnd: parseInt(fields[7], 10),
            sStart: parseInt(fields[8], 10),
            sEnd: parseInt(fields[9], 10),
            evalue: parseFloat(fields[10]),
            bitScore: parseFloat(fields[11]),
            coverage: parseFloat(fields[2])
        };
    });
};

const runBlastn = async (queryFastaPath, res) => {
    const queryPath = path.resolve(queryFastaPath);
    const { default: pLimit } = await import('p-limit');
    const limit = pLimit(4);

    try {
        const tasks = dataset.map(({ name, fastaUrl }) =>
            limit(() => new Promise(async (resolve) => {
                const subjectPath = path.join(dataDir, fastaUrl);
                const outputFileName = `${path.basename(queryPath)}.${name}.blastout`;
                const outputFilePath = path.join(os.tmpdir(), outputFileName);

                const command = `blastn -query "${queryPath}" -subject "${subjectPath}" -out "${outputFilePath}" -outfmt 6`;

                exec(command, { maxBuffer: 1024 * 1024 * 10 }, async (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${stderr || error.message}`);
                        return resolve({
                            name,
                            error: stderr || error.message,
                            success: false,
                        });
                    }

                    console.log(`BLAST Output: ${stdout}`);
                    const parsed = parseBlastResults(stdout);
                    const averageCoverage = parsed.length
                        ? +(parsed.reduce((sum, hit) => sum + hit.coverage, 0) / parsed.length).toFixed(2)
                        : 0;

                    let subjectFileContent = '';
                    try {
                        subjectFileContent = await fs.readFile(subjectPath, 'utf8');
                    } catch (err) {
                        console.error(`Error reading subject file: ${err.message}`);
                    }
                    let queryFileContent = '';
                    try {
                        queryFileContent = await fs.readFile(queryPath, 'utf8');
                    } catch (err) {
                        console.error(`Error reading query file: ${err.message}`);
                    }

                    resolve({
                        name,
                        hit: parsed,
                        command: command,
                        stdout: stdout,
                        averageCoverage,
                        success: true,
                        subjectPath,
                        subjectFileContent,
                        queryFileContent,
                    });
                });
            }))
        );

        const results = await Promise.all(tasks);
        removeFiles([queryPath]);

        res.json(results.sort((a, b) => b.averageCoverage - a.averageCoverage));
    } catch (err) {
        removeFiles([queryPath]);
        console.error(err);
        res.status(500).json({
            status: 'error',
            error: err.message || 'Lỗi không xác định',
        });
    }
};

module.exports = {
    runBlastn
};
