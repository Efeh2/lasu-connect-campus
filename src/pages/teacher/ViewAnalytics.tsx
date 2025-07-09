
import React from 'react';
import { ArrowLeft, TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ViewAnalytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/teacher-dashboard" className="flex items-center text-amber-600 hover:text-amber-700 transition-colors">
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
            <h1 className="text-3xl font-bold text-gray-900">Teaching Analytics</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Students</p>
                  <p className="text-3xl font-bold">156</p>
                </div>
                <Users size={32} className="text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Courses</p>
                  <p className="text-3xl font-bold">4</p>
                </div>
                <BookOpen size={32} className="text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Assignments</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <Award size={32} className="text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100">Avg. Grade</p>
                  <p className="text-3xl font-bold">87%</p>
                </div>
                <TrendingUp size={32} className="text-amber-200" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Data Structures (300L)</span>
                    <span className="text-green-600 font-bold">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Intro Programming (200L)</span>
                    <span className="text-blue-600 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Advanced Algorithms (400L)</span>
                    <span className="text-purple-600 font-bold">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Engagement</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Assignment Submission Rate</span>
                    <span className="text-green-600 font-bold">94%</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Average Response Time</span>
                    <span className="text-blue-600 font-bold">2.3 days</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Consultation Requests</span>
                    <span className="text-purple-600 font-bold">23</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Messages Received</span>
                    <span className="text-amber-600 font-bold">47</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnalytics;
