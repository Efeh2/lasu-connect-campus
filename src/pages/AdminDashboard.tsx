
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Shield, 
  Database,
  Menu,
  X,
  UserPlus,
  Cog,
  PieChart,
  Download
} from 'lucide-react';
import UserAvatar from '../components/UserAvatar';
import { useUser } from '../contexts/UserContext';

const AdminDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();

  const quickActions = [
    { title: 'Add User', icon: UserPlus, href: '/admin/add-user', color: 'bg-blue-500' },
    { title: 'Manage Users', icon: Users, href: '/admin/manage-users', color: 'bg-green-500' },
    { title: 'System Settings', icon: Cog, href: '/admin/system-settings', color: 'bg-purple-500' },
    { title: 'Generate Reports', icon: Download, href: '/admin/generate-reports', color: 'bg-orange-500' },
    { title: 'Platform Analytics', icon: PieChart, href: '/admin/platform-analytics', color: 'bg-indigo-500' },
  ];

  const displayName = user?.name || 'Admin';
  const welcomeName = user?.firstName || user?.name?.split(' ')[0] || 'Admin';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
              alt="LASU Logo" 
              className="h-8 w-8 mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <UserAvatar name={displayName} role="admin" />
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Quick Actions Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Actions</h3>
            <div className="space-y-1">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {welcomeName}!</h2>
          <p className="text-gray-600 dark:text-gray-400">System overview and management tools.</p>
          
          {/* User Details Card */}
          {user && (
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                  <p className="text-gray-900 dark:text-white">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-gray-900 dark:text-white">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                  <p className="text-gray-900 dark:text-white capitalize">{user.role}</p>
                </div>
                {user.studentId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Admin ID</label>
                    <p className="text-gray-900 dark:text-white">{user.studentId}</p>
                  </div>
                )}
                {user.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                    <p className="text-gray-900 dark:text-white">{user.phone}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Users className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,234</h3>
                <p className="text-gray-600 dark:text-gray-400">Total Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Shield className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">45</h3>
                <p className="text-gray-600 dark:text-gray-400">Active Teachers</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <Database className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">98.5%</h3>
                <p className="text-gray-600 dark:text-gray-400">System Uptime</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in">
            <div className="flex items-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                <BarChart3 className="text-orange-600 dark:text-orange-400" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">85%</h3>
                <p className="text-gray-600 dark:text-gray-400">Active Sessions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Desktop Only */}
        <div className="hidden lg:block mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent User Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">New User Registration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">John Doe - Student</p>
                </div>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-sm">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Course Created</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dr. Smith - CSC 401</p>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm">
                  New
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Database Status</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">All systems operational</p>
                </div>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-sm">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Server Performance</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CPU: 45%, Memory: 62%</p>
                </div>
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-sm">
                  Normal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
