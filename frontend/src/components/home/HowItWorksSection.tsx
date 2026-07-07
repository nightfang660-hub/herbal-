'use client';

import React from 'react';
import { ShoppingBag, ShoppingCart, ClipboardCheck, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "CHOOSE BLEND",
      desc: "Explore our range of herbal blends and choose your favorite.",
      Icon: ShoppingBag,
      outerBorder: "border-[#d8e6ce]",
      innerBg: "bg-[#f2f8ec]",
      textColor: "text-[#5e8b42]",
      arrowColor: "text-[#5e8b42]",
      hoverCard: {
        image: "/home/herbal.jpg",
        title: "Choose Your Perfect Blend",
        desc: "Discover a variety of herbal tea blends crafted for every mood and need.",
        features: ["100% Natural Ingredients", "No Artificial Flavors", "Made with Love & Care"],
        buttonText: "EXPLORE FLAVORS",
        buttonBg: "bg-[#5e8b42]"
      }
    },
    {
      num: "02",
      title: "ADD TO CART",
      desc: "Add your selected products to the cart with ease.",
      Icon: ShoppingCart,
      outerBorder: "border-[#fce0d4]",
      innerBg: "bg-[#fef6f2]",
      textColor: "text-[#d97746]",
      arrowColor: "text-[#d97746]",
      hoverCard: {
        image: "/home/img2.jpg",
        title: "Add To Your Cart",
        desc: "Easily add your selected wellness products to your cart for checkout.",
        features: ["Quick & Easy Process", "Save Your Favorites", "Secure Storage"],
        buttonText: "VIEW CART",
        buttonBg: "bg-[#d97746]"
      }
    },
    {
      num: "03",
      title: "CHECKOUT",
      desc: "Review your order and choose a safe & secure payment method.",
      Icon: ClipboardCheck,
      outerBorder: "border-[#d1e7f6]",
      innerBg: "bg-[#f2f9fe]",
      textColor: "text-[#4b8aa3]",
      arrowColor: "text-[#4b8aa3]",
      hoverCard: {
        image: "/home/img3.jpg",
        title: "Secure Checkout",
        desc: "Complete your purchase with our encrypted and safe payment gateway.",
        features: ["Multiple Payment Options", "Data Privacy Assured", "Instant Confirmation"],
        buttonText: "PROCEED",
        buttonBg: "bg-[#4b8aa3]"
      }
    },
    {
      num: "04",
      title: "ENJOY YOUR TEA",
      desc: "Relax, unwind and enjoy the goodness of herbal wellness.",
      Icon: Coffee,
      outerBorder: "border-[#fcedc7]",
      innerBg: "bg-[#fffaf0]",
      textColor: "text-[#d6a524]",
      arrowColor: "text-[#d6a524]",
      hoverCard: {
        image: "/home/img4.jpg",
        title: "Sip & Relax",
        desc: "Your journey to holistic wellness begins with every soothing cup.",
        features: ["Calming Experience", "Holistic Healing", "Daily Wellness Routine"],
        buttonText: "LEARN MORE",
        buttonBg: "bg-[#d6a524]"
      }
    }
  ];

  return (
    <section className="bg-white pt-10 pb-32 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-2"
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-[36px] md:text-[46px] font-bold text-[#1c3524] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
              How It Works
            </h2>
          </div>
        </motion.div>

        {/* Defs for arrowheads */}
        <svg className="w-0 h-0 absolute pointer-events-none">
          <defs>
            <marker id="arrow-0" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#5e8b42" />
            </marker>
            <marker id="arrow-1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#d97746" />
            </marker>
            <marker id="arrow-2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#4b8aa3" />
            </marker>
          </defs>
        </svg>

        {/* Steps */}
        <motion.div 
          initial="visible"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative w-full mx-auto"
        >
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              {/* Step */}
              <motion.div 
                variants={{
                  hidden: { opacity: 1, scale: 1, y: 0 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
                }}
                className={`group flex flex-col items-center text-center w-full relative z-10 mx-auto cursor-pointer ${index % 2 === 1 ? 'md:mt-32' : ''}`}
              >
                {/* Circle Icon Container */}
                <div className={`w-[130px] h-[130px] rounded-full border-2 ${step.outerBorder} flex items-center justify-center relative transition-transform duration-500 group-hover:scale-105 bg-white`}>
                  <div className={`w-[114px] h-[114px] rounded-full ${step.innerBg} flex items-center justify-center transition-transform duration-500`}>
                    <step.Icon className={`w-10 h-10 ${step.textColor} transition-transform duration-500 group-hover:scale-110`} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Hover Card */}
                <div className="absolute top-[140px] left-1/2 -translate-x-1/2 w-[320px] bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.12)] border border-[#e8efe9] p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col text-left pointer-events-none group-hover:pointer-events-auto">
                  {/* Triangle pointer */}
                  <div className="absolute -top-[11px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-white filter drop-shadow-[0_-2px_2px_rgba(0,0,0,0.02)]"></div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className={`text-[17px] font-extrabold ${step.textColor} mb-2`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {step.hoverCard.title}
                    </h4>
                    <p className="text-[14px] text-[#3b4c42] font-medium mb-4 leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {step.hoverCard.desc}
                    </p>
                    <ul className="space-y-2.5">
                      {step.hoverCard.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-[13px] font-bold text-[#2d3a32]">
                          <div className={`flex items-center justify-center w-5 h-5 rounded-full ${step.innerBg}`}>
                            <svg className={`w-3.5 h-3.5 shrink-0 ${step.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className={`mt-8 text-[15px] font-bold ${step.textColor} uppercase tracking-wide mb-3`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-[13px] text-[#6b7b72] leading-relaxed px-4 md:px-2 max-w-[240px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {step.desc}
                </p>
              </motion.div>
              
              {/* Connecting Dotted Arrow */}
              {index < steps.length - 1 && (
                <motion.div 
                  variants={{
                    hidden: { opacity: 1 },
                    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } }
                  }}
                  className="hidden md:block absolute z-0 pointer-events-none"
                  style={{
                    left: `calc(12.5% + ${index * 25}% + 65px)`,
                    width: `calc(25% - 130px)`,
                    top: '65px',
                    height: '128px'
                  }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" className={`overflow-visible ${step.arrowColor}`}>
                    {index % 2 === 0 ? (
                      <path d="M0,0 C50,0 50,100 100,100" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 10" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" markerEnd={`url(#arrow-${index})`} />
                    ) : (
                      <path d="M0,100 C50,100 50,0 100,0" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 10" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" markerEnd={`url(#arrow-${index})`} />
                    )}
                  </svg>
                </motion.div>
              )}

            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
