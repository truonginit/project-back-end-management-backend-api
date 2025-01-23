// package
const express = require('express');

// controller
const settingGeneralController = require('../../controllers/admin/setting-general.controller');

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
    
// [POST]
router.post('/update-info', permission("settingGeneral_update"), asyncHandler(settingGeneralController.updateInfo));

// [PATCH]

// [DELETE]


// exports
module.exports = router;