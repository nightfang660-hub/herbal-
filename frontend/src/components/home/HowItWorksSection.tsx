'use client';

import React from 'react';
import { ShoppingBag, ShoppingCart, ClipboardCheck, Coffee, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: "CHOOSE BLEND",
      desc: "Explore our range of herbal blends and choose your favorite.",
      Icon: ShoppingBag,
      color: "from-[#f2f7ed] to-[#e4eed7]",
      iconColor: "text-[#5e8b42]",
      badgeColor: "bg-[#5e8b42]"
    },
    {
      num: 2,
      title: "ADD TO CART",
      desc: "Add your selected products to the cart with ease.",
      Icon: ShoppingCart,
      color: "from-[#fff5ed] to-[#ffe5cf]",
      iconColor: "text-[#d97746]",
      badgeColor: "bg-[#d97746]"
    },
    {
      num: 3,
      title: "CHECKOUT",
      desc: "Review your order and choose a safe & secure payment method.",
      Icon: ClipboardCheck,
      color: "from-[#f0f8ff] to-[#d6efff]",
      iconColor: "text-[#4b8aa3]",
      badgeColor: "bg-[#4b8aa3]"
    },
    {
      num: 4,
      title: "ENJOY YOUR TEA",
      desc: "Relax, unwind and enjoy the goodness of herbal wellness.",
      Icon: Coffee,
      color: "from-[#fffce8] to-[#fff4ba]",
      iconColor: "text-[#d6a524]",
      badgeColor: "bg-[#d6a524]"
    }
  ];

  return (
    <section className="bg-white pt-12 pb-8 relative overflow-hidden border-b border-border/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
              How It Works
            </h2>
          </div>
          <p className="text-[16px] md:text-[18px] text-[#6b7b72] tracking-wide" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Your journey to a healthier you is simple
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-6 lg:gap-10 relative mb-4"
        >
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              {/* Step */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
                }}
                className="group flex flex-col items-center text-center max-w-[170px] hover:-translate-y-3 transition-all duration-500 cursor-default"
              >
                <div className="relative mb-5">
                  {/* Circle background */}
                  <div className={`w-32 h-32 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${step.color} border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-105`}>
                     {/* Inner faint ring */}
                     <div className="absolute inset-2.5 rounded-full border border-black/5 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                     <step.Icon className={`w-8 h-8 md:w-10 md:h-10 ${step.iconColor} group-hover:scale-110 transition-transform duration-500 z-10`} />
                  </div>
                  {/* Number Badge */}
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full ${step.badgeColor} text-white flex items-center justify-center text-[12px] md:text-[14px] font-bold shadow-md group-hover:-translate-y-1 group-hover:shadow-lg transition-all duration-500`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {step.num}
                  </div>
                </div>
                <h3 className={`text-[13px] md:text-[14px] font-bold ${step.iconColor} uppercase tracking-wider mb-2 transition-colors duration-300`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-[11px] md:text-[12px] text-[#6b7b72] leading-relaxed group-hover:text-[#4a5c51] transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {step.desc}
                </p>
              </motion.div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 }
                  }}
                  className="hidden md:flex items-center justify-center mt-6 md:mt-8"
                >
                  <ArrowRight className="w-4 h-4 text-[#a4aca7] opacity-60" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
