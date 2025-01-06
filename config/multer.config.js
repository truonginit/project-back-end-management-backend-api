// Lưu ý bên FrontEnd có enctype="multipart/form-data"
const multer  = require('multer');

// util
const { generateSlug } = require('../utils/generate.util'); // tạo thành slug ảnh luôn cho ok 

// Upload ảnh vào Disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, '../uploads/images'),
    filename: (req, file, cb) => {
        // tạo chuỗi unique
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9)

        // load ...
        cb(null, file.originalname + '-' + unique);
    }
})


module.exports = {
    uploadDiskStorage: storage
}
  