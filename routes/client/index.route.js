/**
 * @description 
*/

// router
const userRouter = require('./user.route');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

module.exports = ( app ) => {

    // app.use(pushToLogDiscord);      // gửi log lên discord

    app.use('/user',   userRouter);

}