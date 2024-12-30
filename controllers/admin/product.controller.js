// service
const ProductFactoryService = require('../../services/product.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

// [POST] /admin/products/create
module.exports.createProduct = async (req, res, next) => {
    new SuccessResponse({
        message: 'Tạo mới tài khoản quản trị thành công',
        metadata: await ProductFactoryService.createProduct({
            type: req.body.type,
            payload: req.body
        })
    }).send(res);
}