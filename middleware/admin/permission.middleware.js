/**
 *  @description Middleware check phân quyền 
 *  @param {String} entitle có nghĩa là quyền được phép ví dụ view, update, create, delete
*/

// require model
const RoleModel = require('../../models/role.model');

// require helper
const asyncHandler = require('../../helpers/asyncHandler.helper');
const { NotFoundError } = require('../../core/error.response');

/**
 * 
 * @param {*} entitle 
 * @returns 
*/
module.exports.permission = (entitle) => asyncHandler(async (req, res, next) => {
    const accountId = req.account.accountId; // lấy accountId sau khi đã check authen (nếu cóa)
    const roleId    = req.account.roleId;

    // kiểm tra xem role này có tồn tại không
    const filter = { _id: roleId, role_isDeleted: false };

    const foundRole = await RoleModel.findOne(filter).lean();
    if(!foundRole) throw new NotFoundError('Not Found Role');

    if(!foundRole.role_permissions.includes(entitle)) throw new (`You doesn't have ${entitle} permission`);
    
    next();
})