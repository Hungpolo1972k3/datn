const axios = require('axios');
const FormData = require('form-data');
const Virulence = require('../models/virulence');
const fs = require('fs');
require('dotenv').config();

const changleVirulenceInfo = async (result) => {
    try {
        const records = result
            .split("\n")
            .slice(1) 
            .filter(line => line.trim().length > 0) 
            .map(line => {
                const fields = line.split(",");

                return {
                    file_path: fields[0],
                    sequence: fields[1],
                    start: parseInt(fields[2]),
                    stop: parseInt(fields[3]),
                    strand: fields[4],
                    gene: fields[5],
                    coverage_raw: fields[6],
                    coverage_map: fields[7],
                    gaps: fields[8],
                    coverage: parseFloat(fields[9]),
                    identity: parseFloat(fields[10]),
                    database: fields[11],
                    accession: fields[12],
                    product: fields[13],
                    resistance: fields[14] ? true : false,
                };
            });

        return records; 
    } catch (error) {
        console.error("Error processing virulence info:", error);
    }
};

const reverseComplement = (seq) => {
    const comp = { A: 'T', T: 'A', G: 'C', C: 'G', a: 't', t: 'a', g: 'c', c: 'g', N: 'N', n: 'n' };
    return seq.split('').reverse().map(n => comp[n] || n).join('');
};

const parseFasta = (fastaContent) => {
    const sequences = {};
    let currentId = '';
    let currentSeq = [];

    fastaContent.split(/\r?\n/).forEach(line => {
        if (line.startsWith('>')) {
            if (currentId) {
                sequences[currentId] = currentSeq.join('');
            }
            currentId = line.substring(1).trim();
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


const getVirulenceInfo = async (file, sample_id) => {
    if (!file || !file.path || !fs.existsSync(file.path)) {
        throw new Error('File not found or invalid path');
    }
    const form = new FormData();
    form.append('fasta', fs.createReadStream(file.path));
    try {
        const fastaContent = await fs.promises.readFile(file.path, 'utf8');
        const response = await axios.post(`${process.env.BIOTOOL_URL}/api/virulence/abricate`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        const virulenceList = await changleVirulenceInfo(response.data.result);
        const fastaData = parseFasta(fastaContent);
        const virulenceDocs = await Promise.all(virulenceList.map(async (v) => {
            const seq = fastaData[v.sequence];
            const rawSeq = seq ? seq.substring(v.start - 1, v.stop) : null;
            const nucleic = rawSeq ? (v.strand === '-' ? reverseComplement(rawSeq) : rawSeq) : null;
            const productInfo = parseProductInfo(v.product);

            return {
                sample_id,
                sequence: v.sequence,
                start: v.start,
                stop: v.stop,
                strand: v.strand,
                gene: v.gene,
                coverage: v.coverage,
                identity: v.identity,
                accession: v.accession,
                database: v.database,
                nucleic,
                resistance: v.resistance,
                description: productInfo.description,
                group: productInfo.group,
                vfdb_id: productInfo.vfdb_id,
                function_group: productInfo.function_group,
                function_group_id: productInfo.function_group_id,
            };
        }));

        await Virulence.insertMany(virulenceDocs);
        await fs.promises.unlink(file.path);
        return virulenceDocs;
    } catch (error) {
        await fs.promises.unlink(file.path);
        console.error(error);
        throw new Error('Failed to process and save virulence data:' + error.message);
    }
};

const findVirlencesByKey = async(sample_id, key) =>{
    try {   
        const virulences = await Virulence.find({sample_id: sample_id});
        const filteredVirulences = virulences.filter((item) => {
            return item.index && item.index.includes(key.toLowerCase()); 
        });
        return filteredVirulences;
    } catch (error) {
        throw new Error('Lỗi: '+ error.message);
    }
}

const getAllVirulenceGroup = async (sample_id) => {
    try {
        const groups = await Virulence.find({sample_id: sample_id});
        
        const groupValues = groups.map((group) => group.group);
        const groupFunctions = groups.map((group) => group.function_group);
        const uniqueGroupFunctions = [... new Set(groupFunctions)];
        const uniqueGroups = [...new Set(groupValues)];
        return { uniqueGroups, uniqueGroupFunctions };
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
}

const getVirulencesBySampleId = async(sample_id) => {
    try {
        const virulences = await Virulence.find({sample_id: sample_id});
        return virulences;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
}

const runVirulenceTool = async (file) => {
    if (!file || !file.path || !fs.existsSync(file.path)) {
        throw new Error('File not found or invalid path');
    }
    const form = new FormData();
    form.append('fasta', fs.createReadStream(file.path));
    try {
        const fastaContent = await fs.promises.readFile(file.path, 'utf8');
        const response = await axios.post(`${process.env.BIOTOOL_URL}/api/virulence/abricate`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        const virulenceList = await changleVirulenceInfo(response.data.result);
        const fastaData = parseFasta(fastaContent);
        const virulenceDocs = await Promise.all(virulenceList.map(async (v) => {
            const seq = fastaData[v.sequence];
            const rawSeq = seq ? seq.substring(v.start - 1, v.stop) : null;
            const nucleic = rawSeq ? (v.strand === '-' ? reverseComplement(rawSeq) : rawSeq) : null;
            const productInfo = parseProductInfo(v.product);
            return {
                sequence: v.sequence,
                start: v.start,
                stop: v.stop,
                strand: v.strand,
                gene: v.gene,
                coverage: v.coverage,
                identity: v.identity,
                accession: v.accession,
                database: v.database,
                nucleic,
                resistance: v.resistance,
                description: productInfo.description,
                group: productInfo.group,
                vfdb_id: productInfo.vfdb_id,
                function_group: productInfo.function_group,
                function_group_id: productInfo.function_group_id,
            };
        }));
        await fs.promises.unlink(file.path);
        return virulenceDocs;
    } catch (error) {
        await fs.promises.unlink(file.path);
        console.error(error);
        throw new Error('Failed to process and save virulence data:' + error.message);
    }
};

const runVirulenceTool2 = async (filePath) => {
    if (!fs.existsSync(filePath)) {
        throw new Error('File not found or invalid path');
    }
    const form = new FormData();
    form.append('fasta', fs.createReadStream(filePath));
    try {
        const fastaContent = await fs.promises.readFile(filePath, 'utf8');
        const response = await axios.post(`${process.env.BIOTOOL_URL}/api/virulence/abricate`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        const virulenceList = await changleVirulenceInfo(response.data.result);
        const fastaData = parseFasta(fastaContent);
        const virulenceDocs = await Promise.all(virulenceList.map(async (v) => {
            const seq = fastaData[v.sequence];
            const rawSeq = seq ? seq.substring(v.start - 1, v.stop) : null;
            const nucleic = rawSeq ? (v.strand === '-' ? reverseComplement(rawSeq) : rawSeq) : null;
            const productInfo = parseProductInfo(v.product);
            return {
                sequence: v.sequence,
                start: v.start,
                stop: v.stop,
                strand: v.strand,
                gene: v.gene,
                coverage: v.coverage,
                identity: v.identity,
                accession: v.accession,
                database: v.database,
                nucleic,
                resistance: v.resistance,
                description: productInfo.description,
                group: productInfo.group,
                vfdb_id: productInfo.vfdb_id,
                function_group: productInfo.function_group,
                function_group_id: productInfo.function_group_id,
            };
        }));
        return virulenceDocs;
    } catch (error) {
        throw new Error('Failed to process and save virulence data:' + error.message);
    }
};
module.exports = { 
    getVirulenceInfo,
    findVirlencesByKey,
    getAllVirulenceGroup,
    getVirulencesBySampleId,
    runVirulenceTool,
    runVirulenceTool2,
    changleVirulenceInfo, 
    parseFasta,
    reverseComplement,
    parseProductInfo
 };
