import React, { useState, useEffect } from "react";
import { ArrowLeft, Send, User, Clock, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { MessagingService } from "../../services/messagingService";
import { useUser } from "../../contexts/UserContext";
import { useToast } from "../../components/ui/use-toast";

const MessageTeacher = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [teachers, setTeachers] = useState<
    { id: string; name: string; role: string; is_online: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const data = await MessagingService.getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast({
        title: "Error",
        description: "Failed to load teachers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTeacher || !message.trim() || !user?.id) {
      toast({
        title: "Missing Information",
        description: "Please select a teacher and enter a message.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSending(true);
      const messageData = await MessagingService.sendMessage(
        user.id,
        selectedTeacher,
        subject.trim() || "Message from Student",
        message.trim(),
        "general"
      );

      if (messageData) {
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully.",
        });
        setMessage("");
        setSubject("");
        setSelectedTeacher("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/student-dashboard"
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Message Teacher
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Available Teachers
                </h2>
                <button
                  onClick={fetchTeachers}
                  disabled={loading}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  <RefreshCw
                    size={16}
                    className={loading ? "animate-spin" : ""}
                  />
                </button>
              </div>

              <div className="space-y-3">
                {loading ? (
                  <div className="text-center py-4 text-gray-500">
                    Loading teachers...
                  </div>
                ) : teachers.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No teachers available
                  </div>
                ) : (
                  teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">
                          {teacher.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              teacher.is_online ? "bg-green-500" : "bg-gray-400"
                            }`}
                          ></span>
                          <span className="text-xs text-gray-500">
                            {teacher.is_online ? "Online" : "Offline"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 capitalize">
                        {teacher.role}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Compose New Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Teacher
                  </label>
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Choose a teacher...</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.role}
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
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
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
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={sending || !selectedTeacher || !message.trim()}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMessage("");
                      setSubject("");
                      setSelectedTeacher("");
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageTeacher;
