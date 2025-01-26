/**
 * @description Access Controller giúp các user bên client có thể signUp, login, logout 
*/

// service
const AccessService =  require('../../services/access.service');

// core response
const { SuccessResponse } = require('../../core/success.response');
const { BadRequestError } = require('../../core/error.response');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// [POST] /sign-up
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
module.exports.signUp = asyncHandler( async (req, res, next) => {
    new SuccessResponse({
        message: 'Đăng ký tài khoản User thành công',
        metadata: await AccessService.signUp(req.body)
    }).send(res);
})

// [POST] /login
/**
 * @description Đăng nhập tài khoản khách hàng
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @param {String} tel 
 * @param {String} avatar  
 * @param {ObjectId} roleId  
 * @return {JSON}
*/
module.exports.login = asyncHandler( async (req, res, next) => {
    // -----
    new SuccessResponse({
        message: 'Đăng nhập tài khoản User thành công',
        metadata: await AccessService.login(req.body)
    }).send(res);
})