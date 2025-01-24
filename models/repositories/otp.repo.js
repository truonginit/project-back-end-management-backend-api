// util
const { generateRandomNumString } = require('../../models/repositories/otp.repo');


// model
const OtpModel = require('../otp.model');


/**
 * @description Tạo mới một mã OTP 
 * @param {*} param0 
 * @returns 
*/
module.exports.createNewOtp = async ({ email }) => {
    const otp = generateRandomNumString(6);
    return await OtpModel.create({ otp_code: otp, otp_email: email });
}