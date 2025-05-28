const mongoose = require('mongoose');

const blastnSchema = new mongoose.Schema({
    url: {
        type: String
    },
    code: {
        type: String
    },
    filename: {
        type: String
    }
}, {
    timestamps: true
});

const Blastn = mongoose.model('Blastn', blastnSchema);
module.exports = Blastn;
