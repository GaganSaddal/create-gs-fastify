// Test setup file
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/fastify_test?schema=public';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.REFRESH_TOKEN_SECRET = 'test-refresh-secret';

// Set test timeout
jest.setTimeout(10000);

// Global test utilities
global.testUser = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
};

// Cleanup function
afterAll(async () => {
  // Add cleanup logic here if needed
  await new Promise((resolve) => setTimeout(resolve, 500));
});
