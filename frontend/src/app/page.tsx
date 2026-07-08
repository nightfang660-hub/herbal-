'use client';
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CraftedWithNatureSection from '../components/home/CraftedWithNatureSection';
import AboutUsSection from '../components/home/AboutUsSection';

import IngredientStorySection from '../components/home/IngredientStorySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';


export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroSection />
      <CraftedWithNatureSection />
      <AboutUsSection />


      <IngredientStorySection />
      
      <TestimonialsSection />
      <FAQSection />


    </div>
  );
}
