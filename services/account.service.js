// model
const AccountModel = require('../models/account.model');

// service
const KeyStoreService = require('../services/keyStore.service');

// repository
const { isEmailExits } = require('../models/repositories/account.repo');

// package
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// utils
const authUtils = require('../auth/authUtils');
const { pickFieldInObject } = require('../utils/index.util');

// constant
const SALT_ROUNDS = 10; // độ băm sử dụng với bcrypt

// service
class AccountService {
    /**
     * @description Tạo tài khoản quản trị
     * @param {String} name 
     * @param {String} email 
     * @param {String} password 
     * @param {String} tel 
     * @param {String} avatar  
     * @param {ObjectId} roleId  
     * @return {JSON}
    */
    static createAccount = async ({
        name,   // họ tên của người sử dụng tài khoản
        email,  
        password,
        tel,
        avatar,
        roleId
    }) => {

        // Kiểm tra xem email đã được sử dụng hay chưa ?
        const foundEmail = await isEmailExits({ email });

        if(foundEmail) {
            // email đã được sử dụng 
            // throw new ...
        }

        // Băm mật khẩu
        const passwordHashed = bcrypt.hashSync(password, SALT_ROUNDS);

        // Tạo tài khoản mới
        const newAccount = await AccountModel.create({
            account_name: name,
            account_email: email,
            account_password: passwordHashed,
            account_tel: tel,
            account_avatar: avatar,
            account_roleId: roleId
        });

        // Tạo Public Key và Private Key
        const publicKey = crypto.randomBytes(64).toString('hex');
        const privateKey = crypto.randomBytes(64).toString('hex');

        // Tạo AccessToken và RefreshToken
        const payload = { accountId: newAccount._id, accountEmail: email };
        const { accessToken, refreshToken }  = await authUtils.createPairToken({ payload, publicKey, privateKey });

        // Lưu AccessToken và RefreshToken vào KeyStore Model
        await KeyStoreService.saveKeyToken({
            userId: newAccount._id,
            publicKey,
            privateKey,
            refreshToken
        })
        
        // Mảng Array để pick dữ liệu response
        const fieldForPick = [
            '_id',
            'account_name',
            'account_email',
            'account_tel',
            'account_avatar',
            'account_roleId'
        ];

        // Response
        return {
            account: pickFieldInObject({ object: newAccount, field: fieldForPick }),
            accessToken,
            refreshToken
        }
    }
}

// exports
module.exports = AccountService;