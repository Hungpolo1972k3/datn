const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const removeFiles = (files) => {
    files.forEach((file) => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};
const changeVirulenceInfo = (result) => {
    const lines = result.trim().split('\n');
    const headers = lines[0].split(',');
    
    const data = lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        return obj;
    });
    
    return JSON.stringify(data, null, 2);
}
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
            return changeVirulenceInfo(data);
        });
    });
};


module.exports = {
    runAbricate
};


