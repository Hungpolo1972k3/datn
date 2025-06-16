const mongoose = require('mongoose');

const virulenceSchema = new mongoose.Schema({
    sequence: {
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
    gene: {
        type: String
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
    database: {
        type: String
    },
    nucleic: {
        type: String
    },
    resistance: {
        type: Boolean
    },
    sample_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sample'
    },
    description: {
        type: String
    },
    group: {
        type: String
    },
    vfdb_id: {
        type: String
    },
    function_group: {
        type: String
    },
    function_group_id: {
        type: String
    }
}, {
    timestamps: true
});

const Virulence = mongoose.model('Virulence', virulenceSchema);
module.exports = Virulence;
