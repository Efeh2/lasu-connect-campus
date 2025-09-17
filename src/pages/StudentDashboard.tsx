import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  FileText,
  Menu,
  X,
  Send,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import UserAvatar from "../components/UserAvatar";
import LogoutButton from "../components/LogoutButton";
import { useUser } from "../contexts/UserContext";
import { supabase } from "../integrations/supabase/client";
import { MessagingService } from "../services/messagingService";
import {
  DashboardService,
  AssignmentData,
  MessageData,
} from "../services/dashboardService";

const StudentDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [stats, setStats] = useState({});
  const [recentAssignments, setRecentAssignments] = useState<AssignmentData[]>(
    []
  );
  const [recentMessages, setRecentMessages] = useState<MessageData[]>([]);
  const { user } = useUser();

  // Fetch profile data directly from profiles table
  const fetchProfile = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
        return;
      }

      console.log("Profile data fetched:", data);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile when component mounts or user changes
  useEffect(() => {
    if (user?.id) {
      fetchProfile();
      fetchUnreadCount();
      fetchDashboardData();
    }
  }, [user?.id]);

  // Fetch unread message count
  const fetchUnreadCount = async () => {
    if (!user?.id) return;

    try {
      const count = await MessagingService.getUnreadCount(user.id);
      setUnreadCount(count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const fetchDashboardData = async () => {
    if (!user?.id) return;

    try {
      const [statsData, assignmentsData, messagesData] = await Promise.all([
        DashboardService.getStudentStats(user.id),
        DashboardService.getStudentRecentAssignments(user.id),
        DashboardService.getRecentMessages(user.id),
      ]);

      setStats(statsData);
      setRecentAssignments(assignmentsData);
      setRecentMessages(messagesData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleRefreshProfile = async () => {
    setIsRefreshing(true);
    await fetchProfile();
    await fetchUnreadCount();
    await fetchDashboardData();
    setIsRefreshing(false);
  };

  const quickActions = [
    {
      title: "Enroll in Course",
      icon: BookOpen,
      href: "/student/enroll-course",
      color: "bg-blue-500",
    },
    {
      title: "Submit Assignment",
      icon: FileText,
      href: "/student/submit-assignment",
      color: "bg-green-500",
    },
    {
      title: "Message Teacher",
      icon: Send,
      href: "/student/messages",
      color: "bg-purple-500",
    },
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Student Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/student/messages"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
            >
              <MessageSquare size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
            <UserAvatar
              name={user?.name || "User"}
              role={user?.role || "student"}
            />
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
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Actions
            </h3>
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
            Welcome back,{" "}
            {profile?.first_name && profile?.last_name
              ? `${profile.first_name} ${profile.last_name}`
              : user?.name || "Student"}
            !
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Submit assignments and communicate with your teachers.
          </p>

          {/* User Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Profile
              </h3>
              <button
                onClick={handleRefreshProfile}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? "animate-spin" : ""}
                />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Name:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {loading
                    ? "Loading..."
                    : profile?.first_name && profile?.last_name
                    ? `${profile.first_name} ${profile.last_name}`
                    : user?.name || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.email || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Student ID:
                </span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {loading ? "Loading..." : profile?.student_id || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Level:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {loading ? "Loading..." : profile?.level || "N/A"}
                </p>
              </div>
              {profile?.phone && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Phone:
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {profile.phone}
                  </p>
                </div>
              )}
              <div>
                <span className="text-gray-500 dark:text-gray-400">Role:</span>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {loading ? "Loading..." : profile?.role || "Student"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  Status:
                </span>
                <p className="font-medium text-gray-900 dark:text-white">
                  <span
                    className={`inline-flex items-center gap-1 ${
                      profile?.is_online ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        profile?.is_online ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                    {loading
                      ? "Loading..."
                      : profile?.is_online
                      ? "Online"
                      : "Offline"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Desktop and Mobile */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 hover:shadow-lg transition-all duration-200 transform hover:scale-105 animate-fade-in"
              >
                <div
                  className={`${action.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}
                >
                  <action.icon className="text-white" size={28} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {action.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {action.title === "Enroll in Course"
                    ? "Browse and enroll in available courses"
                    : action.title === "Submit Assignment"
                    ? "Upload and submit your completed assignments"
                    : "Send messages and communicate with your teachers"}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Assignments
            </h3>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="text-gray-500 dark:text-gray-400">
                    Loading assignments...
                  </div>
                </div>
              ) : recentAssignments.length === 0 ? (
                <div className="flex items-center justify-center p-4">
                  <div className="text-gray-500 dark:text-gray-400">
                    No assignments found
                  </div>
                </div>
              ) : (
                recentAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {assignment.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {assignment.course_name} - Due{" "}
                        {new Date(assignment.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        assignment.priority === "urgent"
                          ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                          : assignment.priority === "high"
                          ? "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
                          : assignment.priority === "medium"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      }`}
                    >
                      {assignment.status === "overdue"
                        ? "Overdue"
                        : assignment.status === "graded"
                        ? "Graded"
                        : assignment.status === "submitted"
                        ? "Submitted"
                        : "Pending"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Messages
            </h3>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="text-gray-500 dark:text-gray-400">
                    Loading messages...
                  </div>
                </div>
              ) : recentMessages.length === 0 ? (
                <div className="flex items-center justify-center p-4">
                  <div className="text-gray-500 dark:text-gray-400">
                    No recent messages
                  </div>
                </div>
              ) : (
                recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
                  >
                    <MessageSquare
                      className={`mr-3 ${
                        message.is_read
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                      size={20}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {message.sender_name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {message.content.length > 50
                          ? `${message.content.substring(0, 50)}...`
                          : message.content}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
