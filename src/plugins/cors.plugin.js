const fp = require('fastify-plugin');
const cors = require('@fastify/cors');
const config = require('../config');

/**
 * CORS plugin with strict configuration
 * @param {Object} fastify - Fastify instance
 */
async function corsPlugin(fastify) {
  await fastify.register(cors, {
    origin: config.cors.origin,
    credentials: config.cors.credentials,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600, // 10 minutes
  });

  fastify.log.info('CORS registered');
}

module.exports = fp(corsPlugin, {
  name: 'cors-plugin',
});
