const mongoose = require('mongoose');

const amrSchema = new mongoose.Schema({
    protein_identifier: {
        type: String
    },
    contig_id: {
        type: String
    },
    start: {
        type: Number
    },
    stop: {
        type: Number
    },
    strand: {
        type: String,
        enum: ["+", "-"]
    },
    gene_symbol: {
        type: String
    },
    element_name: {
        type: String
    },
    closest_reference_name: {
        type: String
    },
    scope: {
        type: String
    },
    element_type: {
        type: String
    },
    class: {
        type: String
    },
    subclass: {
        type: String
    },
    method: {
        type: String
    },
    length: {
        type: Number
    },
    reference_length: {
        type: Number
    },
    alignment_length: {
        type: Number
    },
    coverage: {
        type: Number
    },
    identity: {
        type: Number
    },
    accession: {
        type: String
    },
    nucleic: {
        type: String
    },
    sample_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sample',
        required: true
    }
}, {
    timestamps: true
});

const Amr = mongoose.model('Amr', amrSchema);
module.exports = Amr;