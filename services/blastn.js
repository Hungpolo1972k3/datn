const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const removeFiles = (files) => {
    files.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};

const dataDir = path.join(__dirname, '../data');

const getDataFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(dataDir, (err, files) => {
      if (err) {
        return reject(`Error reading files from data directory: ${err}`);
      }
      const dataFiles = files.filter(file => fs.lstatSync(path.join(dataDir, file)).isFile());
      resolve(dataFiles);
    });
  });
};

const runBlastn = async (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);

    try {
        const dataFiles = await getDataFiles();
        const results = {};

        for (const file of dataFiles) {
            const subjectPath = path.join(dataDir, file);
            const outputFileName = `${path.basename(fastaFilePath)}.${file}.blastout`;
            const outputFilePath = path.join(os.tmpdir(), outputFileName); // tmp file

            const command = `blastn -query "${fastaFilePath}" -subject "${subjectPath}" -out "${outputFilePath}" -outfmt 6`;

            try {
                const result = await new Promise((resolve, reject) => {
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            return reject(`Error: ${stderr || error.message}`);
                        }

                        fs.readFile(outputFilePath, 'utf8', (err, data) => {
                            if (err) return reject('Lỗi khi đọc file kết quả');
                            resolve(data);
                        });
                    });
                });

                results[file] = {
                    result,
                    downloadUrl: `download/${outputFileName}`
                };
            } catch (err) {
                results[file] = { error: err };
            } finally {
            }
        }

        removeFiles([fastaFilePath]);
        res.json(results);
    } catch (err) {
        removeFiles([fastaFilePath]);
        console.error(err);
        res.status(500).json({ error: err.message || 'Lỗi không xác định' });
    }
};


module.exports = {
    runBlastn
};
