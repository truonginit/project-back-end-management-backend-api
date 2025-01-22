// package
const express = require('express');

// controller
const accountController = require('../../controllers/admin/account.controller');

// middleware
const { requireAuth } = require('../../middleware/admin/auth.middleware');
const { validate } = require('../../middleware/admin/validate.middleware');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// schema validation
const { signUp, login, updateMyPassword } = require('../../validations/admin/auth.validation');

// ###################### Login ######################
router.post('/login', validate(login), asyncHandler(accountController.loginAccount) );
    
// ###################### AUTHEN MIDDLEWARE ######################
router.use('', asyncHandler(requireAuth));

// [GET]
router.get('/', asyncHandler(accountController.findAllAccount));
router.get('/detail/:id', asyncHandler(accountController.findDetailAccountById));

// [POST]
router.post('/create', validate(signUp), asyncHandler(accountController.createAccount));
    
// [PATCH]
router.patch('/update-my-password', validate(updateMyPassword), asyncHandler(accountController.updatePassword));
router.patch('/update-one-status/:id/:status', asyncHandler(accountController.updateStatusWithOneAccount));

// [DELETE]
router.delete('/delete-soft/:id', asyncHandler(accountController.deleteSoftOneAccount));

// exports
module.exports = router;