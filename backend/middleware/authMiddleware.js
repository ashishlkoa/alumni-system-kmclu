const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Token ko header se lijiye
  const token = req.header('x-auth-token');

  // Agar token nahi hai
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Token verify karein
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // User ki id aur role humari request mein add ho jayegi
    next(); // Agle function par jao
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};