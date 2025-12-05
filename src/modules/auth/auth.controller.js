const AuthService = require('./auth.service');
const { sendSuccess } = require('../../utils/response');
const { HTTP_STATUS } = require('../../config/constants');

/**
 * Register a new user
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function register(request, reply) {
  const authService = new AuthService(request.server.prisma);

  const user = await authService.register(request.body);

  // Generate tokens
  const accessToken = request.server.generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = request.server.generateRefreshToken({
    id: user.id,
  });

  // Save refresh token
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  await authService.saveRefreshToken(user.id, refreshToken, expiresAt);

  return sendSuccess(
    reply,
    {
      user,
      accessToken,
      refreshToken,
    },
    'User registered successfully',
    HTTP_STATUS.CREATED
  );
}

/**
 * Login user
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function login(request, reply) {
  const authService = new AuthService(request.server.prisma);
  const { email, password } = request.body;

  const user = await authService.login(email, password);

  // Generate tokens
  const accessToken = request.server.generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = request.server.generateRefreshToken({
    id: user.id,
  });

  // Save refresh token
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  await authService.saveRefreshToken(user.id, refreshToken, expiresAt);

  return sendSuccess(reply, {
    user,
    accessToken,
    refreshToken,
  });
}

/**
 * Refresh access token
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function refreshToken(request, reply) {
  const authService = new AuthService(request.server.prisma);
  const { refreshToken } = request.body;

  // Verify refresh token
  const decoded = await request.server.verifyRefreshToken(refreshToken);
  const user = await authService.verifyRefreshToken(refreshToken);

  // Generate new access token
  const accessToken = request.server.generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return sendSuccess(reply, {
    accessToken,
  });
}

/**
 * Logout user
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function logout(request, reply) {
  const authService = new AuthService(request.server.prisma);
  const { refreshToken } = request.body;

  await authService.deleteRefreshToken(refreshToken);

  return sendSuccess(reply, null, 'Logged out successfully');
}

/**
 * Get current user profile
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function getProfile(request, reply) {
  const user = await request.server.prisma.user.findUnique({
    where: { id: request.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return sendSuccess(reply, user);
}

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
};
