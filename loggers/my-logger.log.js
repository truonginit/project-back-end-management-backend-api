// package
const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;
require('winston-daily-rotate-file');
const { v4: uuidv4 } = require('uuid');

class MyLoggerService {
    // ---------------------------------------- CONFIG ---------------------------------------- //
    /**
     * @description định dạng lại nội dung sẽ được in ra file log
     * @param {String} timestamp
     * @param {String} level
     * @param {String} context
     * @param {String} requestId
     * @param {String} message
     * @param {JSON} metadata
    */
    printLog = printf( ({ timestamp, level, context, requestId, message, metadata }) => {
        const space = " - "; // kí tự ngăn giữa các tham số

        // const time  = '[' + timestamp + ']';                    // định dạng thời gian. Ví dụ: [2001-09-30]
        level = level.toUpperCase();
        // level       = '[' + level.toUpperCase() + ']';          // in hoa toàn chữ của level. Ví dụ: INFO
        // context     = '[' + context + ']';
        // requestId   = '[' + `ID: ${requestId}` + ']';

        metadata    = JSON.stringify(metadata);                 // chuyển từ JS sang JSON
        return timestamp + space + level + space + context + space + requestId + space + message + space + metadata;
    });

    /**
     * @description tạo 1 instance file log
     * @param {String} level là loại file log được ghi
     * @param {String} maxSize kích cỡ tối đa của 1 file. Mặc định là 1 kilo byte
     * @param {String} maxFiles thời gian xóa file. Mặc định xóa file sau 5 ngày 
     * @returns {*}
    */
    addTransportTypeFile = ({ level, maxSize = '20m', maxFiles = '5d' }) => {
        return  new transports.DailyRotateFile({
            level: level,                                   // level được in ra. Ví dụ: info, error
            dirname: 'logs',    
            filename: `application-%DATE%.${level}.log`,    // file được in ra. %DATE% là thời gian 
            datePattern: 'YYYY-MM-DD',                       // thời gian ghi lên tên file
            zippedArchive: true,                            // zip file
            maxSize: maxSize,                                
            maxFiles: maxFiles,
            format: combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), this.printLog)
        });
    }

    /**
     * @description Mảng cấu hình transport
    */
    transportArray = [
        new transports.Console(),   // log ra màn hình terminal
        this.addTransportTypeFile({ level: 'info'}),
        this.addTransportTypeFile({ level: 'error'}),
    ]

    // ---------------------------------------- CONSTRUCTOR ---------------------------------------- //
    constructor () {
        console.log(`My Logger Service Constructor: kết nối thành công`)
        this.logger = createLogger({
            format: combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), this.printLog),
            transports: this.transportArray
        });
    }
  
    // ---------------------------------------- METHOD  ---------------------------------------- //
    /**
     * @description Ép kiểu params từ dạng array sang object (mục đích quy về cùng 1 định dạng)
     * @param {Array || Object} params 
     */
    parseParamsFromArrayToObject = (params) => {
        /**                 
            context     : mang nghĩa bối cảnh, tức là cách đường dẫn
            requestId   : id để xác định lỗi của ai
            metadata    : dữ liệu được phản hồi

         * @Object định dạng của params khi ở Object
            { context, requestId, metadata }
            
            {
                context: '/api/v1/login',
                requestId: 'uuuid',
                metadata: { error: 'BadEquestError' }
            }
        */

        /**
         * @Array định dạng của params khi ở dạng Array
            [context, requestId, metadata]

            [
                'api/v1/login', 
                'uuuid', 
                { error: 'BadEquestError' }
            ]
        */

        let context, requestId, metadata;
        if(Array.isArray(params)) [context, requestId, metadata] = params; // Destructuring array
        
        else {
            context   = params.context;
            requestId = params.requestId;
            metadata  = params.metadata
        }
        
        requestId = requestId ? requestId : uuidv4();   // định danh requestId

        return {context, requestId, metadata};
    }

    /**
     * @description hàm gửi log đến các file info 
     * @param {String} message 
     * @param {Array || Object} params 
    */
    logInfo = (message, params) => {
        const paramsObject = this.parseParamsFromArrayToObject(params);
        const logObject = Object.assign({ message }, paramsObject);
        this.logger.info(logObject);
    }

    /**
     * @description hàm gửi log đến các file error 
     * @param {String} message 
     * @param {Array || Object} params 
    */
    logError = (message, params) => {
        const paramsObject = this.parseParamsFromArrayToObject(params);
        const logObject = Object.assign({ message }, paramsObject);
        this.logger.error(logObject);
    }
}

module.exports =  new MyLoggerService();
