import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handlePasswordReset = async () => {
      try {
        // Get the hash fragment and remove the leading '#'
        const hash = window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hash);
        
        // Extract the access_token and type from the hash
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');
        
        if (!accessToken || type !== 'recovery') {
          throw new Error('Invalid reset link');
        }

        // Set the access token in the session
        const { data, error: sessionError } = await supabase.auth.getUser(accessToken);
        
        if (sessionError || !data?.user) {
          throw new Error('Invalid or expired reset token');
        }

        // Store the token for the password update
        sessionStorage.setItem('resetToken', accessToken);

      } catch (err) {
        console.error('Password reset verification error:', err);
        setError(err.message || 'Invalid or expired reset link');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handlePasswordReset();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Password validation
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Get the stored access token
      const accessToken = sessionStorage.getItem('resetToken');
      
      if (!accessToken) {
        throw new Error('Reset session expired. Please request a new reset link.');
      }

      // Update the password
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (error) throw error;
      
      // Clear the stored token
      sessionStorage.removeItem('resetToken');

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/login')}
          className="text-gray-600 flex items-center"
        >
          <span className="mr-2">←</span> Back to login
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2">Reset Your Password</h1>
          <p className="text-gray-600">Please enter your new password below</p>
        </div>

        <div className="bg-white rounded-lg">
          {success ? (
            <div className="text-center p-6">
              <div className="text-green-600 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold mb-2">Password Reset Successful!</h2>
                <p className="text-gray-600">
                  Your password has been reset successfully. Redirecting to login...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-red-700 bg-red-100 rounded">
                  {error}
                </div>
              )}

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password*"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:bg-purple-400"
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
          )}

         
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;