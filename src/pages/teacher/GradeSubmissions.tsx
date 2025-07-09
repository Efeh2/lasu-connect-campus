
import React, { useState } from 'react';
import { ArrowLeft, Award, FileText, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GradeSubmissions = () => {
  const [selectedAssignment, setSelectedAssignment] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/teacher-dashboard" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Award className="text-blue-600" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Grade Submissions</h1>
            </div>
            
            <select
              value={selectedAssignment}
              onChange={(e) => setSelectedAssignment(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Assignments</option>
              <option value="data-structures">Data Structures Assignment #3</option>
              <option value="intro-programming">Intro Programming Quiz</option>
              <option value="algorithms">Advanced Algorithms Project</option>
            </select>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-red-500 bg-red-50 rounded-lg p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Data Structures Assignment #3</h3>
                  <p className="text-gray-600">300 Level | Due: Dec 28, 2024</p>
                </div>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">15 Pending</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">15</div>
                  <div className="text-sm text-gray-600">Pending Review</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600">Graded</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-gray-600">Total Submissions</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="text-blue-600 mr-3" size={20} />
                      <div>
                        <h4 className="font-medium text-gray-900">John Doe - Binary Search Tree Implementation</h4>
                        <p className="text-sm text-gray-600">Submitted: Dec 27, 2024 at 11:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="text-orange-500" size={16} />
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Grade Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="text-blue-600 mr-3" size={20} />
                      <div>
                        <h4 className="font-medium text-gray-900">Jane Smith - BST with Deletion</h4>
                        <p className="text-sm text-gray-600">Submitted: Dec 27, 2024 at 10:45 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-green-600 font-medium">95/100</span>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Grade All Pending
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Export Grades
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeSubmissions;
