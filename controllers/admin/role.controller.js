// service
const RoleService = require('../../services/role.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

// [GET] /admin/roles/
/**
 * @description Lấy danh sách nhóm quyền
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getListRole = async (req, res, next) => {
    new SuccessResponse({
        message: 'Lấy danh sách nhóm quyền',
        metadata: await RoleService.getListRole( req.query )
    }).send(res);
}

// [GET] /admin/roles/detail/:id
/**
 * @description Lấy chi tiết nhóm quyền
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getDetailRole = async (req, res, next) => {
    new SuccessResponse({
        message: 'Lấy chi tiết nhóm quyền',
        metadata: await RoleService.getDetailRoleById( { roleId: req.params.id } )
    }).send(res);
}

// [POST] /admin/roles/create
/**
 * @description Tạo nhóm quyền mới
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/
module.exports.createNewRole = async (req, res, next) => {
    new SuccessResponse({
        message: 'Tạo nhóm quyền mới thành công',
        metadata: await RoleService.createNewRole({
            ...req.body,
            accountId: req.account.accountId
        })
    }).send(res);
}

// [PATCH] /admin/roles/update/:roleId
module.exports.updateRole = async (req, res, next) => {
    new SuccessResponse({
        message: 'Chỉnh sửa nhóm quyền thành công',
        metadata: await RoleService.updateRole({
            roleId: req.params.roleId,
            payload: req.body
        })
    }).send(res);
}

// [DELETE] /admin/roles/delete-soft/:id
module.exports.deleteSoft = async (req, res, next) => {
    new SuccessResponse({
        message: 'Xóa nhóm quyền thành công',
        metadata: await RoleService.deleteSoft({
            roleId: req.params.id
        })
    }).send(res);
}