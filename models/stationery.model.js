/**
 * @description Book model là collection chứa các thông tin thuộc tính của sách
*/

// require package
const mongoose = require('mongoose');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'Stationery';
const COLLECTION_NAME = 'stationeries'; 

// Khai báo schema
const stationerySchema = new mongoose.Schema({
    // _id này mongoose sẽ tự generate ra và dùng _id này để tạo sản phẩm

    // thương hiệu => sau này sẽ ref đến collection brands
    brand: { type: String, required: true },

    madeIn: { type: String, required: true },

    color: { type: String, required: true },

    accountId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Account' } // tài khoản tạo sản phẩm này
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, stationerySchema, COLLECTION_NAME);