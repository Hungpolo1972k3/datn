const User = require('../models/user');
const Experiment = require('../models/experiment');
const Sample = require('../models/sample');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (userData) => {
    const { email, password, username, phone, address, birthday, gender, career, workplace } = userData;
    let user;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            email,
            password: hashedPassword,
            username,
            phone,
            address,
            birthday,
            gender,
            career,
            workplace: workplace || '',
        });
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await user.save();
        return {user, token};
    }
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Không tồn tại người dùng");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Sai mật khẩu");
    }

    let token = "";

    if (user.role === "ADMIN") {
        token = jwt.sign(
            { userId: user._id, role: "ADMIN" },  
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    } else {
        token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    }
    return { token, user: { _id: user._id, role: user.role } };
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

module.exports = { createUser, loginUser, getUserById, updateUserInfo, getAllUsers };