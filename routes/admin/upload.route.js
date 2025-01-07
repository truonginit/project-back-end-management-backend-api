// package
const express = require('express');
const multer  = require('multer');

// config
const { uploadDiskStorage } = require('../../config/multer.config');

// initialize multer disk
// const upload = multer({ storage: uploadDiskStorage });
const upload = multer();

// controller
const uploadController = require('../../controllers/admin/upload.controller');

// middleware
const { requireAuth } = require('../../middleware/admin/auth.middleware');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();
    
// ###################### AUTHEN MIDDLEWARE ######################
router.use('', asyncHandler(requireAuth));

// [POST]
router.post(
    // upload 1 file, nên để tên field là 'file' để cái api này có thể upload image, audio, cái field này chỉ là cái tên hoy
    '/single-file',
    upload.single('file'), // lưu ý field name là thumbnail
    asyncHandler(uploadController.uploadSingle)
);

router.post(
    '/multi-file',
    upload.array('file', 3), // lưu ý field name là thumbnail
    asyncHandler(uploadController.uploadMulti)
);

router.post(
    '/resize-file',
    asyncHandler(uploadController.resizeFileUploaded)
);

// [DELETE]
router.get('/delete-files', asyncHandler(uploadController.deleteFiles));

// exports
module.exports = router;