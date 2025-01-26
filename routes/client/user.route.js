// package
const express = require('express');

// Tạo instance route
const router = express.Router();

// controller
const userController = require('../../controllers/client/user.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// config
const { PATH_PASSWORD } = require('../../config/variable.config');


// [POST]
router.post('/sign-up', asyncHandler(userController.signUp));
router.post('/login', asyncHandler(userController.login));

router.post(PATH_PASSWORD + '/forgot-password', asyncHandler(userController.forgotPassword));
router.post(PATH_PASSWORD + '/verify-otp', asyncHandler(userController.verifyOtp));

// exports
module.exports = router;