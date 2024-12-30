/**
 * @description 
*/

// router
const accountRouter = require('./account.route');
const productRouter = require('./product.route');

module.exports = ( app ) => {
    const PATH_ADMIN = '/admin';

    app.use(PATH_ADMIN + '/accounts', accountRouter);

    app.use(PATH_ADMIN + '/products', productRouter);
}