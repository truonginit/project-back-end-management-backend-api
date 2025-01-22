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
<<<<<<< HEAD
router.get('/', permission("role_view"), asyncHandler(roleController.getListRole));
router.get('/detail/:id', permission("role_view"), asyncHandler(roleController.getDetailRole));
    
// [POST]
router.post('/create', permission("role_create"), asyncHandler(roleController.createNewRole));

// [PATCH]
router.patch('/update/:roleId', permission("role_update"), asyncHandler(roleController.updateRole));
     
    
    

=======
router.get('/', asyncHandler(roleController.getListRole));

// [POST]
router.post('/create', asyncHandler(roleController.createNewRole));

// [PATCH]
router.patch('/update/:roleId', asyncHandler(roleController.updateRole));
>>>>>>> parent of fec00db (tính năng)


// exports
module.exports = router;