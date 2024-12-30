/**
 * @description
*/

// model
const AccountModel = require('../account.model');

/**
 * @description kiểm tra xem email này đã tồn tại hay chưa
 * @param {String} email 
 * @return 
*/
module.exports.isEmailExits = async ( { email } ) => {
    const foundEmail = await AccountModel.findOne({
        account_email: email,
        // account_status: 'active',
        account_isDeleted: false
    }).lean();
    
    return foundEmail;
} 

