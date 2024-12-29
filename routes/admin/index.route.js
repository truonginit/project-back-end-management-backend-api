/**
 * @description 
*/

// router
const accountRouter = require('./account.route');

module.exports = ( app ) => {
    const PATH_ADMIN = '/admin';

    app.use(PATH_ADMIN + '/accounts', accountRouter);
}