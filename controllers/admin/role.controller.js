// service
const RoleService = require('../../services/role.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

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
            ...req.body
        })
    }).send(res);
}