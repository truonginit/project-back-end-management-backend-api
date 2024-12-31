// package
const express = require('express');

// controller
const categoryController = require('../../controllers/admin/category.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// [GET]


// [POST]
router.post('/create', asyncHandler(categoryController.createNewCategory));


// [PATCH]



// exports
module.exports = router;