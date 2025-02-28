const mongoose = require('mongoose');
const sampleSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    code:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    species:{
        type: String,
        require: true
    },
    microorganism:{
        type: String,
        require: true
    },
    time: {
        type: Date,
        require: true
    },
    sequence:{
        type: String,
        require: true
    },
    describe:{
        type: String,
        require: true
    },
    image_url:{
        type: String,
        require: true
    },
    public: {
        type: Boolean,
        default: True
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
const Sample = mongoose.model('Sample', sampleSchema);
module.exports = Sample;