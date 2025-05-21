const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const archiver = require('archiver');
const { exec } = require('child_process');
const path = require('path');
const cheerio = require('cheerio');
const crypto = require("crypto");

// const dataDir = path.join('/app', 'FastA');
const dataDir = path.join(__dirname,"../../FastA")

const generateRandomId = (length = 10) => {
  return crypto.randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
};

const runBlastnTool = async (inputFilePath) => {
  const form = new FormData();
  form.append('fasta', fs.createReadStream(inputFilePath)); 
  const id = generateRandomId();
  try {
    const response = await axios.post(
      `${process.env.BIOTOOL_URL}/api/blastn/blastn/${id}`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );
    return {
      file: response.file,
      id: id
    }; 
  } catch (error) {
    throw new Error(`Error executing blastn: ${error.message}`);
  } finally {
    if (fs.existsSync(inputFilePath)) {
      fs.unlinkSync(inputFilePath);
    }
  }
};

const changeVirulenceInfo = async (result) => {
    try {
        const records = result
            .split("\n")
            .slice(1) 
            .filter(line => line.trim().length > 0) 
            .map(line => {
                const fields = line.split(",");
                return fields[13];
            });

        return records; 
    } catch (error) {
        console.error("Error processing virulence info:", error);
    }
};

const parseProductInfo = (productString) => {
    const result = {
        gene: null,
        description: null,
        group: null,
        vfdb_id: null,
        function_group: null,
        function_group_id: null,
        organism: null
    };

    const geneMatch = productString.match(/^\(([^)]+)\)\s+([^\[]+)/);
    if (geneMatch) {
        result.gene = geneMatch[1].trim();
        result.description = geneMatch[2].trim();
    }

    const infoMatch = productString.match(/\[(.*?) \((VF\d+)\) - (.*?) \((VFC\d+)\)\]/);
    if (infoMatch) {
        result.group = infoMatch[1].trim();               
        result.vfdb_id = infoMatch[2];
        result.function_group = infoMatch[3].trim();    
        result.function_group_id = infoMatch[4];
    }

    const organismMatch = productString.match(/\[([^\[\]]+?)\]$/);
    if (organismMatch) {
        result.organism = organismMatch[1].trim();
    }

    return result;
};

const changeAmrInfo = (result) => {
    try {
        if (!result || typeof result !== "string") {
            throw new Error("Dữ liệu AMR không hợp lệ hoặc không phải chuỗi.");
        }

        const lines = result.trim().split("\n").slice(1); 

        const records = lines.map(line => {
            const fields = line.split("\t");
            if (fields.length < 22) return null; 

            return fields[5]
        }).filter(record => record !== null); 

        return records; 
    } catch (error) {
        console.error("Lỗi xử lý AMR:", error.message);
        throw error;
    }
};

const getSubFolders = async (dirPath) => {
  const result = [];

  const folders = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(item => item.isDirectory());

  for (const item of folders) {
    const name = item.name;
    const subPath = path.join(dirPath, name);
    const fastaPath = path.join(subPath, 'Spades_output', 'contigs.fasta');

    let combinedData = [];

    if (fs.existsSync(fastaPath)) {
      const chromoFile = path.join(subPath, 'Platon_output', 'chromosome', 'abricate_virulence.csv');
      const plasmidFile = path.join(subPath, 'Platon_output', 'plasmid', 'abricate_virulence.csv');

      if (fs.existsSync(chromoFile)) {
        const chromoContent = fs.readFileSync(chromoFile, 'utf-8');
        const chromoData = await changeVirulenceInfo(chromoContent);
        combinedData = combinedData.concat(chromoData.map(parseProductInfo));
      }

      if (fs.existsSync(plasmidFile)) {
        const plasmidContent = fs.readFileSync(plasmidFile, 'utf-8');
        const plasmidData = await changeVirulenceInfo(plasmidContent);
        combinedData = combinedData.concat(plasmidData.map(parseProductInfo));
      }
    }
    result.push(combinedData);
  }
  return result;
};

const getSubFolderAmrs = async (dirPath) => {
  const result = [];

  const folders = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(item => item.isDirectory());

  for (const item of folders) {
    const name = item.name;
    const subPath = path.join(dirPath, name);
    const fastaPath = path.join(subPath, 'Spades_output', 'contigs.fasta');

    let combinedData = [];

    if (fs.existsSync(fastaPath)) {
      const chromoFile = path.join(subPath, 'Platon_output', 'chromosome', 'amrfinder.txt');
      const plasmidFile = path.join(subPath, 'Platon_output', 'plasmid', 'amrfinder.txt');

      if (fs.existsSync(chromoFile)) {
        const chromoContent = fs.readFileSync(chromoFile, 'utf-8');
        const chromoData = await changeAmrInfo(chromoContent);
        combinedData = combinedData.concat(chromoData);
      }

      if (fs.existsSync(plasmidFile)) {
        const plasmidContent = fs.readFileSync(plasmidFile, 'utf-8');
        const plasmidData = await changeAmrInfo(plasmidContent);
        combinedData = combinedData.concat(plasmidData);
      }
    }
    result.push({
      name,
      gene: combinedData
    });
  }
  return result;
};


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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
  runBlastnTool,
  getFullFolderPath,
  zipFolderAndSend,
  getFolderInfoService,
  getFileForDownload,
  getFileInfo,
  getZipFile
};
