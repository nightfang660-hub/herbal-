'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, User as UserIcon, Leaf, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full min-h-[95vh] overflow-hidden flex flex-col justify-between">
      {/* ── BACKGROUND MEDIA LAYER ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Video autoplays in loop directly */}
        <video
          ref={videoRef}
          src="/assets/remove_first_frame_image_and_r.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" style={{ zIndex: 3 }} />
      </div>

      {/* ── CONTENT LAYER (z-10) — hero text ── */}
      <div className="relative flex flex-col h-full w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12" style={{ zIndex: 10 }}>
        {/* Hero Body */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full mt-8 md:mt-20 px-2 lg:px-8 relative">
           {/* Left Text */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
             className="flex flex-col items-start max-w-[600px]"
           >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[48px] sm:text-[60px] lg:text-[76px] font-bold leading-[1.05] text-[#EFE8D6] mb-6 tracking-tight" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                 Sip Calm.<br/>
                 Feel Balanced.<br/>
                 <span className="text-[#cda434] italic font-medium pr-2">Glow Naturally</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[15px] lg:text-[17px] text-[#EFE8D6]/90 max-w-[500px] leading-[1.7] mb-10" 
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                 Ruby Calm Tea is a caffeine-free herbal blend crafted with Hibiscus, Moringa & Goji Berries to help you unwind, restore balance, and nourish your natural glow.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                 <Link href="/shop" className="bg-[#cda434] hover:bg-[#b8912e] text-white px-7 md:px-8 py-3.5 rounded-full text-[14px] md:text-[15px] font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    Shop Ruby Calm Tea <ArrowRight className="w-4 h-4" />
                 </Link>
                 <Link href="/#benefits" className="border-2 border-[#EFE8D6] text-[#EFE8D6] hover:bg-[#EFE8D6]/10 px-7 md:px-8 py-3.5 rounded-full text-[14px] md:text-[15px] font-bold flex items-center gap-2 transition-colors backdrop-blur-sm" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    Explore Benefits <ArrowRight className="w-4 h-4" />
                 </Link>
              </motion.div>

              {/* Feature badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap items-center gap-6 lg:gap-8 text-[#EFE8D6] text-[12px] lg:text-[13px] font-bold tracking-wide" 
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                 <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full border border-[#EFE8D6]/40 flex items-center justify-center"><Clock className="w-4 h-4" /></div>
                     <span className="leading-tight">Caffeine<br/>Free</span>
                 </div>
                 <div className="hidden sm:flex items-center gap-3 border-l border-[#EFE8D6]/20 pl-6 lg:pl-8">
                     <div className="w-8 h-8 rounded-full border border-[#EFE8D6]/40 flex items-center justify-center"><UserIcon className="w-4 h-4" /></div>
                     <span className="leading-tight">No<br/>Sugar</span>
                 </div>
                 <div className="flex items-center gap-3 sm:border-l border-[#EFE8D6]/20 sm:pl-6 lg:pl-8">
                     <div className="w-8 h-8 rounded-full border border-[#EFE8D6]/40 flex items-center justify-center"><Leaf className="w-4 h-4" /></div>
                     <span className="leading-tight">Natural<br/>Ingredients</span>
                 </div>
                 <div className="hidden md:flex items-center gap-3 border-l border-[#EFE8D6]/20 pl-6 lg:pl-8">
                     <div className="w-8 h-8 rounded-full border border-[#EFE8D6]/40 flex items-center justify-center"><ShoppingBag className="w-4 h-4" /></div>
                     <span className="leading-tight">30<br/>Teabags</span>
                 </div>
              </motion.div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
