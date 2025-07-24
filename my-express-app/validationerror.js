const ApiError = require('./ApiError');

class ValidationError extends ApiError {
  constructor(message = 'Invalid input') {
    super(message, 400);
  }
}

module.exports = ValidationError;

