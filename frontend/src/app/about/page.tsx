'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Leaf, Award, Coffee, Heart, Globe, ArrowRight, ShieldCheck, Microscope, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { motion, useInView, animate } from 'framer-motion';

function AnimatedNumber({ value }: { value: string }) {
  const numericValue = parseInt(value, 10);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20px" });

  useEffect(() => {
    if (inView && ref.current && !isNaN(numericValue)) {
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Math.floor(v).toString();
          }
        }
      });
      return () => controls.stop();
    } else if (!inView && ref.current) {
      ref.current.textContent = "0";
    }
  }, [inView, numericValue]);

  if (isNaN(numericValue)) return <span>{value}</span>;
  return <span ref={ref}>0</span>;
}
import TestimonialsSection from '../../components/home/TestimonialsSection';
import FAQSection from '../../components/home/FAQSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F5EE]">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white border-b border-white min-h-[50vh] lg:min-h-[70vh] flex flex-col">
        {/* Right Side Background Image (Desktop) */}
        <div 
          className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-[50%] xl:w-[55%] bg-no-repeat bg-cover lg:bg-[length:auto_85%] bg-[position:60%_center] lg:bg-[90%_center] z-0"
          style={{ backgroundImage: `url('/assets/edited-photo .png')` }}
        >
           {/* Dark gradient on mobile so the white text at the bottom is highly legible */}
           <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" style={{ zIndex: 1 }}></div>
           <div className="hidden lg:block absolute inset-y-0 -left-[2px] w-[200px] bg-gradient-to-r from-white via-white/70 to-white/0" style={{ zIndex: 1 }}></div>
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
              <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] font-bold text-[13px] tracking-widest uppercase">
                Our Story
              </span>
              <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
            </div>

            {/* Title */}
            <h1 className="text-[38px] md:text-[46px] lg:text-[48px] xl:text-[56px] font-bold text-white lg:text-[#0F3D2E] leading-[1.1] tracking-tight drop-shadow-md lg:drop-shadow-none" style={{ fontFamily: 'Playfair Display, serif' }}>
              Purity In Every Leaf <br className="hidden sm:block" />
              <span className="text-[#D4AF37] inline-block mt-2 sm:mt-0">Wellness In Every Sip</span>
            </h1>
            
            {/* Description */}
            <div className="lg:hidden bg-gradient-to-r from-[#D4AF37]/30 to-transparent border-l-4 border-[#D4AF37] p-3 rounded-r-lg shadow-sm backdrop-blur-sm">
              <p className="text-[15px] text-white font-medium leading-[1.7] drop-shadow-md" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Discover the journey behind <span className="text-[#D4AF37] font-bold">R-HerbalTea</span>, where ancient botanical wisdom meets modern holistic health to bring you blends that restore balance and vitality.
              </p>
            </div>
            <p className="hidden lg:block text-[18px] text-[#4a5d53] font-medium max-w-md leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Discover the journey behind R-HerbalTea, where ancient botanical wisdom meets modern holistic health to bring you blends that restore balance and vitality.
            </p>

          </motion.div>
        </div>
      </section>

      {/* 1. Who Am I? Section */}
      <section className="pt-10 pb-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-3xl text-center mx-auto space-y-4"
              >
                 <h2 className="text-[36px] md:text-[44px] font-bold text-[#0F3D2E] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                   Who Am I ?
                 </h2>
                 <h3 className="text-[22px] md:text-[26px] font-bold text-[#349337] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                   Eshwar Chitte
                 </h3>
                 <p className="text-[16px] md:text-[18px] text-[#556358] leading-[1.8] text-justify md:text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                   I'm a wellness researcher from Nellore. I'm not a pharmacist or doctor — I'm someone who cares deeply about natural health. For years, I watched my parents suffer. That frustrated me. So I researched. I studied. I created.
                 </p>
                 <p className="text-[16px] md:text-[18px] font-bold text-[#349337] leading-[1.8] pt-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                   Real health comes from nature, patience, and genuine care.
                 </p>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 2. Our Story - Born from Love Section */}
      <section className="py-24 bg-[#F8F5EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 space-y-6"
              >
                 <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Our Story</span>
                 <h2 className="text-[36px] md:text-[44px] font-bold text-[#0F3D2E] leading-[1.2]" style={{ fontFamily: 'Playfair Display, serif' }}>
                   Born from Love &<br/> Genuine Care
                 </h2>
                 <div className="w-16 h-[2px] bg-[#D4AF37]"></div>
                 
                 <div className="space-y-4 pt-2">
                   <p className="text-[16px] md:text-[18px] text-[#556358] leading-[1.7]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                     R-HerbalTea didn't start in a boardroom; it started in my home. When my mom struggled with her sugar levels and my dad faced weight challenges, their doctors suggested moving toward natural, plant-based nutrition.
                   </p>
                   <p className="text-[16px] md:text-[18px] text-[#556358] leading-[1.7]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                     That's when I discovered the incredible healing power of herbal teas. After months of late-night research and endless testing, <span className="font-bold text-[#0F3D2E]">Ruby Calm Tea</span> was born — a blend that not only tastes wonderful but truly helps people feel better.
                   </p>
                 </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2"
              >
                 <div className="bg-[#0F3D2E] rounded-[32px] p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-[0.05] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] opacity-[0.05] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
                    
                    <div className="relative z-10 space-y-6">
                      <div className="text-[90px] leading-none text-[#D4AF37] font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        R
                      </div>
                      <h3 className="text-[20px] md:text-[24px] font-bold text-white tracking-[0.2em] uppercase" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        Stands For Real
                      </h3>
                      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 text-[#D4AF37] font-medium tracking-wide text-[14px] md:text-[16px]">
                        <span>Real Herbs</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 hidden sm:block"></div>
                        <span>Real Benefits</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 hidden sm:block"></div>
                        <span>Real Care</span>
                      </div>
                      <p className="text-[14px] md:text-[15px] text-[#a0b0a5] leading-[1.8] pt-6 border-t border-white/10 mt-8">
                        Every blend is carefully crafted using pure, natural ingredients. No artificial additives, no compromise on quality. Just nature's goodness in every cup.
                      </p>
                    </div>
                 </div>
              </motion.div>

           </div>
        </div>
      </section>

      {/* 4. Research Journey! Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-[36px] md:text-[44px] font-bold text-[#0F3D2E] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
               Research Journey !
             </h2>
             <div className="flex items-center justify-center mb-6">
               <div className="w-24 h-[1px] bg-[#dccb96]"></div>
               <Microscope className="w-5 h-5 text-[#D4AF37] mx-3" />
               <div className="w-24 h-[1px] bg-[#dccb96]"></div>
             </div>
             <p className="text-[#556358] text-[16px] md:text-[18px] max-w-3xl mx-auto leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
               For 18 intensive months, we researched and developed natural answers to the most common health struggles people face daily. Our goal was to find real relief for <strong>digestive issues</strong> like weak metabolism, <strong>hormonal imbalances</strong> causing unpredictable mood swings, and the heavy burden of <strong>constant fatigue</strong>. Exhausted by a world full of artificial additives, we formulated 100% pure, organic blends designed to naturally strengthen the body, restore inner balance, and return vibrant vitality.
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { step: "Phase 1", title: "Research", desc: "Studied Ayurvedic texts, modern nutrition science, and traditional remedies" },
               { step: "Phase 2", title: "Development", desc: "Created and tested 50+ ingredient combinations for effectiveness" },
               { step: "Phase 3", title: "Testing", desc: "Lab-tested final blends for purity, safety, and potency" },
               { step: "Phase 4", title: "Launch", desc: "Ruby Collection ready — proven to work on my own family first" }
             ].map((item, idx) => (
               <motion.div 
                 key={idx} 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: false }}
                 transition={{ duration: 0.5, delay: idx * 0.15 }}
                 className="bg-[#F8F5EE] rounded-[24px] p-8 border border-[#e8e4d9] hover:border-[#D4AF37]/50 shadow-sm hover:shadow-xl transition-all flex flex-col h-full"
               >
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2">{item.step}</span>
                  <h4 className="text-[22px] font-bold text-[#0F3D2E] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h4>
                  <p className="text-[15px] text-[#556358] leading-[1.7] flex-grow relative z-10">{item.desc}</p>
               </motion.div>
             ))}
           </div>
           
           <div className="mt-24 border-y border-[#e8e4d9] py-14">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 relative z-10 md:divide-x divide-[#e8e4d9]">
               {[
                 { value: "18", label: "Months of R&D" },
                 { value: "50", suffix: "+", label: "Blends Tested" },
                 { value: "3", suffix: "mo", label: "To Results" },
                 { value: "100", suffix: "%", label: "Organic" }
               ].map((stat, idx) => (
                 <motion.div 
                   key={idx} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: false }}
                   transition={{ duration: 0.5, delay: idx * 0.1 }}
                   className="text-center flex flex-col items-center justify-center px-4"
                 >
                   <div className="text-[48px] md:text-[64px] font-bold text-[#0F3D2E] leading-none mb-4 drop-shadow-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                     <AnimatedNumber value={stat.value} /><span className="text-[28px] md:text-[36px] text-[#D4AF37]">{stat.suffix}</span>
                   </div>
                   <div className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-[#556358]">
                     {stat.label}
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* 5. Our Promise Section */}
      <section className="py-20 bg-[#F8F5EE] relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: false }}
             transition={{ duration: 0.8 }}
           >
             <Heart className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" fill="currentColor" />
             <h2 className="text-[36px] md:text-[44px] font-bold text-[#0F3D2E] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
               Our Promise
             </h2>
             <p className="text-[18px] md:text-[22px] text-[#0F3D2E] font-medium leading-[1.8] italic" style={{ fontFamily: 'Playfair Display, serif' }}>
               "We promise never to compromise on quality. What you see on our label is exactly what is inside your cup—nothing artificial, no hidden fillers. Just pure, powerful, natural wellness, crafted with love and backed by science."
             </p>
           </motion.div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <FAQSection bgClass="bg-white" />

    </main>
  );
}

