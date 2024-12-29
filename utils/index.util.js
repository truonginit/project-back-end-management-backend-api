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