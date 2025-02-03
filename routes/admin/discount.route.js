// package
const express = require('express');

// controller
const discountController = require('../../controllers/admin/discount.controller');

// middleware
const { requireAuth } = require('../../middleware/admin/auth.middleware');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// ###################### AUTHEN MIDDLEWARE ######################
router.use('', asyncHandler(requireAuth));

// [GET]
// router.get('/', asyncHandler(categoryController.findAllCategory));
// router.get('/detail/:id', asyncHandler(categoryController.findDetailCategoryById));
// router.get('/tree-category', asyncHandler(categoryController.getTreeCategory));

// [POST]
router.post('/create', asyncHandler(discountController.createNewDiscount));


// [PATCH]
router.patch('/update-status/:id/:status', asyncHandler(discountController.updateStatus));

// [DELETE]
// router.delete('/delete-soft/:id', asyncHandler(categoryController.deleteSoft));

// exports
module.exports = router;