// package
const express = require('express');

// Tạo instance route
const router = express.Router();

// controller
const cartController = require('../../controllers/client/cart.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// [POST]
router.post('/add', asyncHandler(cartController.addProductToCart));

// exports
module.exports = router;