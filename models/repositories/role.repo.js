// model
const RoleModel = require('../role.model');

// package
const unidecode = require('unidecode');

// utils
const { 
    selectFieldInMongoose, 
    removeFieldNullOrUndefined, 
    parseObjectIdMongoose 
} = require('../../utils/index.util');

module.exports.findOneRoleByName = async ({ name }) => {
    // tìm cả role_slug và role_name để tránh người dùng cố tình tạo nhóm quyền trùng lập tên

    // CÁCH 1: sử dụng package loại bỏ dấu của từ và dùng regex để thay thế khoảng trống
    const nameRemovedSign = unidecode(name);

    // thay thế toàn bộ khoảng trắng bằng dấu - => sử dụng để tìm kiếm theo slug
    const nameReplacedWhiteSpace = nameRemovedSign.replace(/\s+/g, '-');

    const filter = {
        '$or': [
            {'role_name': name},
            {'role_slug': nameReplacedWhiteSpace}
        ]
    }
    return await RoleModel.findOne(filter);
}