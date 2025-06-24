
import React from 'react';
import { Users, Target, Eye, Award, BookOpen, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About LASU Connect</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Bridging the gap between traditional education and modern technology to create 
              an inclusive, interactive learning environment for the Lagos State University community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <Target className="text-blue-600 mr-4" size={32} />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To revolutionize the educational experience at Lagos State University by providing 
                a comprehensive digital platform that facilitates seamless communication, 
                collaboration, and learning between students, teachers, and administrators.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <Eye className="text-green-600 mr-4" size={32} />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the leading educational technology platform in Nigeria, 
                empowering universities across the nation to deliver world-class education 
                through innovative digital solutions and fostering academic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes LASU Connect Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed with the unique needs of the African educational landscape in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <BookOpen className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage with multimedia content, participate in live discussions, and access resources anytime, anywhere.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="text-green-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Building</h3>
              <p className="text-gray-600">
                Foster connections between students and faculty through forums, groups, and collaborative projects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Zap className="text-purple-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">
                Stay informed with instant notifications about assignments, announcements, and important updates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Award className="text-yellow-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor academic performance with detailed analytics and personalized feedback systems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Target className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Goal Management</h3>
              <p className="text-gray-600">
                Set and track learning objectives with integrated planning tools and milestone tracking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-role Support</h3>
              <p className="text-gray-600">
                Tailored experiences for students, teachers, and administrators with role-specific features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About LASU */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lagos State University
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 1983, Lagos State University (LASU) has been at the forefront of 
                quality education in Nigeria. With a commitment to academic excellence, 
                research, and community service, LASU continues to shape the future leaders of tomorrow.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                LASU Connect represents our commitment to embracing technology in education, 
                ensuring that our students and faculty have access to modern tools that enhance 
                the learning experience and prepare them for the digital age.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">40+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                  <div className="text-gray-600">Students</div>
                </div>
              </div>
            </div>
            <div className="lg:text-right">
              <img 
                src="/lovable-uploads/246bd794-2724-4037-8e0a-fe4845c23298.png" 
                alt="LASU Logo" 
                className="h-80 w-80 mx-auto lg:mx-0 lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the LASU Connect Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of the educational revolution. Connect with your peers, 
            engage with faculty, and excel in your academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
            >
              Get Started Today
            </a>
            <a 
              href="/login" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
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
