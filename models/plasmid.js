const mongoose = require('mongoose');
const plasmidSchema = new mongoose.Schema({
    // Trình tự truy vấn từ genome lắp ráp
    query_id: {
        type: String,
        require: true
    },
    // Định danh của plasmid tham chiếu
    subject_id: {
        type: String,
        require: true
    },
    query_start: {
        type: Number,
        require: true
    },
    query_stop: {
        type: Number,
        require: true
    },
    subject_start: {
        type: Number,
        require: true
    },
    subject_stop: {
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
    score: {
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
const Plasmid = mongoose.model('Plasmid', plasmidSchema);
module.exports = Plasmid;