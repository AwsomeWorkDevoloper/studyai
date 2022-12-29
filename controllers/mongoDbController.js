// Get mongoose client
const mongoose = require('mongoose');
const { encrypt, verify } = require("./encryptionController");

// Create user schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, dropDups: true },
    email: { type: String, unique: true, dropDups: true },
    pwd: String,
    paymentReceived: Boolean 
});

const User = mongoose.model('User', UserSchema);

// Create account
async function createAccount(userData) {
    
    let { username, email, pwd } = userData;
    
    pwd = JSON.stringify(encrypt(pwd));
    
    const user = new User({
        username,
        email,
        pwd,
        paymentReceived: false
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

// Export
module.exports = {createAccount, authenticate, paid, hasPaid};