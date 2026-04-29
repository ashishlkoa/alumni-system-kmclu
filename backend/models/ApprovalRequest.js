const mongoose = require('mongoose');

const approvalRequestSchema = new mongoose.Schema({
  alumniId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  requestedChanges: { 
    type: Object, 
    required: true // Yahan wo data aayega jo alumni change karna chahta hai (e.g., { company: "Google" })
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('ApprovalRequest', approvalRequestSchema);