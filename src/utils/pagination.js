const { PAGINATION } = require('../config/constants');

/**
 * Calculate pagination metadata
 * @param {number} total - Total number of items
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {Object} Pagination metadata
 */
const getPaginationMeta = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};

/**
 * Parse and validate pagination parameters
 * @param {Object} query - Query parameters
 * @returns {Object} Validated pagination params
 */
const parsePaginationParams = (query = {}) => {
  let page = parseInt(query.page, 10) || PAGINATION.DEFAULT_PAGE;
  let limit = parseInt(query.limit, 10) || PAGINATION.DEFAULT_LIMIT;

  // Ensure positive values
  page = Math.max(1, page);
  limit = Math.max(1, Math.min(limit, PAGINATION.MAX_LIMIT));

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

/**
 * Parse sorting parameters
 * @param {string} sortBy - Field to sort by
 * @param {string} order - Sort order (asc/desc)
 * @returns {Object} Prisma orderBy object
 */
const parseSortParams = (sortBy = 'createdAt', order = 'desc') => {
  const validOrder = ['asc', 'desc'].includes(order.toLowerCase()) ? order.toLowerCase() : 'desc';

  return {
    [sortBy]: validOrder,
  };
};

module.exports = {
  getPaginationMeta,
  parsePaginationParams,
  parseSortParams,
};
