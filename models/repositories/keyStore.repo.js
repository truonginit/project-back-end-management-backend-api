// model
const KeyStoreModel = require('../../models/keyStore.model');

/**
 * @description tìm keystore theo User ID
*/
module.exports.findKeyStoreByUserId = async ({ userId, isLean = true }) => {
    return await KeyStoreModel.findOne({ userId })
                              .lean(isLean)
        
    
}