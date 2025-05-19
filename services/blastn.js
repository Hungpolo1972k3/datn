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
    const groupedResults = {};

    lines.forEach(line => {
        const fields = line.split('\t');
        const queryId = fields[0];

        if (!groupedResults[queryId]) {
            groupedResults[queryId] = {
                queryId,
                subjectId: [],
                identity: [],
                alignmentLength: [],
                mismatches: [],
                gapOpens: [],
                qStart: [],
                qEnd: [],
                sStart: [],
                sEnd: [],
                evalue: [],
                bitScore: [],
                coverage: []
            };
        }

        groupedResults[queryId].subjectId.push(fields[1]);
        groupedResults[queryId].identity.push(parseFloat(fields[2]));
        groupedResults[queryId].alignmentLength.push(parseInt(fields[3], 10));
        groupedResults[queryId].mismatches.push(parseInt(fields[4], 10));
        groupedResults[queryId].gapOpens.push(parseInt(fields[5], 10));
        groupedResults[queryId].qStart.push(parseInt(fields[6], 10));
        groupedResults[queryId].qEnd.push(parseInt(fields[7], 10));
        groupedResults[queryId].sStart.push(parseInt(fields[8], 10));
        groupedResults[queryId].sEnd.push(parseInt(fields[9], 10));
        groupedResults[queryId].evalue.push(parseFloat(fields[10]));
        groupedResults[queryId].bitScore.push(parseFloat(fields[11]));
        groupedResults[queryId].coverage.push(parseFloat(fields[2]));
    });

    return Object.values(groupedResults);
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
                    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
                        if (error) {
                            resolve(null);
                        } else {
                            resolve(stdout);
                        }
                    });
                });

                try {
                    const parsed = parseBlastResults(stdout);
                    return {
                        name,
                        subjectPath,
                        queryPath,
                        result: parsed,
                    };
                } catch (error) {
                    return { error: error.message };
                }
            })
        );

        const batchResults = await Promise.all(tasks);
        results.push(...batchResults);

        removeFiles([queryPath]);

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
