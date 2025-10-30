// @ts-nocheck
const { supabase, supabaseAdmin } = require('../config/supabase');

exports.signUp = async (name, email, password) => {
    try {
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            has_completed_profile: false // Track if user has completed their profile
          }
        }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  }

exports.signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.FRONTEND_URL}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          scopes: 'email profile'
        }
      });
      if (error) {
        console.error('Supabase Google OAuth error:', error);
        throw error;
      }

      if (!data?.url) {
        throw new Error('No redirect URL returned from Supabase');
      }

      return { url: data.url };
    } catch (error) {
      console.error('Google SignIn error:', error);
      throw error;
    }
};



exports.signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
     
      if (error) throw error;

      // Check if user has completed their profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw profileError;
      }

      // Update last login
      await supabase
        .from('profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id);

      
      return data;
    } catch (error) {
      console.error('Sign in authService error:', error);
      throw error;
    }
  }

exports.signOut=async(token) =>{
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
     
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

exports.resetPassword=async(email)=>{
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/reset-password`
      });

      if (error) throw error;

    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }  


exports.updatePassword=async(userId, newPassword)=> {
    try {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        { password: newPassword }
      );

      if (error) throw error;
     console.log("updatePassword error:",error);
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }


  



