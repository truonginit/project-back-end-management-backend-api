// model
const KeyStoreModel = require('../models/keyStore.model');

// repo
const { findKeyStoreByUserId } = require('../models/repositories/keyStore.repo');

// package
const { Types } = require('mongoose');

// utils
const { parseObjectIdMongoose } = require('../utils/index.util');

// service
class KeyStoreService {
    /**
     * @description Lưu publicKey, privateKey và RefreshToken vào Database
     * @param {ObjectId} userId 
     * @param {String}   publicKey 
     * @param {String}   privateKey 
     * @param {String}   refreshToken 
     * @return {}
     */
    static saveKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        /**
         * userId ở đây có thể là ID của tài khoản admin hoặc tài khoản client
        */
        try{
            const filter = { userId: parseObjectIdMongoose(userId) };
            const update = { 
                publicKey, 
                privateKey, 
                refreshToken,
                refreshTokenUsed: []
            };

            /**
             * new: true => trả về document mới sau khi update (nếu có)
             * upsert: true => nếu không tìm thấy sẽ tạo document mới
             */
            const options = { upsert: true, new: true };

            return await KeyStoreModel.findOneAndUpdate(filter, update, options);
        }
        catch( error ) {
            return {
                code: 404,
                status: 'error',
                message: error.message,
                stack: error.stack
            }
        }
    }

    static findKeyStoreByUserId = async ({ userId }) => {
        return await findKeyStoreByUserId({ userId });
    }
}

// exports
module.exports = KeyStoreService;