// package
const express = require('express');

// controller
const roleController = require('../../controllers/admin/role.controller');

// middleware
const { requireAuth } = require('../../middleware/admin/auth.middleware');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// ###################### AUTHEN MIDDLEWARE ######################
router.use('', asyncHandler(requireAuth));

// [GET]
router.get('/', asyncHandler(roleController.getListRole));

// [POST]
router.post('/create', asyncHandler(roleController.createNewRole));

// [PATCH]
router.patch('/update/:roleId', asyncHandler(roleController.updateRole));


// exports
module.exports = router;