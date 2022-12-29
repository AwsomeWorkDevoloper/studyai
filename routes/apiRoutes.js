// Imports
const express = require('express');
const path = require('path');
const { createAccount, authenticate, paid } = require('../controllers/mongoDbController');

// Get router
const router = express.Router();

// Create account
router.post('/create-account', async (req, res) => {
    const userData = req.body;

    const result = await createAccount(userData);

    if (result['err']) {
        return res.send({success: false, error: result['error']});
    }

    res.send({ success: true, uid: result._id });
});

// Authenticate
router.post('/auth', async (req, res) => {
    const { username, pwd } = req.body

    const authResult = await authenticate(username, pwd);

    if (authResult['error']) {
        return res.json({ success: false });
    }

    req.session.username = authResult.username;
    req.session.uid = authResult._id;

    res.json({ success: true, username: authResult.username });
});

// Logout
router.get('/logout', async (req, res) => {
    console.log("Logging out");

    req.session.destroy();

    res.redirect('/');
});

// Paid
router.post('/paid', async (req, res) => {
    const id = req.session.uid;

    console.log(id);

    await paid(id);

    res.json({success: true});
});

// Export
module.exports = router;