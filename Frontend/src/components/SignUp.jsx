import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

const Backend_Url = "http://localhost:5000";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Validate all fields
    if (name.trim() === '') {
      setError('Name is required');
      return;
    }

    if (email.trim() === '') {
      setError('Email is required');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.trim() === '') {
      setError('Password is required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms of service');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${Backend_Url}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log('Signup response data:', data);
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Signup failed');
      }

      // Navigate to role selection
      navigate('/login');
      
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-600">Please provide your account details to sign up!</p>
        </div>

        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name*"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSubmitted && name.trim() === '' ? 'border-red-500' : 'border-gray-300'
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {isSubmitted && name.trim() === '' && (
              <p className="mt-1 text-sm text-red-500">Name is required</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address*"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSubmitted && (email.trim() === '' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) ? 'border-red-500' : 'border-gray-300'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {isSubmitted && email.trim() === '' && (
              <p className="mt-1 text-sm text-red-500">Email is required</p>
            )}
            {isSubmitted && email.trim() !== '' && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
              <p className="mt-1 text-sm text-red-500">Please enter a valid email address</p>
            )}
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password*"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSubmitted && (password.trim() === '' || password.length < 8) ? 'border-red-500' : 'border-gray-300'
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isSubmitted && password.trim() === '' && (
              <p className="mt-1 text-sm text-red-500">Password is required</p>
            )}
            {isSubmitted && password.trim() !== '' && password.length < 8 && (
              <p className="mt-1 text-sm text-red-500">Password must be at least 8 characters long</p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <FaEye /> : <AiFillEyeInvisible />}
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              Yes, I Understand And Agree To The Stanley Terms Of Service
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-6">
          Already Have An Account?{' '}
          <a href="/login" className="text-purple-600 hover:underline">Login</a>
        </p>
      </div>

      {/* Illustration */}
      <div className="hidden lg:block fixed right-0 bottom-0 w-1/3">
        <img
          src="/signup-illustration.svg"
          alt="Sign up illustration"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SignUp;