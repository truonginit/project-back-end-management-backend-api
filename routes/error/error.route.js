const { v4: uuidv4 } = require('uuid');

// my-logger service
const MyLoggerService = require('../../loggers/my-logger.log');

// require util
const { removeObjectInObjectIsEmpty } = require('../../utils/index.util');
const { splitStackMessage } = require('../../utils/error.util');

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
        // track log lỗi
        const logMessage = `Time response: ${Date.now() - error.now}ms`;
        const logObject  = {
            context: `${req.method} ${req.path}`, 
            requestId: req.requestId,
            metadata: splitStackMessage(error?.stack)
        }

        MyLoggerService.logError(logMessage, logObject);

        // response lỗi
        const statusCode = error.status || 500;
        res.status(200).json({
            code: statusCode,
            status: 'error',
            message: error.message,
            stack: error.stack
        })
    });
}