const fp = require('fastify-plugin');
const jwt = require('@fastify/jwt');
const config = require('../config');

/**
 * JWT authentication plugin
 * @param {Object} fastify - Fastify instance
 */
async function authPlugin(fastify) {
  // Register JWT for access tokens
  await fastify.register(jwt, {
    secret: config.jwt.secret,
    sign: {
      expiresIn: config.jwt.expiresIn,
    },
    messages: {
      badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
      noAuthorizationInHeaderMessage: 'Authorization header is missing',
      authorizationTokenExpiredMessage: 'Authorization token expired',
      authorizationTokenInvalid: (err) => {
        return `Authorization token is invalid: ${err.message}`;
      },
    },
  });

  // Decorate fastify with token generation methods
  fastify.decorate('generateAccessToken', (payload) => {
    return fastify.jwt.sign(payload);
  });

  fastify.decorate('generateRefreshToken', (payload) => {
    return fastify.jwt.sign(payload, {
      expiresIn: config.jwt.refreshExpiresIn,
      secret: config.jwt.refreshSecret,
    });
  });

  fastify.decorate('verifyRefreshToken', async (token) => {
    return fastify.jwt.verify(token, {
      secret: config.jwt.refreshSecret,
    });
  });

  fastify.log.info('JWT authentication registered');
}

module.exports = fp(authPlugin, {
  name: 'auth-plugin',
});
