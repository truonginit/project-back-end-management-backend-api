// model
const ProductModel = require('../product.model');

// utils
const { unSelectFieldInMongoose, removeFieldNullOrUndefined } = require('../../utils/index.util');

module.exports.getAllProductByQuery = async ({ status, isDeleted, unSelect = [] }) => {
    const filter = {
        product_status: status,
        product_isDeleted: isDeleted
    }

    return ProductModel.find(removeFieldNullOrUndefined(filter))
                       .populate("product_accountId", 'account_name')
                       .select(unSelectFieldInMongoose(unSelect));
}