/**
 * @description 
*/

// router
const authRouter = require('./auth.route');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

module.exports = ( app ) => {

    // app.use(pushToLogDiscord);      // gửi log lên discord

    app.use('/auth',   authRouter);

}