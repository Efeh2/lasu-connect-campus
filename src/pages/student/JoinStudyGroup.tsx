
import React from 'react';
import { ArrowLeft, Users, Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const JoinStudyGroup = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/student-dashboard" className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">Join Study Groups</h1>

        <div className="grid gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Structures Study Group</h3>
                <p className="text-gray-600 dark:text-gray-300">Preparing for upcoming assignment and exams</p>
              </div>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">300 Level</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
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
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <User size={16} className="mr-1" />
                <span>Led by Sarah Johnson</span>
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors">
                Join Group
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Database Management Quiz Prep</h3>
                <p className="text-gray-600 dark:text-gray-300">Focused review session for tomorrow's quiz</p>
              </div>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">300 Level</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
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
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <User size={16} className="mr-1" />
                <span>Led by Mike Chen</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                Join Group
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Software Engineering Project Team</h3>
                <p className="text-gray-600 dark:text-gray-300">Collaborative work on final project</p>
              </div>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">300 Level</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
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
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <User size={16} className="mr-1" />
                <span>Led by Alex Williams</span>
              </div>
              <button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
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
