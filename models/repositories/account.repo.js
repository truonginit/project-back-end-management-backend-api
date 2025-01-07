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
 * @description Kiểm tra xem email này đã tồn tại hay chưa
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
 * @description Tìm tất cả tài khoản quản trị (theo query)
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
 * @description Tìm 1 tài khoản theo Id
 * @param {String} accountId 
 * @returns 
 */
module.exports.findOneAccountById = async ({ accountId, isLean = true, unSelect }) => {
    unSelect = [
        'account_password',
        '__v'
    ];

    return await AccountModel.findOne({ _id: parseObjectIdMongoose(accountId) })
                             .select(unSelectFieldInMongoose(unSelect))
                             .lean(isLean);
}

/**
 * @description Tìm 1 tài khoản theo email
 * @param {*} param0 
 * @returns 
 */
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

