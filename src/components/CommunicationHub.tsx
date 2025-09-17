import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import {
  MessagingService,
  Message,
  Conversation,
} from "../services/messagingService";
import { useUser } from "../contexts/UserContext";

// Remove duplicate Message interface - using from messagingService

interface CommunicationHubProps {
  userRole: "student" | "teacher" | "admin";
  backLink: string;
}

const CommunicationHub = ({ userRole, backLink }: CommunicationHubProps) => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [availableUsers, setAvailableUsers] = useState<
    { id: string; name: string; role: string; is_online: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUser();

  // Fetch conversations on component mount
  useEffect(() => {
    if (user?.id) {
      fetchConversations();
      fetchAvailableUsers();
    }
  }, [user?.id]);

  // For admin users, we need to modify the conversation fetching to include all users
  const fetchConversationsForAdmin = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      // For admin, we can see all conversations
      const data = await MessagingService.getConversations(user.id);
      setConversations(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages when a contact is selected
  useEffect(() => {
    if (selectedContact && user?.id) {
      fetchMessages(selectedContact);
    }
  }, [selectedContact, user?.id]);

  const fetchConversations = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const data = await MessagingService.getConversations(user.id);
      setConversations(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableUsers = async () => {
    if (!user?.id) return;

    try {
      let users: {
        id: string;
        name: string;
        role: string;
        is_online: boolean;
      }[] = [];

      if (userRole === "student") {
        users = await MessagingService.getTeachers();
      } else if (userRole === "teacher") {
        users = await MessagingService.getStudents();
      } else if (userRole === "admin") {
        // For admin, get both teachers and students
        const teachers = await MessagingService.getTeachers();
        const students = await MessagingService.getStudents();
        users = [...teachers, ...students];
      }

      setAvailableUsers(users);
    } catch (error) {
      console.error("Error fetching available users:", error);
    }
  };

  const fetchMessages = async (otherUserId: string) => {
    if (!user?.id) return;

    try {
      const data = await MessagingService.getMessages(user.id, otherUserId);
      setMessages(data);

      // Mark messages as read
      await MessagingService.markMessagesAsRead(user.id, otherUserId);

      // Refresh conversations to update unread counts
      fetchConversations();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact || !user?.id) return;

    try {
      setSending(true);
      const message = await MessagingService.sendMessage(
        user.id,
        selectedContact,
        "Message", // Default subject
        newMessage.trim(),
        "general"
      );

      if (message) {
        setNewMessage("");
        // Refresh messages and conversations
        await fetchMessages(selectedContact);
        await fetchConversations();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchConversations();
    await fetchAvailableUsers();
    if (selectedContact) {
      await fetchMessages(selectedContact);
    }
    setRefreshing(false);
  };

  const filteredContacts = conversations.filter((contact) =>
    contact.other_user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailableUsers = availableUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedContactData =
    conversations.find((c) => c.other_user_id === selectedContact) ||
    availableUsers.find((u) => u.id === selectedContact);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            to={backLink}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Messages
            </h1>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <RefreshCw
                size={20}
                className={refreshing ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-[600px] flex">
          {/* Contacts Sidebar */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-gray-500 dark:text-gray-400">
                    Loading conversations...
                  </div>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {userRole === "student"
                      ? "Available Teachers"
                      : userRole === "teacher"
                      ? "Available Students"
                      : "Available Users"}
                  </div>
                  {filteredAvailableUsers.length === 0 ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-gray-500 dark:text-gray-400">
                        {userRole === "student"
                          ? "No teachers available"
                          : userRole === "teacher"
                          ? "No students available"
                          : "No users available"}
                      </div>
                    </div>
                  ) : (
                    filteredAvailableUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => setSelectedContact(user.id)}
                        className={`p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg mb-2 ${
                          selectedContact === user.id
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <UserAvatar
                              name={user.name}
                              role={
                                user.role as "student" | "teacher" | "admin"
                              }
                              size="md"
                            />
                            {user.is_online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                {user.name}
                              </h3>
                              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {user.role}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {user.is_online ? "Online" : "Offline"}
                              </p>
                              <span className="text-xs text-blue-600 dark:text-blue-400">
                                Click to start conversation
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.other_user_id)}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedContact === contact.other_user_id
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <UserAvatar
                          name={contact.other_user_name}
                          role={
                            contact.other_user_role as
                              | "student"
                              | "teacher"
                              | "admin"
                          }
                          size="md"
                        />
                        {contact.is_online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white truncate">
                            {contact.other_user_name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(contact.last_message_time)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {contact.last_message}
                          </p>
                          {contact.unread_count > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] h-5 flex items-center justify-center">
                              {contact.unread_count}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UserAvatar
                      name={
                        "other_user_name" in (selectedContactData || {})
                          ? (selectedContactData as any)?.other_user_name || ""
                          : (selectedContactData as any)?.name || ""
                      }
                      role={
                        ("other_user_role" in (selectedContactData || {})
                          ? (selectedContactData as any)?.other_user_role
                          : (selectedContactData as any)?.role || "student") as
                          | "student"
                          | "teacher"
                          | "admin"
                      }
                      size="md"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {"other_user_name" in (selectedContactData || {})
                          ? (selectedContactData as any)?.other_user_name
                          : (selectedContactData as any)?.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedContactData?.is_online
                          ? "Online"
                          : "Last seen recently"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Phone size={20} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Video size={20} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-gray-500 dark:text-gray-400">
                        No messages yet
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => {
                      const isOwn = message.sender_id === user?.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isOwn ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              isOwn
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isOwn
                                  ? "text-blue-100"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {formatTime(message.created_at)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Paperclip size={20} />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <Smile size={18} />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={sending || !newMessage.trim()}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} />
                  </div>
                  <p className="text-lg font-medium mb-2">
                    Select a conversation
                  </p>
                  <p className="text-sm">
                    Choose from your existing conversations or start a new one
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationHub;
