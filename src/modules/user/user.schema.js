/**
 * User JSON schemas for validation and documentation
 */

const userResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    name: { type: 'string' },
    role: { type: 'string' },
    isActive: { type: 'boolean' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

const getAllUsersSchema = {
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, description: 'Items per page' },
      sortBy: { type: 'string', description: 'Field to sort by' },
      order: { type: 'string', enum: ['asc', 'desc'], description: 'Sort order' },
      search: { type: 'string', description: 'Search in name and email' },
      role: { type: 'string', enum: ['USER', 'ADMIN', 'MODERATOR'], description: 'Filter by role' },
      isActive: { type: 'string', enum: ['true', 'false'], description: 'Filter by active status' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: {
          type: 'array',
          items: userResponseSchema,
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'integer' },
            page: { type: 'integer' },
            limit: { type: 'integer' },
            totalPages: { type: 'integer' },
            hasNextPage: { type: 'boolean' },
            hasPrevPage: { type: 'boolean' },
          },
        },
      },
    },
  },
};

const getUserByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'User ID' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: userResponseSchema,
      },
    },
  },
};

const createUserSchema = {
  body: {
    type: 'object',
    required: ['email', 'password', 'name'],
    properties: {
      email: { type: 'string', format: 'email', description: 'User email' },
      password: { type: 'string', minLength: 6, description: 'User password (min 6 chars)' },
      name: { type: 'string', minLength: 2, description: 'User full name' },
      role: {
        type: 'string',
        enum: ['USER', 'ADMIN', 'MODERATOR'],
        description: 'User role (optional)',
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: userResponseSchema,
      },
    },
  },
};

const updateUserSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'User ID' },
    },
  },
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email', description: 'User email' },
      password: { type: 'string', minLength: 6, description: 'User password' },
      name: { type: 'string', minLength: 2, description: 'User full name' },
      role: { type: 'string', enum: ['USER', 'ADMIN', 'MODERATOR'], description: 'User role' },
      isActive: { type: 'boolean', description: 'User active status' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: userResponseSchema,
      },
    },
  },
};

const deleteUserSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'User ID' },
    },
  },
  response: {
    204: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  },
};

module.exports = {
  getAllUsersSchema,
  getUserByIdSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
};
