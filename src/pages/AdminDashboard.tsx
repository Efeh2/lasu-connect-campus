
import React from 'react';
import { Users, BookOpen, Award, Settings, Bell, User, LogOut, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
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
                <h1 className="text-xl font-bold text-purple-700">TSI Admin</h1>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Computer Science Department Management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">487</h3>
                <p className="text-gray-600">Total Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <User className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">24</h3>
                <p className="text-gray-600">Faculty Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">32</h3>
                <p className="text-gray-600">Active Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <TrendingUp className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">94%</h3>
                <p className="text-gray-600">Platform Usage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">User Management by Level</h2>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Plus size={16} />
                  Add User
                </button>
              </div>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Students by Level</h3>
                  <div className="grid grid-cols-5 gap-4 text-center">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-lg font-bold text-blue-600">98</div>
                      <div className="text-xs text-gray-600">100L</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-lg font-bold text-green-600">102</div>
                      <div className="text-xs text-gray-600">200L</div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <div className="text-lg font-bold text-yellow-600">95</div>
                      <div className="text-xs text-gray-600">300L</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="text-lg font-bold text-purple-600">89</div>
                      <div className="text-xs text-gray-600">400L</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <div className="text-lg font-bold text-red-600">103</div>
                      <div className="text-xs text-gray-600">500L</div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Faculty by Rank</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-lg font-bold text-green-600">8</div>
                      <div className="text-xs text-gray-600">Lecturers</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-lg font-bold text-blue-600">12</div>
                      <div className="text-xs text-gray-600">Senior Lecturers</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="text-lg font-bold text-purple-600">4</div>
                      <div className="text-xs text-gray-600">Professors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded">
                  <div className="bg-blue-600 p-2 rounded-full mr-3">
                    <User className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New student registration</p>
                    <p className="text-xs text-gray-600">John Doe joined 300L - 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded">
                  <div className="bg-green-600 p-2 rounded-full mr-3">
                    <BookOpen className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Course created</p>
                    <p className="text-xs text-gray-600">Dr. Johnson added Advanced Algorithms - 4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-yellow-50 rounded">
                  <div className="bg-yellow-600 p-2 rounded-full mr-3">
                    <Settings className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">System update</p>
                    <p className="text-xs text-gray-600">Platform maintenance completed - 1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & System Status */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Manage Users
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  System Settings
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Generate Reports
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Platform Analytics
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Server Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Users</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">System Load</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Moderate</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Approvals</h2>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-3 py-2">
                  <p className="text-sm text-gray-900">Teacher registration</p>
                  <p className="text-xs text-gray-600">Dr. Williams - Awaiting approval</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-3 py-2">
                  <p className="text-sm text-gray-900">Course modification</p>
                  <p className="text-xs text-gray-600">Database Systems - Level change request</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3 py-2">
                  <p className="text-sm text-gray-900">Student level upgrade</p>
                  <p className="text-xs text-gray-600">5 students requesting level promotion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
