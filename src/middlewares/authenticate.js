const { HTTP_STATUS, ERROR_CODES } = require('../config/constants');

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
const authenticate = async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(HTTP_STATUS.UNAUTHORIZED).send({
      success: false,
      message: 'Invalid or expired token',
      code: ERROR_CODES.AUTHENTICATION_ERROR,
    });
  }
};

module.exports = authenticate;
