import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { isAuthenticated, getSession, setSession, setOAuthState, generateOAuthState } from '../utils/auth.js';
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
const Backend_Url = "http://localhost:5000";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   // If user is already authenticated, redirect to appropriate page
  //   if (isAuthenticated()) {
  //     const session = getSession();
  //     if (session?.user) {
  //       navigate('/createProfile');
  //     }
  //   }
  // }, [navigate]);

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      // Call backend to get Google OAuth URL
      const response = await fetch(`${Backend_Url}/api/auth/signin/google`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to initialize Google sign-in');
      }
      
      // Redirect to Google login page
      window.location.href = data.data.url;
    } catch (err) {
      console.error('Google login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start Google login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`${Backend_Url}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
     
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the session data
      const sessionData = {
        access_token: data.data.session.access_token,
        refresh_token: data.data.session.refresh_token,
        expires_at: data.data.session.expires_at,
        user: data.data.user
      };
      
      setSession(sessionData); // Using auth utility

      // Check if user has completed profile
      const profileResponse = await fetch(`${Backend_Url}/api/profile/hasCompletedProfile`, {
        headers: {
          'Authorization': `Bearer ${sessionData.access_token}`
        }
      });
      
      if (!profileResponse.ok) {
        throw new Error('Failed to check profile status');
      }

      const profileData = await profileResponse.json();
      
      if (!profileData.isComplete) {
        navigate('/role-selection');
      } else {
        navigate('/createProfile');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Login to your Account</h1>
          <p className="text-gray-600">Please provide your login information to continue!</p>
        </div>

        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-4 mb-6">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            {isLoading ? 'Please wait...' : 'Continue with Google'}
          </button>
          <button 
            type="button"
            onClick={() => {
              
              // Alternatively, you could use:
              window.location.href = 'https://jfbswojtmgfwxtlhsrrc.supabase.co/auth/v1/authorize?provider=apple&redirect_to=http://localhost:5173/profile-setup';
            }}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5" />
            {isLoading ? 'Please wait...' : 'Continue with Apple'}
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email Address*"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password*"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <FaEye /> : <AiFillEyeInvisible />}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-purple-600 hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6">
          New To SmaranAI?{' '}
          <a href="/signup" className="text-purple-600 hover:underline">Create An Account</a>
        </p>
      </div>

      {/* Illustration */}
      <div className="hidden lg:block fixed right-0 bottom-0 w-1/3">
        <img
          src="/login-illustration.svg"
          alt="Login illustration"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Login;