// Simple test script to verify MongoDB connection and user creation
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user_model');

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log('   Connection string:', process.env.CONNEXION_STRING ? '✅ Set' : '❌ Not set');
    
    if (!process.env.CONNEXION_STRING) {
      console.error('❌ CONNEXION_STRING is not set in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.CONNEXION_STRING);
    console.log('✅ Connected to MongoDB');
    console.log('   Database:', mongoose.connection.name);
    console.log('   Host:', mongoose.connection.host);

    // Test user creation
    console.log('\n🧪 Testing user creation...');
    const testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: `test-${Date.now()}@example.com`,
      phone: `06${Math.floor(Math.random() * 100000000)}`,
      password: 'hashedpassword123'
    });

    console.log('✅ Test user created successfully!');
    console.log('   User ID:', testUser._id);
    console.log('   Email:', testUser.email);

    // Count users
    const userCount = await User.countDocuments();
    console.log(`\n📊 Total users in database: ${userCount}`);

    // List all users
    const users = await User.find().select('firstName lastName email phone').limit(5);
    console.log('\n👥 Recent users:');
    users.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
    });

    // Clean up test user
    await User.findByIdAndDelete(testUser._id);
    console.log('\n🧹 Test user cleaned up');

    await mongoose.connection.close();
    console.log('\n✅ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error('   Error:', error.message);
    if (error.code === 'ENOTFOUND') {
      console.error('   → MongoDB server not found. Is MongoDB running?');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   → Connection refused. Check MongoDB port and firewall.');
    }
    process.exit(1);
  }
}

testConnection();

