const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/view_current_user', protect, currentUser);

module.exports = router;