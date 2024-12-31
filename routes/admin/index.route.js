/**
 * @description 
*/

// router
const accountRouter = require('./account.route');
const productRouter = require('./product.route');
const categoryRouter = require('./category.route');

module.exports = ( app ) => {
    const PATH_ADMIN = '/admin';

    app.use(PATH_ADMIN + '/accounts', accountRouter);

    app.use(PATH_ADMIN + '/products', productRouter);

    app.use(PATH_ADMIN + '/categories', categoryRouter);
}