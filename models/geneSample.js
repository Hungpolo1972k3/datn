const mongoose = require('mongoose');
const geneSampleSchema = new mongoose.Schema({
    sample_id: {
        type: String,
        require: true,
        default: null
    },
    code:{
        type: String,
        require: true
    },
    type:{
        type: String,
        require: true
    },
    location:{
        type: String,
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
const GeneSample = mongoose.model('GeneSample', geneSampleSchema);
module.exports = GeneSample;