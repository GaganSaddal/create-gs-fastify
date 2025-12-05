const { hashPassword, comparePassword } = require('../../utils/password');
const { HTTP_STATUS } = require('../../config/constants');
const emailService = require('../../utils/email.service');


/**
 * Auth service
 */
class AuthService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user
   */
  async register(userData) {
    const { email, password, name, role } = userData;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = HTTP_STATUS.CONFLICT;
      throw error;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    // Send welcome email (async, don't wait)
    emailService.sendWelcomeEmail(email, name).catch((err) => {
      console.error('Failed to send welcome email:', err);
    });

    return user;
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User object
   */
  async login(email, password) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = HTTP_STATUS.UNAUTHORIZED;
      throw error;
    }

    // Check if user is active
    if (!user.isActive) {
      const error = new Error('Account is inactive');
      error.statusCode = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      const error = new Error('Invalid credentials');
      error.statusCode = HTTP_STATUS.UNAUTHORIZED;
      throw error;
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  /**
   * Save refresh token
   * @param {string} userId - User ID
   * @param {string} token - Refresh token
   * @param {Date} expiresAt - Token expiration date
   * @returns {Promise<Object>} Saved refresh token
   */
  async saveRefreshToken(userId, token, expiresAt) {
    return this.prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  /**
   * Verify refresh token
   * @param {string} token - Refresh token
   * @returns {Promise<Object>} User object
   */
  async verifyRefreshToken(token) {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!refreshToken) {
      const error = new Error('Invalid refresh token');
      error.statusCode = HTTP_STATUS.UNAUTHORIZED;
      throw error;
    }

    // Check if token is expired
    if (new Date() > refreshToken.expiresAt) {
      // Delete expired token
      await this.prisma.refreshToken.delete({
        where: { id: refreshToken.id },
      });

      const error = new Error('Refresh token expired');
      error.statusCode = HTTP_STATUS.UNAUTHORIZED;
      throw error;
    }

    // Check if user is active
    if (!refreshToken.user.isActive) {
      const error = new Error('Account is inactive');
      error.statusCode = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    const { password: _, ...userWithoutPassword } = refreshToken.user;

    return userWithoutPassword;
  }

  /**
   * Delete refresh token (logout)
   * @param {string} token - Refresh token
   * @returns {Promise<void>}
   */
  async deleteRefreshToken(token) {
    await this.prisma.refreshToken.deleteMany({
      where: { token },
    });
  }

  /**
   * Delete all user refresh tokens
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  async deleteAllUserRefreshTokens(userId) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}

module.exports = AuthService;
