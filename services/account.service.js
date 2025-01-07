// model
const AccountModel = require('../models/account.model');

// repository
const { 
    isEmailExits, 
    findAllAccount,
    findByEmail,
    findOneAccountById,
    deleteById
} = require('../models/repositories/account.repo');

// core response
const { BadRequestError, NotFoundError } = require('../core/error.response');

// package
const bcrypt = require('bcrypt');

// utils
const { createPairToken } = require('../auth/authUtils');
const { pickFieldInObject } = require('../utils/index.util');
const {
    generatePairKey
} = require('../utils/generate.util');

// require service
const KeyStoreService = require('../services/keyStore.service');

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
     *  @description Đăng nhập 
    */
    static loginAccount = async ({ email, password }) => {
        // kiểm tra xem email có hợp lệ không
        const foundEmail = await findByEmail({ email, isLean: false });
        if(!foundEmail) throw new NotFoundError('Không tìm thấy email');

        // kiểm tra mật khẩu có hợp lệ không
        const isPasswordTrue = bcrypt.compareSync(password, foundEmail.account_password);
        if(!isPasswordTrue) throw new BadRequestError('Đăng nhập thất bại');

        // tạo cặp key, publicKey và privateKey
        const { publicKey, privateKey } = generatePairKey(64);

        // tạo accessToken và refreshToken
        const payload = {
            accountId: foundEmail._id, // tài khoản admin dùng chữ accountId cho chuẩn
            email 
        }

        const { accessToken, refreshToken } = await createPairToken({ payload, publicKey, privateKey });

        // lưu accessToken và refreshToken vào db
        const saveKeyOnDb = await KeyStoreService.saveKeyToken({
            userId: foundEmail._id,
            publicKey,
            privateKey,
            refreshToken
        });


        // có thể select lại các field của foundEmail để response lại cho gọn hợn
        return {
            account: foundEmail,
            accessToken,
            refreshToken
        }
    }

    /**
     * @description Tìm tất cả tài khoản quản trị (theo query)
     * @param {String}  status
     * @param {Boolean} isDeleted,
     * @param {Array}   select 
    */
    static findAllAccount = async ({ status, isDeleted, select = [] }) => {
        return await findAllAccount({ status, isDeleted, select });
    }

    /**
     * @description Lấy chi tiết tài khoản
     * @param { String } accountId
     * @returns 
     */
    static findDetailAccountById = async ({ accountId }) => {
        return await findOneAccountById({ accountId });
    }

    /**
     * @description Xóa tài khoản quản trị theo id
     * @param {*} param0 
     * @returns 
     */
    static deleteAccountById = async ({ accountId, accountIdForDelete }) => {
        if(accountId === accountIdForDelete)
            throw new BadRequestError('Không thể tự xóa tài khoản của mình')

        const accDeleted = await deleteById({ accountId: accountIdForDelete });
        if(!accDeleted.modifiedCount) 
            throw new BadRequestError('Xóa mềm tài khoản thất bại');

        return accDeleted;
    }
}

// exports
module.exports = AccountService;