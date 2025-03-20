const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    birthday:{
        type: Date,
        require: true
    },
    gender: {
        type: String,
        require: true,
        enum: ['Nam', "Nữ"]
    },
    career: {
        type: String,
        require: true,
    },
    workplace:{
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true
});
const User = mongoose.model('User', userSchema);
module.exports = User;