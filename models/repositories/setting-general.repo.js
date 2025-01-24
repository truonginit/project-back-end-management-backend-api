// model
const SettingGeneralModel = require('../setting-general.model');

/**
 * @description Tạo mới 1 thông tin general cho website 
 * @param {String} name 
 * @param {String} logo 
 * @param {String} email 
 * @param {String} fax 
 * @param {String} copyright 
 * @param {Array} address 
 * @returns 
*/
module.exports.createNewInfo = async ({ name, logo, email, fax, copyright, address }) => {
    return await SettingGeneralModel.create({
                    website_name: name,
                    website_logo: logo,
                    website_email: email,
                    website_fax: fax,
                    website_copyright: copyright,
                    website_address: address
    });
}

/**
 * @description Cập nhật thông tin general cho website 
 * @param {String} name 
 * @param {String} logo 
 * @param {String} email 
 * @param {String} fax 
 * @param {String} copyright 
 * @param {Array} address 
 * @returns 
*/
module.exports.updateInfo = async (record, { name, logo, email, fax, copyright, address }) => {
    record.website_name = name;
    record.website_logo = logo;
    record.website_email = email;
    record.website_fax = fax;
    record.website_copyright = copyright;
    record.website_address = address;
    return await record.save();
}