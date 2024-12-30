// model
const ProductModel = require('../product.model');

// utils
const { unSelectFieldInMongoose, removeFieldNullOrUndefined } = require('../../utils/index.util');

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
module.exports.getDetailProductBySlug = async ({ slug, status, unSelect = [] }) => {
    const filter = {
        product_slug: slug,
        product_status: status
    }

    return await ProductModel.findOne(removeFieldNullOrUndefined(filter))
                             .select(unSelectFieldInMongoose(unSelect))
                             .lean();
}