const Fastify = require('fastify');
const config = require('./config');
const { createLoggerConfig } = require('./utils/logger');
const errorHandler = require('./middlewares/error-handler');

// Import plugins
const helmetPlugin = require('./plugins/helmet.plugin');
const rateLimitPlugin = require('./plugins/rate-limit.plugin');
const corsPlugin = require('./plugins/cors.plugin');
const authPlugin = require('./plugins/auth.plugin');
const prismaPlugin = require('./plugins/prisma.plugin');
const swaggerPlugin = require('./plugins/swagger.plugin');

// Import routes
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');
const notificationRoutes = require('./modules/notification/notification.routes');


/**
 * Build Fastify server
 * @returns {Object} Fastify instance
 */
async function buildServer() {
  const fastify = Fastify({
    logger: createLoggerConfig(),
    trustProxy: true,
    requestIdHeader: 'x-request-id',
    requestIdLogLabel: 'reqId',
  });

  // Register error handler
  fastify.setErrorHandler(errorHandler);

  // Register plugins
  await fastify.register(helmetPlugin);
  await fastify.register(rateLimitPlugin);
  await fastify.register(corsPlugin);
  await fastify.register(authPlugin);
  await fastify.register(prismaPlugin);
  await fastify.register(swaggerPlugin);

  // Health check route
  fastify.get('/health', {
    schema: {
      description: 'Health check endpoint',
      tags: ['Health'],
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' },
            uptime: { type: 'number' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      return reply.send({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    },
  });

  // Register routes
  await fastify.register(authRoutes, { prefix: '/api/auth' });
  await fastify.register(userRoutes, { prefix: '/api/users' });
  await fastify.register(notificationRoutes, { prefix: '/api/notifications' });


  // 404 handler
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      success: false,
      message: 'Route not found',
      code: 'NOT_FOUND',
    });
  });

  return fastify;
}

/**
 * Start server
 */
async function start() {
  try {
    const fastify = await buildServer();

    await fastify.listen({
      port: config.port,
      host: config.host,
    });

    fastify.log.info(`Server listening on ${config.host}:${config.port}`);
    fastify.log.info(`Environment: ${config.env}`);

    if (config.swagger.enabled) {
      fastify.log.info(`Swagger documentation available at http://${config.host}:${config.port}/docs`);
    }

    // Graceful shutdown
    const signals = ['SIGINT', 'SIGTERM'];
    signals.forEach((signal) => {
      process.on(signal, async () => {
        fastify.log.info(`Received ${signal}, closing server gracefully`);
        await fastify.close();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Start server if this file is run directly
if (require.main === module) {
  start();
}

module.exports = { buildServer, start };
