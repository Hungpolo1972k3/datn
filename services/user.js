const User = require('../models/user');
const Experiment = require('../models/experiment');
const Virulence = require('../models/virulence');
const Amr = require('../models/amr');
const Sample = require('../models/sample');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async ({ email, password }, res) => {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Sai mật khẩu");
    }

    const payload = {
        userId: user._id,
        role: user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,  
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return {
        token,
        refreshToken,
        user: {
            _id: user._id,
            role: user.role,
            email: user.email,
            username: user.username
        }
    };
};

const getUserById = async (token) => {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await User.findById(userId).select('-password');
        return user;
    } catch (error) {
        console.error('Invalid or expired token:', error);
        return null;
    }
};

const updateUserInfo = async (user_id, email,username,phone,address,birthday,gender,career,workplace) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            {
                email,
                username,
                phone,
                address,
                birthday,
                gender,
                career,
                workplace
            },
            { new: true } 
        );

        return updatedUser;
    } catch (error) {
        throw new Error("Lỗi khi cập nhật thông tin người dùng: " + error.message);
    }
};


const checkUser = async (email) => {
    try {
        const isExistUser = await User.findOne({email: email});
        return !!isExistUser;
    } catch (error) {
        throw new Error("Lỗi : " + error.message);
    }
}

module.exports = { loginUser, getUserById, updateUserInfo, checkUser };