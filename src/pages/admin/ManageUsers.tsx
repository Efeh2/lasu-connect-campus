
import React, { useState } from 'react';
import { ArrowLeft, Users, Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [userType, setUserType] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/admin-dashboard" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            </div>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg">
              <Plus size={20} />
              Add New User
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">All User Types</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="admin">Admins</option>
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">All Levels</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
            </select>

            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Filter size={20} />
              Filter
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-purple-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-purple-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-purple-700">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-purple-700">Level</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-purple-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-purple-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">JD</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">John Doe</div>
                          <div className="text-sm text-gray-500">CS/19/001</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">john.doe@student.lasu.edu.ng</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Student</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">300L</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-medium">JS</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Dr. Jane Smith</div>
                          <div className="text-sm text-gray-500">Senior Lecturer</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">jane.smith@lasu.edu.ng</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Teacher</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">97</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
