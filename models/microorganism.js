const mongoose = require('mongoose');
const microorganismSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    species:{
        type: String,
        require: true
    },
    antibioticResistance:{
        type: Array,
    },
    habitat:{
        type: String,
        require: true
    },
    shape:{
        type: String,
        require: true
    },
    gramStain:{
        type: String,
        enum: ["Gram dương (Gram-positive)", "Gram âm (Gram-negative)","Gram không điển hình (Gram-variable/Gram-indeterminate)"]
    },
    size:{
        type: String,
        require: true
    },
    oxygenRequirement:{
        type: String,
        enum: ["Hiếu khí (Aerobic)", "Kỵ khí (Anaerobic)", "Vi hiếu khí (Microaerophilic)", "Kỵ khí tùy nghi (Facultative anaerobe)", "Kỵ khí chịu oxy (Aerotolerant anaerobe)"]
    },
    describe:{
        type: String,
        require: true
    },
    image_url:{
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
const Microorganism = mongoose.model('Microorganism', microorganismSchema);
module.exports = Microorganism;