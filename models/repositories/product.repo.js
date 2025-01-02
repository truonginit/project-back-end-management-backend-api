// model
const ProductModel = require('../product.model');

// utils
const { unSelectFieldInMongoose, removeFieldNullOrUndefined, parseObjectIdMongoose, selectFieldInMongoose } = require('../../utils/index.util');

/**
 * @description Lấy danh sách sản phẩm theo query
 * @param {String} status
 * @param {Boolean} isDeleted
 * @param {Array} unSelect
 * @return
*/
module.exports.getAllProductByQuery = async ({ status, isDeleted, unSelect = [] }) => {
    const filter = {
        product_status: status,
        product_isDeleted: isDeleted
    }

    return ProductModel.find(removeFieldNullOrUndefined(filter))
                       .populate("product_accountId", 'account_name')
                       .populate("product_categoryId", 'category_name')
                       .select(unSelectFieldInMongoose(unSelect))
                       .lean();
}

/**
 * @description Lấy chi tiết sản phẩm theo slug
 * @param {String} slug 
 * @param {String} status 
 * @param {Array}  unSelect 
 * @return
*/
module.exports.getDetailProductBySlug = async ({ slug, status, unSelect = [], isLean = true }) => {
    const filter = {
        product_slug: slug,
        product_status: status
    }

    return await ProductModel.findOne(removeFieldNullOrUndefined(filter))
                             .populate("product_accountId", 'account_name')
                             .populate("product_categoryId", 'category_name')
                             .select(unSelectFieldInMongoose(unSelect))
                             .lean(isLean);
}

/**
 * @description Xóa mềm một sản phẩm
 * @param {String}  productId 
 * @param {Array}   select 
 * @param {Boolean} isLean 
 * @return 
*/
module.exports.getDetailProductById = async ({ productId, select, isLean = true }) => {
    return await ProductModel.findOne({ _id: parseObjectIdMongoose(productId) })
                             .populate("product_accountId", 'account_name')
                             .populate("product_categoryId", 'category_name')
                             .select(selectFieldInMongoose(select))
                             .lean(isLean)
}

/**
 * @description Chỉnh sửa 1 sản phẩm, phương thức kết hợp atomic
 * @param {*} param0 
 * @returns 
*/
module.exports.updateOneProduct = async ({ payload, model }) => {
    // update các thuộc tính của sản phẩm Sách
    const { filter, update, options } = payload;
    return await model.findOneAndUpdate(filter, update, options);
}