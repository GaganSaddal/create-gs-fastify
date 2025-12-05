const UserService = require('./user.service');
const { sendSuccess, sendPaginatedResponse } = require('../../utils/response');
const { HTTP_STATUS } = require('../../config/constants');

/**
 * Get all users
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function getAllUsers(request, reply) {
  const userService = new UserService(request.server.prisma);

  const { users, meta } = await userService.getAllUsers(request.query);

  return sendPaginatedResponse(reply, users, meta, 'Users retrieved successfully');
}

/**
 * Get user by ID
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function getUserById(request, reply) {
  const userService = new UserService(request.server.prisma);
  const { id } = request.params;

  const user = await userService.getUserById(id);

  return sendSuccess(reply, user);
}

/**
 * Create a new user
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function createUser(request, reply) {
  const userService = new UserService(request.server.prisma);

  const user = await userService.createUser(request.body);

  return sendSuccess(reply, user, 'User created successfully', HTTP_STATUS.CREATED);
}

/**
 * Update user
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function updateUser(request, reply) {
  const userService = new UserService(request.server.prisma);
  const { id } = request.params;

  const user = await userService.updateUser(id, request.body);

  return sendSuccess(reply, user, 'User updated successfully');
}

/**
 * Delete user
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function deleteUser(request, reply) {
  const userService = new UserService(request.server.prisma);
  const { id } = request.params;

  await userService.deleteUser(id);

  return sendSuccess(reply, null, 'User deleted successfully', HTTP_STATUS.NO_CONTENT);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
