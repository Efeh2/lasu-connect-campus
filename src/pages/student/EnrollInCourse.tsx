import React, { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Plus, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { CourseService, Course } from "../../services/courseService";
import {
  EnrollmentService,
  Enrollment,
} from "../../services/enrollmentService";
import { useToast } from "@/components/ui/use-toast";

const EnrollInCourse = () => {
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState<string | null>(null);

  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!user?.id) return;

      // Fetch available courses and enrolled courses in parallel
      const [coursesData, enrollmentsData] = await Promise.all([
        CourseService.getActiveCourses(),
        EnrollmentService.getStudentEnrollments(user.id),
      ]);

      setAvailableCourses(coursesData);
      setEnrolledCourses(enrollmentsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!user?.id) return;

    setIsEnrolling(courseId);

    try {
      await EnrollmentService.enrollStudent({
        student_id: user.id,
        course_id: courseId,
      });

      toast({
        title: "Enrollment successful!",
        description: "You have been enrolled in the course.",
      });

      // Refresh data
      await fetchData();
    } catch (error: any) {
      console.error("Error enrolling in course:", error);
      toast({
        title: "Enrollment failed",
        description:
          error.message || "Failed to enroll in course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(null);
    }
  };

  const handleDrop = async (enrollmentId: string) => {
    try {
      await EnrollmentService.dropStudent(enrollmentId);

      toast({
        title: "Course dropped",
        description: "You have been dropped from the course.",
      });

      // Refresh data
      await fetchData();
    } catch (error: any) {
      console.error("Error dropping course:", error);
      toast({
        title: "Drop failed",
        description:
          error.message || "Failed to drop course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some(
      (enrollment) => enrollment.course_id === courseId
    );
  };

  const getEnrollmentId = (courseId: string) => {
    const enrollment = enrolledCourses.find((e) => e.course_id === courseId);
    return enrollment?.id;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
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
            className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Course Enrollment
          </h1>
          <p className="text-gray-600">
            Browse available courses and enroll to access assignments and
            materials.
          </p>
        </div>

        {/* Enrolled Courses */}
        {enrolledCourses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              My Enrolled Courses
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {enrollment.course?.code}
                      </h3>
                      <p className="text-gray-600">
                        {enrollment.course?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {enrollment.course?.level} Level •{" "}
                        {enrollment.course?.credits} Credits
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Enrolled
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock size={16} className="mr-1" />
                    <span>
                      Enrolled:{" "}
                      {new Date(enrollment.enrolled_at).toLocaleDateString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDrop(enrollment.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Drop Course
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Courses */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Available Courses
          </h2>

          {availableCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses available
              </h3>
              <p className="text-gray-600">
                There are no active courses available for enrollment at the
                moment.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableCourses.map((course) => {
                const enrolled = isEnrolled(course.id);
                const enrolling = isEnrolling === course.id;

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {course.code}
                        </h3>
                        <p className="text-gray-600">{course.title}</p>
                        <p className="text-sm text-gray-500">
                          {course.level} Level • {course.credits} Credits
                        </p>
                      </div>
                      {enrolled && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Enrolled
                        </span>
                      )}
                    </div>

                    {course.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {course.description}
                      </p>
                    )}

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Users size={16} className="mr-1" />
                      <span>Computer Science Department</span>
                    </div>

                    <button
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrolled || enrolling}
                      className={`w-full px-4 py-2 rounded-lg transition-colors ${
                        enrolled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : enrolling
                          ? "bg-purple-300 text-purple-700 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {enrolled
                        ? "Already Enrolled"
                        : enrolling
                        ? "Enrolling..."
                        : "Enroll in Course"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollInCourse;
