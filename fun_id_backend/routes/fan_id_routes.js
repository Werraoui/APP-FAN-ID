const express = require('express');
const router = express.Router();
const {
  applyFanid,
  validateFanid,
  getFanid,
  approveFanid,
  getUserFanIds
} = require('../controllers/fanidController');
const { protect } = require('../middlewares/authMiddleware');

// Create Fan ID application
router.post('/apply', applyFanid);

// Validate Fan ID (public endpoint for QR code scanning)
router.post('/validate', validateFanid);

// Get specific Fan ID (protected)
router.get('/:id', protect, getFanid);

// Approve Fan ID application (protected, admin only)
router.put('/:id/approve', protect, approveFanid);

// Get all Fan IDs for a user (protected)
router.get('/user/:userId', protect, getUserFanIds);

module.exports = router;
