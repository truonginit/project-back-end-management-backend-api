// package
const Joi = require('joi');

// schema validation thông tin chung của product

// [POST] /admin/products/create
module.exports.AddStationeryAttribute = {
    product_attributes: {
        brand:      Joi.string().required(),
        madeIn:     Joi.string().required(),
        color:      Joi.string().required(),
        accountId:  Joi.string().required(),
    }
}

// [PATCH] /admin/products/update-one/:productId
module.exports.UpdateStationeryAttribute = {
    product_attributes: {
        brand:      Joi.string().allow(''),
        madeIn:     Joi.string().allow(''),
        color:      Joi.string().allow(''),
        accountId:  Joi.string().allow(''),
    }
}