// service
const ProductFactoryService = require('../../services/product.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

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

// [PATCH] /admin/products/change-status/:productId/:status
/**
 * @description Thay đổi trạng thái của một sản phẩm
 * @param {String} productId 
 * @param {String} status 
 * @param {JSON} 
 */
module.exports.changeStatusOfOneProduct = async (req, res, next) => {
    new SuccessResponse({
        message: 'Thay đổi trạng thái của một sản phẩm',
        metadata: await ProductFactoryService.changeStatusOfOneProduct(req.params)
    }).send(res);  
}

// [PATCH] /admin/products/update-one/:productId
/**
 * @description Chỉnh sửa một sản phẩm
 * @param {String} type 
 * @param {ObjectId} productId 
 * @param {Object} payload 
 * @return {JSON}
 */
module.exports.updateOneProduct = async (req, res, next) => {
    new SuccessResponse({
        message: 'Cập nhật một sản phẩm',
        metadata: await ProductFactoryService.updateOneProduct({
            type: req.body.type,
            productId: req.params.productId,
            payload: req.body
        })
    }).send(res);  
}

// [DELETE] /admin/products/delete-soft/:productId
/**
 * @description Xóa mềm một sản phẩm
 * @param {String} productId 
 * @return {JSON}
*/
module.exports.deleteSoftOneProduct = async (req, res, next) => {
    new SuccessResponse({
        message: 'Xóa mềm một sản phẩm',
        metadata: await ProductFactoryService.deleteSoftOneProduct(req.params)
    }).send(res);  
}

