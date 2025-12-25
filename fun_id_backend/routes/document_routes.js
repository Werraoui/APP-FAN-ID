//routes for docs
const express = require('express');
const router = express.Router();
const {
  uploadDocument,
  getDocuments,
  getDocumentFile,
  deleteDocument
} = require('../controllers/documentController');
const upload = require('../config/multer');

// Upload a document (single file)
router.post('/upload', upload.single('file'), uploadDocument);

// Get all documents for a Fan ID
router.get('/:fanId', getDocuments);

// Get a specific document file
router.get('/file/:id', getDocumentFile);

// Delete a document
router.delete('/:id', deleteDocument);

module.exports = router;
