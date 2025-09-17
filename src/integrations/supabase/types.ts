export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          role: "student" | "teacher" | "admin";
          level: string | null;
          student_id: string | null;
          phone: string | null;
          avatar_url: string | null;
          is_online: boolean;
          department: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          role: "student" | "teacher" | "admin";
          level?: string | null;
          student_id?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          is_online?: boolean;
          department?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          role?: "student" | "teacher" | "admin";
          level?: string | null;
          student_id?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          is_online?: boolean;
          department?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          code: string;
          description: string | null;
          level: string;
          credits: number;
          teacher_id: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          code: string;
          description?: string | null;
          level: string;
          credits?: number;
          teacher_id: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          code?: string;
          description?: string | null;
          level?: string;
          credits?: number;
          teacher_id?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          student_id: string;
          course_id: string;
          enrolled_at: string;
          status: "active" | "dropped" | "completed";
        };
        Insert: {
          id?: string;
          student_id: string;
          course_id: string;
          enrolled_at?: string;
          status?: "active" | "dropped" | "completed";
        };
        Update: {
          id?: string;
          student_id?: string;
          course_id?: string;
          enrolled_at?: string;
          status?: "active" | "dropped" | "completed";
        };
      };
      assignments: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          course_id: string;
          due_date: string;
          max_points: number;
          assignment_type: "homework" | "quiz" | "exam" | "project";
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          course_id: string;
          due_date: string;
          max_points?: number;
          assignment_type?: "homework" | "quiz" | "exam" | "project";
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          course_id?: string;
          due_date?: string;
          max_points?: number;
          assignment_type?: "homework" | "quiz" | "exam" | "project";
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          assignment_id: string;
          student_id: string;
          content: string | null;
          file_url: string | null;
          submitted_at: string;
          grade: number | null;
          feedback: string | null;
          status: "submitted" | "graded" | "returned";
        };
        Insert: {
          id?: string;
          assignment_id: string;
          student_id: string;
          content?: string | null;
          file_url?: string | null;
          submitted_at?: string;
          grade?: number | null;
          feedback?: string | null;
          status?: "submitted" | "graded" | "returned";
        };
        Update: {
          id?: string;
          assignment_id?: string;
          student_id?: string;
          content?: string | null;
          file_url?: string | null;
          submitted_at?: string;
          grade?: number | null;
          feedback?: string | null;
          status?: "submitted" | "graded" | "returned";
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string;
          subject: string;
          content: string;
          is_read: boolean;
          message_type: "general" | "assignment" | "announcement";
          related_assignment_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          recipient_id: string;
          subject: string;
          content: string;
          is_read?: boolean;
          message_type?: "general" | "assignment" | "announcement";
          related_assignment_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          sender_id?: string;
          recipient_id?: string;
          subject?: string;
          content?: string;
          is_read?: boolean;
          message_type?: "general" | "assignment" | "announcement";
          related_assignment_id?: string | null;
          created_at?: string;
        };
      };
      study_groups: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          course_id: string | null;
          level: string;
          max_members: number;
          created_by: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          course_id?: string | null;
          level: string;
          max_members?: number;
          created_by: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          course_id?: string | null;
          level?: string;
          max_members?: number;
          created_by?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      study_group_members: {
        Row: {
          id: string;
          group_id: string;
          member_id: string;
          joined_at: string;
          role: "member" | "moderator";
        };
        Insert: {
          id?: string;
          group_id: string;
          member_id: string;
          joined_at?: string;
          role?: "member" | "moderator";
        };
        Update: {
          id?: string;
          group_id?: string;
          member_id?: string;
          joined_at?: string;
          role?: "member" | "moderator";
        };
      };
      consultations: {
        Row: {
          id: string;
          teacher_id: string;
          student_id: string;
          title: string;
          description: string | null;
          scheduled_at: string;
          duration_minutes: number;
          status: "scheduled" | "completed" | "cancelled";
          meeting_link: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          student_id: string;
          title: string;
          description?: string | null;
          scheduled_at: string;
          duration_minutes?: number;
          status?: "scheduled" | "completed" | "cancelled";
          meeting_link?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          student_id?: string;
          title?: string;
          description?: string | null;
          scheduled_at?: string;
          duration_minutes?: number;
          status?: "scheduled" | "completed" | "cancelled";
          meeting_link?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: "assignment" | "grade" | "message" | "announcement" | "system";
          is_read: boolean;
          related_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: "assignment" | "grade" | "message" | "announcement" | "system";
          is_read?: boolean;
          related_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: "assignment" | "grade" | "message" | "announcement" | "system";
          is_read?: boolean;
          related_id?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
