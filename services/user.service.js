// model
const UserModel = require('../models/user.model');
const OtpModel  = require('../models/otp.model');

// require service
const MailService = require('../services/mail.service');
const KeyStoreService = require('./keyStore.service');

// repo
const {
    CheckEmailExists
} = require('../models/repositories/user.model');

// package
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// require core response
const { BadRequestError, NotFoundError } = require('../core/error.response');

// require util
const { 
    generatePairKey,
    generateRandomNumString
} = require('../utils/generate.util');
const { pickFieldInObject } = require('../utils/index.util');
const { createPairToken } = require('../auth/authUtils');



// service
class UserService {

    /**
     * @description Đăng ký tài khoản khách hàng (Khi đăng ký thì sẽ vào luôn)
     * @param {String} email
     * @param {String} password
     * @returns 
    */
    static signUp = async ({ email, password }) => {
        // 1. Kiểm tra xem email này có tồn tại không
        const isEmailExits = await CheckEmailExists({ email });

        if(isEmailExits) throw new BadRequestError('Email is exists');

        // 2. Băm mật khẩu
        const passwordHashed = bcrypt.hashSync(password, SALT_ROUNDS);

        // 3. Tạo mới tài khoản
        const newUser = await UserModel.create({
            user_name: email.slice(0, email.indexOf('@')),
            user_email: email,
            user_password: passwordHashed
        });

        if(!newUser) throw new BadRequestError('Create new user failure');

        // --------- SỬ DỤNG SEND MAIL OTP ĐỂ XÁC NHẬN MAIL -------- //
        // ...

        // --------- TẠO ACCESS TOKEN VÀ REFRESH TOKEN --------- //
        const { publicKey, privateKey } = generatePairKey(64);

        const payload = {
            userId: newUser.id,
            email
        }

        const { accessToken, refreshToken } = await createPairToken({ payload, publicKey, privateKey });
        const saveKeyOnDb = await KeyStoreService.saveKeyToken({
            userId: newUser.id,
            publicKey,
            privateKey,
            refreshToken
        });

        const fieldForPick = [
            'user_name',
            'user_email',
            'user_avatar',
            '_id'
        ];
        return {
            user: pickFieldInObject({ object: newUser, field: fieldForPick }),
            accessToken, 
            refreshToken
        }
    }

    /**
     * @description Đăng ký tài khoản khách hàng (Khi đăng ký thì sẽ gửi link xác nhận qua email)
     * @param {String} email
     * @param {String} password
     * @returns 
    */
    static signUpV2 = async ({ email, password }) => {
        // 1. Kiểm tra xem email này có tồn tại không
        const isEmailExits = await CheckEmailExists({ email });

        if(isEmailExits) throw new BadRequestError('Email is exists');

        // 2. Băm mật khẩu
        const passwordHashed = bcrypt.hashSync(password, SALT_ROUNDS);

        // 3. Tạo mới tài khoản
        const newUser = await UserModel.create({
            user_name: email.slice(0, email.indexOf('@')),
            user_email: email,
            user_password: passwordHashed
        });

        if(!newUser) throw new BadRequestError('Create new user failure');

        // --------- SỬ DỤNG SEND MAIL LINK ĐỂ XÁC NHẬN MAIL -------- //

    }

    /**
     * @description Đăng nhập tài khoản khách hàng 
     * @param {String} email
     * @param {String} password
     * @returns 
    */
    static login = async ({ email, password }) => {
        // 1. Kiểm tra xem email này có hợp lý không
        const isEmail = await CheckEmailExists({ email, isLean: false });
        if(!isEmail) throw new NotFoundError('Not found your email');       // email không hợp lệ

        // trạng thái không hợp lý. Ví dụ 'pending' thì chưa xác nhận email
        if(isEmail.user_status !== 'active') throw new BadRequestError(`Your status is ${isEmail.user_status}`);

        // 2. Kiểm tra mật khẩu có hợp lý không
        const isPassword = bcrypt.compareSync(password, isEmail.user_password); // true || false
        if(!isPassword) throw new BadRequestError(`Can't login`);           // mật khẩu không đúng

         // --------- TẠO ACCESS TOKEN VÀ REFRESH TOKEN --------- //
         const { publicKey, privateKey } = generatePairKey(64);

         const payload = {
             userId: isEmail.id,
             email
        }
 
        const { accessToken, refreshToken } = await createPairToken({ payload, publicKey, privateKey });
        const saveKeyOnDb = await KeyStoreService.saveKeyToken({
            userId: isEmail.id,
            publicKey,
            privateKey,
            refreshToken
        });

        const fieldForPick = [
            'user_name',
            'user_email',
            'user_avatar',
            '_id'
        ];

        return {
            // không được response về UI cái mật khẩu
            user: pickFieldInObject({ object: isEmail, field: fieldForPick }),
            accessToken, 
            refreshToken
        }
    }
    
    /**
     * @description Quên mật khẩu => gửi OTP qua mail
     * @param {*} param0 
     * @returns 
     */
    static forgotPassword = async ({ email }) => {
        // 1. xác định xem email này có tồn tại không
        const isEmail = await CheckEmailExists({ email, isLean: false });
        if(!isEmail) throw new NotFoundError('Not found your email');       // email không hợp lệ

        // trạng thái không hợp lý. Ví dụ 'pending' thì chưa xác nhận email
        if(isEmail.user_status !== 'active') throw new BadRequestError(`Your status is ${isEmail.user_status}`);
        
        // 2. Check xem với email này đã có OTP nào chưa. Nếu có thì xóa cái OTP cũ
        await OtpModel.deleteOne({ otp_email: email });

        // 3. Tạo mã OTP và Lưu OTP vào DB
        const otp = generateRandomNumString(6);
        const newOtp = await OtpModel.create({ otp_code: otp, otp_email: email });

        // 4. Gửi mail OTP
        await MailService.sendToOneRecipient({ toEmail: email, subject: 'Mã OTP Xác Nhận', content: `Mã OTP: ${otp}` });

        return otp;
    }
}

// exports
module.exports = UserService;