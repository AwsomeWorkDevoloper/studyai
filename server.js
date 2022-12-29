// Imports
const express = require('express');
const dotenv = require('dotenv').config();
const session = require('express-session');

const mongooseClient = require('mongoose');
const { encrypt } = require('./controllers/encryptionController');

// Get port and URI from env
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_DB_URI;

// Create server
const app = express();

// Connect to Database
mongooseClient.set('strictQuery', false);

mongooseClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        // Connected to db
        console.log('Connected to db');

        // Run server
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        // Error while trying to connect
        console.log(err);
    });

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable session
app.use(session({
    secret: encrypt(process.env.SESSION_SECRET).encryptedData,
    resave: true,
	saveUninitialized: true
}))

// Use public folder
app.use(express.static('public'));

// Use routes
app.use('/', require('./routes/mainRoutes'));
app.use('/openai', require('./routes/openaiRoutes'));
app.use('/api', require('./routes/apiRoutes'));
app.use('/checkout', require('./routes/checkoutRoutes'));


module.exports = {mongooseClient};