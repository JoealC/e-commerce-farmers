import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.host,
  port: process.env.port,
  service: 'gmail',
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
 tls:{
    rejectUnauthorized: false
 },
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.user,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${to}`);
  } catch (error) {
    console.error('Error sending notification email:', error.message);
  }
};

export { sendEmail };
