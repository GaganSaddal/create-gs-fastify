const { HTTP_STATUS, ERROR_CODES } = require('../config/constants');

/**
 * Authorization middleware factory
 * Creates middleware to check if user has required roles
 * @param {Array<string>} allowedRoles - Array of allowed roles
 * @returns {Function} Middleware function
 */
const authorize = (allowedRoles = []) => {
  return async (request, reply) => {
    const { user } = request;

    if (!user) {
      return reply.status(HTTP_STATUS.UNAUTHORIZED).send({
        success: false,
        message: 'Authentication required',
        code: ERROR_CODES.AUTHENTICATION_ERROR,
      });
    }

    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return reply.status(HTTP_STATUS.FORBIDDEN).send({
        success: false,
        message: 'Insufficient permissions',
        code: ERROR_CODES.AUTHORIZATION_ERROR,
      });
    }
  };
};

module.exports = authorize;
