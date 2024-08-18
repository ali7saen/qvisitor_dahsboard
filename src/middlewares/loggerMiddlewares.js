const logger = require('../config/logger');

const actionsMap = {
  '/api/questions/get': 'get latest question',
  '/auth/login': 'try to login',
  '/users/add': 'try to add new user',
  '/users/logout': 'try to logout',
  '/questions/add': 'try to add new question',
  '/questions/search': 'try to search for question',
  '/questions/export': 'try to export questions',
  '/questions/import': 'try to import questions',
};

const requestLogger = (req, res, next) => {
  const requestType = req.originalUrl.startsWith('/api') ? 'API' : 'WEB';
  const action = actionsMap[req.originalUrl] || 'unknown action';

  logger.info({
    message: 'Incoming request',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    requestType,
    action, // Add the action field
  });

  next();
};


module.exports = {
    requestLogger
};

