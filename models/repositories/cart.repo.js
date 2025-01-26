// model
const CartModel = require('../cart.model');

// util
const { parseObjectIdMongoose, removeFieldNullOrUndefined } = require('../../utils/index.util');

/**
 * @description Tìm giỏ hàng theo userId 
 * @param {*} param0 
 * @returns 
*/
module.exports.findCartWithUserId = async ({ userId, status = "active", unSelect = ['__v'], isLean = true}) => {
    const filter = { 
        cart_userId: parseObjectIdMongoose(userId),
        cart_status: status
    };

    return await CartModel.findOne(removeFieldNullOrUndefined(filter)).lean(isLean);
}

/**
 * @description Thêm sản phẩm vào giỏ hàng (nếu đã có giỏ hàng và trạng thái "active") hoặc Tạo mới giỏ hàng và thêm vào 
 * @param {*} cart 
 * @param {*} param1 
 * @returns 
*/
module.exports.addToCart = async (cart, { userId, productId, quantity, price }) => {
    const filter = {
        _id: foundCart?.id,
        cart_userId: parseObjectIdMongoose(userId),
        cart_status: "active"
    }

    const update = {
        '$push': {
            cart_products: {
                product_id: parseObjectIdMongoose(productId),
                product_quantity: parseInt(quantity),
                product_price:  parseInt(price)
            }
        },
        '$inc': { cart_count_products: 1 }
    }

    const options = {
        upsert: true,   // nếu không tìm thấy thì sẽ tạo bản ghi mới
        new: true,      // trả về bản ghi sau khi update
    }
    
    return await CartModel.findOneAndUpdate(removeFieldNullOrUndefined(filter), update, options);   
}