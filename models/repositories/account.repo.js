/**
 * @description
*/

// model
const AccountModel = require('../account.model');

// [CHECK]
module.exports.isEmailExits = async ( { email } ) => {
    const foundEmail = await AccountModel.findOne({
        account_email: email,
        account_status: 'active',
        account_isDeleted: false
    }).lean();
} 

