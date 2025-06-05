const path = require('path');
const fs = require('fs');
const blastnService = require('../services/blastn');
const virulenceService = require('../services/virulence');
const amrService = require('../services/amr');

const runBlastmTool = async (req, res) => {
    try {
      const { file } = req;
      const id  = req.params.id;
      if (!file) {
        return res.status(400).json({ message: 'Không có file được tải lên' });
      }
      const result = await blastnService.runBlastnTool(file.path, file.originalname, id);
      return res.status(200).json({ 
        message: 'Thành công', 
        data: result 
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Lỗi', 
        error: error.message });
    }
};

const runBlastn = async (req, res) => {
  try {
    const {subUrl, queryUrl} = req.body;
    let result = await blastnService.runBlastn(subUrl, queryUrl);
    return res.status(200).json({
      data: result
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

const getBlastnByCode = async (req, res) => {
  try {
    const {code} = req.query;
    const result = await blastnService.getBlastnByCode(code);
    return res.status(200).json({
      data: result
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
const downloadFile = async (req, res) => {
  const filePath = req.query.path;

  if (!filePath) {
    return res.status(400).json({ error: "Path is required" });
  }

  try {
    const file = await blastnService.getFileForDownload(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.setHeader('Content-Type', file.mimeType || 'application/octet-stream');
    res.send(file.content);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getFileInfo = (req, res) => {
  const filePath = req.query.path;

  if (!filePath) {
    return res.status(400).json({ error: 'Missing file path' });
  }

  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return res.status(404).json({ error: 'File not found or invalid path' });
  }

  const fileName = path.basename(filePath);

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).json({ error: 'Internal server error while sending file' });
    }
  });
};

module.exports = {
    runBlastmTool,
    runBlastn,
    getBlastnByCode,
    downloadFile,
    getFileInfo
};