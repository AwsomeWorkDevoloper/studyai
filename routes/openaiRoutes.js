// Imports
const express = require('express');
const { askOpenAI } = require('../controllers/openAiController');

// Get router
const router = express.Router();

// Post: Generate image
router.post('/ask', askOpenAI);

// Export
module.exports = router;