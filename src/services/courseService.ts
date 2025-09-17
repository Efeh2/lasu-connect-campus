import { supabase } from "@/integrations/supabase/client";

export interface Course {
  id: string;
  title: string;
  code: string;
  description?: string;
  level: string;
  credits: number;
  teacher_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCourseData {
  title: string;
  code: string;
  description?: string;
  level: string;
  credits: number;
  teacher_id: string;
}

export interface UpdateCourseData {
  title?: string;
  code?: string;
  description?: string;
  level?: string;
  credits?: number;
  is_active?: boolean;
}

export class CourseService {
  // Get all courses for a teacher
  static async getTeacherCourses(teacherId: string): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("teacher_id", teacherId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching teacher courses:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error in getTeacherCourses:", error);
      throw error;
    }
  }

  // Get all active courses (for students to view)
  static async getActiveCourses(): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_active", true)
        .order("title");

      if (error) {
        console.error("Error fetching active courses:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error in getActiveCourses:", error);
      throw error;
    }
  }

  // Create a new course
  static async createCourse(courseData: CreateCourseData): Promise<Course> {
    try {
      const { data, error } = await supabase
        .from("courses")
        .insert([courseData])
        .select()
        .single();

      if (error) {
        console.error("Error creating course:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in createCourse:", error);
      throw error;
    }
  }

  // Update a course
  static async updateCourse(courseId: string, updates: UpdateCourseData): Promise<Course> {
    try {
      const { data, error } = await supabase
        .from("courses")
        .update(updates)
        .eq("id", courseId)
        .select()
        .single();

      if (error) {
        console.error("Error updating course:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in updateCourse:", error);
      throw error;
    }
  }

  // Delete a course (soft delete by setting is_active to false)
  static async deleteCourse(courseId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("courses")
        .update({ is_active: false })
        .eq("id", courseId);

      if (error) {
        console.error("Error deleting course:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error in deleteCourse:", error);
      throw error;
    }
  }

  // Get course by ID
  static async getCourseById(courseId: string): Promise<Course | null> {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (error) {
        console.error("Error fetching course:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in getCourseById:", error);
      throw error;
    }
  }

  // Get courses by level
  static async getCoursesByLevel(level: string): Promise<Course[]> {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("level", level)
        .eq("is_active", true)
        .order("title");

      if (error) {
        console.error("Error fetching courses by level:", error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error in getCoursesByLevel:", error);
      throw error;
    }
  }

  // Get course statistics
  static async getCourseStats(courseId: string): Promise<{
    totalStudents: number;
    totalAssignments: number;
    totalSubmissions: number;
    averageGrade: number;
  }> {
    try {
      // Get total students enrolled
      const { count: totalStudents } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .eq("course_id", courseId)
        .eq("status", "active");

      // Get total assignments
      const { count: totalAssignments } = await supabase
        .from("assignments")
        .select("*", { count: "exact", head: true })
        .eq("course_id", courseId);

      // Get total submissions
      const { count: totalSubmissions } = await supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })
        .in("assignment_id", 
          await supabase
            .from("assignments")
            .select("id")
            .eq("course_id", courseId)
            .then(res => res.data?.map(a => a.id) || [])
        );

      // Get average grade
      const { data: grades } = await supabase
        .from("submissions")
        .select("grade")
        .in("assignment_id", 
          await supabase
            .from("assignments")
            .select("id")
            .eq("course_id", courseId)
            .then(res => res.data?.map(a => a.id) || [])
        )
        .not("grade", "is", null);

      const averageGrade = grades && grades.length > 0 
        ? grades.reduce((sum, g) => sum + (g.grade || 0), 0) / grades.length 
        : 0;

      return {
        totalStudents: totalStudents || 0,
        totalAssignments: totalAssignments || 0,
        totalSubmissions: totalSubmissions || 0,
        averageGrade: Math.round(averageGrade * 100) / 100,
      };
    } catch (error) {
      console.error("Error in getCourseStats:", error);
      throw error;
    }
  }
}
