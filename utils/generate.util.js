// package
const unidecode = require('unidecode');
const crypto = require('crypto');

/**
 * @description Util tạo slug 
 * @param {String} name 
*/
module.exports.generateSlug = ({ name }) => {
    // chuyển từ có dấu sang không dấu và chuyển về dạng chữ thường
    const nameWithoutSign = unidecode(name).toLowerCase();

    // sử dụng regex thay thế toàn bộ khoảng trắng thành dấu '-'
    const regex = /\s+/g;
    const charReplace = '-';
    
    const replaceAllWhitespace = nameWithoutSign.replace(regex, charReplace);
    return replaceAllWhitespace;
}

/**
 * @description tạo cặp key public và private
*/
module.exports.generatePairKey = (length) => {
    const publicKey = crypto.randomBytes(length).toString('hex');
    const privateKey = crypto.randomBytes(length).toString('hex');
    return { publicKey, privateKey };
}


module.exports.generateRandomNumString = (length) => {
    const characteristics = "0123456789";
    let result = "";
    for(let index = 0 ; index < length ; index++) {
        result += characteristics.charAt(Math.floor(Math.random() * characteristics.length ));
    }
    return result;
}