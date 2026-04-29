const User = require('../models/User');
const ApprovalRequest = require('../models/ApprovalRequest');

// 1. Apni Profile Fetch Karna (Alumni Dashboard ke liye)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// 2. Frequent Info Directly Update Karna (No approval needed)
exports.updateFrequentInfo = async (req, res) => {
  try {
    // Jo data allow karna hai, sirf wahi lenge
    const { contactNumber, address, residentialCity, workingCity, country, salary } = req.body;

    const updateFields = {};
    if (contactNumber) updateFields.contactNumber = contactNumber;
    if (address) updateFields.address = address;
    if (residentialCity) updateFields.residentialCity = residentialCity;
    if (workingCity) updateFields.workingCity = workingCity;
    if (country) updateFields.country = country;
    if (salary) updateFields.salary = salary;

    // Database mein sidha update
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true } // Update hone ke baad naya data return karega
    ).select('-password');

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// 3. Basic Info Update ke liye Request bhejna (Requires Admin Approval)
exports.requestBasicInfoUpdate = async (req, res) => {
  try {
    const { name, dob, gender, company, passoutYear, program } = req.body;

    const requestedChanges = {};
    if (name) requestedChanges.name = name;
    if (dob) requestedChanges.dob = dob;
    if (gender) requestedChanges.gender = gender;
    if (company) requestedChanges.company = company;
    if (passoutYear) requestedChanges.passoutYear = passoutYear;
    if (program) requestedChanges.program = program;

    // Dekhein agar koi pending request pehle se toh nahi hai
    let existingRequest = await ApprovalRequest.findOne({ alumniId: req.user.id, status: 'Pending' });
    
    if (existingRequest) {
      // Agar hai, toh usi mein nayi changes add kar do
      existingRequest.requestedChanges = { ...existingRequest.requestedChanges, ...requestedChanges };
      await existingRequest.save();
      return res.json({ message: 'Update request modified and submitted for approval', request: existingRequest });
    }

    // Nayi request create karein
    const newRequest = new ApprovalRequest({
      alumniId: req.user.id,
      requestedChanges
    });

    await newRequest.save();
    res.status(201).json({ message: 'Update request submitted for Super Admin approval', request: newRequest });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};