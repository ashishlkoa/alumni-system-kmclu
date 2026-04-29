module.exports = function (req, res, next) {
  // Check karein ki logged-in user ka role 'superadmin' hai ya nahi
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Access denied. Super Admin only.' });
  }
  next(); // Agar admin hai, toh aage badhne do
};