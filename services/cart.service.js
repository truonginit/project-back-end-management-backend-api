/**
 * @description Cart Service các thao tác với giỏ hàng
*/

// model
const CartModel = require('../models/cart.model');

// repo
const { 
    findCartWithUserId, 
    findProductExistsInCart,
    createNewCart, 
    addItemToCart, 
    removeItemFromCart,
    updateQuantityItemInCart
} = require('../models/repositories/cart.repo');
const { parseObjectIdMongoose, removeFieldNullOrUndefined } = require('../utils/index.util');

// service
class CartService {

    /**
     * @description Thêm sản phẩm vào giỏ hàng 
     * @param {*} param0 
    */
    static addProductToCart = async ({ userId, productId, quantity, price }) => {
        const foundCart = await findCartWithUserId({ userId, isLean: false}); // 1. Tìm giỏ hàng với userId
        const cartId = foundCart?.id;

        if(!foundCart) return await createNewCart({ userId, productId, quantity, price });  // NẾU KHÔNG TÌM THẤY GIỎ HÀNG => TẠO GIỎ HÀNG MỚI => ĐẨY SẢN PHẨM VÀO

        if(foundCart.cart_count_products === 0) // NẾU TÌM THẤY GIỎ HÀNG => GIỎ HÀNG RỖNG => THÊM VÀO GIỎ HÀNG
            return await addItemToCart({ cartId, userId, productId, quantity, price });

        //  ------------------------------------------ //
        const foundProductExists = await findProductExistsInCart({ cartId, productId, isLean: false }); // check xem trong giỏ hàng đã tồn tại sản phẩm này chưa

        if(!foundProductExists) return await addItemToCart({ cartId, userId, productId, quantity, price }); // nếu chưa tồn tại thì thêm vào giỏ hàng

        return await updateQuantityItemInCart({ cartId, productId, quantity }); // nếu sản phẩm này đã tồn tại trong giỏ hàng thì update số lượng
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