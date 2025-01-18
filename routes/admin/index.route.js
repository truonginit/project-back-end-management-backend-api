/**
 * @description 
*/

// variable config
const VariableConfig = require('../../config/variable.config');

// middleware
const { pushToLogDiscord } = require('../../middleware/admin/log.middleware');

// router
const accountRouter     = require('./account.route');
const productRouter     = require('./product.route');
const categoryRouter    = require('./category.route');
const roleRouter        = require('./role.route');
const uploadRouter        = require('./upload.route');

// helper
const asyncHandler = require('../../helpers/asyncHandler.helper');

module.exports = ( app ) => {
    const PATH_ADMIN = VariableConfig.PATH_ADMIN

    app.use(pushToLogDiscord);      // gửi log lên discord

    // require authentication (từ từ nếu để chung ở đây sẽ có bất cập nha)

    app.use(PATH_ADMIN + '/accounts',   accountRouter);

    app.use(PATH_ADMIN + '/products',   productRouter);

    app.use(PATH_ADMIN + '/categories', categoryRouter);

    app.use(PATH_ADMIN + '/roles',      roleRouter);

    app.use(PATH_ADMIN + '/uploads',      uploadRouter);
}