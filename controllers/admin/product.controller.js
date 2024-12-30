// service
const ProductFactoryService = require('../../services/product.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

// [POST] /admin/products/create
/**
 * @description Function này sẽ tạo sản phẩm 
 * @param {String} type giúp lấy ra class tương ứng với sản phẩm muốn tạo
 * @param {Object} payload 
 * @returns 
*/
module.exports.createProduct = async (req, res, next) => {
    new SuccessResponse({
        message: 'Tạo mới sản phẩm thành công',
        metadata: await ProductFactoryService.createProduct({
            type: req.body.type,
            payload: req.body
        })
    }).send(res);
}

// [GET] /admin/products/
/**
 * @description Lấy danh sách sản phẩm theo query
 * @param {String} status 
 * @param {Boolean} isDeleted 
*/
module.exports.getAllProduct = async (req, res, next) => {
    new SuccessResponse({
        message: 'Lấy danh sách sản phẩm thành công',
        metadata: await ProductFactoryService.getAllProductByQuery(req.query)
    }).send(res);  
}

// [GET] /admin/products/detail/:slug
/**
 * @description Lấy chi tiết sản phẩm theo slug
 * @param {String} slug 
 * @param {String} status 
 * @param {Array}  unSelect 
 * @return {JSON}
*/
module.exports.getDetailProductBySlug = async (req, res, next) => {
    new SuccessResponse({
        message: 'Lấy chi tiết sản phẩm',
        metadata: await ProductFactoryService.getDetailProductBySlug({
            params: req.params,
            query : req.query
        })
    }).send(res);  
}