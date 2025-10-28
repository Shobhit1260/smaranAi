// @ts-nocheck
const authService = require('../services/authService');
const ResponseHandler = require('../utils/responseHandler');
const { supabase, supabaseAdmin } = require('../config/supabase');

 
exports.signInWithGoogle = async (req, res) => {
    try {
        // Get the Google OAuth URL from the auth service
        const result = await authService.signInWithGoogle();
        
        return ResponseHandler.success(
            res,
            {
                url: result.url,
                message: 'Google sign-in URL generated successfully'
            }
        );
    } catch (error) {
        console.error('Google sign-in controller error:', error);
        return ResponseHandler.error(
            res,
            error.message || 'Failed to initialize Google sign-in'
        );
    }
};

exports.signUp=async(req,res)=> {
    try {
      const { name,email, password} = req.body;
      
      const result = await authService.signUp(
        name,
        email,
        password
      );

      return ResponseHandler.created(
        res,
        {
          user: {
            email: result.user.email,
          }
        },
        'Account created successfully. Please check your email for verification.'
      );
    } catch (error) {
      console.error("Error in signUp:", error);
      
      if (error.message?.includes('already registered')) {
        return ResponseHandler.badRequest(res, 'Email already registered');
      }
      
      return ResponseHandler.error(res, error.message || 'Failed to create account');
    }
    
  }

exports.signIn=async(req, res)=> {
    try {
      const { email, password } = req.body;
      
      const result = await authService.signIn(email, password);
      return ResponseHandler.success(res, {
        user: result.user,
        session: result.session,
        accessToken: result.session.access_token
      }, 'Signed in successfully');
    } catch (error) {
      console.error('SignIn controller error:', error);
      
      if (error.message?.includes('Invalid login credentials')) {
        return ResponseHandler.unauthorized(res, 'Invalid email or password');
      }
      
      return ResponseHandler.error(res, 'Failed to sign in');
    }
  }

exports.signOut=async (req, res)=> {
    try { 
      await authService.signOut(req.token);
      return ResponseHandler.success(res, null, 'Signed out successfully');
    } catch (error) {
      console.error('SignOut controller error:', error);
      return ResponseHandler.error(res, 'Failed to sign out');
    }
  }  

exports.resetPassword=async(req, res)=> {
    try {
      const { email } = req.body;
      await authService.resetPassword(email);
      return ResponseHandler.success(
        res,
        null,
        'Password reset email sent. Please check your inbox.'
      );
    } catch (error) {
      console.error('Reset password controller error:', error);
      return ResponseHandler.error(res, 'Failed to send reset email');
    }
  }  

exports.updatePassword=async(req, res)=> {
    try {
      const { newPassword } = req.body;
      const userId = req.user.id;

      await authService.updatePassword(userId, newPassword);

      return ResponseHandler.success(
        res,
        null,
        'Password updated successfully'
      );
    } catch (error) {
      console.error('Update password controller error:', error);
      return ResponseHandler.error(res, 'Failed to update password');
    }
  }



  


