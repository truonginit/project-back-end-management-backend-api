// package
var _ = require('lodash');
const { Types } = require('mongoose');

/**
 * @description lấy các field được chỉ định từ một object
 * @param  {Object} object 
 * @param  {Array}  field
 * @return {Object}
*/
module.exports.pickFieldInObject = ({object = {}, field = []}) => {
    const result = _.pick(object, field);
    return result;
}

/**
 * @description chuyển đổi từ ID dạng String sang ID dạng mongoose ObjectId
 * @param {String} id 
 * @return {ObjectId}
*/
module.exports.parseObjectIdMongoose = (id) => {
    return new Types.ObjectId(id);
}


/**
 * @description select các field trong mongoDB khi query
 * @param {Array} field
 * @example ["name", "description"] => {"name": 1, "description": 1}
 * @return {Object}
*/
module.exports.selectFieldInMongoose = (field = []) => {
    /**
     * ["name", "description"] => [ ["name", 1], ["description", 1] ]
     * { {"name": 1}, {"description": 1} }
    */
    return Object.fromEntries( field.map(item => [item, 1]) );
}

/**
 * @description unSelect các field trong mongoDB khi query
 * @param {Array} field
 * @example ["name", "description"] => {"name": 0, "description": 0}
 * @return {Object}
*/
module.exports.unSelectFieldInMongoose = (field = []) => {
    /**
     * ["name", "description"] => [ ["name", 0], ["description", 0] ]
     * { {"name": 0}, {"description": 0} }
    */
    return Object.fromEntries( field.map(item => [item, 0]) );
}

/**
 * @description remove các field trong object có giá trị là null hoặc là undefined
 * @param {Object} obj 
 * @example
 * @return {Object}
 */
module.exports.removeFieldNullOrUndefined = (obj = {}) => {
    Object.keys(obj).forEach( keyOfObject => {
        if(typeof obj[keyOfObject] === 'undefined' || typeof obj[keyOfObject] === 'null') 
            delete obj[keyOfObject];
    });
    return obj;
}