class TaskException extends Error {
    constructor(
        message,
        errorResponse
    ) {
        super(message); 
        this.code = errorResponse.errorCode ?? null;
        this.description = errorResponse.errorDescription ?? null;
    }
}

module.exports = { TaskException };