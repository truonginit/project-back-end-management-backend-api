// model
const UserModel = require('../user.model');

module.exports.CheckEmailExists = async ({ email }) => {
    return await UserModel.findOne({ user_email: email }).lean();
}