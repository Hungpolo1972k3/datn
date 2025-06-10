const axios = require('axios');
const FormData = require('form-data');
const fs = require("fs");
const zlib = require("zlib");
const path = require('path');
const cheerio = require('cheerio');
const Blastn = require('../models/blastn');
const virulenceService = require('../services/virulence');
const amrService = require('../services/amr');

const dataDir = path.join('/app', 'FastA');
// const dataDir = path.join(__dirname,"../../FastA")

const runBlastnTool = async (inputFilePath, filename, id) => {
  const form = new FormData();
  form.append('fasta', fs.createReadStream(inputFilePath)); 
  try {
    // const response = await axios.post(
    //   `${process.env.BIOTOOL_URL}/api/blastn/blastn/${id}`,
    //   form,
    //   {
    //     headers: {
    //       ...form.getHeaders(),
    //     },
    //   }
    // );
    const virulence = await virulenceService.runVirulenceTool({ path: inputFilePath });
    const amr = await amrService.runAmrTool({ path: inputFilePath });
    const resultObject = {
      virulence: virulence.data,
      amr: amr.data
    };
    const resultJson = JSON.stringify(resultObject, null, 2);
    const fastaDir = path.join('/app', 'Blastn');
    const outputGzPath = path.join(fastaDir, `${id}_result.json.gz`);

    await new Promise((resolve, reject) => {
      const gzip = zlib.createGzip();
      const writeStream = fs.createWriteStream(outputGzPath);
      const bufferStream = require("stream").Readable.from([resultJson]);

      bufferStream.pipe(gzip).pipe(writeStream).on("finish", resolve).on("error", reject);
    });
    return resultObject;
    // let newblastn = new Blastn({
    //   url: inputFilePath,
    //   code: id,
    //   filename: filename
    // })
    // await newblastn.save()
    // return {
    //   file: response.file,
    //   url: inputFilePath,
    //   id: id
    // }; 
  } catch (error) {
    if (fs.existsSync(inputFilePath)) {
      fs.unlinkSync(inputFilePath);
    }
    throw new Error(`Error executing blastn: ${error.message}`);
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

const reverseComplement = (seq) => {
  const complement = {
    A: 'T',
    T: 'A',
    G: 'C',
    C: 'G',
    a: 't',
    t: 'a',
    g: 'c',
    c: 'g',
    N: 'N',
    n: 'n'
  };

  return seq
    .split('')
    .reverse()
    .map(nuc => complement[nuc] || nuc)
    .join('');
};

const parseBlastnOutfmt7 = (output, querySequences, subjectSequences) => {
  const results = [];
  const lines = output.trim().split('\n');

  let currentQuery = null;

  for (const line of lines) {
    if (line.startsWith('# Query:')) {
      currentQuery = line.split('# Query:')[1].trim();
    } else if (!line.startsWith('#') && line.trim()) {
      const fields = line.split('\t');
      if (fields.length === 12) {
        const subject = fields[1];
        const qStart = parseInt(fields[6], 10);
        const qEnd = parseInt(fields[7], 10);
        const sStart = parseInt(fields[8], 10);
        const sEnd = parseInt(fields[9], 10);

        const qSeq = querySequences[currentQuery];
        const sSeq = subjectSequences[subject];

        const queryFragment =
          qSeq && qStart <= qEnd
            ? qSeq.slice(qStart - 1, qEnd)
            : qSeq && qEnd < qStart
            ? reverseComplement(qSeq.slice(qEnd - 1, qStart))
            : '';

        const subjectFragment =
          sSeq && sStart <= sEnd
            ? sSeq.slice(sStart - 1, sEnd)
            : sSeq && sEnd < sStart
            ? reverseComplement(sSeq.slice(sEnd - 1, sStart))
            : '';

        results.push({
          query: currentQuery,
          subject,
          identity: parseFloat(fields[2]),
          alignmentLength: parseInt(fields[3], 10),
          mismatches: parseInt(fields[4], 10),
          gapOpens: parseInt(fields[5], 10),
          qStart,
          qEnd,
          sStart,
          sEnd,
          evalue: fields[10],
          bitScore: fields[11],
          queryFragment,
          subjectFragment
        });
      }
    }
  }

  return results;
};

const parseFasta = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const sequences = {};
  let currentId = null;
  let currentSeq = [];

  content.split('\n').forEach(line => {
    if (line.startsWith('>')) {
      if (currentId) {
        sequences[currentId] = currentSeq.join('');
      }
      currentId = line.slice(1).split(/\s+/)[0];
      currentSeq = [];
    } else {
      currentSeq.push(line.trim());
    }
  });

  if (currentId) {
    sequences[currentId] = currentSeq.join('');
  }

  return sequences;
};

const runBlastn = async(path1, path2) => {{
  const filePath1 = path.resolve(path1);
  const filePath2 = path.resolve(path2);

  if (!fs.existsSync(filePath1)) throw new Error(`Không tìm thấy file: ${filePath1}`);
  if (!fs.existsSync(filePath2)) throw new Error(`Không tìm thấy file: ${filePath2}`);

  const form = new FormData();
  form.append('file1', fs.createReadStream(filePath1), path.basename(filePath1));
  form.append('file2', fs.createReadStream(filePath2), path.basename(filePath2)); 
  try {
    const response = await axios.post(
      `${process.env.BIOTOOL_URL}/api/blastn/blastntwofile`,
      form,
      {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    )
    const rawOutput = response.data.data
    const querySequences = parseFasta(filePath1);
    const subjectSequences = parseFasta(filePath2);

    const parsedResult = parseBlastnOutfmt7(rawOutput, querySequences, subjectSequences);
    return parsedResult;
  } catch (error) {
    throw new Error(`Lỗi: ${error.message}`);
  }
}}

const getBlastnByCode = async (code) => {
  try {
    let data = await Blastn.findOne({code: code});
    return data;
  } catch (error) {
    throw new Error(`Lỗi: ${error.message}`);
  }
}

const getFileForDownload = async (filePath) => {
  try {
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
  runBlastn,
  getBlastnByCode,
  getFileForDownload,
};
