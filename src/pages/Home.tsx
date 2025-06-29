
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import UserTypesSection from '../components/home/UserTypesSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <UserTypesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
