const User = require("../models/user_model");
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register a user 
//@route POST api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  console.log('📝 Registration request received');
  console.log('   Body:', JSON.stringify(req.body, null, 2));
  
  const { firstName, lastName, email, phone, password } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || !password) {
    console.log('❌ Validation failed - missing fields');
    return res.status(400).json({ 
      message: "All fields are required",
      missing: {
        firstName: !firstName,
        lastName: !lastName,
        email: !email,
        phone: !phone,
        password: !password
      }
    });
  }

  // Check if user already exists
  console.log('🔍 Checking if user exists...');
  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    console.log('❌ User already exists');
    if (userExists.email === email) {
      return res.status(400).json({ message: "Email already used" });
    }
    if (userExists.phone === phone) {
      return res.status(400).json({ message: "Phone number already used" });
    }
  }

  // Hash password
  console.log('🔐 Hashing password...');
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  console.log('💾 Creating user in database...');
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword
  });

  console.log('✅ User created successfully!');
  console.log('   User ID:', user._id);
  console.log('   Email:', user.email);
  console.log('   Name:', user.firstName, user.lastName);

  res.status(201).json({
    message: "User registered successfully",
    userId: user._id,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    }
  });
});
//@desc login a user 
//@route POST api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ 
    token,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    }
  });
});
//@desc currentUserInfo
//@route GET  api/users/view_current_user
//@access private
const currentUser = asyncHandler(async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const user = await User.findById(req.userId).select("-password");
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});
module.exports = {registerUser,loginUser,currentUser}