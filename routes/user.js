const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const requireLogin = require('../utils/requireLogin')

// router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/getuserbyid', requireLogin, userController.getUserById);
router.put('/updateuserinfo', requireLogin, userController.updateUserInfo);

router.get('/getallusers', requireLogin, userController.getAllUsers);
router.post('/refreshtoken', userController.refreshToken);
//ADMIN
router.post('/adduser', requireLogin, userController.addUser);

router.delete('/deleteuser', requireLogin, userController.deleteUser)
module.exports = router;