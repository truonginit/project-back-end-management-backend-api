// package
const express = require('express');

// Tạo instance route
const router = express.Router();

// controller
const AuthController = require('../../controllers/client/auth.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// [POST]
router.post('/sign-up', asyncHandler(AuthController.signUp));


// exports
module.exports = router;