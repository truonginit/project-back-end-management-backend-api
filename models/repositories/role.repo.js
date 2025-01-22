// model
const RoleModel = require('../role.model');

// package
const unidecode = require('unidecode');

// utils
const { 
    selectFieldInMongoose, 
    removeFieldNullOrUndefined, 
    parseObjectIdMongoose, 
    unSelectFieldInMongoose
} = require('../../utils/index.util');


const {
    generateSlug
} = require('../../utils/generate.util');

/**
 * @description Tìm nhóm quyền theo tên của nó (lưu ý sẽ tìm theo slug nữa)
 * @param {*} param0 
 * @returns 
 */
module.exports.findOneRoleByName = async ({ name }) => {
    // tìm cả role_slug và role_name để tránh người dùng cố tình tạo nhóm quyền trùng lập tên

    /** ####################### Có 2 cách tạo slug ####################### */
    // CÁCH 1: sử dụng package loại bỏ dấu của từ và dùng regex để thay thế khoảng trống
    const nameSlug = generateSlug({ name });
    
    // CÁCH 2: Sử dụng luôn thư viện slugify
    // ...

    // filter
    const filter = {
        '$or': [
            {'role_name': name},
            {'role_slug': nameSlug}
        ]
    }
    return await RoleModel.findOne(filter);
}


/**
 * @description Tìm nhóm quyền theo ID
 * @param {*} param0 
 * @returns 
 */
module.exports.findOneRoleById = async ({ roleId, status, isDeleted, unSelect = ['__v'], isLean = true }) => {
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
 * @description Lấy danh sách nhóm quyền - mặc định các nhóm quyền chưa xóa
 * @param {*} param0 
 * @returns 
 */
module.exports.getListRole = async ( filter ) => {
    return await RoleModel.find( filter ).lean();
}