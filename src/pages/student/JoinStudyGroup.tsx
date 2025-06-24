
import React from 'react';
import { ArrowLeft, Users, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const JoinStudyGroup = () => {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Join Study Groups</h1>

        <div className="grid gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Data Structures Study Group</h3>
                <p className="text-gray-600">Preparing for upcoming assignment and exams</p>
              </div>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">300 Level</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>5/8 members</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Meets Tuesdays</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>4:00 PM - 6:00 PM</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <User size={16} className="mr-1" />
                <span>Led by Sarah Johnson</span>
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                Join Group
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Database Management Quiz Prep</h3>
                <p className="text-gray-600">Focused review session for tomorrow's quiz</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">300 Level</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>8/10 members</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Today</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>7:00 PM - 9:00 PM</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <User size={16} className="mr-1" />
                <span>Led by Mike Chen</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Join Group
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Software Engineering Project Team</h3>
                <p className="text-gray-600">Collaborative work on final project</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">300 Level</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>3/4 members</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Flexible schedule</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>Online meetings</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <User size={16} className="mr-1" />
                <span>Led by Alex Williams</span>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                Join Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinStudyGroup;
