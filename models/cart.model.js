/**
 * @description Cart model là collection sử dụng cho giỏ hàng
*/

// require package
const mongoose = require('mongoose');

// Document Name và Collection Name
const DOCUMENT_NAME   = 'Cart';
const COLLECTION_NAME = 'carts'; 

// Khai báo schema
const cartSchema = new mongoose.Schema({
    cart_userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // userId của người mua hàng
    cart_status: { type: String, default: 'active', required: true, enum: ['active', 'inactive', 'completed']},    // completed để xác định đơn hàng đã hoàn thành

    // danh sách sản phẩm trong giỏ hàng
    cart_products: [
        {   
            _id : false,
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            product_quantity: { type: Number, min: 1, required: true },
            product_price:  { type: Number, required: true }    // giá tiền của 1 sản phẩm thôi nha
        }
    ],

    cart_count_products: { type: Number, default: 0, required: true }   // số lượng sản phẩm có trong đơn hàng
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, cartSchema, COLLECTION_NAME);