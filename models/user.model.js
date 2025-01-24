/**
 * @description User model là collection sử dụng cho tài khoản khách hàng
*/

// require package
const { Schema, model } = require('mongoose');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'User';
const COLLECTION_NAME = 'users';

// Khai báo schema
const userSchema = new Schema({
    user_name:      { type: String, required: true, trim: true },       // tên của ng` dùng
    user_email:     { type: String, required: true, trim: true },
    user_password:  { type: String, required: true },
    user_tel:       { type: String },
    user_avatar:    { type: String, default:  "" },
    user_status:    { type: String, default: 'pending', enum: ['active', 'inactive', 'pending'] },
    user_isDeleted: { type: Boolean, default: false }

    // salf
    // nếu tài khoản user cần có slug để là 1 cái id ảo, 
},{
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema, COLLECTION_NAME);