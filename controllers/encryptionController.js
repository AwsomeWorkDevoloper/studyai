//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const fs = require('fs');
const path = require('path');
const KeyIvData = JSON.parse(fs.readFileSync(path.join(__dirname, "keyiv.json")));
const key = new Buffer(KeyIvData['key'].data);
const iv = new Buffer(KeyIvData['iv'].data);

//Encrypting text
function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text 
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex'); 
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

// Check if correct
function verify(text, encrypted) {
   return decrypt(encrypted) == text;
}

// Export
module.exports = {encrypt, verify};