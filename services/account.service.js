// model
const AccountModel = require('../models/account.model');

// repository
const { isEmailExits, findAllAccount } = require('../models/repositories/account.repo');

// core response
const { BadRequestError } = require('../core/error.response');

// package
const bcrypt = require('bcrypt');

// utils
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
            throw new BadRequestError('Email đã tồn tại');
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
            account: pickFieldInObject({ object: newAccount, field: fieldForPick })
        }
    }

    /**
     * @description Tìm tài khoản quản trị (theo query)
     * @param {String}  status
     * @param {Boolean} isDeleted,
     * @param {Array}   select 
    */
    static findAllAccount = async ({ status, isDeleted, select = [] }) => {
        return await findAllAccount({ status, isDeleted, select });
    }
}

// exports
module.exports = AccountService;