/**
 * @description
*/

// model
const AccountModel = require('../account.model');

// utils
const { 
    selectFieldInMongoose, 
    removeFieldNullOrUndefined, 
    parseObjectIdMongoose,
    unSelectFieldInMongoose
} = require('../../utils/index.util');

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

/**
 * @description Tìm tài khoản quản trị (theo query)
 * @param {String}  status
 * @param {Boolean} isDeleted,
 * @param {Array}   select 
 * @return 
*/
module.exports.findAllAccount = async ( { status, isDeleted, select} ) => {
    const filter = {
        account_status: status,
        account_isDeleted: isDeleted
    }

    /**
     *  removeFieldNullOrUndefined để khi query mà thiếu trường đó nó sẽ xóa ra để giúp việc query Mongoose chính xác hơn 
    */
    return await AccountModel.find(removeFieldNullOrUndefined(filter)).select(selectFieldInMongoose(select));
}


/**
 * @description Tìm tài khoản theo Id
 * @param {*} param0 
 * @returns 
 */
module.exports.findOneAccountById = async ({ accountId }) => {
    return await AccountModel.findOne({ _id: parseObjectIdMongoose(accountId) }).lean();
}


module.exports.findByEmail = async ({ email, status, isDeleted = false, isLean = true, 
    unSelect = ['__v'] 
}) => {
    const filter = {
        account_email: email,
        account_status: status,
        account_isDeleted: isDeleted
    };

    return await AccountModel.findOne(removeFieldNullOrUndefined(filter))
                             .select(unSelectFieldInMongoose(unSelect))
                             .lean(isLean);
}

