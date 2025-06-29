
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, UserCheck, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card';

const UserTypesSection = () => {
  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Join the CSC Community
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Choose your role and start your TSI journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="text-center group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-50 dark:to-blue-100 animate-fade-in hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="bg-blue-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="text-white" size={32} />
              </div>
              <CardTitle className="text-gray-900 dark:!text-black">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:!text-black mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Access CSC courses, submit programming assignments, and connect with instructors based on your level.
              </CardDescription>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/signup">
                  Join as Student
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-50 dark:to-green-100 animate-fade-in hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="bg-green-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="text-white" size={32} />
              </div>
              <CardTitle className="text-gray-900 dark:!text-black">Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:!text-black mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Create CSC courses, manage student levels, grade programming assignments, and mentor students.
              </CardDescription>
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link to="/signup">
                  Join as Teacher
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center group bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-50 dark:to-amber-100 animate-fade-in hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="bg-amber-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={32} />
              </div>
              <CardTitle className="text-gray-900 dark:!text-black">Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:!text-black mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Oversee CSC department operations, manage users by levels, and ensure smooth platform functioning.
              </CardDescription>
              <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
                <Link to="/signup">
                  Admin Access
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserTypesSection;
