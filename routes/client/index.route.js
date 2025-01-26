/**
 * @description 
*/

// router
const identifyRouter = require('./identify.route');
const cartRouter = require('./cart.route');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

// controller
const AccessController = require('../../controllers/client/access.controller');

module.exports = ( app ) => {

    // app.use(pushToLogDiscord);      // gửi log lên discord
    
    // -------------- access: đăng ký, đăng nhập, đăng xuất -------------- //
    app.post('/sign-up', AccessController.signUp);
    app.post('/login', AccessController.login);
    // -------------- end access -------------- //

    // -------------- identify: quên mật khẩu -------------- //
    app.use('/identify', identifyRouter);
    // -------------- end identify -------------- //

    app.use('/cart', cartRouter);
}