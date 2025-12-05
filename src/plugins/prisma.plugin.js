const fp = require('fastify-plugin');
const { PrismaClient } = require('@prisma/client');

/**
 * Prisma database plugin
 * @param {Object} fastify - Fastify instance
 */
async function prismaPlugin(fastify) {
  const prisma = new PrismaClient({
    log: fastify.log.level === 'debug' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
  });

  // Test database connection
  try {
    await prisma.$connect();
    fastify.log.info('Database connected successfully');
  } catch (error) {
    fastify.log.error('Failed to connect to database:', error);
    throw error;
  }

  // Decorate fastify with prisma instance
  fastify.decorate('prisma', prisma);

  // Graceful shutdown
  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect();
    instance.log.info('Database connection closed');
  });
}

module.exports = fp(prismaPlugin, {
  name: 'prisma-plugin',
});
