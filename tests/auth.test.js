const { buildServer } = require('../src/server');

describe('Auth Module', () => {
  let app;

  beforeAll(async () => {
    app = await buildServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email: `test-${Date.now()}@example.com`,
          password: 'password123',
          name: 'Test User',
        },
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toMatchObject({
        success: true,
        message: 'User registered successfully',
      });
      expect(response.json().data).toHaveProperty('user');
      expect(response.json().data).toHaveProperty('accessToken');
      expect(response.json().data).toHaveProperty('refreshToken');
    });

    it('should fail with invalid email', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email: 'invalid-email',
          password: 'password123',
          name: 'Test User',
        },
      });

      expect(response.statusCode).toBe(400);
    });

    it('should fail with short password', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email: 'test@example.com',
          password: '123',
          name: 'Test User',
        },
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // First register a user
      const email = `login-test-${Date.now()}@example.com`;
      await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email,
          password: 'password123',
          name: 'Login Test User',
        },
      });

      // Then login
      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email,
          password: 'password123',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        success: true,
      });
      expect(response.json().data).toHaveProperty('accessToken');
    });

    it('should fail with invalid credentials', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        },
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /api/auth/profile', () => {
    it('should get profile with valid token', async () => {
      // Register and get token
      const email = `profile-test-${Date.now()}@example.com`;
      const registerResponse = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email,
          password: 'password123',
          name: 'Profile Test User',
        },
      });

      const { accessToken } = registerResponse.json().data;

      // Get profile
      const response = await app.inject({
        method: 'GET',
        url: '/api/auth/profile',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.json().data).toHaveProperty('email', email);
    });

    it('should fail without token', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/auth/profile',
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
