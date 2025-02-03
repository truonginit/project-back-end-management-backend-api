// service
const DiscountService = require('../../services/discount.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

// [GET] /admin/discount/pending/all
module.exports.getListDiscountPending = async (req, res, next) => {
    new SuccessResponse({
        message: 'Danh sách discount có trạng thái pending',
        metadata: await DiscountService.getListDiscount({ 
            status: 'pending'
            // isDeleted => lấy từ query ? => /admin/discount/pending/all?isDeleted=false 
            // mặc định isDeleted = false
        })
    }).send(res);
}

// [GET] /admin/discount/active/all
module.exports.getListDiscountActive = async (req, res, next) => {
    new SuccessResponse({
        message: 'Danh sách discount có trạng thái active',
        metadata: await DiscountService.getListDiscount({
            status: 'active'
        })
    }).send(res);
}

// [GET] /admin/discount/inactive/all
module.exports.getListDiscountInActive = async (req, res, next) => {
    new SuccessResponse({
        message: 'Danh sách discount có trạng thái inactive',
        metadata: await DiscountService.getListDiscount({
            status: 'inactive'
        })
    }).send(res);
}

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

// [PATCH] /admin/discount/update-status/:id/:status
module.exports.updateStatus = async (req, res, next) => {
    new SuccessResponse({
        message: 'Cập nhật trạng thái của status',
        metadata: await DiscountService.updateStatus({
            discountId: req.params.id,
            status: req.params.status
            
        })
    }).send(res);
}