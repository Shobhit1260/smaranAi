import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase.js';
import { setSession } from '../utils/auth.js';
const Backend_Url = "http://localhost:5000";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (!session) {
          throw new Error('No session found');
        }


        // Store session data
        setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : null,
          user: {
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || '',
            isProfileComplete: session.user.user_metadata?.has_completed_profile || false
          }
        });
       
        // Redirect to profile creation
        const response=await fetch(`${Backend_Url}/api/profile/hasCompletedProfile`,{
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });
        const data =await response.json();
       
        const hasCompletedProfile=data.data.hasCompleted.isComplete;
        if (!hasCompletedProfile) {
          navigate('/createProfile', { replace: true });
        }
        else{ 
          navigate('/updateProfile', { replace: true });
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login', { 
          replace: true,
          state: { error: 'Authentication failed. Please try again.' }
        });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Completing sign in...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback;