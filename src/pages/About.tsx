
import React from 'react';
import { Users, Target, Eye, Award, BookOpen, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative text-white py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.9), rgba(88, 28, 135, 0.95)), url('/lovable-uploads/89ed842b-12dd-45c5-a7f2-aa37450a0c4f.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About TSI</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Bridging the gap between traditional education and modern technology to create 
              an inclusive, level-based learning environment for the Computer Science community at LASU.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-10 rounded-2xl shadow-xl">
              <div className="flex items-center mb-6">
                <div className="bg-purple-600 p-3 rounded-lg mr-4">
                  <Target className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To revolutionize Computer Science education at LASU by providing 
                a comprehensive digital platform that facilitates level-based communication, 
                collaboration, and learning between students, teachers, and administrators.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-10 rounded-2xl shadow-xl">
              <div className="flex items-center mb-6">
                <div className="bg-green-600 p-3 rounded-lg mr-4">
                  <Eye className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the leading educational technology platform for Computer Science departments, 
                empowering universities across Nigeria to deliver world-class CS education 
                through innovative level-based digital solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes TSI Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed specifically for Computer Science education with level-based interactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-purple-600 p-3 rounded-lg w-fit mb-4">
                <BookOpen className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Level-Based Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Engage with content and peers appropriate to your academic level in Computer Science.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-green-600 p-3 rounded-lg w-fit mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Networking</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with students and faculty at your level for meaningful academic interactions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-purple-600 p-3 rounded-lg w-fit mb-4">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600 leading-relaxed">
                Stay informed with instant notifications about assignments and announcements.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-yellow-600 p-3 rounded-lg w-fit mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor academic performance with detailed analytics and personalized feedback.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-red-600 p-3 rounded-lg w-fit mb-4">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Goal Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Set and track learning objectives with integrated planning tools and milestones.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-indigo-600 p-3 rounded-lg w-fit mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-role Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored experiences for students, teachers, and administrators with level-specific features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About LASU CS */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Computer Science at LASU
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The Computer Science Department at Lagos State University has been at the forefront of 
                technological education since its establishment. We are committed to producing 
                world-class computer scientists and software engineers.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                TSI represents our commitment to embracing modern educational technology, 
                ensuring that our students and faculty have access to level-appropriate tools 
                that enhance the learning experience for the digital age.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                  <div className="text-gray-600">CS Students</div>
                </div>
                <div className="text-center bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-600">Faculty Members</div>
                </div>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <img 
                  src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
                  alt="LASU Logo" 
                  className="h-80 w-80 mx-auto lg:mx-0 lg:ml-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the TSI Community
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Be part of the Computer Science educational revolution. Connect with your peers, 
            engage with faculty, and excel in your academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-block"
            >
              Get Started Today
            </a>
            <a 
              href="/login" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg inline-block"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
