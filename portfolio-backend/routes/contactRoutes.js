const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');
const validateContact = require('../middleware/validateContact');

router.post('/contact', validateContact, submitContactForm);

module.exports = router;
