// helper
const { 
    upload, 
    deleteFileUploaded,
    resizeUpload 
} = require('../helpers/uploadToCloudinary.helper');

// model
const FileModel = require('../models/file.model');

// response core
const { BadRequestError } = require('../core/error.response');
const { result } = require('lodash');

// service
class UploadService {

    /**
     * @description upload 1 file
    */
    static singeFile = async ({ file }) =>  {
        const result = await upload({ file });
        
        // upload public_id vào model file. Sau 24h sẽ xóa
        const newFile = await FileModel.create({ file_public_id: result.public_id });
        if(!newFile) throw new BadRequestError('Upload file thất bại');
    }

    /**
     * @description upload nhiều file (cùng 1 field)
    */
    static multiFile = async ({ files }) => {
        // lấy 1 mảng request upload
        const uploadReq = files.map(file => upload({ file }));
        const results =  await Promise.all(uploadReq);    // tối ưu hóa hiệu suất upload

        // lấy 1 mảng kết quả đã upload
        const uploadResults = results.map(result => FileModel.create({ file_public_id: result.public_id }));
        const newFiles = await Promise.all(uploadResults); // tối ưu hóa hiệu suất
        if(newFiles.includes(null || false || undefined)) throw new BadRequestError('Upload file thất bại');

        return results;
    }

    /**
     *  @description xóa các file đã upload nhưng không dùng đến 
    */
    static deleteFiles = async () => {
        // tìm tất cả các file có trạng thái là 'inactive'
        const filesInactive = await FileModel.find({ file_status: 'inactive' });
        
        // lấy mảng danh sách các public_id để xóa
        const filesWillDelete = filesInactive.flatMap(file => file.file_public_id);

        // xóa trên collection databse
        const deletedOnCollection = await FileModel.deleteMany({ file_status: 'inactive' });

        // xóa trên cloudinary
        const deleteReq = filesWillDelete.map(file => deleteFileUploaded({ public_id: file }));
        return await Promise.all(deleteReq);
    }

    /**
     *  @description resize lại kích thước file, vẫn cùng 1 link ảnh 
    */
    static resizeFileUploaded = async ({ file_id, width, height }) => {
        return {
            file_resize: await resizeUpload({ file_id, width, height })
        } 
    }
}


// exports
module.exports = UploadService;