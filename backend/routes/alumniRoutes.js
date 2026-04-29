const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getProfile, updateFrequentInfo, requestBasicInfoUpdate } = require('../controllers/alumniController');

// Saare routes par auth middleware laga hai, matlab logged in user hi inko access kar sakta hai
// Fetch Profile -> http://localhost:5000/api/alumni/profile
router.get('/profile', auth, getProfile);

// Update Frequent Info -> http://localhost:5000/api/alumni/update-frequent
router.put('/update-frequent', auth, updateFrequentInfo);

// Request Basic Info Update -> http://localhost:5000/api/alumni/request-basic-update
router.post('/request-basic-update', auth, requestBasicInfoUpdate);

module.exports = router;