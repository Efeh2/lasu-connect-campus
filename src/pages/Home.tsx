import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, GraduationCap, UserCheck, Shield } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section with Background Cover */}
      <section 
        className="relative text-white min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/lovable-uploads/89ed842b-12dd-45c5-a7f2-aa37450a0c4f.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in text-white">
                Welcome to <span className="text-amber-400">TSI</span>
              </h1>
              <p className="text-xl sm:text-2xl text-amber-100 mb-2 sm:mb-4 leading-relaxed font-medium animate-fade-in">
                Teacher-Student Interaction System
              </p>
              <p className="text-lg sm:text-xl text-amber-100 mb-2 sm:mb-4 leading-relaxed animate-fade-in">
                Computer Science Department - LASU
              </p>
              <p className="text-base sm:text-lg text-gray-100 mb-6 sm:mb-8 leading-relaxed max-w-lg animate-fade-in">
                Connect, collaborate, and excel together in our digital learning environment. 
                Seamless level-based interaction between educators and students in Computer Science.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Link 
                  to="/signup" 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg hover-scale"
                >
                  Get Started <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                </Link>
                <Link 
                  to="/about" 
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all shadow-lg hover-scale"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end animate-fade-in">
              <div className="w-full max-w-sm lg:max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-2xl hover-scale">
                <div className="text-center">
                  <img 
                    src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
                    alt="LASU Logo" 
                    className="h-24 w-24 sm:h-32 sm:w-32 mx-auto mb-4"
                  />
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">LASU CSC Department</h3>
                  <p className="text-amber-100 text-sm sm:text-base">Excellence in Computer Science Education</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Empowering CSC Education
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              TSI connects Computer Science students and faculty through level-based interaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover-scale animate-fade-in">
              <div className="bg-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <BookOpen className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Level-Based Learning</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                Engage in programming discussions and access course materials tailored to your academic level.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover-scale animate-fade-in">
              <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Smart Communication</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                Connect with professors and peers based on your specific level in Computer Science.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover-scale animate-fade-in">
              <div className="bg-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Award className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Progress Tracking</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                Monitor your CSC academic journey with personalized feedback from faculty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
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
            <div className="text-center group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-50 dark:to-blue-100 p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in">
              <div className="bg-blue-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="text-white" size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:!text-black mb-3 sm:mb-4">Students</h3>
              <p className="text-gray-600 dark:!text-black mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Access CSC courses, submit programming assignments, and connect with instructors based on your level.
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                Join as Student
              </Link>
            </div>

            <div className="text-center group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-50 dark:to-green-100 p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in">
              <div className="bg-green-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="text-white" size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:!text-black mb-3 sm:mb-4">Teachers</h3>
              <p className="text-gray-600 dark:!text-black mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Create CSC courses, manage student levels, grade programming assignments, and mentor students.
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                Join as Teacher
              </Link>
            </div>

            <div className="text-center group bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-50 dark:to-amber-100 p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in">
              <div className="bg-amber-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:!text-black mb-3 sm:mb-4">Admin</h3>
              <p className="text-gray-600 dark:!text-black mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Oversee CSC department operations, manage users by levels, and ensure smooth platform functioning.
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-white py-12 sm:py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Transform Your CSC Experience?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join Computer Science students and faculty already using TSI to enhance their educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover-scale"
            >
              Create Account
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all shadow-lg hover-scale"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
