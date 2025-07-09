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

    const identity = [];
    const alignmentLength = [];
    const mismatches = [];
    const gapOpens = [];
    const evalue = [];
    const bitScore = [];
    const coverage = [];

    lines.forEach(line => {
        const fields = line.split('\t');
        identity.push(parseFloat(fields[2]));
        alignmentLength.push(parseInt(fields[3], 10));
        mismatches.push(parseInt(fields[4], 10));
        gapOpens.push(parseInt(fields[5], 10));
        evalue.push(parseFloat(fields[10]));
        bitScore.push(parseFloat(fields[11]));
        coverage.push(parseFloat(fields[2])); 
    });

    const calculateAverage = (arr) => {
        if (!arr.length) return null;
        const sum = arr.reduce((a, b) => a + b, 0);
        return Number((sum / arr.length).toFixed(2));
    };

    return {
        avgIdentity: calculateAverage(identity),
        avgBitScore: calculateAverage(bitScore),
        avgAlignmentLength: calculateAverage(alignmentLength),
        avgMismatch: calculateAverage(mismatches),
        avgGapOpens: calculateAverage(gapOpens),
        avgEValue: calculateAverage(evalue),
        avgCoverage: calculateAverage(coverage),
    };
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
    const limit = pLimit(3);

    const jsonPath = path.join('/app', 'fastA', `${id}.json`);
    const gzipPath = jsonPath + '.gz';

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
                        result: parsed
                    };
                } catch (error) {
                    return { name, error: error.message };
                }
            })
        );

        const batchResults = await Promise.all(tasks);
        results.push(...batchResults);

        await fs.writeFile(jsonPath, JSON.stringify(results, null, 2));

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
        try {
            await fs.unlink(jsonPath);
        } catch (_) {}

        removeFiles([queryPath]);

        res.status(500).json({
            status: 'error',
            error: err.message,
        });
    }
};

const runBlastnWithTwoFiles = (queryPath, subjectPath) => {
  return new Promise((resolve, reject) => {
    const outFile = path.join('uploads', `blastn_result_${Date.now()}.txt`);
    const cmd = `blastn -query ${queryPath} -subject ${subjectPath} -out ${outFile} -outfmt 7`;

    exec(cmd, async (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(stderr || error.message));
      }

      try {
        const output = await fs.readFile(outFile, 'utf-8');
        await fs.unlink(outFile); 
        resolve(output);
      } catch (readErr) {
        reject(readErr);
      }
    });
  });
};

module.exports = {
    runBlastn,
    getGzipFile,
    runBlastnWithTwoFiles
};
