// service
const UserService = require('../../services/user.service');

// core response
const { SuccessResponse } = require('../../core/success.response');
const { BadRequestError } = require('../../core/error.response');

// [POST] /admin/accounts/create
/**
 * @description Đăng ký tài khoản khách hàng
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @param {String} tel 
 * @param {String} avatar  
 * @param {ObjectId} roleId  
 * @return {JSON}
*/
module.exports.signUp = async (req, res, next) => {
    new SuccessResponse({
        message: 'Đăng ký tài khoản User thành công',
        metadata: await UserService.signUp(req.body)
    }).send(res);
}