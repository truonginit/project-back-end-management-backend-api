// model
const CartModel = require('../cart.model');

// util
const { parseObjectIdMongoose, removeFieldNullOrUndefined, unSelectFieldInMongoose } = require('../../utils/index.util');
const { filter } = require('lodash');

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
 * @description Tìm sản phẩm này (id) đã tồn tại trong giỏ hàng chưa
 * @param {*} param0 
 * @returns 
 */
module.exports.findProductExistsInCart = async ({ cartId, productId , unSelect = ['__v'], isLean = true}) => {
    const filter = {
        _id: parseObjectIdMongoose(cartId),
        'cart_products.product_id': parseObjectIdMongoose(productId),
        cart_status: "active"
    }

    return await CartModel.findOne(filter).lean(isLean);
}

/**
 * @description Tạo mới giỏ hàng (nếu giỏ hàng chưa tồn tại) 
 * @param {*} param0 
 * @returns 
*/
module.exports.createNewCart = async ({ userId, productId, quantity, price }) => {
    return await CartModel.create({
        cart_userId: parseObjectIdMongoose(userId),
        cart_products: [
            {
                product_id: parseObjectIdMongoose(productId),
                product_quantity: quantity,
                product_price: price                // giá tiền của 1 sản phẩm
            }
        ],
        cart_count_products: quantity
    });
}

/**
 * @description Thêm sản phẩm vào giỏ hàng (nếu đã có giỏ hàng và trạng thái "active")
 * @param {*} cart 
 * @param {*} param1 
 * @returns 
*/
module.exports.addItemToCart = async ({cartId, userId, productId, quantity, price }) => {
    // sản phẩm được đẩy vào giỏ hàng
    const newItem = {
        product_id: parseObjectIdMongoose(productId),
        product_quantity: parseInt(quantity),
        product_price:  parseInt(price)
    }


    const filter = {
        _id: parseObjectIdMongoose(cartId),
        cart_userId: parseObjectIdMongoose(userId),
        cart_status: "active"
    }

    const update = {
        '$push': { cart_products: newItem },
        '$inc': { cart_count_products: quantity }
    }

    const options = {
        upsert: true,   // nếu không tìm thấy thì sẽ tạo bản ghi mới
        new: true,      // trả về bản ghi sau khi update
    }
    
    return await CartModel.findOneAndUpdate(removeFieldNullOrUndefined(filter), update, options);   
}

/**
 * @description Tăng số lượng sản phẩm có trong giỏ hàng 
 * @param {*} param0 
 * @returns 
*/
module.exports.updateQuantityItemInCart = async({cartId, productId, quantity }) => {
    const filter = {
        _id: parseObjectIdMongoose(cartId),
        'cart_products.product_id': parseObjectIdMongoose(productId),
        cart_status: "active"
    }

    const update = {
        $inc: {
            'cart_products.$.product_quantity': quantity,
            cart_count_products: quantity
         }
    }

    const options = {
        upsert: true,   // nếu không tìm thấy thì sẽ tạo bản ghi mới
        new: true,      // trả về bản ghi sau khi update
    }

    return await CartModel.findOneAndUpdate(filter, update, options);
}

/**
 * @description Xóa sản phẩm khỏi giỏ hàng
 * @param {*} param0 
 * @returns 
 */
module.exports.removeItemFromCart = async ({ cartId, productId, quantity }) => {
    const filter = {
        _id: parseObjectIdMongoose(cartId),
        cart_status: "active"
    }
    
    const update = {
        $pull: { 
            cart_products: {
                product_id: parseObjectIdMongoose(productId)
            }
        },
        $inc: { 
            cart_count_products: -quantity
        }
        // $inc: { cart_count_products: -10 }
    }

    const options = { upsert: false, new: true }
    return await CartModel.findOneAndUpdate(filter, update, options);
}

module.exports.getInfoCart = async ({ cartId, userId, status = "active" , unSelect = ['__v'], isLean = true }) => {
    const filter = {
        // _id: parseObjectIdMongoose(cartId),
        cart_userId: parseObjectIdMongoose(userId),
        cart_status: status
    };

    return await CartModel.findOne(removeFieldNullOrUndefined(filter))
                          .select(unSelectFieldInMongoose(unSelect))
                          .lean(isLean)
}


module.exports.updateQuantityOfItem = async ({ cartId, productId, quantity }) => {
    const filter = {
        _id: parseObjectIdMongoose(cartId),
        'cart_products.product_id': parseObjectIdMongoose(productId),
        cart_status: 'active'
    }

    const update = {
        $inc: { 
            'cart_products.$.product_quantity': quantity,
            cart_count_products: quantity
        }
    }

    const options = { new: true };
    return await CartModel.findOneAndUpdate(filter, update, options);
}