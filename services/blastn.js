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
const extractSubsequence = (sequence, start, end) => {
    if (!sequence || start <= 0 || end > sequence.length || start > end) return '';
    return sequence.substring(start - 1, end);
};
const readFastaSequence = async (fastaPath) => {
    const content = await fs.promises.readFile(fastaPath, 'utf8');
    return content
        .split('\n')
        .filter(line => !line.startsWith('>'))
        .join('')
        .replace(/\s/g, '');
};
const parseBlastResults = (blastText, querySeq, subjectSeq) => {
    const lines = blastText.trim().split('\n');
    return lines.map(line => {
        const fields = line.split('\t');
        const qStart = parseInt(fields[6], 10);
        const qEnd = parseInt(fields[7], 10);
        const sStart = parseInt(fields[8], 10);
        const sEnd = parseInt(fields[9], 10);

        return {
            queryId: fields[0],
            subjectId: fields[1],
            identity: parseFloat(fields[2]),
            alignmentLength: parseInt(fields[3], 10),
            mismatches: parseInt(fields[4], 10),
            gapOpens: parseInt(fields[5], 10),
            qStart,
            qEnd,
            sStart,
            sEnd,
            evalue: parseFloat(fields[10]),
            bitScore: parseFloat(fields[11]),
            coverage: parseFloat(fields[2])
        };
    });
};

const runBlastn = async (queryFastaPath, res) => {
    const queryPath = path.resolve(queryFastaPath);
    const { default: pLimit } = await import('p-limit');
    const limit = pLimit(1);
    const querySeq = await readFastaSequence(queryPath);

    const batchSize = 5;
    const results = [];
    const resultFilePath = path.join("/app", 'result.json');

    try {
        for (let i = 0; i < dataset.length; i += batchSize) {
            const batch = dataset.slice(i, i + batchSize);

            const tasks = batch.map(({ name, fastaUrl }) =>
                limit(() => new Promise((resolve) => {
                    const subjectPath = path.join(dataDir, fastaUrl);
                    const command = `blastn -query "${queryPath}" -subject "${subjectPath}" -outfmt 6`;

                    exec(command, { maxBuffer: 1024 * 1024 * 10 }, async (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error for ${name}:`, stderr || error.message);
                            return resolve({ name, error: stderr || error.message, success: false });
                        }

                        let parsed = [];
                        try {
                            const subjectSeq = await readFastaSequence(subjectPath);
                            parsed = parseBlastResults(stdout, querySeq, subjectSeq);
                        } catch (parseError) {
                            console.error(`Parse error for ${name}:`, parseError);
                            return resolve({
                                name,
                                error: 'Failed to parse BLAST output',
                                success: false,
                            });
                        }

                        resolve({
                            name,
                            subjectPath,
                            queryPath,
                            result: parsed,
                            success: true
                        });
                    });
                }))
            );

            const batchResults = await Promise.all(tasks);
            results.push(...batchResults);
            await fs.promises.writeFile(resultFilePath, JSON.stringify(results, null, 2), 'utf8');
        }

        removeFiles([queryPath]);

        res.json(results);
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
