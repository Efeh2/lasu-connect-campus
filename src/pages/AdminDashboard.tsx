import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Settings, BarChart3, Shield, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
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

  const adminFeatures = [
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: Users,
      action: () => toast({ title: "User Management", description: "Feature coming soon!" })
    },
    {
      title: "Course Management",
      description: "Create and manage courses",
      icon: BookOpen,
      action: () => toast({ title: "Course Management", description: "Feature coming soon!" })
    },
    {
      title: "Analytics",
      description: "View platform analytics and reports",
      icon: BarChart3,
      action: () => toast({ title: "Analytics", description: "Feature coming soon!" })
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      action: () => toast({ title: "System Settings", description: "Feature coming soon!" })
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {profile?.first_name} {profile?.last_name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Admin</span>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                  <p className="text-2xl font-bold">56</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Teachers</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Students</p>
                  <p className="text-2xl font-bold">1,145</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminFeatures.map((feature, index) => (
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

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registration</p>
                  <p className="text-xs text-muted-foreground">John Doe joined as a student</p>
                </div>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Course updated</p>
                  <p className="text-xs text-muted-foreground">Mathematics 101 content updated</p>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System maintenance</p>
                  <p className="text-xs text-muted-foreground">Scheduled maintenance completed</p>
                </div>
                <span className="text-xs text-muted-foreground">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;