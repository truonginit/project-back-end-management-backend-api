// service
const CartService = require('../../services/cart.service');

// core response 
const { SuccessResponse } = require('../../core/success.response');

// [POST] /cart/add
module.exports.addProductToCart = async (req, res, next) => {
    new SuccessResponse({
        message: 'Thêm sản phẩm vào giỏ hàng',
        metadata: await CartService.addProductToCart({
            // userId: req.user.userId, // chưa làm cái auth nên không check vậy được
            ...req.body
        })
    }).send(res);
}

// [POST] /cart/remove-item
module.exports.removeProductFromCart = async (req, res, next) => {
    new SuccessResponse({
        message: 'Xóa sản phẩm khỏi giỏ hàng',
        metadata: await CartService.removeProductFromCart({
            // userId: req.user.userId, // chưa làm cái auth nên không check vậy được
            ...req.body
        })
    }).send(res);
}