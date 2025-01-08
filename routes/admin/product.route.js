// package
const express = require('express');

// controller
const productController = require('../../controllers/admin/product.controller');

// middleware
const { requireAuth } = require('../../middleware/admin/auth.middleware');
const { validate }  = require('../../middleware/admin/validate.middleware');
const { productValidate } = require('../../middleware/admin/product-validate.middleware');

// schema validation
const { 
    AddProductGeneralJoi, 
    UpdateProductGeneralJoi,
    changeStatusJoi,
    deleteProductJoi
} = require('../../validations/admin/product.validation');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// Tạo instance route
const router = express.Router();

// ###################### AUTHEN MIDDLEWARE ######################
router.use('', asyncHandler(requireAuth));

// [GET]
router.get('/', asyncHandler(productController.getAllProduct));
router.get('/detail/:slug', asyncHandler(productController.getDetailProductBySlug));

// [POST]
router.post(
    '/create', 
    productValidate('create', AddProductGeneralJoi), 
    asyncHandler(productController.createProduct)
);
    
// [PATCH]
router.patch(
    '/change-status/:productId/:status', 
    validate(changeStatusJoi),
    asyncHandler(productController.changeStatusOfOneProduct)
);

router.patch(
    '/update-one/:productId', 
    productValidate('update', UpdateProductGeneralJoi), 
    asyncHandler(productController.updateOneProduct)
);

// [DELETE]
router.delete(
    '/delete-soft/:productId', 
    validate(deleteProductJoi),
    asyncHandler(productController.deleteSoftOneProduct)
);

// exports
module.exports = router;