'use client';

import React from 'react';
import { Heart, ShieldCheck, Sparkles, ClipboardCheck, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IngredientStorySection() {
  const features = [
    {
      title: "Hibiscus & Beetroot",
      desc: "Deeply detoxifies the blood,\nenhances natural stamina,\nand is rich in vital antioxidants.",
      icon: <Heart className="w-8 h-8 text-[#3b5235]" strokeWidth={2} />
    },
    {
      title: "Organic Moringa",
      desc: "Often called the Miracle Tree,\nit boosts natural immunity and\nreduces internal inflammation.",
      icon: <ShieldCheck className="w-8 h-8 text-[#3b5235]" strokeWidth={2} />
    },
    {
      title: "Pure Mulethi",
      desc: "Soothes sore throats, promotes\ndigestive comfort, and helps\nbalance hormones naturally.",
      icon: <Sparkles className="w-8 h-8 text-[#3b5235]" strokeWidth={2} />
    },
    {
      title: "3rd Party Testing",
      desc: "Every single batch undergoes\nrigorous testing for purity,\npotency, and maximum benefits.",
      icon: <ClipboardCheck className="w-8 h-8 text-[#3b5235]" strokeWidth={2} />
    }
  ];

  const renderCard = (f: any, index: number) => {
    return (
      <motion.div 
        key={index} 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        viewport={{ once: true }}
        className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 flex flex-col items-center text-center relative z-10 w-full max-w-[320px] mx-auto border border-[#f0ebe1]/60 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.10)] transition-all duration-300 h-full"
      >
        
        {/* Badge & Icon Container */}
        <div className="relative w-full flex justify-center mb-6 pt-2">
          {/* Number Badge (Absolute Top Left) */}
          <div className="absolute top-0 left-0 w-[34px] h-[34px] rounded-full border-[1.5px] border-[#dccb96] text-[#a88a38] bg-[#fdfbf6] flex items-center justify-center font-bold text-[14px]">
            0{index + 1}
          </div>
          
          {/* Center Icon */}
          <div className="w-[72px] h-[72px] rounded-full bg-[#f4f7f0] border border-[#a6bca2]/40 flex items-center justify-center relative">
            <div className="absolute -top-[6px] -right-[8px] text-[#5b7a3a] opacity-80 pointer-events-none">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"/></svg>
            </div>
            {f.icon}
          </div>
        </div>
        
        {/* Text */}
        <div className="text-center flex-1 flex flex-col">
          <h3 className="text-[18px] font-bold text-[#1a3b2b] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {f.title}
          </h3>
          
          {/* Leaf Divider inside Card */}
          <div className="flex items-center justify-center w-[100px] mx-auto mb-4">
            <div className="h-[1.5px] w-full bg-[#dccb96]"></div>
            <Leaf className="w-[14px] h-[14px] text-[#a88a38] mx-1.5 shrink-0 -rotate-[60deg]" fill="currentColor" />
            <div className="h-[1.5px] w-full bg-[#dccb96]"></div>
          </div>
          
          <p className="text-[14px] text-[#556358] leading-[1.6] mt-auto whitespace-pre-line" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            {f.desc}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="bg-white py-12 relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 xl:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          
          {/* Left Column: Header + 2x2 Grid */}
          <div className="w-full lg:w-1/2 flex flex-col">
            
            {/* Header (Left-aligned container, title & line centered together) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-14 flex flex-col items-start"
            >
              <div className="inline-flex flex-col items-start">
                <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize mb-3 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  The Ingredient Story
                </h2>
                <div className="flex items-center justify-center w-[250px] mb-6">
                  <div className="h-[1.5px] w-full bg-[#dccb96]"></div>
                  <Leaf className="w-[14px] h-[14px] text-[#a88a38] mx-1.5 shrink-0 -rotate-[60deg]" fill="currentColor" />
                  <div className="h-[1.5px] w-full bg-[#dccb96]"></div>
                </div>
              </div>
            </motion.div>

            {/* 2x2 Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              {features.map((f, i) => renderCard(f, i))}
            </div>
          </div>

          {/* Right Column: Just the Product Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex justify-center items-center relative py-10 lg:py-0"
          >
            <img 
              src="/assets/edited-photo .png" 
              alt="Herbal Ingredients" 
              className="w-full max-w-[550px] xl:max-w-[650px] h-auto object-contain hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
