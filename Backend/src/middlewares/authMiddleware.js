// @ts-nocheck
const { supabase } = require('../config/supabase');

const ResponseHandler = require('../utils/responseHandler');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ResponseHandler.unauthorized(res, 'No token provided');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error('Authentication failed:', error);
      return ResponseHandler.unauthorized(res, 'Invalid or expired token');
    }

    // Attach user to request
    req.user = user;
    req.token = token;
     
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return ResponseHandler.error(res, 'Authentication failed');
  }
};

module.exports = { authenticateUser };