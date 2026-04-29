const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. User Registration (Signup)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check karein ki user pehle se toh nahi hai
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Password ko secure (Hash) karein
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naya user create karein
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'alumni' // Agar role nahi diya, toh default 'alumni' banega
    });

    // Database mein save karein
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 2. User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check karein ki user exist karta hai ya nahi
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    // Password match karein
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    // Token (JWT) generate karein
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Token 5 ghante tak valid rahega
      (err, token) => {
        if (err) throw err;
        // Frontend ko token aur user ki details bhej dein
        res.json({ token, role: user.role, name: user.name });
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};