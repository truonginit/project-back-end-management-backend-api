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
router.get('/pending/all', asyncHandler(discountController.getListDiscountPending));
router.get('/active/all', asyncHandler(discountController.getListDiscountActive));
router.get('/inactive/all', asyncHandler(discountController.getListDiscountInActive));

// [POST]
router.post('/create', asyncHandler(discountController.createNewDiscount));


// [PATCH]
router.patch('/update-status/:id/:status', asyncHandler(discountController.updateStatus));

// [DELETE]
router.delete('/delete-soft/:id', asyncHandler(discountController.deleteSoft));

// exports
module.exports = router;