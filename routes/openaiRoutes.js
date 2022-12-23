// Imports
const express = require('express');
const { testOpenAI } = require('../controllers/openAiController');

// Get router
const router = express.Router();

// Post: Generate image
router.post('/test', testOpenAI);

// Export
module.exports = router;