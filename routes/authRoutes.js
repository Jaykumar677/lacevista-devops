// Authentification Page
// routes/AuthRoutes.js
const express = require('express');
const router  = express.Router();
const authController = require('../controllers/authController');

router.get('/login',  authController.getLogin);
router.post('/loginUser', authController.loginUser);
router.get('/signup',  authController.getSignup);
router.post('/createUser',  authController.createUser);
router.post('/send-otp', authController.sendOtp);

module.exports = router;
