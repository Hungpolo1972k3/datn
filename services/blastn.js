const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const archiver = require('archiver');
const { exec } = require('child_process');
const path = require('path');

const dataDir = path.join(__dirname, '../../FastA');
const runBlastnTool = async (inputFilePath) => {
  const form = new FormData();
  form.append('fasta', fs.createReadStream(inputFilePath)); 

  try {
    const response = await axios.post(
      `${process.env.BIOTOOL_URL}/api/blastn/blastn`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );

    return response.data; 
  } catch (error) {
    throw new Error(`Error executing blastn: ${error.message}`);
  } finally {
    if (fs.existsSync(inputFilePath)) {
      fs.unlinkSync(inputFilePath);
    }
  }
};


const getFullFolderPath = (relativePath) => {
  const fullPath = path.join(dataDir, relativePath);
  console.log(fullPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error('Folder not found');
  }

  if (!fs.statSync(fullPath).isDirectory()) {
    throw new Error('Path is not a folder');
  }

  return fullPath;
};

const zipFolderAndSend = (folderPath, res) => {
  res.setHeader('Content-Disposition', `attachment; filename="${path.basename(folderPath)}.zip"`);
  res.setHeader('Content-Type', 'application/zip');

  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.directory(folderPath, false);
  archive.pipe(res); 
  archive.finalize(); 
};

const getFilesRecursively = (dirPath, baseUrlPath = '') => {
  const result = [];

  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    const relativeItemPath = path.join(baseUrlPath, item.name).replace(/\\/g, '/');

    if (item.isDirectory()) {
      const childFiles = getFilesRecursively(itemPath, relativeItemPath);
      result.push(...childFiles);
    } else {
      result.push({
        name: item.name,
        path: relativeItemPath
      });
    }
  }

  return result;
};


const getFolderInfoService = (relativePath = "") => {
  const targetPath = path.join(dataDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    throw new Error("Folder not found");
  }
  return getFilesRecursively(targetPath, relativePath);
};

const getFileForDownload = async (relativePath) => {
  try {
    const filePath = path.join(dataDir, relativePath);
    
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    const fileContent = fs.readFileSync(filePath);
    
    const fileName = path.basename(filePath);
    const mimeType = 'application/octet-stream'; 

    return {
      name: fileName,
      mimeType: mimeType,
      content: fileContent,
    };
  } catch (error) {
    console.error('Error in getFileForDownload:', error);
    throw new Error('Error reading file');
  }
};
module.exports = {
  runBlastnTool,
  getFullFolderPath,
  zipFolderAndSend,
  getFolderInfoService,
  getFileForDownload
};
