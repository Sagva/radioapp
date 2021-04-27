const crypto = require('crypto')

module.exports = class Encrypt {
    static encrypt(password) {
        return (
        //creates and returns a Hmac object that uses the given algorithm amd salt (salt - is a any string, whatever you want, for increasing security level) to hash the password. 'Sha' stands for Secure Hash Algorithm
        crypto
        .createHmac('sha256', 'Attack of the Clones')
        .update(password)//hashes the password
        .digest('hex') //encoding type
        )
    }
}