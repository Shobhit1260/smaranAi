import React, { useState } from 'react';
import { Brain, BarChart3, FileQuestion, Award, Bell, Home, Search, ChevronRight, MoreVertical, ChevronLeft, ChevronDown } from 'lucide-react';

const StudentDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('Oct 2021');

  const poorPerformers = [
    { id: 1, name: 'Student', accuracy: '22%', attempts: 2, skipped: 1 },
    { id: 2, name: 'Student', accuracy: '22%', attempts: 2, skipped: 1 },
    { id: 3, name: 'Student', accuracy: '22%', attempts: 2, skipped: 1 },
    { id: 4, name: 'Student', accuracy: '22%', attempts: 2, skipped: 1 }
  ];

  const inactiveStudents = [
    { id: 1, name: 'Student', testsMissed: 3, expanded: false },
    { id: 2, name: 'Student', testsMissed: 3, expanded: true, lastAccuracy: '22%', attempts: 2, skipped: 1 },
    { id: 3, name: 'Student', testsMissed: 3, expanded: false }
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 bg-gradient-to-b from-purple-400 to-purple-500 p-6 flex flex-col">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3">
            <Brain className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-white font-bold text-lg">SmaranAI</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white bg-white/20 rounded-lg">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm font-medium">Analysis</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg">
            <FileQuestion className="w-5 h-5" />
            <span className="text-sm font-medium">Quizzes</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium">Results</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="text-sm font-medium">Notification Centre</span>
          </button>
        </nav>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg mt-auto">
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">Back to home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="max-w-md ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-purple-200 text-sm mb-2">October 11, 2025</p>
              <h2 className="text-white text-4xl font-bold mb-2">Here's your analysis, Mentor!</h2>
              <p className="text-purple-100 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center gap-4">
              <div className="w-32 h-32 bg-yellow-400 rounded-2xl transform rotate-12 flex items-center justify-center">
                <span className="text-6xl">📱</span>
              </div>
              <div className="w-28 h-28 bg-red-500 rounded-full flex items-center justify-center">
                <div className="text-white text-5xl">👥</div>
              </div>
              <div className="w-20 h-20 bg-purple-700 rounded-2xl transform -rotate-12 flex items-center justify-center">
                <span className="text-4xl">🎒</span>
              </div>
            </div>
            <div className="absolute top-4 right-1/3">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
            </div>
            <div className="absolute top-12 right-1/4">
              <div className="w-3 h-3 bg-green-300 rounded-full"></div>
            </div>
          </div>

          {/* Quiz Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-6">Quiz: Science and Technology</h3>
                <div className="flex gap-4">
                  <div className="flex-1 max-w-xs">
                    <div className="border-2 border-gray-200 rounded-2xl p-6 text-center">
                      <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-3xl">👨</span>
                      </div>
                      <p className="font-semibold">Student</p>
                      <p className="text-sm text-gray-500">Top Performer</p>
                    </div>
                  </div>
                  <div className="flex-1 max-w-xs">
                    <div className="border-2 border-purple-400 rounded-2xl p-6 text-center">
                      <div className="w-16 h-16 bg-red-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-3xl">👩</span>
                      </div>
                      <p className="font-semibold">Student</p>
                      <p className="text-sm text-gray-500">Poor Performers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Count Visualization */}
              <div className="ml-8">
                <div className="flex items-start gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Number of students</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">1,347</span>
                      <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded">
                        2.3% ↗
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3 text-xs">
                      <span className="text-gray-400">&lt;50</span>
                      <span className="text-gray-400">50-200</span>
                      <span className="text-gray-400">&gt;200</span>
                    </div>
                  </div>
                  <div>
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-12 h-8 rounded ${
                        i < 3 ? 'bg-cyan-300' :
                        i < 8 ? 'bg-cyan-400' :
                        i < 13 ? 'bg-cyan-300' :
                        'bg-cyan-500'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Poor Performers and Inactive Students */}
          <div className="grid grid-cols-2 gap-6">
            {/* Poor Performers */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Poor Performers</h3>
              <div className="space-y-3">
                {poorPerformers.map((student) => (
                  <div key={student.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👨</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">Accuracy: {student.accuracy}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{student.attempts} Attempts</span>
                      <span>{student.skipped} Question Skipped</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-1">
                See All <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Inactive Students */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Inactive Students</h3>
              <div className="space-y-3">
                {inactiveStudents.map((student) => (
                  <div key={student.id}>
                    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer group">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">👨</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">Test not attempted</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span>{student.testsMissed} Tests missed</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-transform ${student.expanded ? 'rotate-180' : ''}`} />
                    </div>
                    {student.expanded && (
                      <div className="ml-16 mt-2 p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">
                          <span className="font-semibold">Last Test Report:</span> Accuracy: {student.lastAccuracy} · {student.attempts} Attempts · {student.skipped} Question Skipped
                        </p>
                        <button className="w-full py-2 bg-cyan-400 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg">
                          Go to Profile
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-1">
                See All <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Statistics Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Statistics</h3>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
                <span className="text-sm font-medium">{selectedMonth}</span>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-4">Class Performance</h4>
              <div className="flex items-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-600">Average grade</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-600">Exams</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="0" x2="800" y2="0" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="0" y1="50" x2="800" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="0" y1="100" x2="800" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="0" y1="150" x2="800" y2="150" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="0" y1="200" x2="800" y2="200" stroke="#f0f0f0" strokeWidth="1" />

                {/* Blue line (Average grade) */}
                <path
                  d="M 0 120 Q 100 140, 200 130 T 400 110 T 600 90 T 800 70"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                />

                {/* Cyan line (Exams) */}
                <path
                  d="M 0 80 Q 100 70, 200 85 T 400 100 T 600 60 T 800 55"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                />

                {/* Highlight area for Oct */}
                <rect x="620" y="0" width="80" height="200" fill="#f3f4f6" opacity="0.5" />
                <circle cx="660" cy="60" r="6" fill="#22d3ee" />
              </svg>

              {/* Month labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-400">
                {months.map((month) => (
                  <span key={month} className={month === 'Oct' ? 'font-semibold text-gray-600' : ''}>
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Add Questions Button */}
          <div className="flex justify-end">
            <button className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg">
              Add Questions <span className="text-xl">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;