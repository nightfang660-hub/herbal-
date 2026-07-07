'use client';

import React from 'react';
import { Heart, ShieldCheck, Sparkles, ClipboardCheck, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IngredientStorySection() {
  const features = [
    {
      title: "Hibiscus",
      desc: "Rich in vital antioxidants, it\nsupports heart health and\npromotes a radiant skin glow.",
      image: "/home/hibiscus.png"
    },
    {
      title: "Beetroot",
      desc: "Deeply detoxifies the blood,\nenhances natural stamina,\nand improves overall vitality.",
      image: "/assets/Beetroot.png"
    },
    {
      title: "Organic Moringa",
      desc: "Often called the Miracle Tree,\nit boosts natural immunity and\nreduces internal inflammation.",
      image: "/assets/Organic%20Moringa.png"
    },
    {
      title: "Pure Mulethi",
      desc: "Soothes sore throats, promotes\ndigestive comfort, and helps\nbalance hormones naturally.",
      image: "/assets/Pure%20Mulethi.png"
    }
  ];

  const renderCard = (f: any, index: number) => {
    return (
      <motion.div 
        key={index} 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        viewport={{ once: false }}
        className="group relative bg-[#fdfbf6] rounded-[24px] shadow-sm overflow-hidden h-[360px] w-full max-w-[320px] mx-auto cursor-pointer hover:shadow-xl transition-shadow duration-300"
      >
        {/* Ingredient Image (Fills Entire Card) */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2">
          <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
        </div>

        {/* Hover Overlay - White Frosted Glass */}
        <div className="absolute inset-0 bg-[#fdfbf6]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]"></div>

        {/* Default Title Container (Visible by default, Hidden on hover) */}
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-0">
          <h3 className="text-[22px] font-bold text-white text-center drop-shadow-md" style={{ fontFamily: 'Playfair Display, serif' }}>
            {f.title}
          </h3>
        </div>

        {/* Content Container (Hidden by default, Shows on hover) */}
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
          
          {/* Hover Title */}
          <h3 className="text-[24px] font-bold text-[#1a3b2b] mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            {f.title}
          </h3>

          {/* Leaf Divider */}
          <div className="flex items-center justify-center w-[100px] mx-auto mb-4">
            <div className="h-[1.5px] w-full bg-[#dccb96]"></div>
            <Leaf className="w-[14px] h-[14px] text-[#a88a38] mx-1.5 shrink-0 -rotate-[60deg]" fill="currentColor" />
            <div className="h-[1.5px] w-full bg-[#dccb96]"></div>
          </div>
          
          {/* Description */}
          <div className="flex items-center justify-center w-full px-2">
            <p className="text-[15px] text-[#556358] leading-[1.7] text-center whitespace-pre-line" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              {f.desc}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="bg-white py-8 relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 xl:px-8">
        
        <div className="flex flex-col w-full">
            
          {/* Header */}
          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14 flex flex-col items-center text-center"
          >
            <div className="inline-flex flex-col items-center">
              <h2 className="text-[28px] md:text-[36px] font-bold text-[#0F3D2E] capitalize mb-3 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                The Ingredient Story
              </h2>
              <div className="flex items-center justify-center w-[250px] mb-6">
                <div className="h-[1.5px] w-full bg-[#dccb96]"></div>
                <Leaf className="w-[14px] h-[14px] text-[#a88a38] mx-1.5 shrink-0 -rotate-[60deg]" fill="currentColor" />
                <div className="h-[1.5px] w-full bg-[#dccb96]"></div>
              </div>
            </div>
          </motion.div>

          {/* 4-Column Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
            {features.map((f, i) => renderCard(f, i))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
