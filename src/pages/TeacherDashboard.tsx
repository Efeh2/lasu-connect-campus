
import React from 'react';
import { BookOpen, Users, Award, Calendar, Bell, User, LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
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
                <h1 className="text-xl font-bold text-green-700">TSI Teacher</h1>
                <p className="text-xs text-gray-600">Computer Science Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="text-gray-600 hover:text-green-600 cursor-pointer" size={20} />
              <User className="text-gray-600 hover:text-green-600 cursor-pointer" size={20} />
              <Link to="/" className="text-gray-600 hover:text-green-600">
                <LogOut size={20} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Dr. Johnson!</h1>
          <p className="text-gray-600">Rank: Senior Lecturer | Department: Computer Science</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <BookOpen className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">4</h3>
                <p className="text-gray-600">Active Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">156</h3>
                <p className="text-gray-600">Total Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Calendar className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">8</h3>
                <p className="text-gray-600">Pending Grades</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">12</h3>
                <p className="text-gray-600">Assignments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Teaching Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Teaching Schedule</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Plus size={16} />
                  Add Course
                </button>
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
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Quiz scheduled</span>
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

          {/* Quick Actions & Messages */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Create Assignment
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Grade Submissions
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Schedule Consultation
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                  View Analytics
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Student Messages</h2>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="text-sm text-gray-900">Question about assignment 3</p>
                  <p className="text-xs text-gray-600">John Doe (300L) - 1 hour ago</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3 py-2">
                  <p className="text-sm text-gray-900">Request for consultation</p>
                  <p className="text-xs text-gray-600">Jane Smith (400L) - 3 hours ago</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-3 py-2">
                  <p className="text-sm text-gray-900">Late submission request</p>
                  <p className="text-xs text-gray-600">Mike Johnson (200L) - 5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
