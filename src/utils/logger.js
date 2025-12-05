const config = require('../config');

/**
 * Create Pino logger configuration
 * @returns {Object} Pino logger options
 */
const createLoggerConfig = () => {
  const baseConfig = {
    level: config.logger.level,
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          headers: req.headers,
          hostname: req.hostname,
          remoteAddress: req.ip,
          remotePort: req.socket?.remotePort,
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
      err(err) {
        return {
          type: err.type,
          message: err.message,
          stack: err.stack,
          code: err.code,
          statusCode: err.statusCode,
        };
      },
    },
  };

  // Add pretty printing in development
  if (config.logger.pretty && config.isDevelopment) {
    baseConfig.transport = {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        colorize: true,
      },
    };
  }

  return baseConfig;
};

module.exports = {
  createLoggerConfig,
};
