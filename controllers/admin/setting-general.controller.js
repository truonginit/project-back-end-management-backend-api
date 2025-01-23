// service
const SettingGeneralService = require('../../services/setting-general.service');

// core response
const { SuccessResponse } = require('../../core/success.response');
const { BadRequestError } = require('../../core/error.response');

// [POST] /admin/setting-general/update-info
module.exports.updateInfo = async (req, res, next) => {
    new SuccessResponse({
        message: 'Cập nhật thông tin chung cho website',
        metadata: await SettingGeneralService.settingAllInfo({
            ...req.body
        })
    }).send(res);
}