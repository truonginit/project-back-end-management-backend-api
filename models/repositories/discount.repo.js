// model
const DiscountModel = require('../discount.model');

// util
const {
    unSelectFieldInMongoose,
    parseObjectIdMongoose,
    removeFieldNullOrUndefined
} = require('../../utils/index.util');
const { parse } = require('dotenv');

/**
 * @description Check xem discount code đã tồn tại chưa
 * @param {*} param0 
 * @returns 
 */
module.exports.findDiscountCode = async ({
    code,
    status,
    isDeleted, 
    unSelect = ['__v'], 
    isLean = true
}) => {

    const filter = {
        discount_code: code,
        discount_status: status,
        discount_isDeleted: isDeleted
    }
    return await DiscountModel.findOne(removeFieldNullOrUndefined(filter))
                              .select(unSelectFieldInMongoose(unSelect))
                              .lean(isLean)
}

/**
 * @description Tạo mới mã giảm giá (discount code) 
 * @param {*} param0 
 * @returns 
*/
module.exports.createNewDiscount = async ({
    code,
    name,
    description,
    type,
    value,
    using_per_user,
    max_use,
    min_order,
    start_date,
    end_date,
    accountId       // id người tạo mã
}) => {
    return await DiscountModel.create({
        discount_code:          code,
        discount_name:          name,
        discount_description:   description,
        
        // type - value
        discount_type:  type,
        discount_value: value,
        
        // use
        discount_using_per_user:    using_per_user,
        discount_max_use:           max_use,
        
        // Min order
        discount_min_order: min_order,
        
        // Time
        discount_start_date:    start_date,
        discount_end_date:      end_date,

        // create by
        discount_createBy: parseObjectIdMongoose(accountId)
    });
}

module.exports.findByDiscountById = async ({ discountId, status, isDeleted, unSelect = ['__v'], isLean = true}) => {
    const filter = {
        _id: parseObjectIdMongoose(discountId),
        discount_status: status,
        discount_isDeleted: isDeleted
    }
    return await DiscountModel.findOne(removeFieldNullOrUndefined(filter))
                              .select(unSelectFieldInMongoose(unSelect))
                              .lean(isLean)
}