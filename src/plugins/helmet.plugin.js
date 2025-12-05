const fp = require('fastify-plugin');
const helmet = require('@fastify/helmet');

/**
 * Security headers plugin using Helmet
 * @param {Object} fastify - Fastify instance
 */
async function helmetPlugin(fastify) {
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  });

  fastify.log.info('Helmet security headers registered');
}

module.exports = fp(helmetPlugin, {
  name: 'helmet-plugin',
});
