/**
 * @description Discount model là collection sử dụng cho mã giảm giá
*/

// require package
const mongoose = require('mongoose');

const { Types: { ObjectId } } = mongoose.Schema;

// Document Name và Collection Name
const DOCUMENT_NAME   = 'Discount';
const COLLECTION_NAME = 'discounts'; 

// Khai báo schema
const discountSchema = new mongoose.Schema({
    discount_code:          { type: String, required: true },   // mã giảm giá
    discount_name:          { type: String, required: true },   // tên của mã giảm giá
    discount_description:   { type: String, required: true },   // mô tả về mã giảm giá này

    // percentage là giảm theo %, fixed_amount là giảm theo tiền mặc định
    discount_type:  { type: String, default: 'percentage', required: true, enum: ['percentage', 'fixed_amount']},    
    discount_value: { type: Number, required: true },

    discount_user_used:         { type: Array, default: [] },       // mảng lưu user đã sử dụng
    discount_using_per_user:    { type: Number, required: true },   // số lần mã 1 user có thể sử dụng mã giảm giá này 
    discount_max_use:           { type: Number, required: true },   // số lần được sử dụng mã giảm giá này
    discount_count_used:        { type: Number, default: 0 },       // số lần đã sử dụng mã giảm giá này

    discount_min_order:         { type: Number, required: true },   // giá trị đơn hàng nhỏ nhất mà có thể áp dụng mã giảm giá này

    discount_status:    { type: String, default: 'pending', required: true, enum: ['active', 'inactive', 'pending']},
    discount_isDeleted: { type: Boolean, default: false, required: true },

    discount_start_date: { type: Date, required: true },
    discount_end_date:   { type: Date, required: true },

    discount_createBy:  { type: ObjectId, required: true }
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, discountSchema, COLLECTION_NAME);