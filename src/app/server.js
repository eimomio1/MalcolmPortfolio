const cors = require('cors');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { name, email, subject, content } = req.body;
  
  console.log('Received email data:', { name, email, subject, content });

  // Configure the nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'isiimomio123@gmail.com', // your Gmail email
      pass: 'Retrate12', // your Gmail password or app-specific password
    },
  });

  // Email options
  const mailOptions = {
    from: 'isiimomio123@gmail.com',
    to: 'marcusimomio@gmail.com', // recipient's email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\n${content}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
