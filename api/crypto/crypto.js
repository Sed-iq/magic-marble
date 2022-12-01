/*
   Crypto module is used to encrypt and decrypt the data.
   It uses AES-256-CBC algorithm to encrypt and decrypt the data.
   It uses ENCRYPTION_KEY to encrypt and decrypt the data.

   'I am using crypto module to encrypt and decrypt the id of user and tournament.'
*/

const crypto = require('crypto'); // crypto is a built-in module in Node.js

const ALGORITHUM = 'aes-256-cbc'; //Using AES encryption
const ENCRYPTION_KEY = 'MARBLES_GAME_ENCRYPTION_KEY_1234'; // Must be 256 bytes (32 characters)

function encrypt(text) {
   let iv = crypto.randomBytes(16);
   let cipher = crypto.createCipheriv(ALGORITHUM, Buffer.from(ENCRYPTION_KEY), iv);
   let encrypted = cipher.update(text);

   encrypted = Buffer.concat([encrypted, cipher.final()]);

   return (iv.toString('hex') + ':' + encrypted.toString('hex')).toString();
}

function decrypt(text) {
   let textParts = text.split(':');
   let iv = Buffer.from(textParts.shift(), 'hex');
   let encryptedText = Buffer.from(textParts.join(':'), 'hex');
   let decipher = crypto.createDecipheriv(ALGORITHUM, Buffer.from(ENCRYPTION_KEY), iv);
   let decrypted = decipher.update(encryptedText);

   decrypted = Buffer.concat([decrypted, decipher.final()]);

   return decrypted.toString();
}

// exports
module.exports = {
   encrypt,
   decrypt
}