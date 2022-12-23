// Imports
const express = require('express');
const dotenv = require('dotenv').config();

// Get port from env
const PORT = process.env.PORT || 5000;
// Create server
const app = express();

// Use public folder
app.use(express.static('public'));

// Use routes
app.use('/', require('./routes/mainRoutes'));
app.use('/openai', require('./routes/openaiRoutes'));

// Run server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));