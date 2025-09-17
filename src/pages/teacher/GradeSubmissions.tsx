import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Award,
  FileText,
  Clock,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import {
  AssignmentService,
  Assignment,
  Submission,
} from "../../services/assignmentService";
import { useToast } from "@/components/ui/use-toast";

const GradeSubmissions = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [gradingData, setGradingData] = useState<{
    [key: string]: { grade: number; feedback: string };
  }>({});

  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    if (selectedAssignment) {
      fetchSubmissions(selectedAssignment);
    } else {
      setSubmissions([]);
    }
  }, [selectedAssignment]);

  const fetchAssignments = async () => {
    try {
      if (!user?.id) return;

      const assignmentsData = await AssignmentService.getTeacherAssignments(
        user.id
      );
      setAssignments(assignmentsData);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      toast({
        title: "Error",
        description: "Failed to load assignments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubmissions = async (assignmentId: string) => {
    try {
      const submissionsData = await AssignmentService.getAssignmentSubmissions(
        assignmentId
      );
      setSubmissions(submissionsData);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "Error",
        description: "Failed to load submissions",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAssignments();
    if (selectedAssignment) {
      await fetchSubmissions(selectedAssignment);
    }
    setIsRefreshing(false);
  };

  const handleGradeChange = (submissionId: string, grade: number) => {
    setGradingData((prev) => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        grade,
      },
    }));
  };

  const handleFeedbackChange = (submissionId: string, feedback: string) => {
    setGradingData((prev) => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        feedback,
      },
    }));
  };

  const handleGradeSubmission = async (submissionId: string) => {
    const data = gradingData[submissionId];
    if (!data || data.grade === undefined) {
      toast({
        title: "Missing grade",
        description: "Please enter a grade for this submission",
        variant: "destructive",
      });
      return;
    }

    try {
      await AssignmentService.gradeSubmission(
        submissionId,
        data.grade,
        data.feedback
      );

      toast({
        title: "Submission graded",
        description: "Grade and feedback have been saved",
      });

      // Refresh submissions
      if (selectedAssignment) {
        await fetchSubmissions(selectedAssignment);
      }

      // Clear grading data for this submission
      setGradingData((prev) => {
        const newData = { ...prev };
        delete newData[submissionId];
        return newData;
      });
    } catch (error) {
      console.error("Error grading submission:", error);
      toast({
        title: "Grading failed",
        description: "Failed to save grade. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "graded":
        return "text-green-600 bg-green-100";
      case "submitted":
        return "text-orange-600 bg-orange-100";
      case "returned":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="text-green-500" size={16} />;
      case "submitted":
        return <Clock className="text-orange-500" size={16} />;
      default:
        return <FileText className="text-blue-600" size={16} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/teacher-dashboard"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Award className="text-blue-600" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Grade Submissions
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={selectedAssignment}
                onChange={(e) => setSelectedAssignment(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Assignment</option>
                {assignments.map((assignment) => (
                  <option key={assignment.id} value={assignment.id}>
                    {assignment.course?.code} - {assignment.title}
                  </option>
                ))}
              </select>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <RefreshCw
                  size={20}
                  className={isRefreshing ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          {assignments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No assignments found
              </h3>
              <p className="text-gray-600 mb-4">
                Create some assignments to start grading submissions.
              </p>
              <Link
                to="/teacher/create-assignment"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Create Assignment
              </Link>
            </div>
          ) : !selectedAssignment ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select an assignment
              </h3>
              <p className="text-gray-600">
                Choose an assignment from the dropdown to view and grade
                submissions.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {(() => {
                const assignment = assignments.find(
                  (a) => a.id === selectedAssignment
                );
                if (!assignment) return null;

                const pendingSubmissions = submissions.filter(
                  (s) => s.status === "submitted"
                );
                const gradedSubmissions = submissions.filter(
                  (s) => s.status === "graded"
                );
                const totalSubmissions = submissions.length;

                return (
                  <div className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {assignment.title}
                        </h3>
                        <p className="text-gray-600">
                          {assignment.course?.code} - {assignment.course?.level}{" "}
                          Level | Due:{" "}
                          {new Date(assignment.due_date).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          pendingSubmissions.length > 0
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {pendingSubmissions.length} Pending
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {pendingSubmissions.length}
                        </div>
                        <div className="text-sm text-gray-600">
                          Pending Review
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {gradedSubmissions.length}
                        </div>
                        <div className="text-sm text-gray-600">Graded</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {totalSubmissions}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Submissions
                        </div>
                      </div>
                    </div>

                    {submissions.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-gray-600">
                          No submissions yet for this assignment.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {submissions.map((submission) => (
                          <div
                            key={submission.id}
                            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {getStatusIcon(submission.status)}
                                <div className="ml-3">
                                  <h4 className="font-medium text-gray-900">
                                    {submission.student?.first_name}{" "}
                                    {submission.student?.last_name}
                                    {submission.student?.student_id &&
                                      ` (${submission.student.student_id})`}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Submitted:{" "}
                                    {new Date(
                                      submission.submitted_at
                                    ).toLocaleString()}
                                  </p>
                                  {submission.content && (
                                    <p className="text-sm text-gray-500 mt-1">
                                      Comments: {submission.content}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {submission.status === "graded" ? (
                                  <>
                                    <span className="text-green-600 font-medium">
                                      {submission.grade}/{assignment.max_points}
                                    </span>
                                    <button
                                      onClick={() => {
                                        setGradingData((prev) => ({
                                          ...prev,
                                          [submission.id]: {
                                            grade: submission.grade || 0,
                                            feedback: submission.feedback || "",
                                          },
                                        }));
                                      }}
                                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                      Review
                                    </button>
                                  </>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      min="0"
                                      max={assignment.max_points}
                                      placeholder="Grade"
                                      value={
                                        gradingData[submission.id]?.grade || ""
                                      }
                                      onChange={(e) =>
                                        handleGradeChange(
                                          submission.id,
                                          parseInt(e.target.value) || 0
                                        )
                                      }
                                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                    <span className="text-gray-500">
                                      /{assignment.max_points}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleGradeSubmission(submission.id)
                                      }
                                      disabled={
                                        !gradingData[submission.id]?.grade
                                      }
                                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                      Grade
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {submission.status === "submitted" && (
                              <div className="mt-3">
                                <textarea
                                  placeholder="Add feedback (optional)"
                                  value={
                                    gradingData[submission.id]?.feedback || ""
                                  }
                                  onChange={(e) =>
                                    handleFeedbackChange(
                                      submission.id,
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  rows={2}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeSubmissions;
