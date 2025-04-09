const axios = require('axios');
const FormData = require('form-data');
const Amr = require('../models/amr');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

const changeAmrInfo = (result) => {
    try {
        if (!result || typeof result !== "string") {
            throw new Error("Dữ liệu AMR không hợp lệ hoặc không phải chuỗi.");
        }

        const lines = result.trim().split("\n").slice(1); 

        const records = lines.map(line => {
            const fields = line.split("\t");
            if (fields.length < 22) return null; 

            return {
                protein_identifier: fields[0] === "NA" ? null : fields[0],
                contig_id: fields[1] || null,
                start: parseInt(fields[2], 10) || 0,
                stop: parseInt(fields[3], 10) || 0,
                strand: fields[4] || "+",
                gene_symbol: fields[5] || null,
                element_name: fields[6] || null,
                scope: fields[7] || null,
                element_type: fields[8] || null,
                class: fields[10] || null,
                subclass: fields[11] || null,
                method: fields[12] || null,
                length: parseInt(fields[13], 10) || 0,
                reference_length: parseInt(fields[14], 10) || 0,
                coverage: parseFloat(fields[15]) || 0,
                identity: parseFloat(fields[16]) || 0,
                alignment_length: parseInt(fields[17], 10) || 0,
                accession: fields[18] || null,
                closest_reference_name: fields[19] || null,
                hmm_accession: fields[20] === "NA" ? null : fields[20],
                hmm_description: fields[21] === "NA" ? null : fields[21]
            };
        }).filter(record => record !== null); 

        return records; 
    } catch (error) {
        console.error("Lỗi xử lý AMR:", error.message);
        throw error;
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

// const saveAmr = async (amrList, sample_id) => {
//     try {
//         for (const amr of amrList) {
//             const newAmr = new Amr({
//                 sample_id: sample_id, 
//                 protein_identifier: amr.protein_identifier,
//                 contig_id: amr.contig_id,
//                 start: amr.start,
//                 stop: amr.stop,
//                 strand: amr.strand,
//                 gene_symbol: amr.gene_symbol,
//                 element_name: amr.element_name,
//                 closest_reference_name: amr.closest_reference_name,
//                 scope: amr.scope,
//                 element_type: amr.element_type,
//                 class: amr.class,
//                 subclass: amr.subclass,
//                 method: amr.method,
//                 length: amr.length,
//                 reference_length: amr.reference_length,
//                 alignment_length: amr.alignment_length,
//                 coverage: amr.coverage,
//                 identity: amr.identity,
//                 accession: amr.accession,
//                 nucleic: amr.nucleic
//             });
//             await newAmr.save();
//         }
//     } catch (error) {
//         throw new Error('Failed to save amr records: ' + error.message);
//     }
// };


const getAmrInfo = async (file, sample_id) => {
    if (!file || !file.path || !fs.existsSync(file.path)) {
        throw new Error('File not found or invalid path');
    }

    const form = new FormData();
    form.append('fasta', fs.createReadStream(file.path), file.originalname);

    try {
        const fastaContent = await fs.promises.readFile(file.path, 'utf8');
        const amrResponse = await axios.post('http://localhost:5000/api/amrfinder/amrfinder', form, {
            headers: { ...form.getHeaders() },
        });

        if (!amrResponse.data || !amrResponse.data.result) {
            throw new Error('Invalid response from AMRFinder');
        }

        const fastaData = parseFasta(fastaContent);
        const amrList = changeAmrInfo(amrResponse.data.result);

        const amrDocs = amrList.map((v) => {
            const seq = fastaData[v.contig_id];
            const rawSeq = seq ? seq.substring(v.start - 1, v.stop) : null;
            const nucleic = rawSeq ? (v.strand === '-' ? reverseComplement(rawSeq) : rawSeq) : null;

            return {
                sample_id,
                protein_identifier: v.protein_identifier,
                contig_id: v.contig_id,
                start: v.start,
                stop: v.stop,
                strand: v.strand,
                gene_symbol: v.gene_symbol,
                element_name: v.element_name,
                closest_reference_name: v.closest_reference_name,
                scope: v.scope,
                element_type: v.element_type,
                class: v.class,
                subclass: v.subclass,
                method: v.method,
                length: v.length,
                reference_length: v.reference_length,
                alignment_length: v.alignment_length,
                coverage: v.coverage,
                identity: v.identity,
                accession: v.accession,
                nucleic
            };
        });

        await Amr.insertMany(amrDocs);
        return amrDocs;

    } catch (error) {
        console.error(error);
        throw new Error('Failed to process AMR data: ' + error.message);
    }
};

const getAmrsBySampleId = async(sample_id) => {
    try {
        const amrs = await Amr.find({sample_id: sample_id});
        return amrs;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
}

module.exports = { 
    getAmrInfo, 
    getAmrsBySampleId
 };
