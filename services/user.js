const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (userData) => {
    const { email, password, confirmpassword, username, address, birthday, gender, career, workplace } = userData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error('Invalid email format');

    if (password !== confirmpassword) throw new Error('Passwords do not match');

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) throw new Error('Password must be at least 6 characters long, include one uppercase letter, one number, and one special character');

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        password: hashedPassword,
        username,
        address,
        birthday,
        gender,
        career,
        workplace: workplace || '',
    });
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await user.save();
    return {user, token};
};

const loginUser = async ({email, password}) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
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
module.exports = { createUser, loginUser, getUserById };