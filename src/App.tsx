
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { NotificationProvider } from "./contexts/NotificationContext";
import { UserProvider } from "./contexts/UserContext";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthGuard from "./components/AuthGuard";
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
import StudentMessages from "./pages/student/Messages";

// Teacher pages
import CreateAssignment from "./pages/teacher/CreateAssignment";
import GradeSubmissions from "./pages/teacher/GradeSubmissions";
import ScheduleConsultation from "./pages/teacher/ScheduleConsultation";
import ViewAnalytics from "./pages/teacher/ViewAnalytics";
import AddCourse from "./pages/teacher/AddCourse";
import TeacherMessages from "./pages/teacher/Messages";

// Admin pages
import ManageUsers from "./pages/admin/ManageUsers";
import SystemSettings from "./pages/admin/SystemSettings";
import GenerateReports from "./pages/admin/GenerateReports";
import PlatformAnalytics from "./pages/admin/PlatformAnalytics";
import AddUser from "./pages/admin/AddUser";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <AppSettingsProvider>
            <NotificationProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />
                    <Route path="/signup" element={<AuthGuard><Signup /></AuthGuard>} />
                    
                    {/* Protected Dashboard Routes */}
                    <Route path="/student-dashboard" element={<AuthGuard requireAuth><StudentDashboard /></AuthGuard>} />
                    <Route path="/teacher-dashboard" element={<AuthGuard requireAuth><TeacherDashboard /></AuthGuard>} />
                    <Route path="/admin-dashboard" element={<AuthGuard requireAuth><AdminDashboard /></AuthGuard>} />
                    
                    {/* Protected Student routes */}
                    <Route path="/student/join-study-group" element={<AuthGuard requireAuth><JoinStudyGroup /></AuthGuard>} />
                    <Route path="/student/submit-assignment" element={<AuthGuard requireAuth><SubmitAssignment /></AuthGuard>} />
                    <Route path="/student/message-teacher" element={<AuthGuard requireAuth><MessageTeacher /></AuthGuard>} />
                    <Route path="/student/view-grades" element={<AuthGuard requireAuth><ViewGrades /></AuthGuard>} />
                    <Route path="/student/messages" element={<AuthGuard requireAuth><StudentMessages /></AuthGuard>} />
                    
                    {/* Protected Teacher routes */}
                    <Route path="/teacher/create-assignment" element={<AuthGuard requireAuth><CreateAssignment /></AuthGuard>} />
                    <Route path="/teacher/grade-submissions" element={<AuthGuard requireAuth><GradeSubmissions /></AuthGuard>} />
                    <Route path="/teacher/schedule-consultation" element={<AuthGuard requireAuth><ScheduleConsultation /></AuthGuard>} />
                    <Route path="/teacher/view-analytics" element={<AuthGuard requireAuth><ViewAnalytics /></AuthGuard>} />
                    <Route path="/teacher/add-course" element={<AuthGuard requireAuth><AddCourse /></AuthGuard>} />
                    <Route path="/teacher/messages" element={<AuthGuard requireAuth><TeacherMessages /></AuthGuard>} />
                    
                    {/* Protected Admin routes */}
                    <Route path="/admin/manage-users" element={<AuthGuard requireAuth><ManageUsers /></AuthGuard>} />
                    <Route path="/admin/system-settings" element={<AuthGuard requireAuth><SystemSettings /></AuthGuard>} />
                    <Route path="/admin/generate-reports" element={<AuthGuard requireAuth><GenerateReports /></AuthGuard>} />
                    <Route path="/admin/platform-analytics" element={<AuthGuard requireAuth><PlatformAnalytics /></AuthGuard>} />
                    <Route path="/admin/add-user" element={<AuthGuard requireAuth><AddUser /></AuthGuard>} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </NotificationProvider>
          </AppSettingsProvider>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
