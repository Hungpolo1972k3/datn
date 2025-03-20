const mongoose = require('mongoose');
const amrSchema = new mongoose.Schema({
    // Định danh của protein và 
    protein_identifier: {
        type: String,
        require: true
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
        enum: ["+", "-"]
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
        enum: ["cor", "plasmid"]
    },
    element_type: {
        type: String,
        require: true,
        enum: ["point", "transporon"]
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