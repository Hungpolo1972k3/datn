const mongoose = require('mongoose');
const locusSchema = new mongoose.Schema({
    locus_id:{
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
    strand: {
        type: String,
        require: true,
        enum: ["+", "-"]
    },
    product: {
        type: String,
        require: true
    },
    coverage:{
        type: Number,
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
const Locus = mongoose.model('Locus', locusSchema);
module.exports = Locus;