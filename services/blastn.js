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

const runBlastn = async (queryFastaPath, res) => {
  const queryPath = path.resolve(queryFastaPath);
  const results = [];
  const pLimit = (await import('p-limit')).default;
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

        try {
          const parsed = parseBlastResults(stdout);
          return {
            name,
            subjectPath,
            queryPath,
            result: parsed,
            success: true,
          };
        } catch (error) {
          return {
            name,
            error: error.message,
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
