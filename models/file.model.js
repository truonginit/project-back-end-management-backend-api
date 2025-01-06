/**
 * @description KeyStore model là collection dùng để lưu File được upload lên theo API và những file này nếu sau 24h không thay đổi trạng thái thì sẽ xóa khỏi cloud
*/

// require package
const mongoose = require('mongoose');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'File';
const COLLECTION_NAME = 'files'; 

// Khai báo schema
const fileSchema = new mongoose.Schema({
    file_userId: { type: mongoose.Schema.Types.ObjectId }, // ID của người upload ảnh

    file_public_id: { type: String, required: true }, // public_id nó là unique nên cứ thoải mái

    file_status: { type: String, default: 'inactive', enum: ['active', 'inactive'] },
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, fileSchema, COLLECTION_NAME);