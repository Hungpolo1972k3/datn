const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const archiver = require('archiver');
const { exec } = require('child_process');
const path = require('path');
const cheerio = require('cheerio');
const Blastn = require('../models/blastn');

const dataDir = path.join('/app', 'FastA');
// const dataDir = path.join(__dirname,"../../FastA")

const getFullFolderPath = (relativePath) => {
  const fullPath = path.join(dataDir, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error('Folder not found'+ fullPath + dataDir);
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
      const stats = fs.statSync(itemPath);
      const folderName = path.basename(path.dirname(itemPath));
      const downloadFolderUrl = path.posix.dirname(relativeItemPath);

      result.push({
        fileName: item.name,
        folderName: folderName,
        path: relativeItemPath,
        downloadFolderUrl,
        size: (stats.size / 1024).toFixed(2) + ' KB'
      });
    }
  }

  return result;
};

const getFolderInfoService = async(relativePath = "") => {
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

const csvToJson = (csvText, delimiter = "\t") => {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(delimiter);

  return lines.slice(1).map((line) => {
    const values = line.split(delimiter);
    const entry = {};
    headers.forEach((header, index) => {
      entry[header.trim()] = values[index]?.trim() || "";
    });
    return entry;
  });
}

const parseTxtFileToJson = (fileContent) => {
  const lines = fileContent.trim().split('\n');
  const headers = lines[0].split('\t');

  const jsonArray = lines.slice(1).map(line => {
    const values = line.split('\t');
    const row = {};
    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() || '';
    });
    return row;
  });

  return jsonArray;
}

const getFileInfo = async (relativePath) => {
  try {
    const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, '').replace(/^[/\\]/, '');
    const fullPath = path.join(dataDir, safePath);

    const content = await fs.promises.readFile(fullPath, 'utf8');
    const ext = path.extname(fullPath).toLowerCase();

    if (ext === '.tsv' || ext === '.csv') {
      const delimiter = ext === '.csv' ? ',' : '\t';
      const parsed = csvToJson(content, delimiter);
      return { content, parsed };
    } else if (ext === '.txt') {
      const parsed = parseTxtFileToJson(content);
      return { content, parsed };
    } else {
      return { content, parsed: null };
    }
  } catch (error) {
    throw new Error(`Không thể đọc file: ${error.message}`);
  }
};

const getZipFile = async(id) =>{
  try {
    const encodedUrl = encodeURIComponent(`/app/fastA/${id}.json.gz`);
    const response = await axios.get(`${process.env.BIOTOOL_URL}/api/blastn/getzipfile?url=${encodedUrl}`);
    return response.data;
  } catch (error) {
    throw new Error(`Lỗi: ${error.message}`);
  }
}

module.exports = {
  getFullFolderPath,
  zipFolderAndSend,
  getFolderInfoService,
  getFileForDownload,
  getFileInfo,
  getZipFile,
};
