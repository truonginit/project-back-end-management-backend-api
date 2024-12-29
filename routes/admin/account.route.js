// package
const express = require('express');

// controller
const accountController = require('../../controllers/admin/account.controller');

// Tạo instance route
const router = express.Router();

// [GET]


// [POST]
router.post('/create', accountController.createAccount);


// [PATCH]



// exports
module.exports = router;