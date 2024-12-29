/**
 * @description KeyStore model là collection dùng để lưu PublicKey, PrivateKey và RefreshToken
*/

// require package
const mongoose = require('mongoose');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'KeyStore';
const COLLECTION_NAME = 'keyStores'; 

// Khai báo schema
const keyStoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId },

    privateKey: { type: String, required: true },
    
    publicKey: { type: String, required: true },

    // refreshToken
    refreshToken: { type: String, required: true },

    refreshTokenUsed: { type: Array, default: [] } // lưu những refreshToken đã sử dụng
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyStoreSchema, COLLECTION_NAME);