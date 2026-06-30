const dotenv = require('dotenv');
dotenv.config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);

const nodemailer = require('nodemailer');

async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: '"OTP Login" <your-email@gmail.com>',
    to: process.env.EMAIL_USER,
    subject: 'Test Email',
    text: 'This is a test email'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
  } catch (error) {
    console.log('❌ Email failed:', error.message);
    console.log('Full error:', error);
  }
}

testEmail();
