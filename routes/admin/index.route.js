/**
 * @description 
*/

// router
const accountRouter     = require('./account.route');
const productRouter     = require('./product.route');
const categoryRouter    = require('./category.route');
const roleRouter        = require('./role.route');
const uploadRouter        = require('./upload.route');

module.exports = ( app ) => {
    const PATH_ADMIN = '/admin';

    app.use(PATH_ADMIN + '/accounts',   accountRouter);

    app.use(PATH_ADMIN + '/products',   productRouter);

    app.use(PATH_ADMIN + '/categories', categoryRouter);

    app.use(PATH_ADMIN + '/roles',      roleRouter);

    app.use(PATH_ADMIN + '/uploads',      uploadRouter);
}