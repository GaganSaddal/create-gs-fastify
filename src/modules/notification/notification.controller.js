const emailService = require('../../utils/email.service');
const notificationService = require('../../utils/notification.service');
const { sendSuccess } = require('../../utils/response');
const { HTTP_STATUS } = require('../../config/constants');

/**
 * Send welcome email
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function sendWelcomeEmail(request, reply) {
  const { email, name } = request.body;

  await emailService.sendWelcomeEmail(email, name);

  return sendSuccess(reply, null, 'Welcome email sent successfully');
}

/**
 * Send password reset email
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function sendPasswordResetEmail(request, reply) {
  const { email, name, resetToken, resetUrl } = request.body;

  await emailService.sendPasswordResetEmail(email, name, resetToken, resetUrl);

  return sendSuccess(reply, null, 'Password reset email sent successfully');
}

/**
 * Send verification email
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function sendVerificationEmail(request, reply) {
  const { email, name, verificationToken, verificationUrl } = request.body;

  await emailService.sendVerificationEmail(email, name, verificationToken, verificationUrl);

  return sendSuccess(reply, null, 'Verification email sent successfully');
}

/**
 * Send custom email
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function sendCustomEmail(request, reply) {
  const { email, subject, message } = request.body;

  await emailService.sendCustomEmail(email, subject, message);

  return sendSuccess(reply, null, 'Email sent successfully');
}

/**
 * Send push notification to device
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function sendNotificationToDevice(request, reply) {
  const { token, title, body, data } = request.body;

  const result = await notificationService.sendToDevice(
    token,
    { title, body },
    data || {}
  );

  return sendSuccess(reply, result, 'Notification sent successfully');
}

/**
 * Send push notification to multiple devices
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function sendNotificationToMultipleDevices(request, reply) {
  const { tokens, title, body, data } = request.body;

  const result = await notificationService.sendToMultipleDevices(
    tokens,
    { title, body },
    data || {}
  );

  return sendSuccess(reply, result, 'Notifications sent successfully');
}

/**
 * Send push notification to topic
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function sendNotificationToTopic(request, reply) {
  const { topic, title, body, data } = request.body;

  const result = await notificationService.sendToTopic(
    topic,
    { title, body },
    data || {}
  );

  return sendSuccess(reply, result, 'Topic notification sent successfully');
}

/**
 * Subscribe to topic
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function subscribeToTopic(request, reply) {
  const { tokens, topic } = request.body;

  const result = await notificationService.subscribeToTopic(tokens, topic);

  return sendSuccess(reply, result, 'Subscribed to topic successfully');
}

/**
 * Unsubscribe from topic
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function unsubscribeFromTopic(request, reply) {
  const { tokens, topic } = request.body;

  const result = await notificationService.unsubscribeFromTopic(tokens, topic);

  return sendSuccess(reply, result, 'Unsubscribed from topic successfully');
}

/**
 * Update user FCM token
 * @param {Object} request - Fastify request
 * @param {Object} reply - Fastify reply
 */
async function updateFcmToken(request, reply) {
  const { fcmToken } = request.body;
  const userId = request.user.id;

  const user = await request.server.prisma.user.update({
    where: { id: userId },
    data: { fcmToken },
    select: {
      id: true,
      email: true,
      name: true,
      fcmToken: true,
    },
  });

  return sendSuccess(reply, user, 'FCM token updated successfully');
}

module.exports = {
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
};
