const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const requireLogin = require('../utils/requireLogin')

router.post('/login', userController.loginUser);

router.get('/getuserbyid', requireLogin, userController.getUserById);
router.put('/updateuserinfo', requireLogin, userController.updateUserInfo);
router.post('/refreshtoken', userController.refreshToken);

module.exports = router;