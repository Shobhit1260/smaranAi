import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { getSession } from '../utils/auth';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    school: '',
    subjects: /** @type {string[]} */ ([]),
    languages: /** @type {string[]} */ ([]),
    role: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      setError('');

      // Validate form
      if (!formData.location || !formData.school || !formData.role) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.subjects.length === 0) {
        throw new Error('Please select at least one subject');
      }

      if (formData.languages.length === 0) {
        throw new Error('Please select at least one language');
      }
      
      setIsLoading(true);

      const session = getSession();
      if (!session?.user?.id) {
        throw new Error('No authenticated user found');
      }

      // Update profile in Supabase
      const { error: supabaseError } = await supabase
        .from('profiles')
        .update({
          location: formData.location,
          school: formData.school,
          subjects: formData.subjects,
          language_preference: formData.languages,
          role: formData.role,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (supabaseError) throw supabaseError;

      // Navigate based on role
      navigate(`/${formData.role}/dashboard`);
    } catch (err) {
      console.error('Role selection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 flex items-center hover:text-gray-800"
          >
            <span className="mr-2">←</span> Back
          </button>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Role</h1>
          <p className="text-gray-600">Select your role and preferences to get started!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSubmitted && !formData.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Delhi"
              />
              {isSubmitted && !formData.location && (
                <p className="mt-1 text-sm text-red-500">Location is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSubmitted && !formData.school ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="St. Mary's School"
              />
              {isSubmitted && !formData.school && (
                <p className="mt-1 text-sm text-red-500">School is required</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
              <div className="p-3 border border-gray-300 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {['Chemistry', 'Physics', 'Maths'].map(subject => (
                    <button
                      type="button"
                      key={subject}
                      onClick={() => handleSubjectToggle(subject)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                        formData.subjects.includes(subject)
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {formData.subjects.includes(subject) && (
                        <span className="text-blue-700">✓</span>
                      )}
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
              {isSubmitted && formData.subjects.length === 0 && (
                <p className="mt-1 text-sm text-red-500">Please select at least one subject</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language Preferences</label>
              <div className="p-3 border border-gray-300 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {['Hindi', 'English', 'Malayalam'].map(language => (
                    <button
                      type="button"
                      key={language}
                      onClick={() => handleLanguageToggle(language)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                        formData.languages.includes(language)
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {formData.languages.includes(language) && (
                        <span className="text-blue-700">✓</span>
                      )}
                      {language}
                    </button>
                  ))}
                </div>
              </div>
              {isSubmitted && formData.languages.length === 0 && (
                <p className="mt-1 text-sm text-red-500">Please select at least one language</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Role</label>
            <div className="grid grid-cols-3 gap-6">
              {[
                { id: 'student', title: 'Student',icon: '👨🏻‍🎓' },
                { id: 'teacher', title: 'Teacher', icon: '👩🏻‍🏫' },
                { id: 'mentor', title: 'Mentor', icon: '👨🏻‍💼' }
              ].map(role => (
                <button
                  type="button"
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                    formData.role === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className='text-6xl mb-2'>{role.icon}</div>
                  <span className="font-medium text-gray-900">{role.title}</span>
                </button>
              ))}
            </div>
            {isSubmitted && !formData.role && (
              <p className="mt-2 text-sm text-red-500">Please select a role</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 mt-8"
          >
            {isLoading ? 'Saving...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleSelection;