const mongoose = require('mongoose');
const experimentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    code: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});
const Experiment = mongoose.model('Experiment', experimentSchema);
module.exports = Experiment;