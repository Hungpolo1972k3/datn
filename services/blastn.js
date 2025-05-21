const { exec } = require("child_process");
const fs = require("fs/promises");
const fsStream = require("fs");
const path = require("path");
const dataset = require('../utils/datasetFasta.json');
const { createGzip } = require('zlib');
const pLimitImport = import('p-limit');
const zlib = require("zlib");

const removeFiles = (files) => {
    files.forEach(file => {
        if (fsStream.existsSync(file)) {
            fsStream.unlinkSync(file);
        }
    });
};

const dataDir = path.join('/app', 'FastA');

const parseBlastResults = (blastText) => {
    const lines = blastText.trim().split('\n');
    const grouped = {};

    lines.forEach(line => {
        const fields = line.split('\t');
        const queryId = fields[0];

        if (!grouped[queryId]) {
            grouped[queryId] = {
                queryId,
                identity: [],
                alignmentLength: [],
                mismatches: [],
                gapOpens: [],
                evalue: [],
                bitScore: [],
                coverage: []
            };
        }

        grouped[queryId].identity.push(parseFloat(fields[2]));
        grouped[queryId].alignmentLength.push(parseInt(fields[3], 10));
        grouped[queryId].mismatches.push(parseInt(fields[4], 10));
        grouped[queryId].gapOpens.push(parseInt(fields[5], 10));
        grouped[queryId].evalue.push(parseFloat(fields[10]));
        grouped[queryId].bitScore.push(parseFloat(fields[11]));
        grouped[queryId].coverage.push(parseFloat(fields[2]));
    });

    const calculateAverage = (arr) => {
        if (!arr.length) return null;
        const sum = arr.reduce((a, b) => a + b, 0);
        return Number((sum / arr.length).toFixed(2));
    };

    return Object.values(grouped).map(query => ({
        queryId: query.queryId,
        avgIdentity: calculateAverage(query.identity),
        avgBitScore: calculateAverage(query.bitScore),
        avgAlignmentLength: calculateAverage(query.alignmentLength),
        avgMismatch: calculateAverage(query.mismatches),
        avgGapOpens: calculateAverage(query.gapOpens),
        avgEValue: calculateAverage(query.evalue),
        avgCoverage: calculateAverage(query.coverage),
    }));
};

const getGzipFile = async (gzipFilePath) => {
    const chunks = [];
    const gunzip = zlib.createGunzip();

    return new Promise((resolve, reject) => {
        const source = fsStream.createReadStream(gzipFilePath);

        source.pipe(gunzip)
            .on('data', (chunk) => chunks.push(chunk))
            .on('end', () => {
                try {
                    const buffer = Buffer.concat(chunks);
                    const content = buffer.toString('utf8');
                    const json = JSON.parse(content);
                    resolve(json);
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', reject);
    });
};

const runBlastn = async (queryFastaPath, id, res) => {
    const queryPath = path.resolve(queryFastaPath);
    const results = [];
    const pLimit = (await pLimitImport).default;
    const limit = pLimit(4);

    try {
        const tasks = dataset.map(({ name, fastaUrl }) =>
            limit(async () => {
                const subjectPath = path.join(dataDir, fastaUrl);
                const command = `blastn -query "${queryPath}" -subject "${subjectPath}" -outfmt 6`;

                const stdout = await new Promise((resolve) => {
                    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout) => {
                        resolve(error ? null : stdout);
                    });
                });

                if (!stdout) return { name, result: [] };

                try {
                    const parsed = parseBlastResults(stdout);
                    return {
                        name,
                        queryPath: queryPath,
                        result: parsed
                    };
                } catch (error) {
                    return { name, error: error.message };
                }
            })
        );

        const batchResults = await Promise.all(tasks);
        results.push(...batchResults);

        const jsonPath = path.join('/app', 'fastA', `${id}.json`);
        await fs.writeFile(jsonPath, JSON.stringify(results, null, 2));

        const gzipPath = jsonPath + '.gz';

        await new Promise((resolve, reject) => {
            const gzip = createGzip();
            const source = fsStream.createReadStream(jsonPath);
            const destination = fsStream.createWriteStream(gzipPath);

            source.pipe(gzip).pipe(destination)
                .on('finish', resolve)
                .on('error', reject);
        });

        await fs.unlink(jsonPath);
        removeFiles([queryPath]);

        res.json({ file: gzipPath });

    } catch (err) {
        removeFiles([queryPath]);
        res.status(500).json({
            status: 'error',
            error: err.message,
        });
    }
};



module.exports = {
    runBlastn,
    getGzipFile
};
