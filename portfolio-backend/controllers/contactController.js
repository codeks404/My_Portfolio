const nodemailer = require('nodemailer');
const Message = require('../models/Message');

let transporter = null;

// Only set up email transport if credentials are provided.
// This lets the contact form still save-to-DB even if email isn't configured yet.
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

// POST /api/contact
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Save to MongoDB (always happens, regardless of email config)
    const savedMessage = await Message.create({ name, email, message });

    // 2. Try to send an email notification (non-blocking failure)
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          replyTo: email,
          subject: `New portfolio message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h3>New message from your portfolio site</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `
        });
      } catch (emailErr) {
        // Log but don't fail the request — the message is already safely stored.
        console.error('Email sending failed:', emailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received. Thank you for reaching out!',
      data: { id: savedMessage._id }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
