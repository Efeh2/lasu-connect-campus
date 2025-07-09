
import React, { useState } from 'react';
import { ArrowLeft, FileText, Download, Calendar, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const GenerateReports = () => {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/admin-dashboard" className="flex items-center text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="flex items-center mb-8">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FileText className="text-green-600" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Generate Reports</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Report Type</option>
                      <option value="student-performance">Student Performance Report</option>
                      <option value="course-analytics">Course Analytics Report</option>
                      <option value="teacher-activity">Teacher Activity Report</option>
                      <option value="system-usage">System Usage Report</option>
                      <option value="assignment-statistics">Assignment Statistics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Date Range</option>
                      <option value="last-week">Last Week</option>
                      <option value="last-month">Last Month</option>
                      <option value="last-semester">Last Semester</option>
                      <option value="current-session">Current Academic Session</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Level</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                      <option value="">All Levels</option>
                      <option value="100">100 Level</option>
                      <option value="200">200 Level</option>
                      <option value="300">300 Level</option>
                      <option value="400">400 Level</option>
                      <option value="500">500 Level</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg">
                    <Download size={20} />
                    Generate Report
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <BarChart3 size={48} className="mx-auto mb-4" />
                    <p>Select report type and parameters to generate preview</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-left transition-all">
                    <div className="flex items-center justify-between">
                      <span>Student Enrollment</span>
                      <Download size={16} />
                    </div>
                  </button>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-left transition-all">
                    <div className="flex items-center justify-between">
                      <span>Course Performance</span>
                      <Download size={16} />
                    </div>
                  </button>

                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg text-left transition-all">
                    <div className="flex items-center justify-between">
                      <span>Assignment Summary</span>
                      <Download size={16} />
                    </div>
                  </button>

                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-left transition-all">
                    <div className="flex items-center justify-between">
                      <span>System Activity</span>
                      <Download size={16} />
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Student Performance</h4>
                        <p className="text-sm text-gray-600">Generated: Dec 23, 2024</p>
                      </div>
                      <Download size={16} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Course Analytics</h4>
                        <p className="text-sm text-gray-600">Generated: Dec 20, 2024</p>
                      </div>
                      <Download size={16} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">System Usage</h4>
                        <p className="text-sm text-gray-600">Generated: Dec 18, 2024</p>
                      </div>
                      <Download size={16} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </div>
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

export default GenerateReports;
