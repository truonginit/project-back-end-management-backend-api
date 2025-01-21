// service
const CategoryService = require('../../services/category.service');

// core response
const { SuccessResponse } = require('../../core/success.response');


// [GET] /admin/categories/
/**
 * @description Lấy toàn bộ danh mục
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.findAllCategory = async (req, res, next) => {
    new SuccessResponse({
        message: 'Lấy danh sách danh mục thành công',
        metadata: await CategoryService.findAllCategory(req?.query)
    }).send(res);
}

// [GET] /admin/categories/detail/:id
/**
 * @description Lấy chi tiết danh mục
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.findDetailCategoryById = async (req, res, next) => {
    new SuccessResponse({
        message: 'Lấy chi tiết danh mục theo ID thành công',
        metadata: await CategoryService.findDetailCategoryById({
            categoryId: req.params.id,
            ...req.query
        })
    }).send(res);
}


// [GET] /admin/categories/tree-category
/**
 * @description Lấy cây danh mục
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getTreeCategory = async (req, res, next) => {
    new SuccessResponse({
        message: 'Lấy cây danh mục thành công',
        metadata: await CategoryService.getTreeCategory()
    }).send(res);
}

// [POST] /admin/categories/create
/**
 * @description Tạo danh mục mới
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.createNewCategory = async (req, res, next) => {
    new SuccessResponse({
        message: 'Tạo danh mục mới thành công',
        metadata: await CategoryService.createNewCategory({
            ...req.body
        })
    }).send(res);
}

// [PATCH] /admin/categories/update-status/:id/:status
module.exports.updateStatus = async (req, res, next) => {
    new SuccessResponse({
        message: 'Thay đổi trạng thái danh mục thành công',
        metadata: await CategoryService.updateStatusOfOneCategory({ categoryId: req.params.id, status: req.params.status })
    }).send(res);
}

// [DELETE] /admin/categories/delete-soft/:id
module.exports.deleteSoft = async (req, res, next) => {
    new SuccessResponse({
        message: 'Xóa danh mục thành công',
        metadata: await CategoryService.deleteSoft({ categoryId: req.params.id })
    }).send(res);
}