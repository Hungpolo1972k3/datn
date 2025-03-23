const mongoose = require('mongoose');

const plasmidSchema = new mongoose.Schema({
    query_id: { 
        type: String, 
        required: true 
    },   
    subject_id: { 
        type: String, 
        required: true 
    }, 
    identity: { 
        type: Number, 
        required: true 
    },   
    length: { 
        type: Number, 
        required: true 
    },     
    mismatch: { 
        type: Number, 
        required: true 
    },  
    gap_openings: { 
        type: Number, 
        required: true 
    }, 
    query_start: { 
        type: Number, 
        required: true 
    },
    query_stop: { 
        type: Number, 
        required: true 
    },
    subject_start: { 
        type: Number, 
        required: true 
    },
    subject_stop: { 
        type: Number, 
        required: true 
    },
    e_value: { 
        type: String, 
        required: true 
    },    
    score: { 
        type: Number, 
        required: true 
    },      
    sample_id: { 
        type: String, 
        required: true 
    },  
}, { 
    timestamps: true 
});

const Plasmid = mongoose.model('Plasmid', plasmidSchema);
module.exports = Plasmid;
