const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { getPendingRequests, handleRequest, filterAlumni } = require('../controllers/adminController');

// In sabhi routes par 'auth' aur 'admin' dono middleware lagenge
// Pending Requests -> http://localhost:5000/api/admin/pending-requests
router.get('/pending-requests', auth, admin, getPendingRequests);

// Handle Request -> http://localhost:5000/api/admin/handle-request/:id
router.put('/handle-request/:id', auth, admin, handleRequest);

// Filter Alumni -> http://localhost:5000/api/admin/filter
// Example: http://localhost:5000/api/admin/filter?workingCity=Bangalore&program=MCA
router.get('/filter', auth, admin, filterAlumni);

module.exports = router;