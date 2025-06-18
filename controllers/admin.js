const adminService = require('../services/admin');
const User = require('../models/user');

const getAllUsers = async(req, res) => {
    try {
        const users = await adminService.getAllUsers();
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
        const isExistUser = await adminService.checkUser(email);
        if(isExistUser) {
            return res.status(400).json({
                message: "Đã tồn tại người dùng",
                status: -1,
                data: null
            })
        }
        const newuser = await adminService.addUser({email, password, username, address, phone, birthday, gender, career, workplace, role});
        return res.status(200).json({
            message: "Thêm người dùng thành công",
            status: 0,
            data: newuser
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi: " + error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.query;
        await adminService.deleteUser(id);
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

const editPassword = async (req, res) => {
    try {
        let {user_id} = req.query;
        let {newpassword} = req.body;
        await adminService.editPassword(user_id, newpassword);
        return res.status(200).json({
            message:"Đổi mật khẩu thành công"
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}
module.exports = { getAllUsers, addUser, deleteUser, refreshToken, editPassword };