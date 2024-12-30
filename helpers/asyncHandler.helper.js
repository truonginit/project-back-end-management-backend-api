/**
 * @description catch error khi nhận response Error
 * @param {*} func tham số này là 1 hàm
 */
module.exports = ( func ) => {
    return (req, res, next) => {
        func(req, res, next).catch( error => {
            next(error);
        });
    }
}