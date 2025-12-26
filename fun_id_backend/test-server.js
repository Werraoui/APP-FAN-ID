// Quick test to verify server is accessible
const http = require('http');

const testUrl = 'http://localhost:5000/api/health';

console.log('🧪 Testing backend server connection...');
console.log('   URL:', testUrl);

const req = http.get(testUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('✅ Server is responding!');
    console.log('   Status:', res.statusCode);
    console.log('   Response:', data);
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('❌ Cannot connect to server');
  console.error('   Error:', error.message);
  console.error('\n💡 Possible solutions:');
  console.error('   1. Make sure backend is running: npm run dev');
  console.error('   2. Check if port 5000 is correct in .env file');
  console.error('   3. Check if MongoDB is running');
  process.exit(1);
});

req.setTimeout(5000, () => {
  console.error('❌ Connection timeout');
  console.error('   Server did not respond within 5 seconds');
  req.destroy();
  process.exit(1);
});

