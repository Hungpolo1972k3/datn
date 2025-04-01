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

const runAmrFinder = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);
    const outputFilePath = `${fastaFilePath}_amrfinder.tsv`;
    const command = `amrfinder -n ${fastaFilePath} -o ${outputFilePath}`;

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

const runAmrFinderString = (nucleicSequence, res) => {
    // Kiểm tra chuỗi đầu vào có hợp lệ không
    if (!nucleicSequence || typeof nucleicSequence !== "string" || !nucleicSequence.includes(">")) {
        return res.status(400).json({ error: "Chuỗi nucleotide không hợp lệ" });
    }

    // Ghi nội dung vào file FASTA tạm thời
    const fastaFilePath = path.resolve(`/tmp/amr_sequence_${Date.now()}.fasta`);
    fs.writeFileSync(fastaFilePath, nucleicSequence.trim() + "\n", { encoding: "utf8" });

    const outputFilePath = `${fastaFilePath}_amrfinder.tsv`;
    const command = `amrfinder -n ${fastaFilePath} -o ${outputFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Lỗi khi chạy amrfinder: ${stderr}`);
            removeFiles([fastaFilePath, outputFilePath]);
            return res.status(500).json({ error: "Lỗi khi chạy amrfinder", details: stderr });
        }

        fs.readFile(outputFilePath, "utf8", (err, data) => {
            removeFiles([fastaFilePath, outputFilePath]);
            if (err) {
                console.error(`Lỗi khi đọc tệp kết quả: ${err.message}`);
                return res.status(500).json({ error: "Lỗi khi đọc tệp kết quả" });
            }
            res.json({ result: data });
        });
    });
};

module.exports = {
    runAmrFinder,
    runAmrFinderString
};
