
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-white py-12 sm:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Ready to Transform Your CSC Experience?
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Join Computer Science students and faculty already using TSI to enhance their educational journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg">
            <Link to="/signup">
              Create Account
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-2 border-white text-black dark:text-white hover:bg-white hover:text-blue-900 shadow-lg">
            <Link to="/login">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
