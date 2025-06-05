const path = require('path');
const datasetService = require('../services/dataset');

const downloadFolder = async (req, res) => {
    const relativePath = req.query.path; 
  
    if (!relativePath) {
      return res.status(400).json({ error: 'Missing folder path query parameter' });
    }
  
    try {
      const fullPath = await datasetService.getFullFolderPath(relativePath);
      return datasetService.zipFolderAndSend(fullPath, res);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  };

const getFolderInfo = async(req, res) => {
  const relativePath = req.query.path || "";

  try {
    const folderData = await datasetService.getFolderInfoService(relativePath);
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
    const file = await datasetService.getFileForDownload(relativePath);
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
    const file = await datasetService.getFileInfo(filePath);
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
    const result = await datasetService.getZipFile(id);
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
    downloadFolder,
    getFolderInfo,
    downloadFile,
    getFileInfo,
    getZipFile,
};