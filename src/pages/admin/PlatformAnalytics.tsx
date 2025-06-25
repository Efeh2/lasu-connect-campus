
import React from 'react';
import { ArrowLeft, TrendingUp, Users, BookOpen, MessageSquare, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlatformAnalytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/admin-dashboard" className="flex items-center text-amber-600 hover:text-amber-700 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="flex items-center mb-8">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Users</p>
                  <p className="text-3xl font-bold">511</p>
                  <p className="text-sm text-blue-200">+12% this month</p>
                </div>
                <Users size={32} className="text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Courses</p>
                  <p className="text-3xl font-bold">32</p>
                  <p className="text-sm text-green-200">+3 new courses</p>
                </div>
                <BookOpen size={32} className="text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Messages</p>
                  <p className="text-3xl font-bold">1,247</p>
                  <p className="text-sm text-purple-200">+8% increase</p>
                </div>
                <MessageSquare size={32} className="text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100">Platform Usage</p>
                  <p className="text-3xl font-bold">94%</p>
                  <p className="text-sm text-amber-200">Excellent</p>
                </div>
                <Activity size={32} className="text-amber-200" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity Trend</h3>
              <div className="h-64 bg-white rounded-lg p-4 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <TrendingUp size={48} className="mx-auto mb-4" />
                  <p>User activity chart would be displayed here</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Level Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">100 Level</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-sm font-medium">98</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">200 Level</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '21%' }}></div>
                    </div>
                    <span className="text-sm font-medium">102</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">300 Level</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '19%' }}></div>
                    </div>
                    <span className="text-sm font-medium">95</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">400 Level</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                    <span className="text-sm font-medium">89</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">500 Level</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '21%' }}></div>
                    </div>
                    <span className="text-sm font-medium">103</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Courses</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Data Structures</span>
                    <span className="text-green-600 font-bold">92%</span>
                  </div>
                  <div className="text-sm text-gray-600">300 Level • 45 students</div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Advanced Algorithms</span>
                    <span className="text-blue-600 font-bold">88%</span>
                  </div>
                  <div className="text-sm text-gray-600">400 Level • 28 students</div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Software Engineering</span>
                    <span className="text-purple-600 font-bold">85%</span>
                  </div>
                  <div className="text-sm text-gray-600">500 Level • 32 students</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">New assignment created</div>
                  <div className="text-xs text-gray-600">Dr. Johnson • 2 hours ago</div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">Student registered</div>
                  <div className="text-xs text-gray-600">John Doe • 4 hours ago</div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">Course updated</div>
                  <div className="text-xs text-gray-600">Dr. Smith • 6 hours ago</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Server Uptime</span>
                  <span className="text-green-600 font-bold">99.9%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Response Time</span>
                  <span className="text-blue-600 font-bold">0.8s</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Storage Used</span>
                  <span className="text-amber-600 font-bold">68%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Database Health</span>
                  <span className="text-green-600 font-bold">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
