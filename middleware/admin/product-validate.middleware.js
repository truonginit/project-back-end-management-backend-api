// package
const Joi = require('joi');

// service
const ProductValidateService = require('../../services/product-validate.service');

// util
const { pickFieldInObject} = require('../../utils/index.util');

// response core
const { BadRequestError, NotFoundError } = require('../../core/error.response');

module.exports.productValidate = (type, schema) => (req, res, next) => {  

    // ------ Kiểm tra product__attributes có hợp với loại sản phẩm không ------ //
    // lấy schema attribute joi của sản phẩm
    const schemaJoiAttribute = ProductValidateService.getFactoryByType(type, req.body.product_type);
    if(!schemaJoiAttribute) 
        throw new NotFoundError('Không tìm thấy kiểu sản phẩm này');
    
    const fieldInSchemaJoiAttribute = pickFieldInObject({ object: schemaJoiAttribute, field: ['product_attributes'] });
    const fieldInReqBody = pickFieldInObject({ object: req.body, field: ['product_attributes'] });

    const resultAttribute = Joi.compile(fieldInSchemaJoiAttribute).validate(fieldInReqBody);
    if(resultAttribute.error) 
        throw new BadRequestError(error.message);

    // ------ Kiểm tra thông tin chung của sản phẩm ------ //
    const fieldInSchemaGeneral = pickFieldInObject({ object: schema, field: ['query', 'params', 'body'] });
    const fieldInReq = pickFieldInObject({ object: req, field: Object.keys(fieldInSchemaGeneral) });
    
    const { error, value } = Joi.compile(fieldInSchemaGeneral).validate(fieldInReq);
    if(error) 
        throw new BadRequestError(error.message);

    return next();
}