const mongoose = require('mongoose');
const speciesSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    describe:{
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
const Species = mongoose.model('Species', speciesSchema);
module.exports = Species;