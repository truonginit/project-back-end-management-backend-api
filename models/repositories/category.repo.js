// model
const CategoryModel = require('../category.model');

// utils
const { selectFieldInMongoose, removeFieldNullOrUndefined, parseObjectIdMongoose } = require('../../utils/index.util');

module.exports.findCategoryById = async ({ categoryId, status = null, isDeleted = null, isLean = true }) => {
    const filter = {
        _id: parseObjectIdMongoose(categoryId),
        category_status: status,
        category_isDeleted: isDeleted
    };
    return await CategoryModel.findOne(removeFieldNullOrUndefined(filter)).lean(isLean);
}