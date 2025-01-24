// model
const UserModel = require('../user.model');

module.exports.CheckEmailExists = async ({ email, isLean = true }) => {
    return await UserModel.findOne({ user_email: email }).lean(isLean);
}