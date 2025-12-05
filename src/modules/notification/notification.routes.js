const {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendCustomEmail,
  sendNotificationToDevice,
  sendNotificationToMultipleDevices,
  sendNotificationToTopic,
  subscribeToTopic,
  unsubscribeFromTopic,
  updateFcmToken,
} = require('./notification.controller');
const {
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
} = require('./notification.schema');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');
const { ROLES } = require('../../config/constants');

/**
 * Notification routes
 * @param {Object} fastify - Fastify instance
 */
async function notificationRoutes(fastify) {
  // Email Routes (Admin only)
  fastify.post('/email/welcome', {
    schema: sendWelcomeEmailSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: sendWelcomeEmail,
    config: {
      description: 'Send welcome email',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });

  fastify.post('/email/password-reset', {
    schema: sendPasswordResetEmailSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: sendPasswordResetEmail,
    config: {
      description: 'Send password reset email',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });

  fastify.post('/email/verification', {
    schema: sendVerificationEmailSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: sendVerificationEmail,
    config: {
      description: 'Send email verification',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });

  fastify.post('/email/custom', {
    schema: sendCustomEmailSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: sendCustomEmail,
    config: {
      description: 'Send custom email',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });

  // Push Notification Routes (Admin only)
  fastify.post('/push/device', {
    schema: sendNotificationToDeviceSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: sendNotificationToDevice,
    config: {
      description: 'Send push notification to a single device',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });

  fastify.post('/push/devices', {
    schema: sendNotificationToMultipleDevicesSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: sendNotificationToMultipleDevices,
    config: {
      description: 'Send push notification to multiple devices',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });

  fastify.post('/push/topic', {
    schema: sendNotificationToTopicSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: sendNotificationToTopic,
    config: {
      description: 'Send push notification to a topic',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });

  fastify.post('/push/topic/subscribe', {
    schema: subscribeToTopicSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: subscribeToTopic,
    config: {
      description: 'Subscribe devices to a topic',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });

  fastify.post('/push/topic/unsubscribe', {
    schema: unsubscribeFromTopicSchema,
    preHandler: [authenticate, authorize([ROLES.ADMIN])],
    handler: unsubscribeFromTopic,
    config: {
      description: 'Unsubscribe devices from a topic',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });

  // FCM Token Management (Authenticated users)
  fastify.patch('/fcm-token', {
    schema: updateFcmTokenSchema,
    preHandler: authenticate,
    handler: updateFcmToken,
    config: {
      description: 'Update user FCM token',
      tags: ['Notifications'],
      security: [{ bearerAuth: [] }],
    },
  });
}

module.exports = notificationRoutes;
