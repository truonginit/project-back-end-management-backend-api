/**
 * @description Book model là collection chứa các thông tin thuộc tính của sách
*/

// require package
const mongoose = require('mongoose');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'Book';
const COLLECTION_NAME = 'books'; 

// Khai báo schema
const bookSchema = new mongoose.Schema({
    // _id này mongoose sẽ tự generate ra và dùng _id này để tạo sản phẩm
    provider: { type: String, required: true },  // nhà chung cấp, nhà xuất bản => về sau type sẽ là ObjectId và Ref đến Provider
    author: { type: String, required: true }, // tác giả => sau này sẽ ref đến collection authors
    // loại bìa (bìa cứng, bìa mềm)
    cover: { 
        type: String, 
        required: true, 
        enum: ['hard ', 'soft'] // bìa cứng, bìa mềm
    },
    lang: { type: String, required: true, enum: ['vi', 'en'] }, // tiếng việt, tiếng anh
    accountId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Account' } // tài khoản tạo sản phẩm này
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, bookSchema, COLLECTION_NAME);