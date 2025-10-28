// @ts-nocheck
const { supabaseAdmin } = require('../config/supabase');
const ResponseHandler = require('../utils/responseHandler');


const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      // Get user profile with role
      const { data: profile, error } = await supabaseAdmin
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error || !profile) {
        console.error('Failed to fetch user role:', error);
        return ResponseHandler.forbidden(res, 'Unable to verify user role');
      }

      // Check if user's role is in allowed roles
      if (!allowedRoles.includes(profile.role)) {
        return ResponseHandler.forbidden(
          res, 
          `Access denied. Required role: ${allowedRoles.join(' or ')}`
        );
      }

      // Attach role to request
      req.userRole = profile.role;
      next();
    } catch (error) {
      logger.error('Role middleware error:', error);
      return ResponseHandler.error(res, 'Authorization check failed');
    }
  };
};

// Specific role checkers
const isAdmin = checkRole(['admin']);
const isTeacher = checkRole(['teacher', 'admin']);
const isStudent = checkRole(['student']);

module.exports = { checkRole, isAdmin, isTeacher, isStudent };