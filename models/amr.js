const mongoose = require('mongoose');
const amrSchema = new mongoose.Schema({
    // Định danh của protein và 
    protein_identifier: {
        type: String,
        require: true,
        default: null
    },
    contig_id: {
        type: String,
        require: true
    },
    start: {
        type: Number,
        require: true
    },
    stop: {
        type: Number,
        require: true
    },
    // Chiều của gene
    strand: {
        type: String,
        require: true,
    },
    gene_symbol: {
        type: String,
        require: true
    },
    sequence: {
        type: String,
        require: true
    },
    // Phạm vi phát hiện
    scope: {
        type: String,
        require: true,
    },
    element_type: {
        type: String,
        require: true,
    },
    class: {
        type: String,
        require: true
    },
    subclass: {
        type: String,
        require: true
    },
    coverage:{
        type: Number,
        require: true
    },
    identity:{
        type: Number,
        require: true
    },
    length: {
        type: Number,
        require: true
    },
    // Mã định danh tham chiếu trong CSDL
    accession: {
        type: String,
        require: true
    },
    method: {
        type: String,
        require: true
    },
    reference_length: {
        type: Number,
        require: true
    },
    alignment_length: {
        type: Number,
        require: true
    },
    hmm_accession: {
        type: String,
        default: null
    },
    hmm_description: {
        type: String,
        default: null
    },    
    sample_id: {
        type: String,
        require: true,
    },
},
{
    timestamps: true
});
const Amr = mongoose.model('Amr', amrSchema);
module.exports = Amr;