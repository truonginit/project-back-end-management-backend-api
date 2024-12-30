/**
 * @description router catch lỗi
 * @param {*} app 
*/
module.exports = (app) => {

    // router catch lỗi url (Không tìm thấy)
    app.use((req, res, next) => {
        const error = new Error();
        error.status  = 404;
        error.message = 'Not Found URL'; // không tìm thấy đường dẫn
        next(error); 
    }); 

    // router catch tất cả các lỗi
    // nhận các lỗi từ router trên ném xuống
    // nhận các lỗi từ server ném ra (throw new ...)
    app.use((error, req, res, next) => {
        const statusCode = error.status || 500;
        res.status(200).json({
            code: statusCode,
            status: 'error',
            message: error.message,
            stack: error.stack
        })
    });
}