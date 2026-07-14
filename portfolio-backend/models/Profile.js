const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: [{ type: String, required: true }], // paragraphs
    location: { type: String, required: true },
    education: { type: String, required: true },
    focus: { type: String, required: true },
    goal: { type: String, required: true },
    photo: { type: String }, // URL or base64
    email: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    resumeUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
