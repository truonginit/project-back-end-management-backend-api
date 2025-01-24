// model
const { parseObjectIdMongoose, unSelectFieldInMongoose } = require('../../utils/index.util');
const UserModel = require('../user.model');

module.exports.CheckEmailExists = async ({ email, unSelect = ['_-v'], isLean = true }) => {
    return await UserModel.findOne({ user_email: email })
                          .select(unSelectFieldInMongoose(unSelect))
                          .lean(isLean);
}

module.exports.FindUserById = async({ userId, unSelect = ['_-v'], isLean = true }) => {
    return await UserModel.findOne({ _id: parseObjectIdMongoose(userId) })
                          .select(unSelectFieldInMongoose(unSelect))
                          .lean(isLean)
}