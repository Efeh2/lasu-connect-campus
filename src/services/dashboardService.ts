import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  totalUsers?: number;
  activeTeachers?: number;
  activeStudents?: number;
  totalCourses?: number;
  totalAssignments?: number;
  pendingSubmissions?: number;
  gradedSubmissions?: number;
  systemUptime?: number;
  activeSessions?: number;
  averageGrade?: number;
  studyGroups?: number;
  pendingTasks?: number;
  unreadMessages?: number;
  totalStudents?: number;
}

export interface RecentActivity {
  id: string;
  title: string;
  description: string;
  type: "assignment" | "submission" | "message" | "course" | "user";
  status?: string;
  timestamp: string;
  user_name?: string;
  course_name?: string;
}

export interface AssignmentData {
  id: string;
  title: string;
  course_name: string;
  due_date: string;
  status: "pending" | "submitted" | "graded" | "overdue";
  priority: "low" | "medium" | "high" | "urgent";
}

export interface MessageData {
  id: string;
  sender_name: string;
  content: string;
  timestamp: string;
  is_read: boolean;
}

export class DashboardService {
  // Get dashboard statistics for students
  static async getStudentStats(userId: string): Promise<DashboardStats> {
    try {
      // Get user's courses and assignments
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select(
          `
          course:courses(id, name),
          assignments:assignments(id, title, due_date)
        `
        )
        .eq("student_id", userId);

      const { data: submissions } = await supabase
        .from("submissions")
        .select("id, assignment_id, grade")
        .eq("student_id", userId);

      const { data: messages } = await supabase
        .from("messages")
        .select("id, is_read")
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`);

      const totalCourses = enrollments?.length || 0;
      const totalAssignments =
        enrollments?.reduce(
          (acc, enrollment) =>
            acc + ((enrollment as any).assignments?.length || 0),
          0
        ) || 0;
      const pendingSubmissions =
        submissions?.filter((s) => !(s as any).grade).length || 0;
      const gradedSubmissions =
        submissions?.filter((s) => (s as any).grade).length || 0;
      const unreadMessages =
        messages?.filter((m) => !(m as any).is_read).length || 0;

      // Calculate average grade
      const grades =
        submissions?.map((s) => (s as any).grade).filter((g) => g !== null) ||
        [];
      const averageGrade =
        grades.length > 0
          ? Math.round(grades.reduce((a, b) => a + b, 0) / grades.length)
          : 0;

      return {
        totalCourses,
        totalAssignments,
        pendingSubmissions,
        gradedSubmissions,
        averageGrade,
        unreadMessages,
      };
    } catch (error) {
      console.error("Error fetching student stats:", error);
      return {};
    }
  }

  // Get dashboard statistics for teachers
  static async getTeacherStats(userId: string): Promise<DashboardStats> {
    try {
      // Get teacher's courses
      const { data: courses } = await supabase
        .from("courses")
        .select(
          `
          id,
          enrollments:enrollments(count),
          assignments:assignments(id, title, due_date)
        `
        )
        .eq("teacher_id", userId);

      // Get submissions for teacher's assignments
      const { data: submissions } = await supabase
        .from("submissions")
        .select(
          `
          id,
          grade,
          assignment:assignments(teacher_id)
        `
        )
        .eq("assignment.teacher_id", userId);

      // Get study groups
      const { data: studyGroupsData } = await supabase
        .from("study_groups")
        .select("id")
        .eq("created_by", userId);

      // Get messages
      const { data: messages } = await supabase
        .from("messages")
        .select("id, is_read")
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`);

      const totalCourses = courses?.length || 0;
      const totalStudents =
        courses?.reduce(
          (acc, course) => acc + ((course as any).enrollments?.[0]?.count || 0),
          0
        ) || 0;
      const totalAssignments =
        courses?.reduce(
          (acc, course) => acc + ((course as any).assignments?.length || 0),
          0
        ) || 0;
      const pendingSubmissions =
        submissions?.filter((s) => !(s as any).grade).length || 0;
      const gradedSubmissions =
        submissions?.filter((s) => (s as any).grade).length || 0;
      const studyGroups = studyGroupsData?.length || 0;
      const unreadMessages =
        messages?.filter((m) => !(m as any).is_read).length || 0;

      // Calculate average grade
      const grades =
        submissions?.map((s) => (s as any).grade).filter((g) => g !== null) ||
        [];
      const averageGrade =
        grades.length > 0
          ? Math.round(grades.reduce((a, b) => a + b, 0) / grades.length)
          : 0;

      return {
        totalCourses,
        totalStudents,
        totalAssignments,
        pendingSubmissions,
        gradedSubmissions,
        averageGrade,
        studyGroups,
        unreadMessages,
      };
    } catch (error) {
      console.error("Error fetching teacher stats:", error);
      return {};
    }
  }

  // Get dashboard statistics for admins
  static async getAdminStats(): Promise<DashboardStats> {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get active teachers
      const { count: activeTeachers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "teacher")
        .eq("is_online", true);

      // Get active students
      const { count: activeStudents } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "student")
        .eq("is_online", true);

      // Get total courses
      const { count: totalCourses } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true });

      // Get total assignments
      const { count: totalAssignments } = await supabase
        .from("assignments")
        .select("*", { count: "exact", head: true });

      // Get pending submissions
      const { count: pendingSubmissions } = await supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })
        .is("grade", null);

      // Get system uptime (mock for now)
      const systemUptime = 98.5;

      // Get active sessions (mock for now)
      const activeSessions = 85;

      return {
        totalUsers: totalUsers || 0,
        activeTeachers: activeTeachers || 0,
        activeStudents: activeStudents || 0,
        totalCourses: totalCourses || 0,
        totalAssignments: totalAssignments || 0,
        pendingSubmissions: pendingSubmissions || 0,
        systemUptime,
        activeSessions,
      };
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      return {};
    }
  }

  // Get recent assignments for students
  static async getStudentRecentAssignments(
    userId: string
  ): Promise<AssignmentData[]> {
    try {
      const { data: assignments } = await supabase
        .from("assignments")
        .select(
          `
          id,
          title,
          due_date,
          course:courses(name),
          submissions:submissions(id, grade, student_id)
        `
        )
        .in("course.enrollments.student_id", [userId])
        .order("due_date", { ascending: true })
        .limit(5);

      return (
        assignments?.map((assignment) => {
          const submission = (assignment as any).submissions?.find(
            (s: any) => s.student_id === userId
          );
          const now = new Date();
          const dueDate = new Date((assignment as any).due_date);
          const isOverdue = dueDate < now && !submission;
          const isSubmitted = !!submission;
          const isGraded = !!submission?.grade;

          let status: "pending" | "submitted" | "graded" | "overdue" =
            "pending";
          if (isGraded) status = "graded";
          else if (isSubmitted) status = "submitted";
          else if (isOverdue) status = "overdue";

          const priority = isOverdue
            ? "urgent"
            : dueDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000
            ? "high"
            : "medium";

          return {
            id: (assignment as any).id,
            title: (assignment as any).title,
            course_name: (assignment as any).course?.name || "Unknown Course",
            due_date: (assignment as any).due_date,
            status,
            priority,
          };
        }) || []
      );
    } catch (error) {
      console.error("Error fetching recent assignments:", error);
      return [];
    }
  }

  // Get recent submissions for teachers
  static async getTeacherRecentSubmissions(
    userId: string
  ): Promise<RecentActivity[]> {
    try {
      const { data: submissions } = await supabase
        .from("submissions")
        .select(
          `
          id,
          created_at,
          grade,
          assignment:assignments(title, teacher_id),
          student:profiles!submissions_student_id_fkey(first_name, last_name)
        `
        )
        .eq("assignment.teacher_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      return (
        submissions?.map((submission) => ({
          id: (submission as any).id,
          title: (submission as any).assignment?.title || "Unknown Assignment",
          description: `${(submission as any).student?.first_name} ${
            (submission as any).student?.last_name
          }`,
          type: "submission" as const,
          status: (submission as any).grade ? "Graded" : "Pending",
          timestamp: (submission as any).created_at,
          user_name: `${(submission as any).student?.first_name} ${
            (submission as any).student?.last_name
          }`,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching recent submissions:", error);
      return [];
    }
  }

  // Get recent messages for any user
  static async getRecentMessages(userId: string): Promise<MessageData[]> {
    try {
      const { data: messages } = await supabase
        .from("messages")
        .select(
          `
          id,
          content,
          created_at,
          is_read,
          sender:profiles!messages_sender_id_fkey(first_name, last_name)
        `
        )
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order("created_at", { ascending: false })
        .limit(5);

      return (
        messages?.map((message) => ({
          id: (message as any).id,
          sender_name: `${(message as any).sender?.first_name} ${
            (message as any).sender?.last_name
          }`,
          content: (message as any).content,
          timestamp: (message as any).created_at,
          is_read: (message as any).is_read,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching recent messages:", error);
      return [];
    }
  }

  // Get recent user activity for admins
  static async getAdminRecentActivity(): Promise<RecentActivity[]> {
    try {
      // Get recent user registrations
      const { data: recentUsers } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, role, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      return (
        recentUsers?.map((user) => ({
          id: (user as any).id,
          title: `${(user as any).first_name} ${(user as any).last_name}`,
          description: `New ${(user as any).role} registered`,
          type: "user" as const,
          timestamp: (user as any).created_at,
          user_name: `${(user as any).first_name} ${(user as any).last_name}`,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching admin recent activity:", error);
      return [];
    }
  }

  // Get system health data for admins
  static async getSystemHealth(): Promise<{
    uptime: number;
    activeSessions: number;
  }> {
    try {
      // Mock data for now - in a real app, this would come from monitoring services
      return {
        uptime: 98.5,
        activeSessions: 85,
      };
    } catch (error) {
      console.error("Error fetching system health:", error);
      return { uptime: 0, activeSessions: 0 };
    }
  }
}
