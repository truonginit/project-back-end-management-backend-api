// package
const jwt = require('jsonwebtoken');

/**
 * @description Tạo Access Token và Refresh Token
 * @param {Object} param
 * @param {String} publicKey
 * @param {String} privateKey
 * @returns {Object}
 */
module.exports.createPairToken = async ({ payload, publicKey, privateKey }) => {
    try {
        // Tạo Access Token sử dụng Private Key
        const accessToken = await jwt.sign(payload, privateKey, { expiresIn: '2 days' });

        // Tạo Refresh Token sử dụng Public Key
        const refreshToken = await jwt.sign(payload, publicKey, { expiresIn: '7 days' });

        return { accessToken, refreshToken };
    } 
    catch( error ) {
        return { 
            code:    404,
            status:  'error',
            message: error.message,
            stack:   error.stack 
        }
    }
} 
