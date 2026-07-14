const express = require('express');
const router = express.Router();
const { getProfile, getSkills, getProjects } = require('../controllers/portfolioController');

router.get('/profile', getProfile);
router.get('/skills', getSkills);
router.get('/projects', getProjects);

module.exports = router;
