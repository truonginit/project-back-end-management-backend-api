/**
 * @description Account model là collection sử dụng cho tài khoản quản trị 
*/

// require package
const mongoose = require('mongoose');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'Account';
const COLLECTION_NAME = 'accounts'; 

// Khai báo schema
const accountSchema = new mongoose.Schema({
    account_name:      { type: String, required: true, trim: true },
    account_email:     { type: String, required: true, trim: true },
    account_password:  { type: String, required: true },
    account_tel:       { type: String },
    account_avatar:    { type: String, default:  "" },
    // account_roleId:    { type: String, default : "" }, // để tạm thôi
    account_roleId:    { type: mongoose.Schema.ObjectId, ref: 'Role' }, // type ObjectId của mongoose là chuẩn
    account_status:    { type: String, default: 'inactive', enum: ['active', 'inactive'] },
    account_isDeleted: { type: Boolean, default: false }

    // salf
    // nếu tài khoản user cần có slug để là 1 cái id ảo, 
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, accountSchema, COLLECTION_NAME);