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
    updateQuantityItemInCart,
    getInfoCart
} = require('../models/repositories/cart.repo');
const { parseObjectIdMongoose, removeFieldNullOrUndefined } = require('../utils/index.util');

// service
class CartService {

    /**
     * @description Xem giỏ hàng
     * @param {*} param0 
    */ 
    static getInfoCart = async ({ cartId, userId }) => {
        return await getInfoCart({ cartId, userId })
    }

    /**
     * @description Thêm sản phẩm vào giỏ hàng 
     * @param {*} param0 
    */
    static addProductToCart = async ({ userId, productId, quantity, price }) => {
        const foundCart = await findCartWithUserId({ userId, isLean: false}); // 1. Tìm giỏ hàng với userId
        const cartId = foundCart?.id;

        if(!foundCart) 
            return await createNewCart({ userId, productId, quantity, price });  // NẾU KHÔNG TÌM THẤY GIỎ HÀNG => TẠO GIỎ HÀNG MỚI => ĐẨY SẢN PHẨM VÀO

        if(foundCart.cart_count_products === 0) // NẾU TÌM THẤY GIỎ HÀNG => GIỎ HÀNG RỖNG => THÊM VÀO GIỎ HÀNG
            return await addItemToCart({ cartId, userId, productId, quantity, price });

        //  ------------------------------------------ //
        const foundProductExists = await findProductExistsInCart({ cartId, productId, isLean: false }); // check xem trong giỏ hàng đã tồn tại sản phẩm này chưa

        if(!foundProductExists) 
            return await addItemToCart({ cartId, userId, productId, quantity, price }); // nếu chưa tồn tại thì thêm vào giỏ hàng

        return await updateQuantityItemInCart({ cartId, productId, quantity }); // nếu sản phẩm này đã tồn tại trong giỏ hàng thì update số lượng
    }

    /**
     * @description Xóa sản phẩm khỏi giỏ hàng (giỏ hàng phải còn hoạt động nha) => Lưu ý là xóa chứ không phải giảm nha
     * @param {*} param0 
    */
    static removeProductFromCart = async ({ cartId, userId, productId }) => {
        const foundProductExists = await findProductExistsInCart({ cartId, productId, isLean: false }); // check xem trong giỏ hàng đã tồn tại sản phẩm này chưa
        if(foundProductExists) {
            const item = foundProductExists?.cart_products.find(({ product_id }) => product_id.toString() === productId);  
            return await removeItemFromCart({ cartId, productId, quantity: item.product_quantity });
        }

        return foundProductExists;
    }
}

// exports
module.exports = CartService;