'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { Mail, Phone, MapPin, Clock, ArrowRight, Leaf } from 'lucide-react';


export default function ContactPage() {

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section (Matching Mockup) */}
      <section className="relative w-full overflow-hidden bg-black lg:bg-white h-[440px] md:min-h-[580px] lg:min-h-[70vh] flex flex-col">
        {/* Background Image Container */}
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-[65%] h-full bg-no-repeat bg-cover bg-center lg:bg-[position:right_bottom] z-0"
          style={{ backgroundImage: `url('/assets/contactherosection.png')` }}
        >
           {/* Gradient for Mobile - Dark fade to make white text readable */}
           <div 
             className="absolute inset-0 z-10 lg:hidden" 
             style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)' }}
           ></div>
           {/* Gradient for Desktop - Sharp fade blending into white */}
           <div 
             className="absolute inset-0 z-10 hidden lg:block" 
             style={{ background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 30%)' }}
           ></div>
        </div>

        <div className="flex-1 max-w-[1400px] w-full flex flex-col justify-center pt-[42px] pb-[30px] px-[24px] md:px-8 xl:px-12 mx-auto relative z-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[45%] xl:w-[48%] flex flex-col items-start justify-center h-full mt-[-180px] lg:mt-0"
            >
              {/* Subtitle */}
              <div className="flex items-center gap-3 mb-4 lg:mb-8">
                <div className="w-6 lg:w-10 h-[2px] bg-[#D4A017]"></div>
                <span className="text-[#D4A017] font-bold text-[14px] lg:text-[15px] tracking-[3px] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                  CONTACT US
                </span>
                <div className="w-6 lg:w-10 h-[2px] bg-[#D4A017]"></div>
              </div>
  
              {/* Title Mobile (2 lines - White & Gold) */}
              <h1 className="lg:hidden text-[32px] sm:text-[44px] font-bold leading-[1.1] max-w-[360px] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-white block">We'd Love To</span>
                <span className="text-[#D4A017] block">Hear From You</span>
              </h1>

              {/* Title Desktop (2 lines) */}
              <h1 className="hidden lg:block lg:text-[56px] xl:text-[68px] font-bold text-[#0F3D2E] leading-[1.05] mb-6 lg:mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                We'd Love To <br />
                <span className="text-[#D4A017]">Hear From You</span>
              </h1>
              
              {/* Description - Mobile (White) / Desktop (Gray) */}
              <p className="text-[14px] sm:text-[16px] text-white/90 font-normal leading-[1.6] max-w-[280px] sm:max-w-[380px] lg:hidden italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                Have a question, feedback, or need assistance? We're here to help you on your wellness journey.
              </p>
              
              <p className="hidden lg:block text-[16px] lg:text-[18px] text-[#4B5563] font-normal leading-[1.7] max-w-[460px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Have a question, feedback, or need assistance? We're here to help you on your wellness journey.
              </p>
  
            </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pt-10 pb-10 lg:pb-16 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Form & Contact Info */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
            
            {/* Left: Contact Information Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="hidden md:block w-full lg:w-[50%] relative max-w-[420px] mx-auto lg:max-w-none"
            >
              <div className="bg-[#F8F5EE] border border-[#F8F5EE] rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative w-full min-h-[420px] lg:min-h-[600px] flex flex-col">
                
                {/* Background Image */}
                <div 
                  className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-[position:center_bottom] lg:bg-[position:70%_bottom] z-0"
                  style={{ backgroundImage: `url('/assets/contact2.png')` }}
                >
                </div>

                {/* Premium Gradient Overlay - Vertical */}
                <div 
                  className="absolute inset-0 z-0" 
                  style={{ background: 'linear-gradient(180deg, rgba(248,245,238,0.8) 0%, rgba(248,245,238,0.5) 40%, rgba(248,245,238,0) 100%)' }}
                ></div>
                
                {/* Premium Gradient Overlay - Horizontal (Protects left text & Follow Us) */}
                <div 
                  className="absolute inset-0 z-0" 
                  style={{ background: 'linear-gradient(90deg, rgba(248,245,238,0.8) 0%, rgba(248,245,238,0.75) 45%, rgba(248,245,238,0.2) 75%, rgba(248,245,238,0) 100%)' }}
                ></div>

                {/* Content Container */}
                <div className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col justify-between flex-1 w-full sm:w-[75%] md:w-[65%] lg:w-[60%]">
                  <div>
                    <div className="hidden md:flex items-center gap-2 mb-6">
                      <h2 className="text-[24px] lg:text-[32px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>We're Here For You</h2>
                      <Leaf className="w-5 h-5 text-[#D4A017]" fill="currentColor" />
                    </div>

                    <div className="flex flex-col gap-6">
                      
                      {/* Email Us */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-[#0F3D2E] flex items-center justify-center text-white shadow-sm">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-bold text-[#4a5d53] text-[11px] lg:text-[13px] uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Email</h4>
                          <p className="text-[#0F3D2E] text-[14px] lg:text-[16px] font-bold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>rherbaltea@gmail.com</p>
                        </div>
                      </div>

                      {/* Call Us */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-[#0F3D2E] flex items-center justify-center text-white shadow-sm">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-bold text-[#4a5d53] text-[11px] lg:text-[13px] uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Phone</h4>
                          <p className="text-[#0F3D2E] text-[14px] lg:text-[16px] font-bold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>+91-7799733755</p>
                        </div>
                      </div>

                      {/* Visit Us */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-[#0F3D2E] flex items-center justify-center text-white shadow-sm">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-bold text-[#4a5d53] text-[11px] lg:text-[13px] uppercase tracking-wider mb-0.5" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Address</h4>
                          <p className="text-[#0F3D2E] text-[14px] lg:text-[15px] font-bold leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Hyderabad</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Follow Us */}
                  <div className="mt-8 lg:mt-auto pt-5 flex items-center gap-4">
                    <span className="font-extrabold text-[#0F3D2E] text-[12px] lg:text-[14px] uppercase tracking-wider shrink-0" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Follow Us</span>
                    <div className="flex items-center gap-3">
                      <a href="https://www.facebook.com/profile.php?id=61577110637671" target="_blank" rel="noopener noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-[#0F3D2E] flex items-center justify-center text-white hover:bg-[#C9A34E] transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      <a href="https://x.com/realherbalteaco" target="_blank" rel="noopener noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-[#0F3D2E] flex items-center justify-center text-white hover:bg-[#C9A34E] transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </a>
                      <a href="https://www.linkedin.com/in/real-herbal-tea-herbaltea-5bb818423/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-[#0F3D2E] flex items-center justify-center text-white hover:bg-[#C9A34E] transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                      <a href="https://pin.it/4pK5PtGwt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 shrink-0 rounded-full bg-[#0F3D2E] flex items-center justify-center text-white hover:bg-[#C9A34E] transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.436 2.981 7.436 6.966 0 4.156-2.618 7.502-6.257 7.502-1.22 0-2.368-.634-2.763-1.385l-.754 2.873c-.272 1.042-1.011 2.342-1.507 3.136 1.157.356 2.373.551 3.633.551 6.621 0 11.988-5.367 11.988-11.987C24.017 5.367 18.638 0 12.017 0z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
{/* Right: Message Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-[50%] relative"
            >
              <div className="bg-white border border-[#e0e8d5] rounded-[20px] p-6 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden h-full flex flex-col justify-start">
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-[28px] md:text-[32px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>Send Us A Message</h2>
                    <Leaf className="w-5 h-5 text-[#D4A017]" fill="currentColor" />
                  </div>
                  <p className="text-[#6b7b72] text-[15px] mb-8" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>We typically respond within 24 hours.</p>

                  <form className="space-y-4 lg:space-y-6 flex flex-col flex-1" onSubmit={(e) => e.preventDefault()}>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required
                      className="w-full bg-white border border-[#e0e8d5] rounded-xl px-4 py-3.5 lg:px-5 lg:py-4 text-[15px] text-[#0F3D2E] placeholder:text-[#6b7b72]/70 focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all"
                      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                    />
                    
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required
                      className="w-full bg-white border border-[#e0e8d5] rounded-xl px-4 py-3.5 lg:px-5 lg:py-4 text-[15px] text-[#0F3D2E] placeholder:text-[#6b7b72]/70 focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all"
                      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                    />
                    
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required
                      className="w-full bg-white border border-[#e0e8d5] rounded-xl px-4 py-3.5 lg:px-5 lg:py-4 text-[15px] text-[#0F3D2E] placeholder:text-[#6b7b72]/70 focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all"
                      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                    />

                    <textarea 
                      placeholder="Your Message" 
                      required
                      rows={4}
                      className="w-full bg-white border border-[#e0e8d5] rounded-xl px-4 py-3.5 lg:px-5 lg:py-4 text-[15px] text-[#0F3D2E] placeholder:text-[#6b7b72]/70 focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all resize-none"
                      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                    ></textarea>

                    <div className="mt-auto pt-4 lg:pt-6">
                      <button className="w-full flex items-center justify-center gap-2 bg-[#0F3D2E] hover:bg-[#349337] text-white px-8 py-3.5 lg:py-4 rounded-xl font-bold text-[15px] transition-colors shadow-md">
                        Send Message <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


    </main>
  );
}
