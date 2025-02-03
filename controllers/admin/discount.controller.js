// service
const DiscountService = require('../../services/discount.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

// [POST] /admin/discount/create
module.exports.createNewDiscount = async (req, res, next) => {
    new SuccessResponse({
        message: 'Tạo mới mã giảm giá',
        metadata: await DiscountService.createNewDiscount({
            ...req.body,
            accountId: req.account.accountId
        })
    }).send(res);
}