// Imports
const express = require('express');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_KEY);

// Get router
const router = express.Router();

// Price id
const priceId = 'price_1MKSH3I2UVMY3RMxOD2Clhve';

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
        success_url: `http://localhost:5000/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5000/cancel`,
    });
    
    console.log(session)

    res.json({url: session.url})
});


// Export
module.exports = router;