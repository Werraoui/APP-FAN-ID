const mongoose = require('mongoose');

const connect_db = async () => {
  try {
    if (!process.env.CONNEXION_STRING) {
      throw new Error('CONNEXION_STRING is not defined in environment variables');
    }

    console.log('🔌 Connecting to MongoDB...');
    console.log('   Connection string:', process.env.CONNEXION_STRING.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials
    
    const connect = await mongoose.connect(process.env.CONNEXION_STRING, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log('✅ MongoDB connected successfully');
    console.log('   Host:', connect.connection.host);
    console.log('   Database:', connect.connection.name);
    console.log('   Ready state:', connect.connection.readyState === 1 ? 'Connected' : connect.connection.readyState);
  } catch (err) {
    console.error('❌ MongoDB connection error:');
    console.error('   Error:', err.message);
    
    // Provide helpful error messages for common issues
    if (err.message.includes('ECONNREFUSED') || err.message.includes('connect')) {
      console.error('\n💡 Possible solutions:');
      console.error('   1. Make sure MongoDB is running: net start MongoDB');
      console.error('   2. Check if MongoDB is installed locally');
      console.error('   3. Verify the connection string in .env file');
      console.error('   4. For local MongoDB, use: mongodb://localhost:27017/fanid_db');
    } else if (err.message.includes('authentication failed')) {
      console.error('\n💡 Possible solutions:');
      console.error('   1. Check username and password in connection string');
      console.error('   2. For local MongoDB, you may not need authentication');
      console.error('   3. Try: mongodb://localhost:27017/fanid_db');
    } else if (!process.env.CONNEXION_STRING) {
      console.error('   Please set CONNEXION_STRING in your .env file');
    }
    
    process.exit(1);
  }
};

module.exports = connect_db;