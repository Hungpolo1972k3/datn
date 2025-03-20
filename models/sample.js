const mongoose = require('mongoose');
const sampleSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    // Tên loài sinh vật
    strain: {
        type: String,
        require: true
    },
    header: {
        type: String,
        require: true
    },
    sequence: {
        type: String,
        require: true
    },
    length:{
        type: Number,
        require: true
    },
    user_id: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true
});
const Sample = mongoose.model('Sample', sampleSchema);
module.exports = Sample;