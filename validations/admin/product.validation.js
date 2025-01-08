// package
const Joi = require('joi');

// schema validation thông tin chung của product

// [POST] /admin/products/create
module.exports.AddProductGeneralJoi = {
    body: {
        product_categoryId:     Joi.string().required(),
        product_accountId:      Joi.string().required(),
        product_type:           Joi.string().required(),
        product_name:           Joi.string().required(),
        product_description:    Joi.string().required(),
        product_thumb:          Joi.array().required(),
        product_quantity:       Joi.number().min(1).required(),
        product_price:          Joi.number().min(1000).required(), // ít nhất 1.000 vnd
        product_attributes:     Joi.object().required(),
    }
}

// [PATCH] /admin/products/update-one/:productId
module.exports.UpdateProductGeneralJoi = {
    params: {
        productId: Joi.string().required()
    },
    body: {
        product_categoryId:     Joi.string().allow(''),
        product_accountId:      Joi.string().allow(''),
        product_type:           Joi.string().allow(''),
        product_name:           Joi.string().allow(''),
        product_description:    Joi.string().allow(''),
        product_thumb:          Joi.array().allow(''),
        product_quantity:       Joi.number().min(1).allow(''),
        product_price:          Joi.number().min(1000).allow(''), // ít nhất 1.000 vnd
        product_attributes:     Joi.object().allow(''),
    }
}

// [PATCH] /admin/products/change-status/:productId/:status
module.exports.changeStatusJoi = {
    params: {
        productId: Joi.string().required(),
        status: Joi.string().required
    }
}

// [DELETE] /admin/products/delete-soft/:productId
module.exports.deleteProductJoi = {
    params: {
        productId: Joi.string().required(),
    }
}