import { supabase } from "@/integrations/supabase/client";

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
  status: "active" | "dropped" | "completed";
  course?: {
    id: string;
    title: string;
    code: string;
    level: string;
    credits: number;
    teacher_id: string;
  };
  student?: {
    id: string;
    first_name: string;
    last_name: string;
    student_id: string;
  };
}

export interface CreateEnrollmentData {
  student_id: string;
  course_id: string;
  status?: "active" | "dropped" | "completed";
}

export class EnrollmentService {
  // Enroll a student in a course
  static async enrollStudent(
    enrollmentData: CreateEnrollmentData
  ): Promise<Enrollment> {
    try {
      const { data, error } = await (supabase as any)
        .from("enrollments")
        .insert([
          {
            ...enrollmentData,
            status: enrollmentData.status || "active",
          },
        ])
        .select(
          `
          *,
          course:courses(id, title, code, level, credits, teacher_id),
          student:profiles(id, first_name, last_name, student_id)
        `
        )
        .single();

      if (error) {
        console.error("Error enrolling student:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in enrollStudent:", error);
      throw error;
    }
  }

  // Get student's enrollments
  static async getStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    try {
      const { data, error } = await (supabase as any)
        .from("enrollments")
        .select(
          `
          *,
          course:courses(id, title, code, level, credits, teacher_id)
        `
        )
        .eq("student_id", studentId)
        .eq("status", "active")
        .order("enrolled_at", { ascending: false });

      if (error) {
        console.error("Error fetching student enrollments:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error in getStudentEnrollments:", error);
      throw error;
    }
  }

  // Get course enrollments (for teachers)
  static async getCourseEnrollments(courseId: string): Promise<Enrollment[]> {
    try {
      const { data, error } = await (supabase as any)
        .from("enrollments")
        .select(
          `
          *,
          student:profiles(id, first_name, last_name, student_id)
        `
        )
        .eq("course_id", courseId)
        .eq("status", "active")
        .order("enrolled_at", { ascending: false });

      if (error) {
        console.error("Error fetching course enrollments:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error in getCourseEnrollments:", error);
      throw error;
    }
  }

  // Drop a student from a course
  static async dropStudent(enrollmentId: string): Promise<void> {
    try {
      const { error } = await (supabase as any)
        .from("enrollments")
        .update({ status: "dropped" })
        .eq("id", enrollmentId);

      if (error) {
        console.error("Error dropping student:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error in dropStudent:", error);
      throw error;
    }
  }

  // Check if student is enrolled in a course
  static async isStudentEnrolled(
    studentId: string,
    courseId: string
  ): Promise<boolean> {
    try {
      const { data, error } = await (supabase as any)
        .from("enrollments")
        .select("id")
        .eq("student_id", studentId)
        .eq("course_id", courseId)
        .eq("status", "active")
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is "not found" error
        console.error("Error checking enrollment:", error);
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error("Error in isStudentEnrolled:", error);
      throw error;
    }
  }

  // Get enrollment statistics for a course
  static async getCourseEnrollmentStats(courseId: string): Promise<{
    totalEnrolled: number;
    activeEnrollments: number;
    droppedEnrollments: number;
    completedEnrollments: number;
  }> {
    try {
      const { data, error } = await (supabase as any)
        .from("enrollments")
        .select("status")
        .eq("course_id", courseId);

      if (error) {
        console.error("Error fetching enrollment stats:", error);
        throw error;
      }

      const enrollments = data || [];
      const activeEnrollments = enrollments.filter(
        (e) => e.status === "active"
      ).length;
      const droppedEnrollments = enrollments.filter(
        (e) => e.status === "dropped"
      ).length;
      const completedEnrollments = enrollments.filter(
        (e) => e.status === "completed"
      ).length;

      return {
        totalEnrolled: enrollments.length,
        activeEnrollments,
        droppedEnrollments,
        completedEnrollments,
      };
    } catch (error) {
      console.error("Error in getCourseEnrollmentStats:", error);
      throw error;
    }
  }
}
