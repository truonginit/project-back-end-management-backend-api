// require service
const UploadService = require('../../services/upload.service');

// core response
const { SuccessResponse } = require('../../core/success.response');

// [POST] /admin/uploads/single-file
module.exports.uploadSingle = async (req, res, next) => {
    new SuccessResponse({
        message: 'Upload một file thành công',
        metadata: await UploadService.singeFile(req)
    }).send(res); 
}

// [POST] /admin/uploads/multi-file
module.exports.uploadMulti = async (req, res, next) => {
    new SuccessResponse({
        message: 'Upload nhiều file thành công',
        metadata: await UploadService.multiFile(req)
    }).send(res); 
}

// [POST]   /admin/uploads/resize-file
module.exports.resizeFileUploaded = async (req, res, next) => {
    new SuccessResponse({
        message: 'Resize lại file thành công', // này là file ảnh
        metadata: await UploadService.resizeFileUploaded(req.body)
    }).send(res); 
}

// [DELETE] /admin/uploads/delete-files
module.exports.deleteFiles = async (req, res, next) => {
    new SuccessResponse({
        message: 'Xóa các file không sử dụng thành công',
        metadata: await UploadService.deleteFiles()
    }).send(res); 
}