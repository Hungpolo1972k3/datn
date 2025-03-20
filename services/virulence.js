const axios = require('axios');
const FormData = require('form-data');
const Virulence = require('../models/virulence');
const fs = require('fs');

const getVirulenceInfo = async (file) => {
    if (!file || !file.path || !fs.existsSync(file.path)) {
        throw new Error('File not found or invalid path');
    }

    const form = new FormData();
    form.append('fasta', fs.createReadStream(file.path), file.originalname);

    try {
        const response = await axios.post('http://localhost:5000/abricate', form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to send file to the server');
    }
};

module.exports = { getVirulenceInfo };
