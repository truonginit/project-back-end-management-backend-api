// package
const express = require('express');

// Tạo instance route
const router = express.Router();

// controller
const identifyController = require('../../controllers/client/identify.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// config
const { PATH_PASSWORD } = require('../../config/variable.config');

// [POST]
router.post(PATH_PASSWORD + '/forgot-password', asyncHandler(identifyController.forgotPassword));
router.post(PATH_PASSWORD + '/verify-otp', asyncHandler(identifyController.verifyOtp));
router.post(PATH_PASSWORD + '/reset-password', asyncHandler(identifyController.resetPassword));

// exports
module.exports = router;