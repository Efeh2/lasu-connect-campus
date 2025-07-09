import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Calendar, FileText, GraduationCap, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { profile, signOut } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const teacherFeatures = [
    {
      title: "My Courses",
      description: "Manage your courses and content",
      icon: BookOpen,
      action: () => toast({ title: "My Courses", description: "Feature coming soon!" })
    },
    {
      title: "Students",
      description: "View and manage your students",
      icon: Users,
      action: () => toast({ title: "Students", description: "Feature coming soon!" })
    },
    {
      title: "Schedule",
      description: "Manage your class schedule",
      icon: Calendar,
      action: () => toast({ title: "Schedule", description: "Feature coming soon!" })
    },
    {
      title: "Assignments",
      description: "Create and grade assignments",
      icon: FileText,
      action: () => toast({ title: "Assignments", description: "Feature coming soon!" })
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {profile?.first_name} {profile?.last_name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded-lg">
              <GraduationCap className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Teacher</span>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">My Courses</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assignments</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Classes Today</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teacherFeatures.map((feature, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={feature.action}>
                  Access
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Schedule */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">9:00 AM</span>
                  <span className="text-xs text-muted-foreground">1 hr</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Mathematics 101</p>
                  <p className="text-xs text-muted-foreground">Room A-205 • 25 students</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">11:00 AM</span>
                  <span className="text-xs text-muted-foreground">1.5 hr</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Physics Advanced</p>
                  <p className="text-xs text-muted-foreground">Lab B-301 • 18 students</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">2:00 PM</span>
                  <span className="text-xs text-muted-foreground">1 hr</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Chemistry Basics</p>
                  <p className="text-xs text-muted-foreground">Room C-102 • 30 students</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Assignment submitted</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson submitted Math Assignment #3</p>
                </div>
                <span className="text-xs text-muted-foreground">5 minutes ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New student enrolled</p>
                  <p className="text-xs text-muted-foreground">Michael Brown joined Physics Advanced</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Grade deadline approaching</p>
                  <p className="text-xs text-muted-foreground">Chemistry Basics midterm grades due tomorrow</p>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;