const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    birthday:{
        type: Date
    },
    gender: {
        type: String,
        enum: ['Nam', "Nữ"]
    },
    career: {
        type: String
    },
    workplace:{
        type: String
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
},{
    timestamps: true
});
const User = mongoose.model('User', userSchema);
module.exports = User;