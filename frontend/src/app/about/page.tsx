'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Leaf, Award, Coffee, Heart, Globe, ArrowRight, ShieldCheck, Microscope, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/home/FAQSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#f5f0e6] border-b border-[#ece8dc] min-h-[60vh] lg:min-h-[85vh] flex flex-col">
        {/* Right Side Background Image (Desktop) */}
        <div 
          className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-[50%] xl:w-[55%] bg-no-repeat bg-cover bg-[position:60%_center] lg:bg-[90%_center] z-0"
          style={{ backgroundImage: `url('/assets/edited-photo .png')` }}
        >
           {/* Dark gradient on mobile so the white text at the bottom is highly legible */}
           <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" style={{ zIndex: 1 }}></div>
           <div className="hidden lg:block absolute inset-y-0 left-0 w-[150px] bg-gradient-to-r from-[#f5f0e6] via-[#f5f0e6]/60 to-transparent"></div>
        </div>

        <div className="flex-1 max-w-[1400px] w-full flex flex-col justify-end pb-10 pt-20 lg:justify-center lg:py-20 mx-auto px-6 sm:px-8 xl:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] xl:w-[48%] space-y-8"
          >
            {/* Subtitle */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[#c19236]"></div>
              <span className="text-[#c19236] font-bold text-[13px] tracking-widest uppercase">
                Our Story
              </span>
              <div className="w-12 h-[2px] bg-[#c19236]"></div>
            </div>

            {/* Title */}
            <h1 className="text-[38px] md:text-[46px] lg:text-[48px] xl:text-[56px] font-bold text-white lg:text-[#0F3D2E] leading-[1.1] tracking-tight drop-shadow-md lg:drop-shadow-none" style={{ fontFamily: 'Playfair Display, serif' }}>
              Purity In Every Leaf <br className="hidden sm:block" />
              <span className="text-[#c19236] inline-block mt-2 sm:mt-0">Wellness In Every Sip</span>
            </h1>
            
            {/* Description */}
            <div className="lg:hidden bg-gradient-to-r from-[#c19236]/30 to-transparent border-l-4 border-[#c19236] p-3 rounded-r-lg shadow-sm backdrop-blur-sm">
              <p className="text-[15px] text-white font-medium leading-[1.7] drop-shadow-md" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Discover the journey behind <span className="text-[#e2b755] font-bold">R-HerbalTea</span>, where ancient botanical wisdom meets modern holistic health to bring you blends that restore balance and vitality.
              </p>
            </div>
            <p className="hidden lg:block text-[18px] text-[#4a5d53] font-medium max-w-md leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Discover the journey behind R-HerbalTea, where ancient botanical wisdom meets modern holistic health to bring you blends that restore balance and vitality.
            </p>

          </motion.div>
        </div>
      </section>

      {/* Inspired By Wellness Section */}
      <section className="py-20 relative overflow-hidden bg-[#fcfbf9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Row: Image & Header Content */}
          <div className="flex flex-col lg:flex-row items-start gap-16 mb-20">
            {/* Left Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative flex justify-center"
            >
              <img 
                src="/assets/Pasted image.png" 
                alt="Inspired By Wellness" 
                className="w-full h-auto object-cover rounded-[24px] shadow-sm max-w-[550px]" 
              />
            </motion.div>

            {/* Right Header Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2 space-y-6"
            >
              <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#cda434]">Our Journey</span>
              <h2 className="text-[36px] md:text-[44px] font-bold text-[#1a3b2b] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Inspired By Wellness
              </h2>
              
              <div className="flex items-center justify-start mb-6">
                <div className="w-12 h-[1px] bg-[#dccb96]"></div>
                <Leaf className="w-4 h-4 text-[#cda434] mx-3" fill="currentColor" />
                <div className="w-12 h-[1px] bg-[#dccb96]"></div>
              </div>

              <p className="text-[16px] md:text-[18px] text-[#1a3b2b] font-semibold leading-[1.8] mt-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                At <span className="text-[#cda434] font-bold">R-HerbalTea</span>, we believe true wellness begins with nature. Our herbal teas are carefully crafted using handpicked, 100% natural ingredients to support your body, calm your mind, and uplift your everyday life.
              </p>
              
              <p className="text-[16px] md:text-[18px] text-[#2c4a35] font-medium leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                From calming blends to immunity boosters, every cup is made with love, purity and a promise of better well-being. We work closely with sustainable farmers to ensure that what reaches your cup is nothing short of exceptional.
              </p>
              
              <div className="pt-4">
                <Link href="/shop" className="inline-flex items-center gap-2 bg-[#2c4a35] hover:bg-[#1a3b2b] text-white px-8 py-4 rounded-xl font-bold text-[14px] transition-all shadow-md hover:-translate-y-1">
                  Explore Our Teas <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom Cards Grid */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-10"
          >
            {[
              { title: 'The Seed Was Planted', desc: 'It all started with a simple belief in the power of herbs. We began our journey to bring natural wellness to all.', icon: <Leaf className="w-7 h-7" />, img: '/home/seed_planted.png' },
              { title: 'First Wellness Blend', desc: 'After months of research, sourcing and careful testing, we crafted our first signature wellness blend.', icon: <Microscope className="w-7 h-7" />, img: '/home/first_blend.png' },
              { title: 'Growing Community', desc: 'Thousands joined our journey and made our teas a part of their everyday wellness routine.', icon: <Users className="w-7 h-7" />, img: '/home/growing_community.png' },
              { title: 'Premium Collection', desc: 'Today, we offer a premium range of herbal teas crafted with love, purity and purpose.', icon: <Coffee className="w-7 h-7" />, img: '/assets/Pasted image.png' }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
                }}
                className="bg-white rounded-[20px] border border-[#ece8dc] shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-[#fcfbf9] rounded-full flex items-center justify-center text-[#4a6b3d] shrink-0 shadow-sm border border-[#ece8dc]">
                  {item.icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                  <h5 className="text-[19px] font-bold text-[#1a3b2b] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h5>
                  <p className="text-[15px] font-medium text-[#2c4a35] leading-[1.7]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{item.desc}</p>
                </div>

                {/* Image */}
                <div className="shrink-0 w-full sm:w-[200px] h-[140px] rounded-[14px] overflow-hidden shadow-sm bg-[#fcfbf9] border border-[#ece8dc] relative">
                  <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-20 bg-white border-t border-[#ece8dc]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#cda434] mb-4">Our Vision</span>
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#1c2e24] mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              A Healthier World,<br/><span className="text-[#cda434] italic font-normal">One Cup at a Time</span>
            </h2>
            
            <div className="flex items-center justify-start mb-6">
              <div className="w-12 h-[1px] bg-[#dccb96]"></div>
              <Leaf className="w-4 h-4 text-[#cda434] mx-3" fill="currentColor" />
              <div className="w-12 h-[1px] bg-[#dccb96]"></div>
            </div>

            <p className="text-[15px] md:text-[16px] text-[#556358] leading-[1.8] mb-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              At R-HerbalTea, our vision is to reconnect people with the healing power of nature. We strive to be a global leader in natural wellness by crafting the purest, most effective herbal blends. 
            </p>
            <p className="text-[15px] md:text-[16px] text-[#556358] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              We believe that true health comes from the earth, and our goal is to make these ancient, natural remedies accessible, sustainable, and enjoyable for everyone in their everyday lives.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="w-full lg:w-1/2 relative flex justify-center"
          >
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] max-w-[550px] w-full aspect-[4/3] border border-[#ece8dc]/50">
              <img 
                src="/home/our_vision.png" 
                alt="Our Vision - Natural Wellness" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* The Ingredient Story Section */}
      <section className="py-20 bg-[#fcfbf9] border-t border-[#ece8dc]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#1c2e24] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              The Ingredient Story
            </h2>
            <div className="flex items-center justify-center">
              <div className="w-24 h-[1px] bg-[#dccb96]"></div>
              <Leaf className="w-4 h-4 text-[#cda434] mx-3" fill="currentColor" />
              <div className="w-24 h-[1px] bg-[#dccb96]"></div>
            </div>
          </div>
          
          <div className="relative">
            {/* Mobile/Tablet Layout (Visible below 1024px) */}
            <div className="flex lg:hidden flex-col gap-10 relative z-10 mt-8">
              <div className="flex justify-center">
                <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7 }}
                  src="/assets/edited-photo .png" 
                  alt="Herbal Ingredients" 
                  className="w-full max-w-[280px] sm:max-w-[360px] h-auto object-contain drop-shadow-2xl" 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Hibiscus & Beetroot", desc: "Deeply detoxifies the blood, enhances natural stamina, and is rich in vital antioxidants.", icon: <Heart className="w-6 h-6" /> },
                  { title: "Pure Mulethi", desc: "Soothes sore throats, promotes digestive comfort, and helps balance hormones naturally.", icon: <Leaf className="w-6 h-6" /> },
                  { title: "Organic Moringa", desc: "Often called the Miracle Tree, it boosts natural immunity and reduces internal inflammation.", icon: <ShieldCheck className="w-6 h-6" /> },
                  { title: "3rd Party Testing", desc: "Every single batch undergoes rigorous testing for purity, potency, and maximum benefits.", icon: <Award className="w-6 h-6" /> },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-[16px] p-6 border border-[#ece8dc] shadow-sm flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#fcfbf9] flex items-center justify-center mb-4 text-[#4a6b3d] shadow-inner">
                      {item.icon}
                    </div>
                    <h4 className="text-[17px] font-bold text-[#1a3b2b] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h4>
                    <p className="text-[14px] text-[#6b7b72] leading-[1.6]">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between relative z-10 mt-10">
              
              {/* Left Column */}
              <div className="w-1/3 flex flex-col gap-12 pr-4 relative">
                <motion.div 
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative bg-white rounded-[16px] p-6 border border-[#ece8dc] shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full max-w-[260px] aspect-[4/3] mr-auto"
                >
                  <div className="w-14 h-14 rounded-full bg-[#fcfbf9] flex items-center justify-center mb-4 text-[#4a6b3d]">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="text-[17px] font-bold text-[#1a3b2b] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Hibiscus & Beetroot</h4>
                  <p className="text-[12px] text-[#6b7b72] leading-[1.6]">
                    Deeply detoxifies the blood, enhances natural stamina, and is rich in vital antioxidants.
                  </p>
                  {/* Connection Dot */}
                  <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#cda434]"></div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative bg-white rounded-[16px] p-6 border border-[#ece8dc] shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full max-w-[260px] aspect-[4/3] mr-auto"
                >
                  <div className="w-14 h-14 rounded-full bg-[#fcfbf9] flex items-center justify-center mb-4 text-[#4a6b3d]">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <h4 className="text-[17px] font-bold text-[#1a3b2b] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Pure Mulethi</h4>
                  <p className="text-[12px] text-[#6b7b72] leading-[1.6]">
                    Soothes sore throats, promotes digestive comfort, and helps balance hormones naturally.
                  </p>
                  {/* Connection Dot */}
                  <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#cda434]"></div>
                </motion.div>
              </div>

              {/* Center Image */}
              <div className="w-1/3 flex justify-center relative z-20">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative w-full max-w-[480px]"
                >
                  <img src="/assets/edited-photo .png" alt="Herbal Ingredients" className="w-full h-auto hover:scale-105 transition-transform duration-700 scale-[1.15]" />
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="w-1/3 flex flex-col gap-12 pl-4 relative">
                <motion.div 
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative bg-white rounded-[16px] p-6 border border-[#ece8dc] shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full max-w-[260px] aspect-[4/3] ml-auto"
                >
                  {/* Connection Dot */}
                  <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#cda434]"></div>
                  <div className="w-14 h-14 rounded-full bg-[#fcfbf9] flex items-center justify-center mb-4 text-[#4a6b3d]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-[17px] font-bold text-[#1a3b2b] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Organic Moringa</h4>
                  <p className="text-[12px] text-[#6b7b72] leading-[1.6]">
                    Often called the Miracle Tree, it boosts natural immunity and reduces internal inflammation.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative bg-white rounded-[16px] p-6 border border-[#ece8dc] shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full max-w-[260px] aspect-[4/3] ml-auto"
                >
                  {/* Connection Dot */}
                  <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-[#cda434]"></div>
                  <div className="w-14 h-14 rounded-full bg-[#fcfbf9] flex items-center justify-center mb-4 text-[#4a6b3d]">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="text-[17px] font-bold text-[#1a3b2b] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>3rd Party Testing</h4>
                  <p className="text-[12px] text-[#6b7b72] leading-[1.6]">
                    Every single batch undergoes rigorous testing for purity, potency, and maximum benefits.
                  </p>
                </motion.div>
              </div>
            </div>
            
            {/* Connecting SVG Lines (Desktop Only) */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ zIndex: 0 }}>
               <defs>
                 <mask id="lineMask">
                   <motion.circle cx="50" cy="50" r="0" fill="white"
                     initial={{ r: 0 }}
                     whileInView={{ r: 75 }}
                     transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                     viewport={{ once: true }}
                   />
                 </mask>
               </defs>
               <g mask="url(#lineMask)">
                 {/* Left Top Line */}
                 <path d="M 24.5 22 C 35 22, 38 45, 42.5 45" fill="none" stroke="#dccb96" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" opacity="0.8" vectorEffect="non-scaling-stroke" />
                 
                 {/* Left Bottom Line */}
                 <path d="M 24.5 78 C 35 78, 38 55, 42.5 55" fill="none" stroke="#dccb96" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" opacity="0.8" vectorEffect="non-scaling-stroke" />

                 {/* Right Top Line */}
                 <path d="M 75.5 22 C 65 22, 62 45, 57.5 45" fill="none" stroke="#dccb96" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" opacity="0.8" vectorEffect="non-scaling-stroke" />

                 {/* Right Bottom Line */}
                 <path d="M 75.5 78 C 65 78, 62 55, 57.5 55" fill="none" stroke="#dccb96" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" opacity="0.8" vectorEffect="non-scaling-stroke" />
               </g>
            </svg>
          </div>
        </div>
      </section>


      <TestimonialsSection />
      <FAQSection />

      {/* Bottom CTA Section */}
      <section className="bg-[#1c2e24] py-16 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[32px] font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Begin Your Wellness Journey</h2>
            <p className="text-[15px] text-[#a0b0a5] max-w-md">Nature has everything we need to feel our best. Let's nurture our bodies, minds and souls together.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/shop" className="bg-[#cda434] hover:bg-[#b8912e] text-white px-8 py-3.5 rounded-full font-bold text-[14px] transition-colors shadow-lg">
              Shop Collection &rarr;
            </Link>
            <Link href="/contact" className="border border-[#4a5c51] hover:bg-[#2c4a35] text-white px-8 py-3.5 rounded-full font-bold text-[14px] transition-colors">
              Learn More
            </Link>
          </div>
        </div>
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </section>

    </main>
  );
}

