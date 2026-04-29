const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Role: Decide karega ki user Alumni hai ya Super Admin
  role: { type: String, enum: ['alumni', 'superadmin'], default: 'alumni' },
  
  // Login Details
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Basic Info (Super Admin ka approval chahiye update karne ke liye)
  name: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  company: { type: String },
  enrolmentYear: { type: Number },
  passoutYear: { type: Number },
  program: { type: String, enum: ['BCA', 'MCA'] },
  casteCategory: { type: String },
  
  // Frequently Changeable Info (Direct update ho sakti hai)
  contactNumber: { type: String },
  address: { type: String },
  residentialCity: { type: String },
  workingCity: { type: String },
  country: { type: String },
  salary: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);