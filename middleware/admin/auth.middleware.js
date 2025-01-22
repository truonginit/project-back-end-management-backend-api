// response core 
const { NotFoundError, BadRequestError } = require('../../core/error.response');

// services
const AccountService = require('../../services/account.service');
const KeyStore       = require('../../services/keyStore.service');

// auth util
const { verifyToken } = require('../../auth/authUtils');

// header http
const HEADERS = {
    ADMIN_ID: 'x-admin-key',        // accountId của tài khoản quản trị
    AUTHORIZATION: 'authorization', // chứa accessToken
    REFRESH_TOKEN: 'x-rtoken-id'    // refreshToken
}

/**
 *  @description verify AccessToken 
*/
const verifyAccessToken = async (token, key, accountId) => {
    // verify, accessToken dùng privateKey để sign nên cũng phải dùng privateKey để verify
    const payload = await verifyToken(token, key);
    if(!payload) throw new BadRequestError('Không giải mã được accessToken');

    // kiểm tra accountId có hợp lệ với payload được giải mã không
    if(payload.accountId !== accountId)
        throw new BadRequestError('accountId không hợp lệ')

    return payload; // { accountId, email }
}

/**
 * @description middleware authentication 
*/
module.exports.requireAuth = async (req, res, next) => {
    // lấy accessToken và accountId
    const accessToken  = req.headers[HEADERS.AUTHORIZATION];
    const refreshToken = req.headers[HEADERS.REFRESH_TOKEN];
    const accountId    = req.headers[HEADERS.ADMIN_ID];   
        
    // kiểm tra accountId này đã đăng nhập chưass
    const haveKeyStore = await KeyStore.findKeyStoreByUserId({ userId: accountId });
    if(!haveKeyStore) throw new BadRequestError('Hãy đăng nhập lại');

    const { privateKey, publicKey } = haveKeyStore;

    // ############# Kiểm tra refreshToken #############
    // nếu là kiểm tra refreshToken thì refreshToken sẽ không null
    if(refreshToken) {
        // response
    }

    // ############# Kiểm tra accessToken #############
    if(!accessToken) throw new NotFoundError('Không tìm thấy accessToken');
    req.account =  await verifyAccessToken(accessToken, privateKey, accountId); // res.locals.account hoặc req.account = reuslt vẫn ok
    // req.role    = ... 

    // next middleware
    next();
}