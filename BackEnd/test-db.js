const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function testConnection() {
  console.log('Testing connection with .env MONGO_URI...');
  console.log('MONGO_URI:', process.env.MONGO_URI);
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 60000,
      connectTimeoutMS: 60000,
      socketTimeoutMS: 60000
    });
    console.log('✅ MongoDB Connected Successfully!');
    await mongoose.disconnect();
  } catch (err) {
    console.log('❌ MongoDB Connection Error:', err.message);
  }
}

testConnection();
