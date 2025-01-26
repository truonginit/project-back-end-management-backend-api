// service
const UserService = require('../../services/user.service');
const MailService = require('../../services/mail.service');

// core response
const { SuccessResponse } = require('../../core/success.response');
const { BadRequestError } = require('../../core/error.response');

// [POST] /user/sign-up
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

// [POST] /user/login
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
module.exports.login = async (req, res, next) => {
    // // test chức năng gửi mail
    await MailService.sendToOneRecipient({ toEmail: req.body.email });

    // -----
    new SuccessResponse({
        message: 'Đăng nhập tài khoản User thành công',
        metadata: await UserService.login(req.body)
    }).send(res);
}

// [POST] /user/password/forgot-password
module.exports.forgotPassword = async (req, res, next) => {
    new SuccessResponse({
        message: 'Quên mật khẩu',
        metadata: await UserService.forgotPassword(req.body)
    }).send(res);
}

// [POST] /user/password/verify-otp
module.exports.verifyOtp = async (req, res, next) => {
    new SuccessResponse({
        message: 'Nhập mã OTP thành công',
        metadata: await UserService.verifyOtp(req.body)
    }).send(res);
}
// [POST] /user