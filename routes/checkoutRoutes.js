// Imports
const express = require('express');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_KEY);

// Get router
const router = express.Router();

// Price id
const priceId = process.env.PRICE_ID;

// Create checkout sesh
router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                // For metered billing, do not pass quantity
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${process.env.DOMAIN_URL}/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.DOMAIN_URL}/cancel`,
    });
    
    //console.log(session)

    res.json({url: session.url})
});


// Export
module.exports = router;