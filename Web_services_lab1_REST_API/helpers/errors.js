class CustomError extends Error {
    constructor(status, code, message, details = []) {
      super(message);

      this.status = status;
      this.code = code;
      this.message = message;
      this.details = details;
    }
}

///////////////////////////////////////////////////
const createError = (code, message, details) => {
  return class CreatedError extends CustomError {
    constructor() { super(code, message, details) }
  }
}

//////////////////////////////////////////////////////////////////////////////////
// for  errors
const errors = {
  APP_ERR_AUTHENTICATION: createError(401, 'AUTHENTICATION_REQUIRED', 'You must login first'),
  APP_ERR_PERMISSION: createError(401, 'PERMISSION_REQUIRED', 'You must have a permission first to access this resource'),
}


module.exports = {
    CustomError,
    errors,
}