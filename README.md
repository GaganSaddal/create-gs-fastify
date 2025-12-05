# Create GS Fastify

[![npm version](https://badge.fury.io/js/create-gs-fastify.svg)](https://www.npmjs.com/package/create-gs-fastify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/gagansaddal/create-gs-fastify.svg)](https://github.com/gagansaddal/create-gs-fastify/stargazers)

> Production-grade Node.js + Fastify REST API boilerplate scaffolding tool with authentication, authorization, and best practices.

**Author:** Gagan Saddal

## 📦 Quick Start

### Using NPM Create (Recommended)

```bash
npm create gs-fastify my-project
```

### Using NPM Init

```bash
npm init gs-fastify my-project
```

### Using NPX

```bash
npx create-gs-fastify my-project
```

### Manual Installation

```bash
git clone https://github.com/gagansaddal/create-gs-fastify.git my-project
cd my-project
npm install
```

## 🚀 Features

- ⚡ **Fastify** - Fast and low overhead web framework
- 🔐 **JWT Authentication** - Access & refresh token flow
- 🛡️ **RBAC** - Role-based access control
- 🗄️ **Prisma ORM** - Type-safe database access with PostgreSQL
- 🔒 **Security** - Helmet, CORS, rate limiting
- 📝 **Validation** - JSON schema validation
- 📚 **API Documentation** - Swagger/OpenAPI 3.0
- 📧 **Email Service** - SMTP with Nodemailer (welcome, password reset, verification)
- 🔔 **Push Notifications** - Firebase Cloud Messaging (FCM)
- 🐳 **Docker** - Containerized development & production
- ✅ **Testing** - Jest with example tests
- 📊 **Logging** - Pino logger with pretty printing
- 🎨 **Code Quality** - ESLint + Prettier
- 🔄 **Hot Reload** - Nodemon for development

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 13 (or use Docker)
- Docker & Docker Compose (optional)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Create-Fastify-Panel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fastify_db?schema=public"

# JWT (CHANGE THESE IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-change-this-in-production
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
CORS_CREDENTIALS=true

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_TIME_WINDOW=15m

# Logging
LOG_LEVEL=info
LOG_PRETTY=true

# Security
BCRYPT_ROUNDS=10

# Swagger
SWAGGER_ENABLED=true
```

### 4. Database setup

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL container
npm run docker:up

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio
npm run prisma:studio
```

#### Option B: Local PostgreSQL

Ensure PostgreSQL is running, then:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Server will start at `http://localhost:3000`

API Documentation available at `http://localhost:3000/docs`

### Production Mode

```bash
# Build and start
npm start
```

### Using Docker

```bash
# Start all services (app + database)
docker-compose up -d

# View logs
npm run docker:logs

# Stop services
npm run docker:down
```

## 📁 Project Structure

```
fastify-boilerplate/
├── src/
│   ├── modules/              # Feature modules
│   │   ├── auth/            # Authentication module
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.schema.js
│   │   │   └── auth.routes.js
│   │   └── user/            # User management module
│   │       ├── user.controller.js
│   │       ├── user.service.js
│   │       ├── user.schema.js
│   │       └── user.routes.js
│   ├── plugins/             # Fastify plugins
│   │   ├── auth.plugin.js   # JWT configuration
│   │   ├── cors.plugin.js   # CORS setup
│   │   ├── helmet.plugin.js # Security headers
│   │   ├── prisma.plugin.js # Database connection
│   │   ├── rate-limit.plugin.js
│   │   └── swagger.plugin.js
│   ├── middlewares/         # Custom middlewares
│   │   ├── authenticate.js  # JWT verification
│   │   ├── authorize.js     # RBAC middleware
│   │   └── error-handler.js # Global error handler
│   ├── utils/               # Utility functions
│   │   ├── logger.js        # Pino logger config
│   │   ├── pagination.js    # Pagination helpers
│   │   ├── password.js      # Password hashing
│   │   └── response.js      # Response formatters
│   ├── config/              # Configuration
│   │   ├── index.js         # Environment config
│   │   └── constants.js     # App constants
│   ├── schemas/             # Common schemas
│   │   └── common.schema.js
│   └── server.js            # Main server file
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── tests/                   # Test files
│   ├── setup.js
│   └── auth.test.js
├── .env.example             # Environment template
├── .eslintrc.json           # ESLint config
├── .prettierrc              # Prettier config
├── docker-compose.yml       # Docker Compose config
├── Dockerfile               # Docker configuration
├── jest.config.js           # Jest configuration
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Health Check

```http
GET /health
```

### Authentication

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "USER"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Refresh Token

```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Logout

```http
POST /api/auth/logout
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Get Profile

```http
GET /api/auth/profile
Authorization: Bearer <access-token>
```

### User Management (Admin Only)

#### Get All Users

```http
GET /api/users?page=1&limit=10&sortBy=createdAt&order=desc&search=john&role=USER
Authorization: Bearer <admin-access-token>
```

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortBy` - Field to sort by (default: createdAt)
- `order` - Sort order: asc/desc (default: desc)
- `search` - Search in name and email
- `role` - Filter by role: USER/ADMIN/MODERATOR
- `isActive` - Filter by active status: true/false

#### Get User by ID

```http
GET /api/users/:id
Authorization: Bearer <admin-access-token>
```

#### Create User

```http
POST /api/users
Authorization: Bearer <admin-access-token>
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "Jane Doe",
  "role": "USER"
}
```

#### Update User

```http
PATCH /api/users/:id
Authorization: Bearer <admin-access-token>
Content-Type: application/json

{
  "name": "Updated Name",
  "role": "MODERATOR",
  "isActive": true
}
```

#### Delete User

```http
DELETE /api/users/:id
Authorization: Bearer <admin-access-token>
```

### Notifications (Admin Only)

#### Send Welcome Email

```http
POST /api/notifications/email/welcome
Authorization: Bearer <admin-access-token>
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

#### Send Push Notification to Device

```http
POST /api/notifications/push/device
Authorization: Bearer <admin-access-token>
Content-Type: application/json

{
  "token": "fcm-device-token",
  "title": "Hello!",
  "body": "This is a test notification",
  "data": {
    "type": "custom",
    "userId": "123"
  }
}
```

#### Send Push Notification to Topic

```http
POST /api/notifications/push/topic
Authorization: Bearer <admin-access-token>
Content-Type: application/json

{
  "topic": "all-users",
  "title": "Announcement",
  "body": "New feature available!",
  "data": {
    "feature": "dark-mode"
  }
}
```

#### Update FCM Token (Authenticated Users)

```http
PATCH /api/notifications/fcm-token
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "fcmToken": "your-fcm-device-token"
}
```

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Update `.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   ```

### Other SMTP Providers

The service works with any SMTP provider (SendGrid, Mailgun, AWS SES, etc.). Just update the SMTP configuration in `.env`.

## 🔔 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Cloud Messaging

### 2. Get Service Account Credentials

**Option A: Service Account File (Recommended)**

1. Go to Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save as `firebase-service-account.json` in project root

**Option B: Environment Variables**

Add to `.env`:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

## 📮 Postman Collection Examples

### 5. Send Welcome Email

```json
{
  "name": "Send Welcome Email",
  "request": {
    "method": "POST",
    "header": [
      {"key": "Authorization", "value": "Bearer {{adminToken}}"},
      {"key": "Content-Type", "value": "application/json"}
    ],
    "body": {
      "mode": "raw",
      "raw": "{\n  \"email\": \"user@example.com\",\n  \"name\": \"John Doe\"\n}"
    },
    "url": {
      "raw": "http://localhost:3000/api/notifications/email/welcome",
      "protocol": "http",
      "host": ["localhost"],
      "port": "3000",
      "path": ["api", "notifications", "email", "welcome"]
    }
  }
}
```

### 6. Send Push Notification

```json
{
  "name": "Send Push Notification",
  "request": {
    "method": "POST",
    "header": [
      {"key": "Authorization", "value": "Bearer {{adminToken}}"},
      {"key": "Content-Type", "value": "application/json"}
    ],
    "body": {
      "mode": "raw",
      "raw": "{\n  \"token\": \"fcm-device-token\",\n  \"title\": \"Test Notification\",\n  \"body\": \"This is a test\",\n  \"data\": {\"type\": \"test\"}\n}"
    },
    "url": {
      "raw": "http://localhost:3000/api/notifications/push/device",
      "protocol": "http",
      "host": ["localhost"],
      "port": "3000",
      "path": ["api", "notifications", "push", "device"]
    }
  }
}
```

## 📮 Postman Collection Examples

### 1. Register User

```json
{
  "name": "Register User",
  "request": {
    "method": "POST",
    "header": [{"key": "Content-Type", "value": "application/json"}],
    "body": {
      "mode": "raw",
      "raw": "{\n  \"email\": \"admin@example.com\",\n  \"password\": \"admin123\",\n  \"name\": \"Admin User\",\n  \"role\": \"ADMIN\"\n}"
    },
    "url": {
      "raw": "http://localhost:3000/api/auth/register",
      "protocol": "http",
      "host": ["localhost"],
      "port": "3000",
      "path": ["api", "auth", "register"]
    }
  }
}
```

### 2. Login

```json
{
  "name": "Login",
  "request": {
    "method": "POST",
    "header": [{"key": "Content-Type", "value": "application/json"}],
    "body": {
      "mode": "raw",
      "raw": "{\n  \"email\": \"admin@example.com\",\n  \"password\": \"admin123\"\n}"
    },
    "url": {
      "raw": "http://localhost:3000/api/auth/login",
      "protocol": "http",
      "host": ["localhost"],
      "port": "3000",
      "path": ["api", "auth", "login"]
    }
  }
}
```

### 3. Get Profile (Protected)

```json
{
  "name": "Get Profile",
  "request": {
    "method": "GET",
    "header": [
      {"key": "Authorization", "value": "Bearer {{accessToken}}"}
    ],
    "url": {
      "raw": "http://localhost:3000/api/auth/profile",
      "protocol": "http",
      "host": ["localhost"],
      "port": "3000",
      "path": ["api", "auth", "profile"]
    }
  }
}
```

### 4. Get All Users (Admin)

```json
{
  "name": "Get All Users",
  "request": {
    "method": "GET",
    "header": [
      {"key": "Authorization", "value": "Bearer {{accessToken}}"}
    ],
    "url": {
      "raw": "http://localhost:3000/api/users?page=1&limit=10",
      "protocol": "http",
      "host": ["localhost"],
      "port": "3000",
      "path": ["api", "users"],
      "query": [
        {"key": "page", "value": "1"},
        {"key": "limit", "value": "10"}
      ]
    }
  }
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## 📜 Available Scripts

```bash
npm run dev              # Start development server with hot reload
npm start                # Start production server
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
npm run docker:up        # Start Docker containers
npm run docker:down      # Stop Docker containers
npm run docker:logs      # View Docker logs
```

## 🔐 Security Features

- **Helmet** - Sets security HTTP headers
- **CORS** - Configurable cross-origin resource sharing
- **Rate Limiting** - Prevents brute force attacks
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password hashing with configurable rounds
- **Input Validation** - JSON schema validation on all endpoints
- **SQL Injection Prevention** - Prisma ORM with parameterized queries
- **XSS Protection** - Content Security Policy headers

## 🏗️ Architecture

### Modular Structure

Each module follows a consistent pattern:
- **Controller** - Request/response handling
- **Service** - Business logic
- **Schema** - Validation & documentation
- **Routes** - Endpoint definitions

### Plugin System

Fastify plugins provide:
- Encapsulation
- Dependency injection
- Lifecycle hooks
- Performance optimization

### Error Handling

Centralized error handler processes:
- Validation errors
- Authentication errors
- Database errors
- Custom application errors

## 🚀 Deployment

### Environment Variables

Ensure all production environment variables are set:

```bash
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
REFRESH_TOKEN_SECRET=<strong-random-secret>
DATABASE_URL=<production-database-url>
```

### Docker Deployment

```bash
# Build production image
docker build -t fastify-app .

# Run container
docker run -p 3000:3000 --env-file .env fastify-app
```

### Database Migrations

```bash
# Production migrations
npm run prisma:migrate:prod
```

## 📝 Best Practices

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Use strong secrets** - Generate random strings for JWT secrets
3. **Enable HTTPS** - Use reverse proxy (nginx) in production
4. **Monitor logs** - Use log aggregation services
5. **Database backups** - Regular automated backups
6. **Rate limiting** - Adjust based on your needs
7. **CORS configuration** - Restrict to known origins
8. **Keep dependencies updated** - Regular security updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this boilerplate for your projects!

## 👤 Author

**Gagan Saddal**

---

Built with ❤️ using Fastify
