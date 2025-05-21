const path = require('path');
const blastnService = require('../services/blastn');

const runBlastmTool = async (req, res) => {
    try {
      const { file } = req;
      if (!file) {
        return res.status(400).json({ message: 'Không có file được tải lên' });
      }
      const result = await blastnService.runBlastnTool(file.path);
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

const downloadFolder = async (req, res) => {
    const relativePath = req.query.path; 
  
    if (!relativePath) {
      return res.status(400).json({ error: 'Missing folder path query parameter' });
    }
  
    try {
      const fullPath = await blastnService.getFullFolderPath(relativePath);
      return blastnService.zipFolderAndSend(fullPath, res);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  };

const getFolderInfo = async(req, res) => {
  const relativePath = req.query.path || "";

  try {
    const folderData = await blastnService.getFolderInfoService(relativePath);
    res.json(folderData);
  } catch (error) {
    if (error.message === "Folder not found") {
      res.status(404).json({ error: error.message });
    } else {
      console.error("Error getting folder info:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const downloadFile = async (req, res) => {
  const relativePath = req.query.path;

  if (!relativePath) {
    return res.status(400).json({ error: "Path is required" });
  }

  try {
    const file = await blastnService.getFileForDownload(relativePath);
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.setHeader('Content-Type', file.mimeType || 'application/octet-stream');
    res.send(file.content);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFileInfo = async(req, res) => {
  const filePath = req.query.path;
  try {
    const file = await blastnService.getFileInfo(filePath);
    return res.status(200).json({ 
      message: 'Thành công', 
      data: file 
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
} 

const getZipFile = async(req, res) => {
  try {
    const {id} = req.query;
    const result = await blastnService.getZipFile(id);
    return res.status(200).json({
      data: result
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
module.exports = {
    runBlastmTool,
    downloadFolder,
    getFolderInfo,
    downloadFile,
    getFileInfo,
    getZipFile
};