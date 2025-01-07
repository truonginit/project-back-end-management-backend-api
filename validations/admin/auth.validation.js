// package
const Joi = require('joi');

// [POST] /admin/accounts/createAccount
module.exports.signUp = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(128).required(),
        tel: Joi.string().length(10).required(),       
        avatar: Joi.string().allow(''),   // không cần required vì sẽ có ảnh nền base
        roleId: Joi.string(),   // chưa tìm ra ObjectId Joi Type    
    }
}

// [POST] /admin/accounts/login
module.exports.login = {
    body: {
        email: Joi.string().email().required(),
                  
        password: Joi.string()
                     .required()
                     .min(6)
                     .max(128)
    }
}