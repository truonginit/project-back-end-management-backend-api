/**
 * @description Core Response Error 
*/

// const logger = require("../loggers/wiston.log"); // dùng test thử thử
const MyLoggerService = require('../loggers/my-logger.log');

// status code
const statusCode = {
    CONFLICT: 409,
    FORBIDDEN: 403,
    NOT_FOUND: 404, 
    UNAUTHORIZED: 401,
    // NOT_MODIFIED: 304,
    INTERNAL_SERVER_ERROR: 500, // lỗi server
    BAD_REQUEST: 400,
}

// lý do cho status code
const reasonStatusCode = {
    CONFLICT: "Conflict",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not Found",
    UNAUTHORIZED: "Unauthorized",
    // NOT_MODIFIED: "Not Modified",
    INTERNAL_SERVER_ERROR: "Internal Server Error", // lỗi server
    BAD_REQUEST: "Bad Request",
}

/**
 * @description gọi đến class Error khi đó nó sẽ tự throw new (ném) error 
*/

class ErrorResponse extends Error {
    constructor (status, message) {
        super(message); // gọi constructor Error ... new Error('thông điệp truyền tải');
        
        this.status = status; 
        this.now    = Date.now(); // thời gian mà response
        // ...
        // vì this lúc này chính là class Error
        // và class Error không có property status 
        // nên ta không thể đặt this.status lên trên super(...)
        // vì nếu vậy sẽ ảnh hưởng đến class Error
        // ...

        // ## TEST LOG ## //
        // logger.error(`${status} - ${this.message}`); không nên ghi trong đây, ghi vào router error là chuẩn chỉnh
        
        // const paramsTypeObject = {
        //     context: 'POST /v1/api/login',
        //     // req: {requestId: 'xxxyyyzzz'},
        //     metadata: { error: 'Bad request error' }
        // }

        // MyLoggerService.logError(this.message, paramsTypeObject);
        
        // MyLoggerService.error(this.message, ['/v1/api/login', 'vv33344', { error: 'Bad request error' }]);
    }
}

/**
 * @description Không tìm thấy, Không nhận dạng được URL
*/
class NotFoundError extends ErrorResponse {
    // hàm tạo
    constructor (message = reasonStatusCode.NOT_FOUND, status = statusCode.NOT_FOUND) {
        super(status, message); // gọi constructor ErrorResponse
    }
}

/**
 * @description Phản hồi này được gửi khi yêu cầu xung đột với trạng thái hiện tại của máy chủ
*/
class ConflictError extends ErrorResponse {
    // hàm tạo
    constructor (message = reasonStatusCode.CONFLICT, status = statusCode.CONFLICT) {
        super(status, message); // gọi constructor ErrorResponse
    }
}

/**
 * @description Không có quyền truy cập
*/
class ForbiddenError extends ErrorResponse {
    // hàm tạo
    constructor (message = reasonStatusCode.FORBIDDEN, status = statusCode.FORBIDDEN) {
        super(status, message); // gọi constructor ErrorResponse
    }
}

/**
 * @description Chưa được xác thực
*/
class UnauthorizedError extends ErrorResponse {
    // hàm tạo
    constructor (message = reasonStatusCode.UNAUTHORIZED, status = statusCode.UNAUTHORIZED) {
        super(status, message); // gọi constructor ErrorResponse
    }
}

/**
 * @description Yêu cầu không hợp lệ
*/
class BadRequestError extends ErrorResponse {
    // hàm tạo
    constructor (message = reasonStatusCode.BAD_REQUEST, status = statusCode.BAD_REQUEST) {
        super(status, message); // gọi constructor ErrorResponse
    }
}

// exports
module.exports = {
    NotFoundError,
    ConflictError,
    ForbiddenError,
    UnauthorizedError,
    BadRequestError
}

/**
 * @Note Cái message đặt trước cái status là có ý đồ hết á nha
 */