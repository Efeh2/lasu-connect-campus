
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, GraduationCap, UserCheck, Shield } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Welcome to <span className="text-yellow-400">TSI</span>
              </h1>
              <p className="text-xl text-purple-100 mb-4 leading-relaxed">
                Teacher-Student Interaction Platform for Computer Science Department
              </p>
              <p className="text-lg text-purple-200 mb-8 leading-relaxed">
                Connect, collaborate, and excel together in our digital learning environment. 
                Seamless interaction between educators and students in Computer Science at LASU.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup" 
                  className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  Get Started <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/about" 
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:text-right">
              <img 
                src="/lovable-uploads/89ed842b-12dd-45c5-a7f2-aa37450a0c4f.png" 
                alt="Teacher Student Interaction" 
                className="w-full h-auto max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empowering Computer Science Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TSI connects Computer Science students and faculty in one comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage in programming discussions, access course materials, and participate in virtual coding sessions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Level-Based Communication</h3>
              <p className="text-gray-600">
                Connect with professors and peers based on your academic level in Computer Science.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Award className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your CS academic journey, view grades, and get personalized feedback from faculty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join the CS Community
            </h2>
            <p className="text-xl text-gray-600">
              Choose your role and start your TSI journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-purple-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-100 transition-colors">
                <GraduationCap className="text-purple-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Students</h3>
              <p className="text-gray-600 mb-6">
                Access CS courses, submit programming assignments, and connect with instructors based on your level.
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Join as Student
              </Link>
            </div>

            <div className="text-center group">
              <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors">
                <UserCheck className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Teachers</h3>
              <p className="text-gray-600 mb-6">
                Create CS courses, manage student levels, grade programming assignments, and mentor students.
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Join as Teacher
              </Link>
            </div>

            <div className="text-center group">
              <div className="bg-purple-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-100 transition-colors">
                <Shield className="text-purple-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin</h3>
              <p className="text-gray-600 mb-6">
                Oversee CS department operations, manage users by levels, and ensure smooth platform functioning.
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your CS Learning Experience?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join Computer Science students and faculty already using TSI to enhance their educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Create Account
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
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
