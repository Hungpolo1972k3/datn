const mongoose = require('mongoose');
const sampleResultSchema = new mongoose.Schema({
    sample_id: {
        type: String,
        require: true
    },
    //Tên kháng sinh tương ứng
    name:{
        type: String,
        require: true
    },
    sensitive:{
        type: String,
        require: true,
        enum: ["Nhạy cảm (Sensitive/Susceptible)", "Trung gian (Intermediate)", "Kháng (Resistant)"]
    },
    //Nồng độ nồng độ ức chế tối thiểu (MIC - Minimum Inhibitory Concentration)
    mic: {
        type: Number,
        require: true
    },
    unit: {
        type: String,
        enum: ["µg/mL", "mg/L"]
    },
    quality:{
        type: String,
        require: true
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
const SampleResult = mongoose.model('SampleResult', sampleResultSchema);
module.exports = SampleResult;