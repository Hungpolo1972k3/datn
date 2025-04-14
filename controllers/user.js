const userService = require('../services/user');
const User = require('../models/user');
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const isExistUser = await userService.checkUser(email);
        if(!isExistUser) {
            return res.status(400).json({
                message: "Không tồn tại người dùng",
                data: null
            })
        }
        const user = await userService.loginUser({email, password}, res);
        return res.status(201).json({
            status: 1,
            message: "Login successfully !",
            data: user
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
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
        return res.status(500).json({ message: error.message });
    }
};

const updateUserInfo = async (req, res) => {
    try {
        const { user_id } = req.query; 
        const { email, username, phone, address, birthday, gender, career, workplace } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: "Thiếu ID người dùng" });
        }

        const updatedUser = await userService.updateUserInfo(user_id,email,username,phone,address,birthday,gender,career,workplace);

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

const getAllUsers = async(req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({
            message: "Lấy danh sách người dùng thành công",
            data: users
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi: " + error.message });
    }
}

const addUser = async(req, res) => {
    try {
        const {email, password, username, address, phone, birthday, gender, career, workplace, role} = req.body;
        const isExistUser = await userService.checkUser(email);
        if(isExistUser) {
            return res.status(400).json({
                message: "Đã tồn tại người dùng",
                data: null
            })
        }
        const newuser = await userService.addUser({email, password, username, address, phone, birthday, gender, career, workplace, role});
        return res.status(200).json({
            message: "Thêm người dùng thành công",
            data: newuser
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi: " + error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.query;
        await userService.deleteUser(id);
        return res.status(200).json({
            message: "Xóa người dùng thành công"
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi: " + error.message });
    }
}

const refreshToken = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
      }
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
  
        const payload = {
          userId: user._id,
          role: user.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  
        return res.status(200).json({
          token,
          user: {
            _id: user._id,
            role: user.role,
            email: user.email,
            username: user.username
          }
        });
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = { loginUser, getUserById, updateUserInfo, getAllUsers, addUser, deleteUser, refreshToken };