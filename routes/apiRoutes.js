// Imports
const express = require('express');
const path = require('path');
const { createAccount, authenticate, paid, giveAffiliate, getAffiliateBalance, getFreeTrialData } = require('../controllers/mongoDbController');

// Get router
const router = express.Router();

// Create account
router.post('/create-account', async (req, res) => {
    const userData = req.body;

    const result = await createAccount(userData);

    if (result['err']) {
        return res.send({success: false, error: result['msg']});
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

    if (req.session.signupAffiliate) {
        const affiliateResult = await giveAffiliate(req.session.signupAffiliate);

        console.log(affiliateResult);
    }

    req.session.username = authResult.username;
    req.session.uid = authResult._id;
    req.session.affiliate = {
        isAffiliate: authResult.isAffiliate,
        affiliateId: authResult.affiliateId || '',
        balance: authResult.affiliateMonthlyBalance || 0
    };

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

// Check Affiliate
router.post('/check-affiliate', async (req, res) => {
    const affiliateBalance = await getAffiliateBalance(req.session.affiliate.affiliateId);

    req.session.affiliate.balance = affiliateBalance;

    res.json(req.session.affiliate);
});

// Check Free trial
router.post('/check-free-trial', async (req, res) => {
    const data = await getFreeTrialData(req.session.uid);

    res.json(data);
})

// Export
module.exports = router;