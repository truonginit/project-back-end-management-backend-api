// require package
const { v4: uuidv4 } = require('uuid');

// my-logger service
const MyLoggerService = require('../../loggers/my-logger.log');

// require util
const { removeObjectInObjectIsEmpty } = require('../../utils/index.util');

// header
const HEADERS = {
    REQUEST_ID: 'x-request-id'
};

/**
 * @description Router track log để xác định request 
 * @param {*} app 
*/
module.exports = (app) => {
    app.use((req, res, next) => {
        const requestId = req.headers[HEADERS.REQUEST_ID];
        const metadata = { query: req.query, params: req.params, body: req.body };
          
        const logObject = {
          context: `${req.method} ${req.path}`,         // bối cảnh. Ví dụ POST /api/v1/login
          requestId: requestId ? requestId : uuidv4(),  // requestId
          metadata: removeObjectInObjectIsEmpty(metadata)
        };
      
        MyLoggerService.logInfo('Request To Server', logObject);
        next();
      });
}