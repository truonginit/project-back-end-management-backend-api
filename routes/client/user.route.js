// package
const express = require('express');

// Tạo instance route
const router = express.Router();

// controller
const userController = require('../../controllers/client/user.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// [POST]
router.post('/sign-up', asyncHandler(userController.signUp));


// exports
module.exports = router;