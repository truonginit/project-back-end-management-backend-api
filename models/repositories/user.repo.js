// model
const { parseObjectIdMongoose } = require('../../utils/index.util');
const UserModel = require('../user.model');

module.exports.CheckEmailExists = async ({ email, isLean = true }) => {
    return await UserModel.findOne({ user_email: email }).lean(isLean);
}

module.exports.FindUserById = async({ userId, isLean = true }) => {
    return await UserModel.findOne({ _id: parseObjectIdMongoose(userId) }).lean(isLean);
}