import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, FileText, Trophy, User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
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

  const studentFeatures = [
    {
      title: "My Courses",
      description: "Access your enrolled courses",
      icon: BookOpen,
      action: () => toast({ title: "My Courses", description: "Feature coming soon!" })
    },
    {
      title: "Schedule",
      description: "View your class schedule",
      icon: Calendar,
      action: () => toast({ title: "Schedule", description: "Feature coming soon!" })
    },
    {
      title: "Assignments",
      description: "View and submit assignments",
      icon: FileText,
      action: () => toast({ title: "Assignments", description: "Feature coming soon!" })
    },
    {
      title: "Grades",
      description: "Check your grades and progress",
      icon: Trophy,
      action: () => toast({ title: "Grades", description: "Feature coming soon!" })
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {profile?.first_name} {profile?.last_name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg">
              <User className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                {profile?.level ? `${profile.level} Student` : 'Student'}
              </span>
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
                  <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
                  <p className="text-2xl font-bold">6</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Assignments</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall GPA</p>
                  <p className="text-2xl font-bold">3.8</p>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Classes Today</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentFeatures.map((feature, index) => (
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
            <CardTitle>Today's Classes</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
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
                  <p className="text-xs text-muted-foreground">Room A-205 • Prof. Johnson</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">11:00 AM</span>
                  <span className="text-xs text-muted-foreground">1.5 hr</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Physics Advanced</p>
                  <p className="text-xs text-muted-foreground">Lab B-301 • Prof. Smith</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">2:00 PM</span>
                  <span className="text-xs text-muted-foreground">1 hr</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Chemistry Basics</p>
                  <p className="text-xs text-muted-foreground">Room C-102 • Prof. Davis</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">4:00 PM</span>
                  <span className="text-xs text-muted-foreground">1 hr</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">English Literature</p>
                  <p className="text-xs text-muted-foreground">Room D-150 • Prof. Wilson</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest academic updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Assignment graded</p>
                  <p className="text-xs text-muted-foreground">Math Assignment #3 - Grade: A-</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New assignment posted</p>
                  <p className="text-xs text-muted-foreground">Physics Lab Report #2 - Due: Tomorrow</p>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Course material updated</p>
                  <p className="text-xs text-muted-foreground">Chemistry - New lecture notes available</p>
                </div>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;