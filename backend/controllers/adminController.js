const User = require('../models/User');
const ApprovalRequest = require('../models/ApprovalRequest');

// 1. Saari Pending Requests Dekhna
exports.getPendingRequests = async (req, res) => {
  try {
    // pending requests layenge, aur uske sath alumni ka naam aur email bhi jod denge
    const requests = await ApprovalRequest.find({ status: 'Pending' })
                                          .populate('alumniId', 'name email');
    res.json(requests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// 2. Request ko Approve ya Reject karna
exports.handleRequest = async (req, res) => {
  try {
    const { status } = req.body; // 'Approved' ya 'Rejected' aayega frontend se
    const requestId = req.params.id;

    let request = await ApprovalRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Agar Admin ne Approve kar diya
    if (status === 'Approved') {
      // Alumni ki main profile mein data update kar do
      await User.findByIdAndUpdate(
        request.alumniId,
        { $set: request.requestedChanges }
      );
    }

    // Request ka status update kar do
    request.status = status;
    request.reviewedBy = req.user.id;
    await request.save();

    res.json({ message: `Request has been ${status}`, request });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// 3. Alumni Data Filter Karna
exports.filterAlumni = async (req, res) => {
  try {
    const filter = { role: 'alumni' }; // Sirf alumni ko dhoondna hai

    // URL mein jo bhi filter aayega, usko query mein add kar denge
    if (req.query.workingCity) filter.workingCity = req.query.workingCity;
    if (req.query.residentialCity) filter.residentialCity = req.query.residentialCity;
    if (req.query.company) filter.company = req.query.company;
    if (req.query.program) filter.program = req.query.program;
    if (req.query.passoutYear) filter.passoutYear = req.query.passoutYear;
    if (req.query.gender) filter.gender = req.query.gender;

    const alumniList = await User.find(filter).select('-password');
    
    res.json({ total: alumniList.length, data: alumniList });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};