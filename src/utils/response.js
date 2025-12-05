const { HTTP_STATUS } = require('../config/constants');

/**
 * Send success response
 * @param {Object} reply - Fastify reply object
 * @param {Object} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Formatted response
 */
const sendSuccess = (reply, data = null, message = 'Success', statusCode = HTTP_STATUS.OK) => {
  return reply.status(statusCode).send({
    success: true,
    message,
    data,
  });
};

/**
 * Send error response
 * @param {Object} reply - Fastify reply object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {string} code - Error code
 * @param {Object} errors - Validation errors
 * @returns {Object} Formatted error response
 */
const sendError = (
  reply,
  message = 'An error occurred',
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  code = 'INTERNAL_ERROR',
  errors = null
) => {
  const response = {
    success: false,
    message,
    code,
  };

  if (errors) {
    response.errors = errors;
  }

  return reply.status(statusCode).send(response);
};

/**
 * Send paginated response
 * @param {Object} reply - Fastify reply object
 * @param {Array} data - Array of items
 * @param {Object} meta - Pagination metadata
 * @param {string} message - Success message
 * @returns {Object} Formatted paginated response
 */
const sendPaginatedResponse = (reply, data, meta, message = 'Success') => {
  return reply.status(HTTP_STATUS.OK).send({
    success: true,
    message,
    data,
    meta,
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendPaginatedResponse,
};
