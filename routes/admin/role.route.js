// package
const express = require('express');

// controller
const roleController = require('../../controllers/admin/role.controller');

// middleware
const { requireAuth } = require('../../middleware/admin/auth.middleware');
const { permission  } = require('../../middleware/admin/permission.middleware'); 

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// ###################### AUTHEN MIDDLEWARE ######################
router.use('', asyncHandler(requireAuth));

// [GET]
router.get('/', permission("role_view"), asyncHandler(roleController.getListRole));
router.get('/detail/:id', permission("role_view"), asyncHandler(roleController.getDetailRole));
    
// [POST]
router.post('/create', permission("role_create"), asyncHandler(roleController.createNewRole));

// [PATCH]
router.patch('/update/:roleId', permission("role_update"), asyncHandler(roleController.updateRole));

// [DELETE]
router.delete('/delete-soft/:id', permission("role_delete"), asyncHandler(roleController.deleteSoft));


// exports
module.exports = router;