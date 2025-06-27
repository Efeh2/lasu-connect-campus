
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { NotificationProvider } from "./contexts/NotificationContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Student pages
import JoinStudyGroup from "./pages/student/JoinStudyGroup";
import SubmitAssignment from "./pages/student/SubmitAssignment";
import MessageTeacher from "./pages/student/MessageTeacher";
import ViewGrades from "./pages/student/ViewGrades";

// Teacher pages
import CreateAssignment from "./pages/teacher/CreateAssignment";
import GradeSubmissions from "./pages/teacher/GradeSubmissions";
import ScheduleConsultation from "./pages/teacher/ScheduleConsultation";
import ViewAnalytics from "./pages/teacher/ViewAnalytics";
import AddCourse from "./pages/teacher/AddCourse";

// Admin pages
import ManageUsers from "./pages/admin/ManageUsers";
import SystemSettings from "./pages/admin/SystemSettings";
import GenerateReports from "./pages/admin/GenerateReports";
import PlatformAnalytics from "./pages/admin/PlatformAnalytics";
import AddUser from "./pages/admin/AddUser";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              
              {/* Student routes */}
              <Route path="/student/join-study-group" element={<JoinStudyGroup />} />
              <Route path="/student/submit-assignment" element={<SubmitAssignment />} />
              <Route path="/student/message-teacher" element={<MessageTeacher />} />
              <Route path="/student/view-grades" element={<ViewGrades />} />
              
              {/* Teacher routes */}
              <Route path="/teacher/create-assignment" element={<CreateAssignment />} />
              <Route path="/teacher/grade-submissions" element={<GradeSubmissions />} />
              <Route path="/teacher/schedule-consultation" element={<ScheduleConsultation />} />
              <Route path="/teacher/view-analytics" element={<ViewAnalytics />} />
              <Route path="/teacher/add-course" element={<AddCourse />} />
              
              {/* Admin routes */}
              <Route path="/admin/manage-users" element={<ManageUsers />} />
              <Route path="/admin/system-settings" element={<SystemSettings />} />
              <Route path="/admin/generate-reports" element={<GenerateReports />} />
              <Route path="/admin/platform-analytics" element={<PlatformAnalytics />} />
              <Route path="/admin/add-user" element={<AddUser />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
