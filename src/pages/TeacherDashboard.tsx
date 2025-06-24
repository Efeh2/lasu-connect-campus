import React, { useState } from 'react';
import { BookOpen, Users, Award, Calendar, Bell, User, LogOut, Plus, MessageSquare, Filter, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
                alt="LASU Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-green-700">TSI Teacher</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Computer Science Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Bell className="text-gray-600 hover:text-green-600 cursor-pointer" size={18} />
              <User className="text-gray-600 hover:text-green-600 cursor-pointer" size={18} />
              <button 
                onClick={toggleMobileMenu}
                className="lg:hidden text-gray-600 hover:text-green-600"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link to="/" className="hidden lg:block text-gray-600 hover:text-green-600">
                <LogOut size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-3 space-y-3">
              <Link to="/teacher/create-assignment" className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center transition-colors">
                Create Assignment
              </Link>
              <Link to="/teacher/grade-submissions" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition-colors">
                Grade Submissions
              </Link>
              <Link to="/teacher/schedule-consultation" className="block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-center transition-colors">
                Schedule Consultation
              </Link>
              <Link to="/teacher/view-analytics" className="block bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-center transition-colors">
                View Analytics
              </Link>
              <Link to="/" className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-center transition-colors">
                Logout
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome, Dr. Johnson!</h1>
          <p className="text-sm sm:text-base text-gray-600">Rank: Senior Lecturer | Department: Computer Science</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                <BookOpen className="text-green-600" size={20} />
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">4</h3>
                <p className="text-xs sm:text-sm text-gray-600">Active Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <Users className="text-blue-600" size={20} />
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">156</h3>
                <p className="text-xs sm:text-sm text-gray-600">Total Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-amber-100 p-2 sm:p-3 rounded-lg">
                <Calendar className="text-amber-600" size={20} />
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">8</h3>
                <p className="text-xs sm:text-sm text-gray-600">Pending Grades</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                <Award className="text-purple-600" size={20} />
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">12</h3>
                <p className="text-xs sm:text-sm text-gray-600">Assignments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="text-green-600" size={20} />
                  Assignment Sorting & Grading
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>All Levels</option>
                    <option>200 Level</option>
                    <option>300 Level</option>
                    <option>400 Level</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>All Courses</option>
                    <option>Data Structures</option>
                    <option>Intro Programming</option>
                    <option>Advanced Algorithms</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">Data Structures Assignment #3</h3>
                      <p className="text-gray-600 text-sm">300 Level | 15 submissions pending</p>
                      <p className="text-xs text-gray-500">Due: Dec 28, 2024</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors">
                        Grade Now
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs transition-colors">
                        View All
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-amber-500 pl-4 py-3 bg-amber-50 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">Intro Programming Quiz</h3>
                      <p className="text-gray-600 text-sm">200 Level | 8 submissions pending</p>
                      <p className="text-xs text-gray-500">Due: Dec 25, 2024</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-xs transition-colors">
                        Grade Now
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs transition-colors">
                        View All
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">Advanced Algorithms Project</h3>
                      <p className="text-gray-600 text-sm">400 Level | All graded ✓</p>
                      <p className="text-xs text-gray-500">Completed: Dec 20, 2024</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors">
                        View Results
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="text-blue-600" size={20} />
                Student Messages
              </h2>
              <div className="space-y-3">
                <div className="border border-blue-200 p-3 rounded-lg bg-blue-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-blue-800 text-sm">John Doe (300L)</h3>
                    <span className="text-xs text-blue-600">2h ago</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-2">Question about assignment 3 implementation...</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors">
                    Reply
                  </button>
                </div>

                <div className="border border-green-200 p-3 rounded-lg bg-green-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-green-800 text-sm">Jane Smith (400L)</h3>
                    <span className="text-xs text-green-600">5h ago</span>
                  </div>
                  <p className="text-green-700 text-sm mb-2">Request for consultation hours...</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors">
                    Reply
                  </button>
                </div>

                <div className="border border-amber-200 p-3 rounded-lg bg-amber-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-amber-800 text-sm">Mike Johnson (200L)</h3>
                    <span className="text-xs text-amber-600">1d ago</span>
                  </div>
                  <p className="text-amber-700 text-sm mb-2">Late submission request...</p>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-xs transition-colors">
                    Reply
                  </button>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                  View All Messages
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Teaching Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Teaching Schedule</h2>
                <Link to="/teacher/add-course" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                  <Plus size={16} />
                  Add Course
                </Link>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded">
                  <h3 className="font-semibold text-gray-900">Data Structures & Algorithms (300L)</h3>
                  <p className="text-gray-600 text-sm">45 students | Mon, Wed, Fri 10:00 AM</p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">8 assignments to grade</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Next class: Tomorrow</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded">
                  <h3 className="font-semibold text-gray-900">Introduction to Programming (200L)</h3>
                  <p className="text-gray-600 text-sm">62 students | Tue, Thu 2:00 PM</p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">All graded</span>
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">Quiz scheduled</span>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded">
                  <h3 className="font-semibold text-gray-900">Advanced Algorithms (400L)</h3>
                  <p className="text-gray-600 text-sm">28 students | Wed, Fri 1:00 PM</p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Project submissions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Desktop Only */}
          <div className="space-y-6 hidden lg:block">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/teacher/create-assignment" className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-center">
                  Create Assignment
                </Link>
                <Link to="/teacher/grade-submissions" className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-center">
                  Grade Submissions
                </Link>
                <Link to="/teacher/schedule-consultation" className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-center">
                  Schedule Consultation
                </Link>
                <Link to="/teacher/view-analytics" className="block w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors text-center">
                  View Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
