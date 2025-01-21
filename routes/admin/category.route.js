// package
const express = require('express');

// controller
const categoryController = require('../../controllers/admin/category.controller');

// middleware
const { requireAuth } = require('../../middleware/admin/auth.middleware');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// ###################### AUTHEN MIDDLEWARE ######################
router.use('', asyncHandler(requireAuth));

// [GET]
router.get('/', asyncHandler(categoryController.findAllCategory));

// [POST]
router.post('/create', asyncHandler(categoryController.createNewCategory));


// [PATCH]



// exports
module.exports = router;