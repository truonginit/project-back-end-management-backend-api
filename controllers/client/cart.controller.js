// service
const CartService = require('../../services/cart.service');

// core response 
const { SuccessResponse } = require('../../core/success.response');

// [GET] /cart/detail/:id
module.exports.getInfoCart = async (req, res, next) => {
    new SuccessResponse({
        message: 'Lấy thông tin chi tiết giỏ hàng',
        metadata: await CartService.getInfoCart({
            // userId: req.user.userId, // chưa làm cái auth nên không check vậy được
            ...req.body,
            // cartId: req.params.id
        })
    }).send(res);
}

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

// [POST] /cart/remove
module.exports.removeProductFromCart = async (req, res, next) => {
    new SuccessResponse({
        message: 'Xóa sản phẩm khỏi giỏ hàng',
        metadata: await CartService.removeProductFromCart({
            // userId: req.user.userId, // chưa làm cái auth nên không check vậy được
            ...req.body
        })
    }).send(res);
}

// [POST] /cart/update
module.exports.updateQuantityOfItem = async (req, res, next) => {
    new SuccessResponse({
        message: 'Cập nhật số lượng sản phẩm trong giỏ hàng',
        metadata: await CartService.updateQuantityOfItem({
            // userId: req.user.userId, // chưa làm cái auth nên không check vậy được
            ...req.body
        })
    }).send(res);
}