const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('./user.controller');
const {
  getAllUsersSchema,
  getUserByIdSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
} = require('./user.schema');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const { ROLES } = require('../../config/constants');

/**
 * User routes
 * @param {Object} fastify - Fastify instance
 */
async function userRoutes(fastify) {
  // Get all users (Admin only)
  fastify.get('/', {
    schema: getAllUsersSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: getAllUsers,
    config: {
      description: 'Get all users with pagination, filtering, and sorting',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
    },
  });

  // Get user by ID (Admin only)
  fastify.get('/:id', {
    schema: getUserByIdSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: getUserById,
    config: {
      description: 'Get user by ID',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
    },
  });

  // Create user (Admin only)
  fastify.post('/', {
    schema: createUserSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: createUser,
    config: {
      description: 'Create a new user',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
    },
  });

  // Update user (Admin only)
  fastify.patch('/:id', {
    schema: updateUserSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: updateUser,
    config: {
      description: 'Update user',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
    },
  });

  // Delete user (Admin only)
  fastify.delete('/:id', {
    schema: deleteUserSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: deleteUser,
    config: {
      description: 'Delete user',
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
    },
  });
}

module.exports = userRoutes;
