const mongoose = require("mongoose");

const fanIdSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  // Profile type
  profile: {
    type: String,
    enum: ["foreigner-classic-visa", "foreigner-visa-exempt", "foreigner-evisa", "moroccan-expired-cnie"],
    required: true
  },
  
  // Personal Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nationality: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  passportNumber: { type: String, required: true },
  
  // Documents references (stored in Document collection)
  documents: {
    passport: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    classicVisa: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    eVisa: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    entryStampImage: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    entryDate: { type: Date },
    expiredCNIE: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    passportOrReceipt: { type: mongoose.Schema.Types.ObjectId, ref: "Document" }
  },
  
  // Fan ID Information
  fanIdNumber: { 
    type: String, 
    unique: true,
    sparse: true
  },
  qrCode: { type: String },
  
  // Status
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  
  // Validation
  validatedAt: { type: Date },
  validatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  
  // Dates
  issuedDate: { type: Date },
  validUntil: { type: Date }
}, { timestamps: true });

// Generate Fan ID number before saving
fanIdSchema.pre('save', async function(next) {
  if (!this.fanIdNumber && this.status === 'approved') {
    const countryCode = this.nationality.substring(0, 2).toUpperCase();
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.fanIdNumber = `FID-${year}-${countryCode}-${randomNum}`;
    
    // Set issued date and valid until (60 days from now)
    this.issuedDate = new Date();
    this.validUntil = new Date();
    this.validUntil.setDate(this.validUntil.getDate() + 60);
  }
  next();
});

module.exports = mongoose.model("FanID", fanIdSchema);

