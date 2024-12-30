// package
const express = require('express');

// controller
const productController = require('../../controllers/admin/product.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// [GET]
router.get('/', asyncHandler(productController.getAllProduct));

router.get('/detail/:slug', asyncHandler(productController.getDetailProductBySlug));

// [POST]
router.post('/create', asyncHandler(productController.createProduct));

// [PATCH]
router.patch('/change-status/:productId/:status', asyncHandler(productController.changeStatusOfOneProduct));
router.patch('/update-one/:productId', asyncHandler(productController.updateOneProduct));

// [DELETE]
router.delete('/delete-soft/:productId', asyncHandler(productController.deleteSoftOneProduct));

// exports
module.exports = router;