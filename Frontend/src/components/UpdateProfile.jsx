import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { getSession } from '../utils/auth';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    school: '',
    grade: '',
    subjects: /** @type {string[]} */ ([]),
    language_preference: /** @type {string[]} */ ([]),
    role: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const session = getSession();
        if (!session?.user?.id) {
          navigate('/login');
          return;
        }

        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            name: data.name || '',
            location: data.location || '',
            school: data.school || '',
            grade: data.grade || '',
            subjects: data.subjects || [],
            language_preference: data.language_preference || [],
            role: data.role || ''
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 
  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

 
  const handleLanguageToggle = (language) => {
    setFormData(prev => ({
      ...prev,
      language_preference: prev.language_preference.includes(language)
        ? prev.language_preference.filter(l => l !== language)
        : [...prev.language_preference, language]
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setIsLoading(true);
      const session = getSession();
      if (!session?.user?.id) {
        throw new Error('No authenticated user found');
      }

      // Update profile in Supabase
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          location: formData.location,
          school: formData.school,
          grade: formData.grade,
          subjects: formData.subjects,
          language_preference: formData.language_preference,
          role: formData.role,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      setSuccess('Profile updated successfully!');
      // Wait a moment before navigating
      setTimeout(() => {
        navigate(`/${formData.role}/dashboard`);
      }, 1500);
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Loading profile...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl max-w-4xl mx-auto p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 flex items-center hover:text-gray-800 transition-colors"
          >
            <span className="mr-2">←</span> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Update Profile</h1>
          <div className="w-10"></div> {/* Spacer for center alignment */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 text-sm text-green-700 bg-green-50 rounded-lg border border-green-100">
              {success}
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade/Class</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                placeholder="Your grade or class"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                placeholder="Your city"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                placeholder="Your school name"
                required
              />
            </div>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
            <div className="p-4 border border-gray-300 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {['Chemistry', 'Physics', 'Maths'].map(subject => (
                  <button
                    type="button"
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                      formData.subjects.includes(subject)
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formData.subjects.includes(subject) && (
                      <span className="text-purple-700">✓</span>
                    )}
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language Preferences</label>
            <div className="p-4 border border-gray-300 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {['Hindi', 'English', 'Malayalam'].map(language => (
                  <button
                    type="button"
                    key={language}
                    onClick={() => handleLanguageToggle(language)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                      formData.language_preference.includes(language)
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formData.language_preference.includes(language) && (
                      <span className="text-purple-700">✓</span>
                    )}
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;