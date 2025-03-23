const axios = require('axios');
const FormData = require('form-data');
const Plasmid = require('../models/plasmid');
const fs = require('fs');

const getPlasmidInfo = async (file) => {
    if (!file || !file.path || !fs.existsSync(file.path)) {
        throw new Error('File not found or invalid path');
    }

    const form = new FormData();
    form.append('fasta', fs.createReadStream(file.path), file.originalname);

    try {
        const response = await axios.post('http://localhost:5000/api/plasmid/plasmid', form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to send file to the server');
    }
};

const savePlasmidInfo = async (result, sample_id) => {
    try {
        if (!result || typeof result !== 'string') {
            throw new Error("Dữ liệu đầu vào không hợp lệ");
        }

        const lines = result.trim().split("\n");
        const plasmidDocs = [];

        for (const line of lines) {
            const fields = line.split("\t");
            if (fields.length < 12) continue; 

            const plasmidData = {
                query_id: fields[0],  
                subject_id: fields[1], 
                identity: parseFloat(fields[2]),
                length: parseInt(fields[3]),
                mismatch: parseInt(fields[4]), 
                gap_openings: parseInt(fields[5]), 
                query_start: parseInt(fields[6]),
                query_stop: parseInt(fields[7]),
                subject_start: parseInt(fields[8]),
                subject_stop: parseInt(fields[9]),
                e_value: fields[10], 
                score: parseFloat(fields[11]),
                sample_id: sample_id,
            };

            plasmidDocs.push(plasmidData);
        }

        if (plasmidDocs.length > 0) {
            await Plasmid.insertMany(plasmidDocs);
        }
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
};

const getAllPlasmidBySampleId = async(sample_id) =>{
    try {
        const plasmids = await Plasmid.find({sample_id: sample_id})
        return plasmids
    } catch (error) {
        throw new Error('Lỗi'+ error.message);
    }
}

const getPlasmidById = async(plasmid_id) =>{
    try {
        const plasmid = await Plasmid.findById(plasmid_id)
        return plasmid
    } catch (error) {
        throw new Error('Lỗi'+ error.message);
    }
}
module.exports = { 
    getPlasmidInfo,
    savePlasmidInfo,
    getAllPlasmidBySampleId,
    getPlasmidById 
};
