const User = require('../models/user');
const Experiment = require('../models/experiment');
const Virulence = require('../models/virulence');
const Amr = require('../models/amr');
const Sample = require('../models/sample');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const editPassword = async (user_id, newpassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newpassword,parseInt(process.env.PASSWORD_HASH_NUMBER));
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { password: hashedPassword },
      { new: true }
    );
    return;
  } catch (error) {
    throw new Error("Lỗi: " + error.message);
  }
};
module.exports = { getAllUsers, checkUser, addUser, deleteUser, editPassword };