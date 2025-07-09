
import React, { useState } from 'react';
import { ArrowLeft, Send, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const MessageTeacher = () => {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [message, setMessage] = useState('');

  const teachers = [
    { id: 'johnson', name: 'Dr. Johnson', subject: 'Data Structures & Algorithms' },
    { id: 'williams', name: 'Prof. Williams', subject: 'Database Management' },
    { id: 'brown', name: 'Dr. Brown', subject: 'Software Engineering' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/student-dashboard" className="flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Message Teacher</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Conversations</h2>
              
              <div className="space-y-3">
                <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900">Dr. Johnson</h3>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Assignment deadline extended...</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900">Prof. Williams</h3>
                    <span className="text-xs text-gray-500">1d ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Quiz preparation materials...</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900">Dr. Brown</h3>
                    <span className="text-xs text-gray-500">3d ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Project requirements clarification...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Compose New Message</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Teacher
                  </label>
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Choose a teacher...</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter message subject..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={8}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Type your message here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                    <Send size={18} />
                    Send Message
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Save Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageTeacher;
