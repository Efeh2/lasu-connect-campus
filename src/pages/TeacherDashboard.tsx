import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  MessageSquare, 
  FileText,
  Menu,
  X,
  PlusCircle,
  BarChart3,
  CheckSquare
} from 'lucide-react';
import UserAvatar from '../components/UserAvatar';
import LogoutButton from '../components/LogoutButton';
import { useUser } from '../contexts/UserContext';

const TeacherDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(3);
  const { user } = useUser();

  useEffect(() => {
    // You can add any side effects or data fetching logic here
    // For example, fetching unread messages or other dashboard data
  }, [user]);

  const quickActions = [
    { title: 'Create Assignment', icon: PlusCircle, href: '/teacher/create-assignment', color: 'bg-blue-500' },
    { title: 'Grade Submissions', icon: CheckSquare, href: '/teacher/grade-submissions', color: 'bg-green-500' },
    { title: 'View Analytics', icon: BarChart3, href: '/teacher/view-analytics', color: 'bg-purple-500' },
    { title: 'Schedule Consultation', icon: Calendar, href: '/teacher/schedule-consultation', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
              alt="LASU Logo" 
              className="h-8 w-8 mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/teacher/messages" 
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
            >
              <MessageSquare size={24} />
              {unreadMessageCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessageCount}
                </span>
              )}
            </Link>
            <UserAvatar name={user?.name || 'User'} role={user?.role || 'teacher'} />
            <LogoutButton />
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Quick Actions Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Actions</h3>
            <div className="space-y-1">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <action.icon size={16} className="mr-3" />
                  {action.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.firstName || user?.name || 'Teacher'}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Manage your courses and connect with students.</p>
          
          {/* User Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Name:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.name || 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                <p className="font-medium text-gray-900 dark:text-white">{user?.email || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Role:</span>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{user?.role || 'Teacher'}</p>
              </div>
              {user?.phone && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                  <p className="font-medium text-gray-900 dark:text-white">{user.phone}</p>
                </div>
              )}
              <div>
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  <span className={`inline-flex items-center gap-1 ${user?.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${user?.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {user?.isOnline ? 'Online' : 'Offline'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in transition-colors duration-300">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
                <p className="text-gray-600 dark:text-gray-400">Enrolled Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in transition-colors duration-300">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Users className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3</h3>
                <p className="text-gray-600 dark:text-gray-400">Study Groups</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in transition-colors duration-300">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <Award className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">85%</h3>
                <p className="text-gray-600 dark:text-gray-400">Average Grade</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in transition-colors duration-300">
            <div className="flex items-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                <Calendar className="text-orange-600 dark:text-orange-400" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">5</h3>
                <p className="text-gray-600 dark:text-gray-400">Pending Tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Desktop Only */}
        <div className="hidden lg:block mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105 animate-fade-in"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <action.icon className="text-white" size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{action.title}</h4>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Submissions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Data Structures Project</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CSC 301 - John Doe</p>
                </div>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-sm">
                  Graded
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Algorithm Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CSC 401 - Jane Smith</p>
                </div>
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-sm">
                  Pending
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Messages</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <MessageSquare className="text-blue-600 dark:text-blue-400 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">John Doe</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Question about assignment 3</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <MessageSquare className="text-green-600 dark:text-green-400 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Alice Johnson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Inquiry about project deadline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
