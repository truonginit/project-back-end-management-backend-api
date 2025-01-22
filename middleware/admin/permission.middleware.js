/**
 *  @description Middleware check phân quyền 
 *  @param {String} entitle có nghĩa là quyền được phép ví dụ view, update, create, delete
*/

// require model
const RoleModel = require('../../models/role.model');

// require core response
const { NotFoundError } = require('../../core/error.response');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

/**
 * @description kiểm tra xem tài khoản có quyền vào đây không
 * @param {String} entitle 
 * @returns 
*/
module.exports.permission = (entitle) => asyncHandler (async (req, res, next) => {
    // không cần check authen lại.
    const accountId = req.account.accountId; // lấy accountId sau khi đã check authen (nếu cóa)
    const roleId    = req.account.roleId;

    // check xem accountId này có tồn tại không
    const foundRole = await RoleModel.findOne({_id: roleId, role_isDeleted: false});
    if(!foundRole) throw new NotFoundError('Not Found Role');   // không tìm thấy quyền này

    if(!foundRole.role_permissions.includes(entitle)) throw new NotFoundError('Not found your permission');

    return next();
});