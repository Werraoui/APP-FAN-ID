const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  // Fan ID reference (if linked to a Fan ID application)
  fanIdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FanID"
  },
  
  // Document type
  documentType: {
    type: String,
    enum: [
      "passport",
      "classicVisa",
      "eVisa",
      "entryStampImage",
      "expiredCNIE",
      "passportOrReceipt"
    ],
    required: true
  },
  
  // File information
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  filePath: { type: String, required: true },
  
  // Upload metadata
  uploadedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);

