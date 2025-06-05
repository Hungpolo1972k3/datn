const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();
const requireLogin = require('../utils/requireLogin')

router.get('/getallusers', requireLogin, adminController.getAllUsers);
router.post('/adduser', requireLogin, adminController.addUser);
router.delete('/deleteuser', requireLogin, adminController.deleteUser);
router.put('/editpassword', requireLogin, adminController.editPassword)
module.exports = router;