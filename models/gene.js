const mongoose = require('mongoose');
const geneSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    describe:{
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: True
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});
const Gene = mongoose.model('Gene', geneSchema);
module.exports = Gene;