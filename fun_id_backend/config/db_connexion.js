const mongoose = require('mongoose');

const connect_db = async () => {
  try {
    if (!process.env.CONNEXION_STRING) {
      throw new Error('CONNEXION_STRING is not defined in environment variables');
    }

    const connect = await mongoose.connect(process.env.CONNEXION_STRING);
    console.log('✅ MongoDB connected successfully');
    console.log('   Host:', connect.connection.host);
    console.log('   Database:', connect.connection.name);
    console.log('   Ready state:', connect.connection.readyState);
  } catch (err) {
    console.error('❌ MongoDB connection error:');
    console.error('   Error:', err.message);
    if (!process.env.CONNEXION_STRING) {
      console.error('   Please set CONNEXION_STRING in your .env file');
    }
    process.exit(1);
  }
};

module.exports = connect_db;