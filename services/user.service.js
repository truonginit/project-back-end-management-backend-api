// model
const UserModel = require('../models/user.model');

// repo
const {
    CheckEmailExists
} = require('../models/repositories/user.model');

// package
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const { BadRequestError } = require('../core/error.response');
const { generatePairKey } = require('../utils/generate.util');
const { createPairToken } = require('../auth/authUtils');
const KeyStoreService = require('./keyStore.service');

// service
class UserService {
    static signUp = async ({ email, password }) => {
        console.log(`login:::`);
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

        return {
            user: newUser,
            accessToken, 
            refreshToken
        }
    }
}

// exports
module.exports = UserService;