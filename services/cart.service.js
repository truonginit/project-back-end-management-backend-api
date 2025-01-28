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
    getInfoCart,
    updateQuantityOfItem
} = require('../models/repositories/cart.repo');
const { parseObjectIdMongoose, removeFieldNullOrUndefined } = require('../utils/index.util');

// service
class CartService {

    /**
     * @description Xem giỏ hàng
     * @param {*} param0 
    */ 
    static getInfoCart = async ({ userId }) => {
        return await getInfoCart({ userId })
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

    /**
     * @description Update số lượng sản phẩm của Item
     * @param {*} quantity đây là giá trị quantity mới
     * @param {*}  old_quantity đây là giá trị quantity cũ
    */ 
    static updateQuantityOfItem = async ({ cartId, productId, quantity, old_quantity }) => {
        const new_quantity = quantity - old_quantity;

        // trường hợp quantity = 0 => xóa khỏi giỏ hàng luôn 
        if(quantity === 0) {
            // quantity = 0 => tức muốn xóa khỏi đơn hàng
            // old_quantity tức là giá trị cũ của sản phẩm đó trong đơn hàng
            return await removeItemFromCart({ cartId, productId, quantity: old_quantity });
        }

        // trường hợp quantity ok
        return await updateQuantityOfItem({ cartId, productId, quantity: new_quantity });

    }
}

// exports
module.exports = CartService;