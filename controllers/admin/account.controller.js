// service
const AccountService = require('../../services/account.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

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