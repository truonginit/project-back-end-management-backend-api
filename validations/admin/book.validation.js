// package
const Joi = require('joi');

// schema validation thông tin chung của product

// [POST] /admin/products/create
module.exports.AddBookAttributeJoi = {
    product_attributes: {
        provider:   Joi.string().required(),
        author:     Joi.string().required(),
        cover:      Joi.string().required(),
        lang:       Joi.string().required(),
        accountId:  Joi.string().required(),
    }
}

// [POST] /admin/products/update-one/:productId
module.exports.UpdateBookAttributeJoi = {
    product_attributes: {
        provider:   Joi.string().allow(''),
        author:     Joi.string().allow(''),
        cover:      Joi.string().allow(''),
        lang:       Joi.string().allow(''),
        accountId:  Joi.string().required(),
    }
}