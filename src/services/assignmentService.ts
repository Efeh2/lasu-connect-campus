import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type AssignmentInsert = Database["public"]["Tables"]["assignments"]["Insert"];
type AssignmentUpdate = Database["public"]["Tables"]["assignments"]["Update"];
type SubmissionInsert = Database["public"]["Tables"]["submissions"]["Insert"];
type SubmissionUpdate = Database["public"]["Tables"]["submissions"]["Update"];

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  due_date: string;
  max_points: number;
  assignment_type: "homework" | "quiz" | "exam" | "project";
  is_published: boolean;
  created_at: string;
  updated_at: string;
  course?: {
    title: string;
    code: string;
    level: string;
  };
}

export interface CreateAssignmentData {
  title: string;
  description?: string;
  course_id: string;
  due_date: string;
  max_points: number;
  assignment_type: "homework" | "quiz" | "exam" | "project";
  is_published?: boolean;
}

export interface UpdateAssignmentData {
  title?: string;
  description?: string;
  due_date?: string;
  max_points?: number;
  assignment_type?: "homework" | "quiz" | "exam" | "project";
  is_published?: boolean;
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  content?: string;
  file_url?: string;
  submitted_at: string;
  grade?: number;
  feedback?: string;
  status: "submitted" | "graded" | "returned";
  student?: {
    first_name: string;
    last_name: string;
    student_id: string;
  };
}

export class AssignmentService {
  // Get assignments for a teacher's courses
  static async getTeacherAssignments(teacherId: string): Promise<Assignment[]> {
    try {
      const { data, error } = await supabase
        .from("assignments")
        .select(
          `
          *,
          course:courses(title, code, level)
        `
        )
        .in(
          "course_id",
          await supabase
            .from("courses")
            .select("id")
            .eq("teacher_id", teacherId)
            .then((res) => (res.data as any)?.map((c: any) => c.id) || [])
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching teacher assignments:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error in getTeacherAssignments:", error);
      throw error;
    }
  }

  // Get published assignments for a student's enrolled courses
  static async getStudentAssignments(studentId: string): Promise<Assignment[]> {
    try {
      console.log("Fetching assignments for student:", studentId);

      // Get student's enrolled courses
      const { data: enrollments, error: enrollmentError } = await (
        supabase as any
      )
        .from("enrollments")
        .select("course_id")
        .eq("student_id", studentId)
        .eq("status", "active");

      if (enrollmentError) {
        console.error("Error fetching enrollments:", enrollmentError);
        throw enrollmentError;
      }

      console.log("Student enrollments:", enrollments);

      if (!enrollments || enrollments.length === 0) {
        console.log("No enrollments found for student");
        return [];
      }

      const courseIds = (enrollments as any).map((e: any) => e.course_id);
      console.log("Course IDs for assignments:", courseIds);

      // Get published assignments for enrolled courses
      const { data, error } = await (supabase as any)
        .from("assignments")
        .select(
          `
          *,
          course:courses(title, code, level)
        `
        )
        .in("course_id", courseIds)
        .eq("is_published", true)
        .order("due_date", { ascending: true });

      if (error) {
        console.error("Error fetching student assignments:", error);
        throw error;
      }

      console.log("Found assignments:", data);
      return data || [];
    } catch (error) {
      console.error("Error in getStudentAssignments:", error);
      throw error;
    }
  }

  // Create a new assignment
  static async createAssignment(
    assignmentData: CreateAssignmentData
  ): Promise<Assignment> {
    try {
      const { data, error } = await (supabase as any)
        .from("assignments")
        .insert([assignmentData])
        .select(
          `
          *,
          course:courses(title, code, level)
        `
        )
        .single();

      if (error) {
        console.error("Error creating assignment:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in createAssignment:", error);
      throw error;
    }
  }

  // Update an assignment
  static async updateAssignment(
    assignmentId: string,
    updates: UpdateAssignmentData
  ): Promise<Assignment> {
    try {
      const { data, error } = await (supabase as any)
        .from("assignments")
        .update(updates)
        .eq("id", assignmentId)
        .select(
          `
          *,
          course:courses(title, code, level)
        `
        )
        .single();

      if (error) {
        console.error("Error updating assignment:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in updateAssignment:", error);
      throw error;
    }
  }

  // Delete an assignment
  static async deleteAssignment(assignmentId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("assignments")
        .delete()
        .eq("id", assignmentId);

      if (error) {
        console.error("Error deleting assignment:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error in deleteAssignment:", error);
      throw error;
    }
  }

  // Get assignment by ID
  static async getAssignmentById(
    assignmentId: string
  ): Promise<Assignment | null> {
    try {
      const { data, error } = await supabase
        .from("assignments")
        .select(
          `
          *,
          course:courses(title, code, level)
        `
        )
        .eq("id", assignmentId)
        .single();

      if (error) {
        console.error("Error fetching assignment:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in getAssignmentById:", error);
      throw error;
    }
  }

  // Get submissions for an assignment
  static async getAssignmentSubmissions(
    assignmentId: string
  ): Promise<Submission[]> {
    try {
      const { data, error } = await supabase
        .from("submissions")
        .select(
          `
          *,
          student:profiles(first_name, last_name, student_id)
        `
        )
        .eq("assignment_id", assignmentId)
        .order("submitted_at", { ascending: false });

      if (error) {
        console.error("Error fetching assignment submissions:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error in getAssignmentSubmissions:", error);
      throw error;
    }
  }

  // Get student's submissions
  static async getStudentSubmissions(studentId: string): Promise<Submission[]> {
    try {
      const { data, error } = await supabase
        .from("submissions")
        .select(
          `
          *,
          assignment:assignments(title, max_points, assignment_type, course:courses(title, code))
        `
        )
        .eq("student_id", studentId)
        .order("submitted_at", { ascending: false });

      if (error) {
        console.error("Error fetching student submissions:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error in getStudentSubmissions:", error);
      throw error;
    }
  }

  // Submit an assignment
  static async submitAssignment(submissionData: {
    assignment_id: string;
    student_id: string;
    content?: string;
    file_url?: string;
  }): Promise<Submission> {
    try {
      console.log("Submitting assignment with data:", submissionData);

      const submissionRecord = {
        ...submissionData,
        status: "submitted",
        submitted_at: new Date().toISOString(),
      };

      console.log("Submission record:", submissionRecord);

      const { data, error } = await (supabase as any)
        .from("submissions")
        .insert([submissionRecord])
        .select(
          `
          *,
          student:profiles(first_name, last_name, student_id)
        `
        )
        .single();

      if (error) {
        console.error("Error submitting assignment:", error);
        console.error("Error details:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        throw error;
      }

      console.log("Assignment submitted successfully:", data);
      return data;
    } catch (error) {
      console.error("Error in submitAssignment:", error);
      throw error;
    }
  }

  // Grade a submission
  static async gradeSubmission(
    submissionId: string,
    grade: number,
    feedback?: string
  ): Promise<Submission> {
    try {
      const { data, error } = await (supabase as any)
        .from("submissions")
        .update({
          grade,
          feedback,
          status: "graded",
        })
        .eq("id", submissionId)
        .select(
          `
          *,
          student:profiles(first_name, last_name, student_id)
        `
        )
        .single();

      if (error) {
        console.error("Error grading submission:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in gradeSubmission:", error);
      throw error;
    }
  }

  // Get assignment statistics
  static async getAssignmentStats(assignmentId: string): Promise<{
    totalSubmissions: number;
    gradedSubmissions: number;
    pendingSubmissions: number;
    averageGrade: number;
  }> {
    try {
      const submissions = await this.getAssignmentSubmissions(assignmentId);

      const totalSubmissions = submissions.length;
      const gradedSubmissions = submissions.filter(
        (s) => s.status === "graded"
      ).length;
      const pendingSubmissions = submissions.filter(
        (s) => s.status === "submitted"
      ).length;

      const grades = submissions
        .filter((s) => s.grade !== null && s.grade !== undefined)
        .map((s) => s.grade!);

      const averageGrade =
        grades.length > 0
          ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length
          : 0;

      return {
        totalSubmissions,
        gradedSubmissions,
        pendingSubmissions,
        averageGrade: Math.round(averageGrade * 100) / 100,
      };
    } catch (error) {
      console.error("Error in getAssignmentStats:", error);
      throw error;
    }
  }

  // Publish/unpublish an assignment
  static async toggleAssignmentPublish(
    assignmentId: string,
    isPublished: boolean
  ): Promise<Assignment> {
    try {
      const { data, error } = await (supabase as any)
        .from("assignments")
        .update({ is_published: isPublished })
        .eq("id", assignmentId)
        .select(
          `
          *,
          course:courses(title, code, level)
        `
        )
        .single();

      if (error) {
        console.error("Error toggling assignment publish:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in toggleAssignmentPublish:", error);
      throw error;
    }
  }
}
