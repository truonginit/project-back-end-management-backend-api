/**
 * @description Cart Service các thao tác với giỏ hàng
*/

// model
const CartModel = require('../models/cart.model');

// repo
const { findCartWithUserId, addToCart } = require('../models/repositories/cart.repo');
const { parseObjectIdMongoose, removeFieldNullOrUndefined } = require('../utils/index.util');

// service
class CartService {

    /**
     * @description Thêm sản phẩm vào giỏ hàng 
     * @param {*} param0 
    */
    static addProductToCart = async ({ userId, productId, quantity, price }) => {
        // 1. Tìm giỏ hàng với userId
        const foundCart = await findCartWithUserId({ userId, isLean: false});
        
        // NẾU TÌM THẤY GIỎ HÀNG => ĐẨY SẢN PHẨM VÀO
        // NẾU KHÔNG TÌM THẤY GIỎ HÀNG => TẠO GIỎ HÀNG MỚI => ĐẨY SẢN PHẨM VÀO

        return await addToCart(foundCart, { userId, productId, quantity, price });
    }
}

// exports
module.exports = CartService;