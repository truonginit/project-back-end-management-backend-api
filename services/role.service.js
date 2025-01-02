// model 
const RoleModel = require('../models/role.model');

// repo
const { findCategoryById } = require('../models/repositories/category.repo');
const { findOneAccountById } = require('../models/repositories/account.repo.js');
const { findOneRoleByName } = require('../models/repositories/role.repo.js');

// core response
const { BadRequestError, NotFoundError } = require('../core/error.response');

// utils
const { 
    selectFieldInMongoose, 
    removeFieldNullOrUndefined, 
    parseObjectIdMongoose,
    pickFieldInObject
} = require('../utils/index.util');

// service
class RoleService {
    /**
     * @description Tạo nhóm quyền mới
     * @param {String} name 
     * @param {String} description 
     * @param {ObjectId} accountId 
     * @return {}
    */
    static createNewRole = async ({ name, description, accountId }) => {
        // kiểm tra accountId (ID tài khoản quản trị) có hợp lệ không  
        const foundAccount = await findOneAccountById({ accountId });
        if(!foundAccount) throw new NotFoundError('Tài khoản tạo quyền này không hợp lệ');

        // kiểm tra xem tên nhóm quyền này đã tồn tại chưa
        const isExitsRoleName = await findOneRoleByName({ name });
        if(isExitsRoleName) throw new BadRequestError('Tên của nhóm quyền này đã tồn tại');

        // tạo nhóm quyền mới
        const newRole = await RoleModel.create({
            role_name: name,
            role_description: description,
            role_accountId: parseObjectIdMongoose(accountId)
        });

        if(!newRole) throw new BadRequestError('Tạo nhóm quyền mới thất bại');

        // select field
        const selectField = [ 'role_name', "role_description", 'role_slug' ];
        return pickFieldInObject({ object: newRole, field: selectField });
    }
}

// exports
module.exports = RoleService;