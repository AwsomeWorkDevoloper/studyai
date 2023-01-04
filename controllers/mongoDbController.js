// Get mongoose client
const mongoose = require('mongoose');
const { encrypt, verify } = require("./encryptionController");
const { v4 } = require('uuid');

// Create user schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    pwd: String,
    paymentReceived: {type: Boolean, default: false},
    isAffiliate: {type: Boolean, default: false},
    affiliateId: {type: String, default: ''},
    affiliateMonthlyBalance: {type: Number, default: 0.0}
});

const User = mongoose.model('User', UserSchema);

// Create account
async function createAccount(userData) {
    let { username, email, pwd, affilate } = userData;
    
    if (await User.findOne({
        $or: [
            {username: username},
            {email: username}
        ]
    })) {
        return { err: true, msg: "There is already an account registered with that information" }
    }

    pwd = JSON.stringify(encrypt(pwd));
    
    const user = new User({
        username,
        email,
        pwd,
        paymentReceived: false,
        isAffiliate: affilate,
        affiliateId: affilate ? v4() : '',
        affiliateMonthlyBalance: 0
    });
    
    let result = await user.save();

    console.log(result);

    return result;
}

// Authenticate
async function authenticate(username, pwd) {
    const user = await User.findOne({
        $or: [
            {username: username},
            {email: username}
        ]
    })

    console.log(user);
    
    if (!user) {
        console.log("err");
        return {error: "User not found"};
    }
    
    const encPwd = JSON.parse(user.pwd);
    console.log(encPwd);

    if (!verify(pwd, encPwd)) {
        return {error: "User not verified"};
    }

    console.log("User verified");

    return user;
}

// Paid
async function paid(id) {
    await User.findByIdAndUpdate(id, { $set: {paymentReceived: true} });
}

// Has paid
async function hasPaid(id) {
    const user = await User.findById(id);

    return user.paymentReceived;
}

// Give affiliate rewards
async function giveAffiliate(affiliateId) {
    if (!(await User.findOne({affiliateId: affiliateId}))) {
        return {err: 'Affiliate not found'}
    }

    await User.findOneAndUpdate({affiliateId: affiliateId}, {$inc: {affiliateMonthlyBalance: 2}});

    return {success: true};
}

// Get affiliate rewards
async function getAffiliateBalance(affiliateId) {
    let x = await User.findOne({affiliateId: affiliateId});

    return x.affiliateMonthlyBalance;
}

// Export
module.exports = {createAccount, authenticate, paid, hasPaid, giveAffiliate, getAffiliateBalance};