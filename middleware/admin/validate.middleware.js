// package
const Joi = require('joi');

// util
const { pickFieldInObject} = require('../../utils/index.util');

// response core
const { BadRequestError, NotFoundError } = require('../../core/error.response');

/**
 *  @description middleware validate, sẽ validate theo các schema được truyền vào
 *  @param {Schema Joi} schema là schema được tạo ra từ package joi
*/
module.exports.validate = (schema) => (req, res, next) => {
    // pick các field body, params, query trong schema ra
    const fieldOfSchemaJoi = ['query', 'params', 'body'];
    const objectFieldSchemaJoi = pickFieldInObject({ object : schema, field: fieldOfSchemaJoi});

    // pick các field của req theo joi schema lấy được
    const arrayFieldSchemaJoi = Object.keys(objectFieldSchemaJoi);
    const objectReq = pickFieldInObject({ object: req, field: arrayFieldSchemaJoi});

    // chuyển đổi shema (object) js qua dạng schema joi
    const schemaJoi = Joi.compile(objectFieldSchemaJoi);

    // validate
    const { error, value } = schemaJoi.validate(objectReq);
    if(error) throw new BadRequestError(error.message);
    
    next();
}