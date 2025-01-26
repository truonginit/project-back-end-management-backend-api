/**
 * @description Identify Service là service giúp tìm lại khôi phục mật khẩu của tài khoản khách hàng khi quên mật khẩu 
*/

// model
const UserModel = require('../models/user.model');
const OtpModel  = require('../models/otp.model');

// require service
const MailService = require('../services/mail.service');
const KeyStoreService = require('./keyStore.service');

// repo
const { CheckEmailExists, FindUserById } = require('../models/repositories/user.repo');
const { createNewOtp } = require('../models/repositories/otp.repo');

// package
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const jwt = require('jsonwebtoken');

// require core response
const { BadRequestError, NotFoundError } = require('../core/error.response');

// require util
const { generatePairKey, generateRandomNumString } = require('../utils/generate.util');
const { pickFieldInObject } = require('../utils/index.util');
const { createPairToken } = require('../auth/authUtils');

// service
class IdentifyService {
    /**
     * @description Quên mật khẩu => gửi OTP qua mail
     * @param {String} email 
     * @returns 
     */
    static forgotPassword = async ({ email }) => {
        // 1. xác định xem email này có tồn tại không
        const isEmail = await CheckEmailExists({ email, unSelect: ['user_password', '__v'], isLean: false });
        if(!isEmail || isEmail.user_isDeleted) throw new NotFoundError('Not found your email');       // email không hợp lệ hoặc tài khoản đã bị xóa
        
        if(isEmail.user_status !== 'active') throw new BadRequestError(`Your status is ${isEmail.user_status}`); // trạng thái không hợp lý. Ví dụ 'pending' thì chưa xác nhận email
        
        // 2. Check xem với email này đã có OTP nào chưa. Nếu có thì xóa cái OTP cũ
        // await OtpModel.deleteOne({ otp_email: email });  // cái này gặp bất cập từ từ

        const newOtp = await createNewOtp({ email });   // 3. Tạo mã OTP và Lưu OTP vào DB, status's otp = 'pending'
        await MailService.sendToOneRecipient({ toEmail: email, subject: 'Mã OTP Xác Nhận', content: `Mã OTP: ${newOtp.otp_code}` }); // 4. Gửi mail OTP

        const fieldForPick = [ 'user_email', '_id' ];
        return {
            user: pickFieldInObject({ object: isEmail, field: fieldForPick }),  // cứ response lại cho bên FE rồi họ sẽ xử lý
            otp: newOtp.otp_code // không response cái này
        };
    }

    /**
     * @description Nhập OTP để xác thực
     * @param {String} userId 
     * @param {String} email 
     * @param {String} otp 
     * @returns 
     */
    static verifyOtp = async ({ userId, email, otp }) => {
        // check xem email có hợp lệ không
        const foundEmail = await FindUserById({ userId, unSelect: ['user_password', '__v'], isLean: false });
        if(foundEmail.user_email !== email ) throw new BadRequestError(`Email issn't valid`);

        // check xem mã otp có tồn tại không
        const isOtp = await OtpModel.findOne({ otp_code: otp, otp_email: foundEmail.user_email });
        if(!isOtp) throw new BadRequestError('Otp is not valid');
        if(isOtp.otp_status === 'used') throw new BadRequestError(`Status of OTP is ${isOtp.otp_status}`);  // đã sử dụng nên không thể dùng nữa

        // nếu xác thực OTP thành công => đổi trạng thái mã OTP
        isOtp.otp_code = generateRandomNumString(6);    // tạo 1 mã OTP mới để tránh bị hack (mã OTP này sẽ nằm ngầm trong máy do FE chỉnh không hiển thị ra)
        isOtp.otp_status = 'used';  // used tức là xác nhận mã OTP này đã dùng.
        await isOtp.save();

        // return
        const fieldForPick = [ 'user_email', '_id' ];
        return {
            user: pickFieldInObject({ object: foundEmail, field: fieldForPick }), // cứ response lại cho bên FE rồi họ sẽ xử lý
            otp: isOtp.otp_code
        }; 
    }

    /**
     * @description Reset lại / Mật khẩu mới 
     * @param {String} userId 
     * @param {String} email 
     * @param {String} otp 
     * @param {String} password 
     * @returns 
    */
    static resetPassword = async({ userId, email, otp, password }) => {
        // check xem email có hợp lệ không
        const foundEmail = await FindUserById({ userId, unSelect: ['__v'], isLean: false });
        if(foundEmail.user_email !== email ) throw new BadRequestError(`Email isn't valid`);

        // kiểm tra mã otp
        const isOtp = await OtpModel.findOne({ otp_code: otp, otp_email: foundEmail.user_email });
        if(!isOtp) throw new BadRequestError('Otp is not valid');
        if(isOtp.otp_status === 'expired' || isOtp.otp_status === 'pending') 
            throw new BadRequestError(`Status of OTP is ${isOtp.otp_status}`);  // mã đã sử dụng hoặc chưa sử dụng

        // băm mật khẩu
        const passwordHashed = bcrypt.hashSync(password, SALT_ROUNDS);
        foundEmail.user_password = passwordHashed;
        await foundEmail.save();

        // return
        const fieldForPick = [ 'user_email', '_id' ];
        return {
            user: pickFieldInObject({ object: foundEmail, field: fieldForPick })    // done => response về giao diện đăng nhập là được hehe
        }
    }
}

// exports
module.exports = IdentifyService;