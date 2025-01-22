// model 
const RoleModel = require('../models/role.model');

// repo
const { findCategoryById } = require('../models/repositories/category.repo');
const { findOneAccountById } = require('../models/repositories/account.repo.js');
const { 
    findOneRoleByName, 
    findOneRoleById,
    getListRole
} = require('../models/repositories/role.repo.js');

// core response
const { 
    BadRequestError, 
    NotFoundError 
} = require('../core/error.response');

// utils
const { 
    selectFieldInMongoose, 
    removeFieldNullOrUndefined, 
    parseObjectIdMongoose,
    pickFieldInObject,
    unSelectFieldInMongoose
} = require('../utils/index.util');

const {
    generateSlug
} = require('../utils/generate.util.js');

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

    /**
     * @description Chỉnh sửa (update) nhóm quyền
     * @param {ObjectId} roleId 
     * @param {Object}   payload chứa các thông tin chỉnh sửa
     */
    static updateRole = async ({ roleId, payload }) => {
        const { name , description, permissions } = payload;

        // kiểm tra xem ID của nhóm quyền muốn chỉnh sửa có hợp lệ không ?
        const foundRole = await findOneRoleById({ roleId });
        if(!foundRole) throw new NotFoundError('Không tìm thấy nhóm quyền này');

        // kiểm tra xem cái tên mới của nhóm quyền có bị trùng không
        const nameSlug = generateSlug({ name });
        const filter = {
            /** điều kiện tìm kiếm là 
             *  Không phải nhóm quyền đang muốn chỉnh sửa (loại bỏ ID nhóm quyền đang chỉnh sửa)
             *  Tên của nhóm quyền khác không bị trùng 
            */
            '$and': [
                { '_id': { '$ne': roleId } },
                { 
                    '$or': [
                        {'role_name': name},
                        {'role_slug': nameSlug}
                    ]
                }
            ]
            

        }
        const isExitsRoleName = await RoleModel.findOne(filter);
        if(isExitsRoleName) throw new NotFoundError('Tên nhóm quyền này đã được sử dụng');

        // kiểm tra loại phân quyền có hợp lệ hay không - CHƯA LÀM
        // ....

        // update...
        const filterUpdate = { _id: parseObjectIdMongoose(roleId) };
        const update = { 
            role_name: name, 
            role_description: description,
            role_permissions: permissions,
            role_slug: generateSlug({ name }) // cái này có thể tối ưu bằng cách thêm method cho pre-hook trong model nha
        };
        const options = { new: true };
        const updatedRole = await RoleModel.findOneAndUpdate(filterUpdate, update, options); 

        // select field 
        const selectField = ['_id', 'role_name', 'role_slug', 'role_description', 'role_permissions'];
        return pickFieldInObject({ object: updatedRole, field: selectField })
    }


    /**
     * @description Lấy danh sách nhóm quyền (Mặc định sẽ là lấy tất cả trừ các nhóm quyền đã xóa)
     * @param {String} status 
     * @param {Boolean} isDeleted 
     * @returns 
    */
    static getListRole = async ({ 
        status, 
        isDeleted = false, // mặc định các nhóm quyền chưa xóa
        // còn skip và limit để tính pagination
    }) => {
        const filter = {
            role_status: status,
            role_isDeleted: isDeleted,
            // còn pagination nữa nha
        }

        return await getListRole( removeFieldNullOrUndefined(filter) )
    }


    /**
     * @description Lấy chi tiết nhóm quyền theo ID
     * @param {*} param0 
     * @returns 
    */
    static getDetailRoleById = async ({ roleId, status, isDeleted, unSelect = ["__v"], isLean = true }) => {
        const filter = {
            _id: parseObjectIdMongoose(roleId),
            role_status: status,
            role_isDeleted: isDeleted
        }

        return await RoleModel.findOne(removeFieldNullOrUndefined(filter))
                              .select(unSelectFieldInMongoose(unSelect))
                              .lean(isLean);
    }


    /**
     * @description Xóa mềm nhóm quyền 
     * @param {String} roleId roleId của quyền muốn xóa 
    */
    static deleteSoft = async ({ roleId }) => {
        // kiểm tra nhóm quyền này có tồn tại không
        const foundRole = await findOneRoleById({ roleId, isLean: false });
        if(!foundRole) throw new NotFoundError('Not found role want to delete');

        // xóa mềm
        foundRole.role_status = 'inactive';
        foundRole.role_isDeleted = true;
        await foundRole.save();
        
        // thay đổi tất cả các tài khoản mang nhóm quyền muốn xóa => "NHÂN VIÊN"
    
        return foundRole;
    }
}

// exports
module.exports = RoleService;