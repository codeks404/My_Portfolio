const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// GET /api/skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
