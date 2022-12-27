// Imports
const express = require('express');
const path = require('path');

// Get router
const router = express.Router();

// Middle ware thing
function checkSignIn(req, res, next){
    if(req.session.uid){
       next();     //If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       res.redirect('/login');
    }
 }

// Home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../pages/index.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/../pages/signup.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/../pages/login.html'));
});

router.get('/dashboard', checkSignIn, (req, res) => {
    res.sendFile(path.join(__dirname, '/../pages/dashboard.html'));
})

// Export
module.exports = router;