// service
const AccountService = require('../../services/account.service');

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
    const data = await AccountService.createAccount({
        ...req.body
    });

    res.status(200).json(data);
}