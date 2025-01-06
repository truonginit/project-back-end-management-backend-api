// const message = 'phia-sau-nghi-can-x-2.jpg'; // Try edit me

// const idx = message.indexOf('.');
// console.log(message.slice(0,idx));
// Tách ra như thế này phia-sau-nghi-can-x-2
// require config

const cloudinary = require('../config/cloudinary.config');

// require package
const streamifier = require('streamifier');

// require util
const { pickFieldInObject } = require('../utils/index.util');

// lấy tên file không bao gồm đuôi file. ví dụ 'phia-sau-mot-co-gai.jpg' => 'phia-sau-mot-co-gai'
const getFileName = (str) => str.slice(0, str.indexOf('.'));

/**
 * @description upload stream lên cloudinary
 * @param {*} file 
 * @returns 
*/
const streamUpload = async (file) => {
    const fileName = getFileName(file.originalname); // lấy tên file gửi lên
    const options = { public_id:  fileName + Date.now() }   // đặt tên cho file khi up lên cloud
        
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if(result) 
                resolve(result);
            else    
                reject(error);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

/**
 * @description resize file, có thể thay đổi tùy thích
 * @returns 
*/
module.exports.resizeUpload = async ({file_id, width, height}) => {
    return await cloudinary.url(file_id, { width, height });
}

/**
 *  @description Upload file lên cloudinary 
 *  @returns 
*/
module.exports.upload = async ( { file }) => {
    const result = await streamUpload(file);

    result['url_resize'] = await this.resizeUpload({file_id: result.public_id, width: 150, height: 150});

    // field được pick ra từ object result
    const pickedField = [
        'public_id',
        'original_filename',
        'url',
        'url_resize',
        'secure_url'
    ];

    
    return pickFieldInObject({ object: result, field: pickedField });
}

/**
 *  @description xóa các ảnh trên cloudinary 
*/
module.exports.deleteFileUploaded = async ({ public_id }) => {
    return await cloudinary.uploader.destroy(public_id);
}

    
  