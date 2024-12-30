/**
 * @description Core Response Success 
*/

// status code
const statusCode = {
    OK: 200,
    CREATED: 201,
}

// lý do cho status code
const reasonStatusCode = {
    OK: "OK",
    CREATED: "Created",
}

/**
 * @description
*/
class SuccessResponse {

    // constructor
    constructor({ 
        status = statusCode.OK,
        message = reasonStatusCode.OK,  
        metadata 
    }) {
        this.code = status;
        this.message = message;
        this.metadata = metadata;
    }

    /**
     * @description function response api
     * @param {Response} res 
     */
    send = (res) => {
        return res.status(200).json(this); // this ...
    }
}

/**
 *  @description Yêu cầu (request) thành công
*/
class OkSuccess extends SuccessResponse {
    constructor({ 
        status = statusCode.OK,
        message = reasonStatusCode.OK, 
        metadata
    }) {
        super({ message, status, metadata });
    }
}

// export
module.exports = {
    SuccessResponse,
    OkSuccess
}