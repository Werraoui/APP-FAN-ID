const Document = require('../models/document_model');
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');

//@desc upload a Document
//@route POST api/documents/upload
//@access public
const uploadDocument = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { userId, fanIdId, documentType } = req.body;

    if (!documentType) {
      // Delete uploaded file if documentType is missing
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Document type is required' });
    }

    // Validate document type
    const validTypes = [
      'passport',
      'classicVisa',
      'eVisa',
      'entryStampImage',
      'expiredCNIE',
      'passportOrReceipt'
    ];

    if (!validTypes.includes(documentType)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Invalid document type' });
    }

    // Create document record
    const document = await Document.create({
      userId: userId || null,
      fanIdId: fanIdId || null,
      documentType,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path
    });

    res.status(201).json({
      message: 'Document uploaded successfully',
      documentId: document._id,
      documentType: document.documentType,
      fileName: document.fileName
    });
  } catch (error) {
    // Delete file if error occurred
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    res.status(500).json({ message: error.message });
  }
});

//@desc get Documents of a fan 
//@route GET api/documents/:fanId
//@access public
const getDocuments = asyncHandler(async (req, res) => {
  try {
    const documents = await Document.find({ fanIdId: req.params.fanId });

    if (!documents || documents.length === 0) {
      return res.status(404).json({ message: 'No documents found' });
    }

    // Return document info without file paths for security
    const documentsInfo = documents.map(doc => ({
      _id: doc._id,
      documentType: doc.documentType,
      originalName: doc.originalName,
      mimeType: doc.mimeType,
      fileSize: doc.fileSize,
      uploadedAt: doc.uploadedAt
    }));

    res.json(documentsInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@desc get a single document file
//@route GET api/documents/file/:id
//@access public
const getDocumentFile = asyncHandler(async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Check if file exists
    if (!fs.existsSync(document.filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Send file
    res.setHeader('Content-Type', document.mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${document.originalName}"`);
    
    const fileStream = fs.createReadStream(document.filePath);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@desc delete a document
//@route DELETE api/documents/:id
//@access public
const deleteDocument = asyncHandler(async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Delete file from filesystem
    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    // Delete document record
    await Document.findByIdAndDelete(req.params.id);

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  uploadDocument,
  getDocuments,
  getDocumentFile,
  deleteDocument
};
