import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Upload,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import {
  AssignmentService,
  Assignment,
} from "../../services/assignmentService";
import { supabase } from "../../integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const SubmitAssignment = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      if (!user?.id) return;

      const assignmentsData = await AssignmentService.getStudentAssignments(
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAssignment || !selectedFile || !user?.id) {
      toast({
        title: "Missing information",
        description: "Please select an assignment and upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let fileUrl = null;

      // Upload file to Supabase Storage if file is selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${user.id}_${
          selectedAssignment.id
        }_${Date.now()}.${fileExt}`;

        console.log("Uploading file:", fileName);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("assignments")
          .upload(fileName, selectedFile);

        if (uploadError) {
          console.error("Storage upload error:", uploadError);
          throw new Error(`File upload failed: ${uploadError.message}`);
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("assignments").getPublicUrl(fileName);

        fileUrl = publicUrl;
        console.log("File uploaded successfully:", publicUrl);
      }

      // Create submission record using AssignmentService
      console.log("Creating submission record...");
      await AssignmentService.submitAssignment({
        assignment_id: selectedAssignment.id,
        student_id: user.id,
        content: comments,
        file_url: fileUrl,
      });

      toast({
        title: "Assignment submitted successfully!",
        description: "Your assignment has been submitted for grading",
      });

      // Reset form
      setSelectedFile(null);
      setComments("");
      setSelectedAssignment(null);

      // Refresh assignments
      fetchAssignments();
    } catch (error: any) {
      console.error("Error submitting assignment:", error);
      toast({
        title: "Submission failed",
        description:
          error.message ||
          "There was an error submitting your assignment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDueDateStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0)
      return { status: "overdue", color: "red", text: "Overdue" };
    if (diffDays === 0)
      return { status: "due-today", color: "red", text: "Due Today" };
    if (diffDays <= 3)
      return { status: "due-soon", color: "amber", text: "Due Soon" };
    return { status: "upcoming", color: "green", text: "Upcoming" };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

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
          Submit Assignment
        </h1>

        {assignments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No assignments available
            </h3>
            <p className="text-gray-600">
              You don't have any published assignments to submit at the moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {assignments.map((assignment) => {
              const dueStatus = getDueDateStatus(assignment.due_date);
              const isSelected = selectedAssignment?.id === assignment.id;

              return (
                <div
                  key={assignment.id}
                  className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                    dueStatus.color === "red"
                      ? "border-red-500"
                      : dueStatus.color === "amber"
                      ? "border-amber-500"
                      : "border-green-500"
                  } ${isSelected ? "ring-2 ring-purple-500" : ""}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                      <p className="text-gray-600">{assignment.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {assignment.course?.code} - {assignment.course?.title}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        dueStatus.color === "red"
                          ? "bg-red-100 text-red-800"
                          : dueStatus.color === "amber"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {dueStatus.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>
                        Due:{" "}
                        {new Date(assignment.due_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FileText size={16} className="mr-1" />
                      <span>Max points: {assignment.max_points}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="capitalize">
                        {assignment.assignment_type}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="text-lg font-medium text-gray-900 mb-2">
                        Upload your assignment
                      </div>
                      <div className="text-gray-600 mb-4">
                        Drag and drop your file here, or click to browse
                      </div>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.zip"
                      />
                      <label
                        htmlFor="file-upload"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        Choose File
                      </label>
                      {selectedFile && (
                        <div className="mt-4 text-sm text-gray-600">
                          Selected: {selectedFile.name} (
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      )}
                    </div>
                  )}

                  {isSelected && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comments (Optional)
                      </label>
                      <textarea
                        rows={4}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Any additional comments about your submission..."
                      />
                    </div>
                  )}

                  <div className="flex gap-4">
                    {!isSelected ? (
                      <button
                        onClick={() => setSelectedAssignment(assignment)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                      >
                        Select Assignment
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSubmit}
                          disabled={!selectedFile || isSubmitting}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Assignment"}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedAssignment(null);
                            setSelectedFile(null);
                            setComments("");
                          }}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitAssignment;
