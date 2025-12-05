const fp = require('fastify-plugin');
const rateLimit = require('@fastify/rate-limit');
const config = require('../config');

/**
 * Rate limiting plugin
 * @param {Object} fastify - Fastify instance
 */
async function rateLimitPlugin(fastify) {
  await fastify.register(rateLimit, {
    max: config.rateLimit.max,
    timeWindow: config.rateLimit.timeWindow,
    errorResponseBuilder: (request, context) => {
      return {
        success: false,
        message: `Rate limit exceeded, retry in ${context.after}`,
        code: 'RATE_LIMIT_ERROR',
      };
    },
  });

  fastify.log.info('Rate limiting registered');
}

module.exports = fp(rateLimitPlugin, {
  name: 'rate-limit-plugin',
});
