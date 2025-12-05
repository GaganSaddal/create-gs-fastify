const {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
} = require('./auth.controller');
const {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  logoutSchema,
  profileSchema,
} = require('./auth.schema');
const authenticate = require('../../middlewares/authenticate');

/**
 * Auth routes
 * @param {Object} fastify - Fastify instance
 */
async function authRoutes(fastify) {
  // Register
  fastify.post('/register', {
    schema: registerSchema,
    handler: register,
    config: {
      description: 'Register a new user',
      tags: ['Auth'],
    },
  });

  // Login
  fastify.post('/login', {
    schema: loginSchema,
    handler: login,
    config: {
      description: 'Login user',
      tags: ['Auth'],
    },
  });

  // Refresh token
  fastify.post('/refresh-token', {
    schema: refreshTokenSchema,
    handler: refreshToken,
    config: {
      description: 'Refresh access token',
      tags: ['Auth'],
    },
  });

  // Logout
  fastify.post('/logout', {
    schema: logoutSchema,
    handler: logout,
    config: {
      description: 'Logout user',
      tags: ['Auth'],
    },
  });

  // Get profile (protected route)
  fastify.get('/profile', {
    schema: profileSchema,
    preHandler: authenticate,
    handler: getProfile,
    config: {
      description: 'Get current user profile',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
    },
  });
}

module.exports = authRoutes;
