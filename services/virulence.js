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


const runAbricate = (filePath, res) => {
    const fastaFilePath = path.resolve(filePath);

    // Tránh việc ghi ra file, nhận kết quả trực tiếp từ lệnh
    const command = `abricate --db vfdb --csv ${fastaFilePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: `Error executing Abricate: ${error.message}` });
        }

        // Kiểm tra stderr để phát hiện lỗi từ lệnh abricate
        if (stderr) {
            return res.status(500).json({ error: `Abricate error: ${stderr}` });
        }

        // Trả lại kết quả cho client mà không cần phải đọc từ file
        res.json({ result: stdout });

        // Nếu cần phải xóa file sau khi hoàn thành công việc
        removeFiles([fastaFilePath]);
    });
};

module.exports = {
    runAbricate
};
