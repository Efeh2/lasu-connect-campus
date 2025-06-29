
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = () => {
  return (
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-6 lg:p-8 shadow-xl animate-fade-in">
            <div className="text-left">
              <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-4 mb-6">
                <p className="text-amber-100 text-sm sm:text-base font-medium">
                  🚀 Welcome to the future of Computer Science in LASU
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-white">
                Welcome to <span className="text-amber-400">TSI</span>
              </h1>
              <p className="text-xl sm:text-2xl text-amber-100 mb-2 sm:mb-4 leading-relaxed font-medium">
                Teacher-Student Interaction System
              </p>
              <p className="text-lg sm:text-xl text-amber-100 mb-2 sm:mb-4 leading-relaxed">
                Computer Science Department - LASU
              </p>
              <p className="text-base sm:text-lg text-gray-100 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
                Connect, collaborate, and excel together in our digital learning environment. 
                Seamless level-based interaction between educators and students in Computer Science.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl">
                  <Link to="/signup">
                    Get Started <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-white text-gray-900 dark:text-white hover:bg-white hover:text-gray-900 shadow-lg">
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
