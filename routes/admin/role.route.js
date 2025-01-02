// package
const express = require('express');

// controller
const roleController = require('../../controllers/admin/role.controller');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// [GET]


// [POST]
router.post('/create', asyncHandler(roleController.createNewRole));


// [PATCH]
router.patch('/update/:roleId', asyncHandler(roleController.updateRole));


// exports
module.exports = router;