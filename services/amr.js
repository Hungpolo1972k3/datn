const axios = require('axios');
const FormData = require('form-data');
const Amr = require('../models/amr');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

const getAmrInfo = async (file) => {
    if (!file || !file.path || !fs.existsSync(file.path)) {
        throw new Error('File not found or invalid path');
    }

    const form = new FormData();
    form.append('fasta', fs.createReadStream(file.path), file.originalname);

    try {
        const response = await axios.post('http://localhost:5000/api/amrfinder/amrfinder', form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        
        if (!response.data || !response.data.result) {
            throw new Error('Invalid response from AMRFinder');
        }
        return response.data

    } catch (error) {
        throw new Error('Failed to send file to the server');
    }
};
const saveAmrInfo = async (result, sample_id) => {
    try {
        const lines = result.split("\n").slice(1); 

        const records = lines
            .map(line => {
                const fields = line.split("\t");
                if (fields.length < 22) return null; 

                return {
                    protein_identifier: fields[0] === "NA" ? null : fields[0],
                    contig_id: fields[1] || null,
                    start: parseInt(fields[2], 10) || 0,
                    stop: parseInt(fields[3], 10) || 0,
                    strand: fields[4] || "+",
                    gene_symbol: fields[5] || null,
                    sequence: fields[6] || null,
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
                    hmm_accession: fields[20] === "NA" ? null : fields[20],
                    hmm_description: fields[21] === "NA" ? null : fields[21],
                    sample_id
                };
            })
            .filter(record => record !== null); 

        if (records.length === 0) {
            return;
        }
        await Amr.insertMany(records, { ordered: false });
    } catch (error) {
        throw new Error('Lỗi'+ error.message);
    }
};

const getAllAmrsBySampleId = async(sample_id) =>{
    try {
        const amrs = await Amr.find({sample_id: sample_id})
        return amrs
    } catch (error) {
        throw new Error('Lỗi'+ error.message);
    }
}

const getAmrById = async(amr_id) =>{
    try {
        const amr = await Amr.findById(amr_id)
        return amr
    } catch (error) {
        throw new Error('Lỗi'+ error.message);
    }
}
module.exports = { 
    getAmrInfo,
    saveAmrInfo,
    getAllAmrsBySampleId,
    getAmrById
 };
