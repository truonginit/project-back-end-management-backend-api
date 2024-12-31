// service
const AccountService = require('../../services/account.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

// [GET] /admin/accounts/
/**
 * @description Tìm kiếm tài khoản quản trị (theo query)
 * @param {String}  status
 * @param {Boolean} isDeleted,
 * @param {Array}   select 
 * @return {JSON}
*/
module.exports.findAllAccount = async (req, res, next) => {
    new SuccessResponse({
        message: 'Tìm toàn bộ tài khoản quản trị theo query',
        metadata: await AccountService.findAllAccount({
            ...req.query,
            select: ['account_name', 'account_email', 'account_tel', 'account_avatar']
        })
    }).send(res);
}

// [POST] /admin/accounts/create
/**
 * @description Tạo (Thêm) mới tài khoản quản trị
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @param {String} tel 
 * @param {String} avatar  
 * @param {ObjectId} roleId  
 * @return {JSON}
*/
module.exports.createAccount = async (req, res, next) => {
    new SuccessResponse({
        message: 'Tạo mới tài khoản quản trị thành công',
        metadata: await AccountService.createAccount(req.body)
    }).send(res);
}

