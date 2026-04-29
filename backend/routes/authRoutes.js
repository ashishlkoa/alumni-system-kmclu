const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Signup API -> http://localhost:5000/api/auth/register
router.post('/register', register);

// Login API -> http://localhost:5000/api/auth/login
router.post('/login', login);

module.exports = router;