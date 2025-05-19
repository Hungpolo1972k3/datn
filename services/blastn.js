const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const dataset = require('../utils/datasetFasta.json');
const readline = require("readline");
const pLimit = require('p-limit');

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
const runBlastn = async (queryFastaPath, res) => {
  const queryPath = path.resolve(queryFastaPath);
  const results = [];
  const limit = pLimit(3); 

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

        if (!stdout) {
          return {
            name,
            error: 'BLAST execution failed',
            success: false,
          };
        }

        try {
          const parsed = parseBlastResults(stdout);
          return {
            name,
            subjectPath,
            queryPath,
            result: parsed,
            success: true,
          };
        } catch {
          return {
            name,
            error: 'Failed to parse BLAST results',
            success: false,
          };
        }
      })
    );

    const batchResults = await Promise.all(tasks);
    results.push(...batchResults);

    removeFiles([queryPath]);
    res.send(results);
  } catch (err) {
    removeFiles([queryPath]);
    res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

module.exports = {
    runBlastn
};
