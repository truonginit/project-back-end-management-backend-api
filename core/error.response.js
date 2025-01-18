/**
 * @description Core Response Error 
*/

const logger = require("../loggers/wiston.log");

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

        // ...
        // this lúc này chính là class Error
        // ...

        logger.error(`${status} - ${this.message}`);
        
        this.status = status;
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