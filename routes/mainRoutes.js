// Imports
const express = require('express');
const path = require('path');

// Get router
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../pages/index.html'));
});

// Export
module.exports = router;