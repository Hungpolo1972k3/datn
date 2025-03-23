const axios = require('axios');
const FormData = require('form-data');
const Virulence = require('../models/virulence');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

const getVirulenceInfo = async (file) => {
    if (!file || !file.path || !fs.existsSync(file.path)) {
        throw new Error('File not found or invalid path');
    }

    const form = new FormData();
    form.append('fasta', fs.createReadStream(file.path), file.originalname);

    try {
        const response = await axios.post('http://localhost:5000/api/virulence/abricate', form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        if (!response.data || !response.data.result) {
            throw new Error('Invalid response from the server');
        }
        return response.data
    } catch (error) {
        throw new Error('Failed to send file to the server');
    }
};
const saveVirulenceInfo = async(result, sample_id) =>{
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
                    sample_id: sample_id
                };
            });

    await Virulence.insertMany(records);
}

const getAllVirulencesBySampleId = async(sample_id) =>{
    try {
        const virulences = await Virulence.find({sample_id: sample_id})
        return virulences
    } catch (error) {
        throw new Error('Lỗi'+ error.message);
    }
}

const getVirulenceById = async(virulence_id) =>{
    try {
        const virulence = await Virulence.findById(virulence_id)
        return virulence
    } catch (error) {
        throw new Error('Lỗi'+ error.message);
    }
}

module.exports = { 
    getVirulenceInfo,
    saveVirulenceInfo,
    getAllVirulencesBySampleId,
    getVirulenceById
 };
