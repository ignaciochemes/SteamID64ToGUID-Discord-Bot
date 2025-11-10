class ErrorResponse {
    statusCode = null;
    error = null;
    message = null;

    constructor(statusCode, error, message) {
        this.statusCode = statusCode;
        this.error = error ? error : 'Error';
        this.message = message ? message : 'Internal Server Error';
    }
}

export default ErrorResponse;
