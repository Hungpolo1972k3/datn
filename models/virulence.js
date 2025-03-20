const mongoose = require('mongoose');
const virulenceSchema = new mongoose.Schema({
    // Định danh của trình tự gene
    sequence: {
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
    // Tên của gene
    gene: {
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
    // Mã định danh tham chiếu trong CSDL
    accession: {
        type: String,
        require: true
    },
    product: {
        type: String,
        require: true
    },
    // Khả năng kháng thuốc
    resistance: {
        type: Boolean,
        default: true,
    },
    sample_id: {
        type: String,
        require: true,
    },
},
{
    timestamps: true
});
const Virulence = mongoose.model('Virulence', virulenceSchema);
module.exports = Virulence;