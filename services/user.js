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
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10h" });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,  
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return {
        token,
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

const getAllUsers = async () => {
    try {
        const users = await User.find().select('-password');
        
        const usersWithCounts = await Promise.all(users.map(async (user) => {
            const countExperiment = await Experiment.countDocuments({ user_id: user._id });
            const countSample = await Sample.countDocuments({ user_id: user._id });
            return {
                ...user.toObject(),
                countExperiment,
                countSample,
            };
        }));

        return usersWithCounts;
    } catch (error) {
        throw new Error("Lỗi : " + error.message);
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

const addUser = async ({ email, password, username, address, phone, birthday, gender, career, workplace, role }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH_NUMBER));
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            address,
            phone,
            birthday,
            gender,
            career,
            workplace,
            role,
            status: true
        });
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error("Lỗi: " + error.message);
    }
};

const deleteUser = async (id) => {
    try {
        const sample = await Sample.findOne({ user_id: id });
        const deletionPromises = [
            User.deleteOne({ _id: id }),
            Experiment.deleteMany({ user_id: id }),
            Sample.deleteMany({ user_id: id }),
        ];
        if (sample) {
            deletionPromises.push(
                Virulence.deleteMany({ sample_id: sample._id }),
                Amr.deleteMany({ sample_id: sample._id })
            );
        }
        await Promise.all(deletionPromises);
    } catch (error) {
        throw new Error("Lỗi: " + error.message);
    }
};

module.exports = { loginUser, getUserById, updateUserInfo, getAllUsers, checkUser, addUser, deleteUser };