const userService = require('../services/user');

const registerUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({
            message: "Create user successfully !",
            data: user.token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await userService.loginUser(req.body);
        res.status(201).json({
            message: "Login successfully !",
            data: user.token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const user = await userService.getUserById(token);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: "Get the user info successfully!",
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserInfo = async (req, res) => {
    try {
        const { user_id } = req.params; // Lấy user_id từ params
        const { email, username, address, birthday, gender, career, workplace } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: "Thiếu ID người dùng" });
        }

        const updatedUser = await userService.updateUserInfo(user_id,email,username,address,birthday,gender,career,workplace);

        if (!updatedUser) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        return res.status(200).json({
            message: "Cập nhật thông tin người dùng thành công",
            data: updatedUser
        });

    } catch (error) {
        return res.status(500).json({ message: "Lỗi server: " + error.message });
    }
};
module.exports = { registerUser, loginUser, getUserById, updateUserInfo };