/**
 * @description OTP model là collection chứa các otp để khôi phục tài khoản hoặc ...
*/

// require package
const mongoose = require('mongoose');


// Document Name và Collection Name
const DOCUMENT_NAME   = 'OTP';
const COLLECTION_NAME = 'otps'; 

//  Define Time 
const ONE_MINUTES = 60;

// Khai báo schema
const otpSchema = new mongoose.Schema({
    otp_code: { type: String, required: true },
    otp_email: { type: String, required: true },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: ONE_MINUTES * 3 // 3 phút
    }
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, otpSchema, COLLECTION_NAME);