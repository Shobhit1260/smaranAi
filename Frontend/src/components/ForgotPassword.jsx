import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';



const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to send reset password email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-16 sm:p-6">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-xl sm:p-6 max-w-full ">
      <div className="flex flex-col sm:flex-row justify-between  items-center gap-4 mb-8 px-4">
        <button
          onClick={() => navigate('/login')}
          className="text-gray-600 flex items-center hover:text-gray-800"
        >
          <span className="mr-2">←</span> Back to login
        </button>
        <div className="flex items-center gap-4">
          
          <div className="flex gap-2 sm:gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/signup')}
              className="px-3 sm:px-4 py-2 text-gray-800 hover:bg-gray-100 rounded text-sm sm:text-base"
            >
              Sign Up
            </button>
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm sm:text-base"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex flex-col lg:flex-row justify-center gap-96 px-4 max-w-full h-[750px] mx-auto'>
        <div className="w-full max-w-md  my-24 mx-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-800">Forgot your password?</h1>
            <p className="text-gray-600">Enter your email below to recover your password</p>
          </div>

          <div className="bg-white rounded-3xl p-8  ">
            {success ? (
              <div className="text-center p-6">
                <div className="text-green-600 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xl font-semibold mb-2">Check your email</h2>
                  <p className="text-gray-600">
                    We've sent you instructions to reset your password.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 ">
              {error && (
                <div className="p-3 text-red-700 bg-red-100 rounded">
                  {error}
                </div>
              )}

              <div>
                <input
                  type="email"
                  placeholder="Email Address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:bg-purple-400"
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
        </div>
        </div>
        <div className="hidden lg:flex h-[750px] items-center justify-center">
          <div className="text-9xl xl:text-[400px] transform hover:rotate-12 transition-transform duration-300 hover:scale-110">
            🔐
          </div>  
        </div>
      </div>
      </div>
    </div>

  );
};

export default ForgotPassword;