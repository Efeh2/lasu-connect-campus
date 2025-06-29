
import React from 'react';
import { BookOpen, Users, Award } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card';

const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Empowering CSC
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            TSI connects Computer Science students and faculty through level-based interaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="transform hover:-translate-y-2 animate-fade-in transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="bg-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <BookOpen className="text-blue-600" size={32} />
              </div>
              <CardTitle className="text-center">Level-Based Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center leading-relaxed text-sm sm:text-base">
                Engage in programming discussions and access course materials tailored to your academic level.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="transform hover:-translate-y-2 animate-fade-in transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Users className="text-green-600" size={32} />
              </div>
              <CardTitle className="text-center">Smart Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center leading-relaxed text-sm sm:text-base">
                Connect with professors and peers based on your specific level in Computer Science.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="transform hover:-translate-y-2 animate-fade-in transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="bg-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Award className="text-blue-600" size={32} />
              </div>
              <CardTitle className="text-center">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center leading-relaxed text-sm sm:text-base">
                Monitor your CSC academic journey with personalized feedback from faculty.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
