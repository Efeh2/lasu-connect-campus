
import React from 'react';
import { BookOpen, Users, Award, Calendar, Bell, User, LogOut, MessageSquare, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
                alt="LASU Logo" 
                className="h-10 w-10 mr-3"
              />
              <div>
                <h1 className="text-xl font-bold text-purple-900">TSI Student</h1>
                <p className="text-xs text-gray-600">Computer Science Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="text-gray-600 hover:text-purple-600 cursor-pointer" size={20} />
              <User className="text-gray-600 hover:text-purple-600 cursor-pointer" size={20} />
              <Link to="/" className="text-gray-600 hover:text-purple-600">
                <LogOut size={20} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h1>
          <p className="text-gray-600">Level: 300 Level | Department: Computer Science</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">6</h3>
                <p className="text-gray-600">Active Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">3.5</h3>
                <p className="text-gray-600">GPA</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Calendar className="text-amber-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">4</h3>
                <p className="text-gray-600">Assignments</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">12</h3>
                <p className="text-gray-600">Study Groups</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Space */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="text-purple-600" size={24} />
                Messages & Communication
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded">
                  <h3 className="font-semibold text-gray-900">Message from Dr. Johnson</h3>
                  <p className="text-gray-600 text-sm">Assignment submission deadline extended for Data Structures</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">2 hours ago</span>
                    <button className="ml-3 text-purple-600 text-xs hover:underline">Reply</button>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
                  <h3 className="font-semibold text-gray-900">Study Group Invitation</h3>
                  <p className="text-gray-600 text-sm">Join our Database Management study group for tomorrow's quiz</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">5 hours ago</span>
                    <button className="ml-3 text-blue-600 text-xs hover:underline">Join</button>
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Start New Conversation
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="text-green-600" size={24} />
                Assignment Submission
              </h2>
              <div className="space-y-4">
                <div className="border border-red-200 p-3 rounded-lg bg-red-50">
                  <h3 className="font-semibold text-red-800">Data Structures Assignment</h3>
                  <p className="text-red-600 text-sm">Due: Dec 28, 2024</p>
                  <button className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Submit Now
                  </button>
                </div>

                <div className="border border-amber-200 p-3 rounded-lg bg-amber-50">
                  <h3 className="font-semibold text-amber-800">Software Engineering Project</h3>
                  <p className="text-amber-600 text-sm">Due: Jan 5, 2025</p>
                  <button className="mt-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    View Details
                  </button>
                </div>

                <div className="border border-green-200 p-3 rounded-lg bg-green-50">
                  <h3 className="font-semibold text-green-800">Database Quiz Prep</h3>
                  <p className="text-green-600 text-sm">Submitted ✓</p>
                  <span className="text-xs text-green-600">Grade: 85/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Current Courses - 300 Level</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">Data Structures & Algorithms</h3>
                  <p className="text-gray-600 text-sm">Dr. Johnson | Mon, Wed, Fri 10:00 AM</p>
                  <div className="mt-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Assignment Due: Dec 28</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">Database Management Systems</h3>
                  <p className="text-gray-600 text-sm">Prof. Williams | Tue, Thu 2:00 PM</p>
                  <div className="mt-2">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">Quiz Tomorrow</span>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">Software Engineering</h3>
                  <p className="text-gray-600 text-sm">Dr. Brown | Wed, Fri 1:00 PM</p>
                  <div className="mt-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Project Phase 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Join Study Group
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Submit Assignment
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Message Teacher
                </button>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors">
                  View Grades
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h2>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-3 py-2">
                  <p className="text-sm text-gray-900">Assignment due in 2 days</p>
                  <p className="text-xs text-gray-600">Data Structures</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="text-sm text-gray-900">New message from Dr. Johnson</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <p className="text-sm text-gray-900">Grade posted for Quiz 3</p>
                  <p className="text-xs text-gray-600">Database Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
