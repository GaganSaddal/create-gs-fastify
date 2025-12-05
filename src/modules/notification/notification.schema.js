/**
 * Notification JSON schemas for validation and documentation
 */

// Email Schemas
const sendWelcomeEmailSchema = {
  body: {
    type: 'object',
    required: ['email', 'name'],
    properties: {
      email: { type: 'string', format: 'email', description: 'Recipient email' },
      name: { type: 'string', description: 'Recipient name' },
    },
  },
};

const sendPasswordResetEmailSchema = {
  body: {
    type: 'object',
    required: ['email', 'name', 'resetToken', 'resetUrl'],
    properties: {
      email: { type: 'string', format: 'email', description: 'Recipient email' },
      name: { type: 'string', description: 'Recipient name' },
      resetToken: { type: 'string', description: 'Password reset token' },
      resetUrl: { type: 'string', description: 'Password reset URL' },
    },
  },
};

const sendVerificationEmailSchema = {
  body: {
    type: 'object',
    required: ['email', 'name', 'verificationToken', 'verificationUrl'],
    properties: {
      email: { type: 'string', format: 'email', description: 'Recipient email' },
      name: { type: 'string', description: 'Recipient name' },
      verificationToken: { type: 'string', description: 'Verification token' },
      verificationUrl: { type: 'string', description: 'Verification URL' },
    },
  },
};

const sendCustomEmailSchema = {
  body: {
    type: 'object',
    required: ['email', 'subject', 'message'],
    properties: {
      email: { type: 'string', format: 'email', description: 'Recipient email' },
      subject: { type: 'string', description: 'Email subject' },
      message: { type: 'string', description: 'Email message (HTML supported)' },
    },
  },
};

// Push Notification Schemas
const sendNotificationToDeviceSchema = {
  body: {
    type: 'object',
    required: ['token', 'title', 'body'],
    properties: {
      token: { type: 'string', description: 'FCM device token' },
      title: { type: 'string', description: 'Notification title' },
      body: { type: 'string', description: 'Notification body' },
      data: { type: 'object', description: 'Additional data payload' },
    },
  },
};

const sendNotificationToMultipleDevicesSchema = {
  body: {
    type: 'object',
    required: ['tokens', 'title', 'body'],
    properties: {
      tokens: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of FCM device tokens',
      },
      title: { type: 'string', description: 'Notification title' },
      body: { type: 'string', description: 'Notification body' },
      data: { type: 'object', description: 'Additional data payload' },
    },
  },
};

const sendNotificationToTopicSchema = {
  body: {
    type: 'object',
    required: ['topic', 'title', 'body'],
    properties: {
      topic: { type: 'string', description: 'Topic name' },
      title: { type: 'string', description: 'Notification title' },
      body: { type: 'string', description: 'Notification body' },
      data: { type: 'object', description: 'Additional data payload' },
    },
  },
};

const subscribeToTopicSchema = {
  body: {
    type: 'object',
    required: ['tokens', 'topic'],
    properties: {
      tokens: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of FCM device tokens',
      },
      topic: { type: 'string', description: 'Topic name' },
    },
  },
};

const unsubscribeFromTopicSchema = {
  body: {
    type: 'object',
    required: ['tokens', 'topic'],
    properties: {
      tokens: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of FCM device tokens',
      },
      topic: { type: 'string', description: 'Topic name' },
    },
  },
};

const updateFcmTokenSchema = {
  body: {
    type: 'object',
    required: ['fcmToken'],
    properties: {
      fcmToken: { type: 'string', description: 'Firebase Cloud Messaging token' },
    },
  },
};

module.exports = {
  sendWelcomeEmailSchema,
  sendPasswordResetEmailSchema,
  sendVerificationEmailSchema,
  sendCustomEmailSchema,
  sendNotificationToDeviceSchema,
  sendNotificationToMultipleDevicesSchema,
  sendNotificationToTopicSchema,
  subscribeToTopicSchema,
  unsubscribeFromTopicSchema,
  updateFcmTokenSchema,
};
