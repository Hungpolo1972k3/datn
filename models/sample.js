const mongoose = require('mongoose');
const sampleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    experiment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    header: {
        type: String
    },
    length:{
        type: Number
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    file_name: {
        type: String
    },
    fastaFilePath: {
        type: String
    }   
},
{
    timestamps: true
});
const Sample = mongoose.model('Sample', sampleSchema);
module.exports = Sample;