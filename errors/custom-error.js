
class customAPIError extends Error{
    constructor(messgae,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

module.exports = {createCustomError, customAPIError}


