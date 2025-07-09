
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScheduleConsultation = () => {
  const [consultationType, setConsultationType] = useState('individual');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/teacher-dashboard" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="flex items-center mb-8">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Schedule Consultation</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="individual"
                        checked={consultationType === 'individual'}
                        onChange={(e) => setConsultationType(e.target.value)}
                        className="mr-3 text-purple-600"
                      />
                      <span>Individual Consultation</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="group"
                        checked={consultationType === 'group'}
                        onChange={(e) => setConsultationType(e.target.value)}
                        className="mr-3 text-purple-600"
                      />
                      <span>Group Consultation</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Level</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option value="">All Levels</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                    <option value="500">500 Level</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location/Platform</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option>Office - Room 204</option>
                    <option>Google Meet</option>
                    <option>Zoom</option>
                    <option>Microsoft Teams</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Description</label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Describe the consultation topic or purpose..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
                >
                  Schedule Consultation
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Consultations</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-900">Data Structures Help Session</h4>
                    <span className="text-sm text-blue-600">Individual</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>Tomorrow, Dec 26, 2024</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <Clock size={16} className="mr-2" />
                    <span>2:00 PM - 3:00 PM</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-900">Algorithm Review</h4>
                    <span className="text-sm text-green-600">Group</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>Dec 28, 2024</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <Users size={16} className="mr-2" />
                    <span>5 students registered</span>
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

export default ScheduleConsultation;
