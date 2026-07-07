'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, User as UserIcon, Leaf, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[95vh] overflow-hidden flex flex-col justify-between">
      {/* ── BACKGROUND MEDIA LAYER ── */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[#0F3D2E]">
        {/* Video autoplays in loop directly */}
        <video
          ref={videoRef}
          src="/assets/remove_first_frame_image_and_r.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Responsive gradient overlay: bottom-up on mobile for better text legibility */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 md:from-black/50 md:via-black/10 to-transparent" style={{ zIndex: 3 }} />
      </div>

      {/* ── CONTENT LAYER (z-10) — hero text ── */}
      <div className="relative flex-1 flex flex-col justify-end w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-10 pb-8 md:pb-20" style={{ zIndex: 10 }}>
        {/* Hero Body */}
        <div className="flex flex-col justify-end items-start w-full px-2 lg:px-8 relative">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
            className="flex flex-col items-start max-w-[600px]"
          >
            <motion.h1
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[34px] sm:text-[60px] lg:text-[76px] font-bold leading-[1.05] text-white mb-4 tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Sip Calm<br />
              Feel Balanced<br />
              <span className="text-[#c9a55a]">Glow Naturally</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[14px] sm:text-[15px] lg:text-[17px] text-white/90 max-w-[500px] leading-[1.6] mb-6 font-medium"
              style={{ fontFamily: 'Nunito Sans, sans-serif' }}
            >
              100% Natural Herbal Teas<br className="md:hidden" /> for Mind, Body & Soul.
            </motion.p>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-2 md:mb-8"
            >
              <Link href="/shop" className="bg-[#c9a55a] hover:bg-[#b5934a] text-[#0F3D2E] px-7 md:px-8 py-3.5 rounded-[8px] text-[14px] md:text-[15px] font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Explore Teas <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 lg:gap-8 text-[#EFE8D6] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-bold tracking-wide pb-2 md:pb-0"
              style={{ fontFamily: 'Nunito Sans, sans-serif' }}
            >
              <div className="flex shrink-0 items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#EFE8D6]/40 flex items-center justify-center"><Clock className="w-3 h-3 md:w-4 md:h-4" /></div>
                <span className="leading-tight">Caffeine<br />Free</span>
              </div>
              <div className="flex shrink-0 items-center gap-2 md:gap-3 md:border-l border-[#EFE8D6]/20 md:pl-6 lg:pl-8">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#EFE8D6]/40 flex items-center justify-center"><UserIcon className="w-3 h-3 md:w-4 md:h-4" /></div>
                <span className="leading-tight">Natural<br />Sugar</span>
              </div>
              <div className="flex shrink-0 items-center gap-2 md:gap-3 md:border-l border-[#EFE8D6]/20 md:pl-6 lg:pl-8">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#EFE8D6]/40 flex items-center justify-center"><Leaf className="w-3 h-3 md:w-4 md:h-4" /></div>
                <span className="leading-tight">Natural<br />Ingredients</span>
              </div>
              <div className="flex shrink-0 items-center gap-2 md:gap-3 md:border-l border-[#EFE8D6]/20 md:pl-6 lg:pl-8">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#EFE8D6]/40 flex items-center justify-center"><ShoppingBag className="w-3 h-3 md:w-4 md:h-4" /></div>
                <span className="leading-tight">20<br />Teabags</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
