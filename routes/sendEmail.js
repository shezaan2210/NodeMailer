// Import the Nodemailer library
const nodemailer = require('nodemailer');
require("dotenv").config();
// const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  
  oauth2Client.setCredentials({
    refresh_token:
      process.env.REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.USER_EMAIL_SENDER,
      clientId:
        process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken:
      process.env.REFRESH_TOKEN,
      accessToken,
    },
  });

// Email data
const mailOptions = {
  from: 'shezaanansari2210@gmail.com',
  to: 'shezaan2210@gmail.com',
  subject: 'Node.js Email Tutorial',
  text: 'This is a basic email sent from Node.js using Nodemailer.',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    transporter.sendMail({
        from: process.env.USER_EMAIL_SENDER,
        to: "shezaan2210@gmail.com",
        subject: "Sending email using Nodemailer and OAuth 2.0",
        text: "Sent!",
      });
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});