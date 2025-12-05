const { HTTP_STATUS, ERROR_CODES } = require('../config/constants');

/**
 * Global error handler for Fastify
 * @param {Error} error - Error object
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
const errorHandler = async (error, request, reply) => {
  const { log } = request;

  // Log the error
  log.error(error);

  // Handle validation errors
  if (error.validation) {
    return reply.status(HTTP_STATUS.BAD_REQUEST).send({
      success: false,
      message: 'Validation error',
      code: ERROR_CODES.VALIDATION_ERROR,
      errors: error.validation.map((err) => ({
        field: err.instancePath || err.params?.missingProperty,
        message: err.message,
      })),
    });
  }

  // Handle JWT errors
  if (error.name === 'UnauthorizedError' || error.statusCode === 401) {
    return reply.status(HTTP_STATUS.UNAUTHORIZED).send({
      success: false,
      message: error.message || 'Unauthorized',
      code: ERROR_CODES.AUTHENTICATION_ERROR,
    });
  }

  // Handle forbidden errors
  if (error.statusCode === 403) {
    return reply.status(HTTP_STATUS.FORBIDDEN).send({
      success: false,
      message: error.message || 'Forbidden',
      code: ERROR_CODES.AUTHORIZATION_ERROR,
    });
  }

  // Handle not found errors
  if (error.statusCode === 404) {
    return reply.status(HTTP_STATUS.NOT_FOUND).send({
      success: false,
      message: error.message || 'Resource not found',
      code: ERROR_CODES.NOT_FOUND_ERROR,
    });
  }

  // Handle rate limit errors
  if (error.statusCode === 429) {
    return reply.status(HTTP_STATUS.TOO_MANY_REQUESTS).send({
      success: false,
      message: 'Too many requests, please try again later',
      code: ERROR_CODES.RATE_LIMIT_ERROR,
    });
  }

  // Handle Prisma errors
  if (error.code === 'P2002') {
    return reply.status(HTTP_STATUS.CONFLICT).send({
      success: false,
      message: 'A record with this value already exists',
      code: ERROR_CODES.CONFLICT_ERROR,
    });
  }

  if (error.code === 'P2025') {
    return reply.status(HTTP_STATUS.NOT_FOUND).send({
      success: false,
      message: 'Record not found',
      code: ERROR_CODES.NOT_FOUND_ERROR,
    });
  }

  // Default error response
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message || 'Internal server error';

  return reply.status(statusCode).send({
    success: false,
    message,
    code: ERROR_CODES.INTERNAL_ERROR,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  });
};

module.exports = errorHandler;
