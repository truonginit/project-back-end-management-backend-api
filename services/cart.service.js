/**
 * @description Cart Service các thao tác với giỏ hàng
*/

// model
const CartModel = require('../models/cart.model');

// repo
const { findCartWithUserId, addToCart, removeItemFromCart } = require('../models/repositories/cart.repo');
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

    /**
     * @description Xóa sản phẩm khỏi giỏ hàng (giỏ hàng phải còn hoạt động nha) => Lưu ý là xóa chứ không phải giảm nha
     * @param {*} param0 
    */
    static removeProductFromCart = async ({ cartId, userId, productId }) => {
        // tìm cái sản phẩm lấy giá trị quantity
        const foundProductInCart = await CartModel.findOne({
            _id: parseObjectIdMongoose(cartId),
            cart_userId: parseObjectIdMongoose(userId),
            cart_status: "active"
        });

        console.log(`foundProductIncCart::`, foundProductInCart);

        return await removeItemFromCart({ cartId, userId, productId })
        
    }
}

// exports
module.exports = CartService;