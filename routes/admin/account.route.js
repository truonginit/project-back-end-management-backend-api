// package
const express = require('express');

// controller
const accountController = require('../../controllers/admin/account.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// [GET]
router.get('/', asyncHandler(accountController.findAllAccount));
router.get('/detail/:id', asyncHandler(accountController.findDetailAccountById));

// [POST]
router.post('/create', asyncHandler(accountController.createAccount));
router.post('/login',  asyncHandler(accountController.loginAccount));


// [PATCH]



// exports
module.exports = router;