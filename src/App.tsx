
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import { UserProvider } from "./contexts/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthGuard from "./components/AuthGuard";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <ThemeProvider>
        <AppSettingsProvider>
          <NotificationProvider>
            <UserProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />
                    <Route path="/signup" element={<AuthGuard><Signup /></AuthGuard>} />
                    <Route path="/admin-dashboard" element={<AuthGuard><AdminDashboard /></AuthGuard>} />
                    <Route path="/teacher-dashboard" element={<AuthGuard><TeacherDashboard /></AuthGuard>} />
                    <Route path="/student-dashboard" element={<AuthGuard><StudentDashboard /></AuthGuard>} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </UserProvider>
          </NotificationProvider>
        </AppSettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
