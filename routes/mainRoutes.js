// Imports
const express = require('express');
const path = require('path');
const fs = require('fs');
const { hasPaid } = require('../controllers/mongoDbController');

// Get router
const router = express.Router();

// Middle ware thing
async function checkSignIn(req, res, next){
    if(req.session.uid){
        if ((await hasPaid(req.session.uid))) {
            next();     //If session exists, proceed to page
        } else {
            var err = new Error("Not Paid!");
            console.log(req.session.uid);
            res.redirect('/cancel');
        }
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

// signup and others
router.get('/signup', (req, res) => {
    renderPage(req, res, "signup.html", ["navbar", "footer"]);
});

router.get('/signup/:affiliateId', (req, res) => {
    let id = req.params.affiliateId;

    req.session.signupAffiliate = id;

    renderPage(req, res, "affiliate/signupthrough.html", ["navbar", "footer"]);
});

router.get('/affiliate-signup', (req, res) => {
    renderPage(req, res, "affiliate/signup.html", ["navbar", "footer"]);
})


// Login
router.get('/login', (req, res) => {
    renderPage(req, res, "login.html", ["navbar", "footer"]);
});

// Dashboard
router.get('/dashboard', checkSignIn, (req, res) => {
    renderPage(req, res, "dashboard.html", ["footer"]);
})

// Cancel
router.get('/cancel', (req, res) => {
    renderPage(req, res, "cancel.html", ["footer", "navbar"]);
})

// Success
router.get('/success/:id', async (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(303).json({failed: true})
    }

    renderPage(req, res, "success.html", ["footer", "navbar"]);
})

// Export
module.exports = router;