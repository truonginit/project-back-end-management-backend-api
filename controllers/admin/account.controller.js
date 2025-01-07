// service
const AccountService = require('../../services/account.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

// [GET] /admin/accounts/
/**
 * @description Tìm kiếm tài khoản quản trị (theo query)
 * @param {String}  status
 * @param {Boolean} isDeleted,
 * @param {Array}   select 
 * @return {JSON}
*/
module.exports.findAllAccount = async (req, res, next) => {
    new SuccessResponse({
        message: 'Tìm toàn bộ tài khoản quản trị theo query',
        metadata: await AccountService.findAllAccount({
            ...req.query,
            select: ['account_name', 'account_email', 'account_tel', 'account_avatar']
        })
    }).send(res);
}

// [GET] /admin/accounts/detail/:id
/**
 * @description Lấy chi tiết tài khoản theo ID
 * @return {JSON}
*/
module.exports.findDetailAccountById = async (req, res, next) => {
    new SuccessResponse({
        message: 'Lấy thông tin chi tiết tài khoản',
        metadata: await AccountService.findDetailAccountById({ accountId: req.params.id })
    }).send(res);
}

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

// [POST] /admin/accounts/login
module.exports.loginAccount = async (req, res, next) => {
    new SuccessResponse({
        message: 'Đăng nhập tài khoản quản trị thành công',
        metadata: await AccountService.loginAccount(req.body)
    }).send(res);
}

// [POST] /admin/accounts/delete-soft/:id
module.exports.deleteSoftOneAccount = async (req, res, next) => {
    new SuccessResponse({
        message: 'Xóa mềm 1 tài khoản quản trị thành công',
        metadata: await AccountService.deleteAccountById({
            accountIdForDelete: req.params.id,
            accountId: req.account?.accountId
        })
    }).send(res);
    
}