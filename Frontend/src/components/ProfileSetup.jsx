import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { getSession } from '../utils/auth';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    lastLogin: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current session from Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session?.user) throw new Error('No authenticated user found');
        console.log('Fetched session in ProfileSetup:', session); 
        // Get user's profile from profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('name, grade, last_login')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means no rows returned
          throw profileError;
        }

        // If we have a profile, use its data
        if (profile) {
          setFormData(prev => ({
            ...prev,
            name: profile.name || '',
            grade: profile.grade || '',
            lastLogin: profile.last_login || session.user.last_sign_in_at || new Date().toISOString()
          }));
        } else {
          // No profile yet, use session data
          setFormData(prev => ({
            ...prev,
            name: session.user.user_metadata?.full_name || '',
            lastLogin: session.user.last_sign_in_at || new Date().toISOString()
          }));
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again.');
        setFormData(prev => ({
          ...prev,
          lastLogin: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        }));
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Validate all fields
    if (formData.name.trim() === '') {
      setError('Name is required');
      return;
    }

    if (!formData.grade) {
      setError('Grade is required');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const session = getSession();
      if (!session?.user?.id) {
        throw new Error('No authenticated user found');
      }

      // Update profile in Supabase
      const { error: supabaseError } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          name: formData.name,
          grade: formData.grade,
          last_login: formData.lastLogin, // Already in ISO format
          updated_at: new Date().toISOString()
        });

      if (supabaseError) throw supabaseError;

      // Navigate to role selection
      navigate('/role-selection');
    } catch (err) {
      console.error('Profile setup error:', err);
      setError(err instanceof Error ? err.message : 'Failed to setup profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/login')} 
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to login
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-gray-600">Please confirm your profile details</p>
        </div>

        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSubmitted && formData.name.trim() === '' ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            {isSubmitted && formData.name.trim() === '' && (
              <p className="mt-1 text-sm text-red-500">Name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
            <input
              type="number"
              placeholder="Enter your grade"
              min="1"
              max="12"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSubmitted && !formData.grade ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              required
            />
            {isSubmitted && !formData.grade && (
              <p className="mt-1 text-sm text-red-500">Grade is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.lastLogin ? new Date(formData.lastLogin).toLocaleString() : ''}
              readOnly
              disabled
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400"
            disabled={isLoading}
          >
            {isLoading ? 'Setting up...' : 'Next'}
          </button>
        </form>
      </div>

      {/* Illustration */}
      <div className="hidden lg:block fixed right-0 bottom-0 w-1/3">
        <img
          src="/profile-setup-illustration.svg"
          alt="Profile setup illustration"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProfileSetup;