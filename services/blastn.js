const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const archiver = require('archiver');
const { exec } = require('child_process');
const path = require('path');
const cheerio = require('cheerio');

const dataDir = path.join('/app', 'FastA');
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
  if (!fs.existsSync(fullPath)) {
    throw new Error('Folder not found'+ fullPath + __dirname);
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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Hàm xử lý từng folder
const fetchFolderInfo = async (folder) => {
  const ncbiUrl = `https://www.ncbi.nlm.nih.gov/search/all/?term=${folder}`;
  let bacteria = '';
  let description = '';
  let title = '';
  let sequencingSystem = '';

  try {
    const response = await axios.get(ncbiUrl);
    const $ = cheerio.load(response.data);

    // Lấy tên vi khuẩn từ class "ncbi-doc-authors"
    const authorText = $('span.ncbi-doc-authors').first().text().trim();
    if (authorText) bacteria = authorText;

    // Lấy mô tả từ class "ncbi-doc-description"
    const descText = $('div.ncbi-doc-description').first().text().trim();
    if (descText) {
        description = descText;
    } else {
        // Dự phòng nếu không có class, thử lấy từ meta tag
        description = $('meta[name="description"]').attr('content') || '';
    }

    // Lấy tiêu đề từ tag <a> có chứa dataset title
    const titleText = $('a[data-ga-action="click_feat_title"]').first().text().trim();
    if (titleText) title = titleText;

    // Lấy hệ thống giải trình tự từ class "ncbi-doc-details"
    const sequencingSystemText = $('div.ncbi-doc-details').first().text().trim();
    if (sequencingSystemText) sequencingSystem = sequencingSystemText;
    
  } catch (err) {
    console.warn(`Lỗi khi fetch từ NCBI cho ${folder}:`, err.message);
  }

  return {
    name: folder,
    downloadUrl: `/${folder}`,
    ncbiUrl,
    bacteria,
    description,
    title,
    sequencingSystem
  };
};


const getFolderInfoss = async () => {
    try {
        const folders = await fs.promises.readdir(dataDir, { withFileTypes: true });
        const subFolders = folders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        const CONCURRENT_LIMIT = 5;
        const results = [];

        for (let i = 0; i < subFolders.length; i += CONCURRENT_LIMIT) {
            const batch = subFolders.slice(i, i + CONCURRENT_LIMIT);
            const batchResults = await Promise.all(batch.map(fetchFolderInfo));
            results.push(...batchResults);
            console.log(`Đã xử lý ${results.length}/${subFolders.length}`);
            await sleep(500); 
        }

        return results;
    } catch (error) {
        console.error('Lỗi khi đọc thư mục:', error);
        return [];
    }
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

const getFileInfo = async (relativePath) => {
  try {
    const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, '').replace(/^[/\\]/, '');
    const fullPath = path.join(dataDir, safePath);

    const content = await fs.promises.readFile(fullPath, 'utf8');
    return content;
  } catch (error) {
    throw new Error(`Không thể đọc file: ${error.message}`);
  }
};

module.exports = {
  runBlastnTool,
  getFullFolderPath,
  zipFolderAndSend,
  getFolderInfoService,
  getFileForDownload,
  getFileInfo
};
