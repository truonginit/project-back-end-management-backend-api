// package
const express = require('express');

// Tạo instance route
const router = express.Router();

// controller
const cartController = require('../../controllers/client/cart.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// [GET]
router.get('/detail/:id', asyncHandler(cartController.getInfoCart));


// [POST]
router.post('/add', asyncHandler(cartController.addProductToCart));
router.post('/remove', asyncHandler(cartController.removeProductFromCart));

// exports
module.exports = router;