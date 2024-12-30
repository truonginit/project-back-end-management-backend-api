// package
const express = require('express');

// controller
const productController = require('../../controllers/admin/product.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// [GET]


// [POST]
router.post('/create', asyncHandler(productController.createProduct));


// [PATCH]



// exports
module.exports = router;