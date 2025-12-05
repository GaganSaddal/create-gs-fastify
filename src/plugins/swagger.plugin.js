const fp = require('fastify-plugin');
const swagger = require('@fastify/swagger');
const swaggerUi = require('@fastify/swagger-ui');
const config = require('../config');

/**
 * Swagger API documentation plugin
 * @param {Object} fastify - Fastify instance
 */
async function swaggerPlugin(fastify) {
  if (!config.swagger.enabled) {
    fastify.log.info('Swagger documentation is disabled');
    return;
  }

  // Register Swagger
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Fastify Boilerplate API',
        description: 'Production-grade Node.js + Fastify REST API with authentication and RBAC',
        version: '1.0.0',
        contact: {
          name: 'Gagan Saddal',
        },
      },
      servers: [
        {
          url: `http://localhost:${config.port}`,
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      tags: [
        { name: 'Auth', description: 'Authentication endpoints' },
        { name: 'Users', description: 'User management endpoints' },
        { name: 'Notifications', description: 'Email and push notification endpoints' },
        { name: 'Health', description: 'Health check endpoints' },
      ],
    },
  });

  // Register Swagger UI
  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });

  fastify.log.info('Swagger documentation registered at /docs');
}

module.exports = fp(swaggerPlugin, {
  name: 'swagger-plugin',
});
