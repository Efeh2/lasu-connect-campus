export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          is_online: boolean | null
          last_name: string | null
          level: string | null
          phone: string | null
          role: string
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          is_online?: boolean | null
          last_name?: string | null
          level?: string | null
          phone?: string | null
          role?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_online?: boolean | null
          last_name?: string | null
          level?: string | null
          phone?: string | null
          role?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          id: string;
          code: string;
          name: string;
          description: string | null;
          instructor_id: string | null;
          level: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          description?: string | null;
          instructor_id?: string | null;
          level?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          description?: string | null;
          instructor_id?: string | null;
          level?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "courses_instructor_id_fkey";
            columns: ["instructor_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      enrollments: {
        Row: {
          id: string;
          student_id: string
          course_id: string;
          enrolled_at: string | null;
        };
        Insert: {
          id?: string;
          student_id: string;
          course_id: string;
          enrolled_at?: string | null;
        };
        Update: {
          id?: string;
          student_id?: string;
          course_id?: string;
          enrolled_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "enrollments_student_id_fkey";
            columns: ["student_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_course_id_fkey";
            columns: ["course_id"];
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };

    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (DatabaseWithoutInternals["public"]["Tables"])
    | { schema: keyof DatabaseWithoutInternals["public"]["Tables"] },
  TableName extends PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals["public"]["Tables"] }
    ? keyof (DatabaseWithoutInternals["public"]["Tables"][PublicTableNameOrOptions["schema"]])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals["public"]["Tables"] }
  ? (DatabaseWithoutInternals["public"]["Tables"][PublicTableNameOrOptions["schema"]])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (DatabaseWithoutInternals["public"]["Tables"])
    ? (DatabaseWithoutInternals["public"]["Tables"][PublicTableNameOrOptions]) extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof (DatabaseWithoutInternals["public"]["Tables"])
    | { schema: keyof DatabaseWithoutInternals["public"]["Tables"] },
  TableName extends PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals["public"]["Tables"] }
    ? keyof (DatabaseWithoutInternals["public"]["Tables"][PublicTableNameOrOptions["schema"]])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals["public"]["Tables"] }
  ? (DatabaseWithoutInternals["public"]["Tables"][PublicTableNameOrOptions["schema"]])[TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof (DatabaseWithoutInternals["public"]["Tables"])
    ? (DatabaseWithoutInternals["public"]["Tables"][PublicTableNameOrOptions]) extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof (DatabaseWithoutInternals["public"]["Tables"])
    | { schema: keyof DatabaseWithoutInternals["public"]["Tables"] },
  TableName extends PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals["public"]["Tables"] }
    ? keyof (DatabaseWithoutInternals["public"]["Tables"][PublicTableNameOrOptions["schema"]])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals["public"]["Tables"] }
  ? (DatabaseWithoutInternals["public"]["Tables"][PublicTableNameOrOptions["schema"]])[TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof (DatabaseWithoutInternals["public"]["Tables"])
    ? (DatabaseWithoutInternals["public"]["Tables"][PublicTableNameOrOptions]) extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof (DatabaseWithoutInternals["public"]["Enums"])
    | { schema: keyof DatabaseWithoutInternals["public"]["Enums"] },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals["public"]["Enums"] }
    ? keyof (DatabaseWithoutInternals["public"]["Enums"][PublicEnumNameOrOptions["schema"]])
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals["public"]["Enums"] }
  ? (DatabaseWithoutInternals["public"]["Enums"][PublicEnumNameOrOptions["schema"]])[EnumName]
  : PublicEnumNameOrOptions extends keyof (DatabaseWithoutInternals["public"]["Enums"])
    ? (DatabaseWithoutInternals["public"]["Enums"][PublicEnumNameOrOptions])
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
