// service
const IdentifyService = require('../../services/identify.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

// [POST] /identify/password/forgot-password
module.exports.forgotPassword = async (req, res, next) => {
    new SuccessResponse({
        message: 'Quên mật khẩu',
        metadata: await IdentifyService.forgotPassword(req.body)
    }).send(res);
}

// [POST] /identify/password/verify-otp
module.exports.verifyOtp = async (req, res, next) => {
    new SuccessResponse({
        message: 'Nhập mã OTP thành công',
        metadata: await IdentifyService.verifyOtp(req.body)
    }).send(res);
}

// [POST] /identify/password/reset-password
module.exports.resetPassword = async (req, res, next) => {
    new SuccessResponse({
        message: 'Thay đổi mật khẩu thành công',
        metadata: await IdentifyService.resetPassword(req.body)
    }).send(res);
}