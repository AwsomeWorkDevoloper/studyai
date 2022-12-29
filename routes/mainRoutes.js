// Imports
const express = require('express');
const path = require('path');
const fs = require('fs');

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

// Render
function renderPage(req, res, page, components) {
    const p = path.join(__dirname, '/../pages/'+page);

    let fileContents = fs.readFileSync(p).toString();

    let templateComponents = "";

    components.forEach(component => {
        let cFile = path.join(__dirname, "/../components/" + component + ".html");
        let componentContent = fs.readFileSync(cFile).toString();

        templateComponents += componentContent + "\n";
    });

    res.send(fileContents.replace('<!-- Templates -->', templateComponents));
}

// Home page
router.get('/', (req, res) => {
    renderPage(req, res, "index.html", ["navbar", "footer"]);
});

router.get('/signup', (req, res) => {
    renderPage(req, res, "signup.html", ["navbar", "footer"]);
});

router.get('/login', (req, res) => {
    renderPage(req, res, "login.html", ["navbar", "footer"]);
});

router.get('/dashboard', checkSignIn, (req, res) => {
    renderPage(req, res, "dashboard.html", ["footer"]);
})

// Export
module.exports = router;