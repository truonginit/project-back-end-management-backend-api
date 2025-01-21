// model
const CategoryModel = require('../category.model');

// utils
const { selectFieldInMongoose, removeFieldNullOrUndefined, parseObjectIdMongoose, unSelectFieldInMongoose } = require('../../utils/index.util');

/**
 * @description Tìm danh mục theo ID 
 * @param {*} param0 
 * @returns 
*/
module.exports.findCategoryById = async ({ categoryId, status, isDeleted, isLean = true }) => {
    const filter = {
        _id: parseObjectIdMongoose(categoryId),
        category_status: status || undefined,
        category_isDeleted: isDeleted || undefined
    };

    return await CategoryModel.findOne(removeFieldNullOrUndefined(filter)).lean(isLean);
}


/**
 * @description Lấy danh sách danh mục 
 * @param {String} status 
 * @param {Boolean} isDeleted 
 * @returns 
*/
module.exports.findAllCategory = async ({ status, isDeleted , unSelect = ['__v'], isLean = true }) => {
    const filter = {
        category_status: status,
        category_isDeleted: isDeleted
    };

    return await CategoryModel.find(removeFieldNullOrUndefined(filter))
                              .select(unSelectFieldInMongoose(unSelect))
                              .lean(isLean);
}