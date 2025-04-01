const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const removeFiles = (files) => {
    files.forEach((file) => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};

const runAbricate = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}.csv`;
    const command = `abricate --db vfdb --csv ${fastaFilePath} > ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            throw new Error("Lỗi" + error.message)
        }

        fs.readFile(outputFilePath, "utf8", (err, data) => {
            removeFiles([fastaFilePath, outputFilePath]);
            if (err) {
                throw new Error("Lỗi" + error.message)
            }
            res.json({ result: data });
        });
    });
};

const runAbricateString = (fastaString, res) => {
    const tempFilePath = path.join(os.tmpdir(), `temp_${Date.now()}.fasta`);
    
    fs.writeFile(tempFilePath, fastaString, (err) => {
        if (err) {
            throw new Error("Lỗi khi ghi file: " + err.message);
        }
        runAbricate(tempFilePath, res);
    });
};

module.exports = {
    runAbricate,
    runAbricateString
};


