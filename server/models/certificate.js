// server/models/certificate.js
import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
  certificateType: { 
    type: String, 
    enum: ['Transfer Certificate', 'Character Certificate', 'Bonafide Certificate', 'Date of Birth Certificate', 'Provisional Certificate'], 
    required: true 
  },
  issueDate: { type: Date, default: Date.now },
  issuedBy: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Issued', 'Cancelled', 'Reprint'], 
    default: 'Issued' 
  },
  remarks: { type: String },
});

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;