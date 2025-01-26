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

    // pending: đang chờ nhập mã
    // used: đã được nhập mã => tiến tới reset mật khẩu
    // expired: đã đổi mật khẩu và không dùng được nữa
    otp_status: { type: String, default: 'pending', required: true, enum: ['pending', 'used', 'expired']}, 
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