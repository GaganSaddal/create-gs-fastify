const admin = require('firebase-admin');
const config = require('../config');
const fs = require('fs');
const path = require('path');

/**
 * Firebase Cloud Messaging service
 */
class NotificationService {
  constructor() {
    this.initialized = false;
    this.initializeFirebase();
  }

  /**
   * Initialize Firebase Admin SDK
   */
  initializeFirebase() {
    try {
      // Check if already initialized
      if (admin.apps.length > 0) {
        this.initialized = true;
        return;
      }

      // Initialize with service account file
      if (config.firebase.serviceAccountPath) {
        const serviceAccountPath = path.resolve(config.firebase.serviceAccountPath);
        
        if (fs.existsSync(serviceAccountPath)) {
          const serviceAccount = require(serviceAccountPath);
          
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
          
          this.initialized = true;
          console.log('Firebase initialized with service account file');
          return;
        }
      }

      // Initialize with environment variables
      if (config.firebase.projectId && config.firebase.privateKey && config.firebase.clientEmail) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: config.firebase.projectId,
            privateKey: config.firebase.privateKey,
            clientEmail: config.firebase.clientEmail,
          }),
        });
        
        this.initialized = true;
        console.log('Firebase initialized with environment variables');
        return;
      }

      console.warn('Firebase credentials not configured. Push notification service disabled.');
    } catch (error) {
      console.error('Firebase initialization failed:', error.message);
    }
  }

  /**
   * Check if Firebase is initialized
   * @returns {boolean}
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Send notification to a single device
   * @param {string} token - Device FCM token
   * @param {Object} notification - Notification payload
   * @param {string} notification.title - Notification title
   * @param {string} notification.body - Notification body
   * @param {Object} data - Additional data payload
   * @returns {Promise<Object>}
   */
  async sendToDevice(token, notification, data = {}) {
    if (!this.initialized) {
      throw new Error('Firebase not initialized');
    }

    const message = {
      token,
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data,
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          clickAction: 'FLUTTER_NOTIFICATION_CLICK',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
    };

    try {
      const response = await admin.messaging().send(message);
      return {
        success: true,
        messageId: response,
      };
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  /**
   * Send notification to multiple devices
   * @param {Array<string>} tokens - Array of device FCM tokens
   * @param {Object} notification - Notification payload
   * @param {Object} data - Additional data payload
   * @returns {Promise<Object>}
   */
  async sendToMultipleDevices(tokens, notification, data = {}) {
    if (!this.initialized) {
      throw new Error('Firebase not initialized');
    }

    const message = {
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data,
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      return {
        success: true,
        successCount: response.successCount,
        failureCount: response.failureCount,
        responses: response.responses,
      };
    } catch (error) {
      console.error('Error sending notifications:', error);
      throw error;
    }
  }

  /**
   * Send notification to a topic
   * @param {string} topic - Topic name
   * @param {Object} notification - Notification payload
   * @param {Object} data - Additional data payload
   * @returns {Promise<Object>}
   */
  async sendToTopic(topic, notification, data = {}) {
    if (!this.initialized) {
      throw new Error('Firebase not initialized');
    }

    const message = {
      topic,
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data,
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
    };

    try {
      const response = await admin.messaging().send(message);
      return {
        success: true,
        messageId: response,
      };
    } catch (error) {
      console.error('Error sending topic notification:', error);
      throw error;
    }
  }

  /**
   * Subscribe devices to a topic
   * @param {Array<string>} tokens - Device tokens
   * @param {string} topic - Topic name
   * @returns {Promise<Object>}
   */
  async subscribeToTopic(tokens, topic) {
    if (!this.initialized) {
      throw new Error('Firebase not initialized');
    }

    try {
      const response = await admin.messaging().subscribeToTopic(tokens, topic);
      return {
        success: true,
        successCount: response.successCount,
        failureCount: response.failureCount,
      };
    } catch (error) {
      console.error('Error subscribing to topic:', error);
      throw error;
    }
  }

  /**
   * Unsubscribe devices from a topic
   * @param {Array<string>} tokens - Device tokens
   * @param {string} topic - Topic name
   * @returns {Promise<Object>}
   */
  async unsubscribeFromTopic(tokens, topic) {
    if (!this.initialized) {
      throw new Error('Firebase not initialized');
    }

    try {
      const response = await admin.messaging().unsubscribeFromTopic(tokens, topic);
      return {
        success: true,
        successCount: response.successCount,
        failureCount: response.failureCount,
      };
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
      throw error;
    }
  }

  /**
   * Send welcome notification
   * @param {string} token - Device token
   * @param {string} userName - User name
   * @returns {Promise<Object>}
   */
  async sendWelcomeNotification(token, userName) {
    return this.sendToDevice(
      token,
      {
        title: 'Welcome to Fastify App! 🎉',
        body: `Hello ${userName}! Thanks for joining us.`,
      },
      {
        type: 'welcome',
        timestamp: new Date().toISOString(),
      }
    );
  }

  /**
   * Send custom notification
   * @param {string|Array<string>} tokens - Device token(s)
   * @param {string} title - Notification title
   * @param {string} body - Notification body
   * @param {Object} data - Additional data
   * @returns {Promise<Object>}
   */
  async sendCustomNotification(tokens, title, body, data = {}) {
    if (Array.isArray(tokens)) {
      return this.sendToMultipleDevices(tokens, { title, body }, data);
    }
    return this.sendToDevice(tokens, { title, body }, data);
  }
}

// Export singleton instance
module.exports = new NotificationService();
