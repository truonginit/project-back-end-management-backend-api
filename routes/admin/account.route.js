// package
const express = require('express');

// controller
const accountController = require('../../controllers/admin/account.controller');

// middleware
const { requireAuth } = require('../../middleware/admin/auth.middleware');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// login
router.post('/login',  asyncHandler(accountController.loginAccount));

// ###################### AUTHEN MIDDLEWARE ######################
router.use('', asyncHandler(requireAuth));

// [GET]
router.get('/', asyncHandler(accountController.findAllAccount));
router.get('/detail/:id', asyncHandler(accountController.findDetailAccountById));

// [POST]
router.post('/create', asyncHandler(accountController.createAccount));

// [PATCH]

// exports
module.exports = router;