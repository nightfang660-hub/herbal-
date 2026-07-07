'use client';
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CraftedWithNatureSection from '../components/home/CraftedWithNatureSection';
import HowItWorksSection from '../components/home/HowItWorksSection';

import IngredientStorySection from '../components/home/IngredientStorySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AboutUsSection from '../components/home/AboutUsSection';
import FAQSection from '../components/home/FAQSection';


export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroSection />
      <CraftedWithNatureSection />
      <HowItWorksSection />


      <IngredientStorySection />
      
      <TestimonialsSection />
      <FAQSection />
      <AboutUsSection />

    </div>
  );
}
