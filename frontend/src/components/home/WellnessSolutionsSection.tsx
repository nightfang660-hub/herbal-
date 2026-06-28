'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, ArrowRight } from 'lucide-react';

export default function WellnessSolutionsSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const solutions = [
    {
      id: 1,
      title: "Digestive\nComfort",
      desc: "Support your gut\nhealth naturally.",
      bgColor: "bg-[#e8efe2]",
      iconColor: "text-[#4a5c3f]",
      icon: <img src="/home/diges.png" alt="Digestion" className="w-[100px] h-[100px] object-contain scale-110" />
    },
    {
      id: 2,
      title: "Deep\nRelaxation",
      desc: "Calm your mind and\nrelax your body.",
      bgColor: "bg-[#ece5fb]", // light purple
      iconColor: "text-[#6543b5]", // purple
      icon: <img src="/home/meditation.png" alt="Relaxation" className="w-[100px] h-[100px] object-contain scale-110" />
    },
    {
      id: 3,
      title: "Total Body\nDetox",
      desc: "Cleanse and refresh\nyour body.",
      bgColor: "bg-[#e8efe2]",
      iconColor: "text-[#4a5c3f]",
      icon: <img src="/home/jar.png" alt="Detox" className="w-[100px] h-[100px] object-contain scale-110" />
    },
    {
      id: 4,
      title: "Hormonal\nHarmony",
      desc: "Support your natural\nbalance everyday.",
      bgColor: "bg-[#fce9ec]", // light pink
      iconColor: "text-[#d6556d]", // pink/red
      icon: <img src="/home/red_flwr.png" alt="Hormonal Balance" className="w-[100px] h-[100px] object-contain scale-110" />
    }
  ];

  return (
    <section className="bg-[#fdfbf6] py-12 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-3.5 h-3.5 text-[#cda434] -scale-x-100" fill="currentColor" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#a88a38]">Naturally Better, Everyday</span>
            <Leaf className="w-3.5 h-3.5 text-[#cda434]" fill="currentColor" />
          </div>

          {/* Main Title */}
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Wellness Solutions
          </h2>

          {/* Leaf Divider */}
          <div className="flex items-center justify-center w-[240px] mx-auto mb-6">
            <div className="h-[1px] w-full bg-[#dccb96]"></div>
            <Leaf className="w-4 h-4 text-[#a88a38] mx-2 shrink-0 -rotate-[60deg]" fill="currentColor" />
            <div className="h-[1px] w-full bg-[#dccb96]"></div>
          </div>

          {/* Description */}
          <p className="text-[15px] md:text-[16px] text-[#556358] leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Discover specialized herbal formulations crafted for your unique health needs.<br className="hidden md:block" /> Find the perfect natural remedy to support your daily wellness journey.
          </p>
        </div>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 relative">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className="flex flex-col items-center text-center px-4 relative group"
            >
              {/* Custom Vertical Divider (with dots) */}
              {sol.id !== 4 && (
                <div className="hidden lg:flex absolute right-0 top-[5%] bottom-[5%] w-[2px] bg-[#dccb96] flex-col justify-between items-center">
                  <div className="w-[4px] h-[4px] rounded-full bg-[#cda434] -translate-y-[1px]"></div>
                  <div className="w-[4px] h-[4px] rounded-full bg-[#cda434] translate-y-[1px]"></div>
                </div>
              )}

              {/* Icon Circle */}
              <div
                className={`w-[110px] h-[110px] rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105 ${sol.bgColor} ${sol.iconColor}`}
              >
                {sol.icon}
              </div>

              {/* Title */}
              <h3 className="text-[20px] md:text-[22px] font-bold text-[#1a3b2b] mb-4 whitespace-pre-line leading-[1.25]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {sol.title}
              </h3>

              {/* Desc */}
              <p className="text-[14px] md:text-[15px] text-[#556358] whitespace-pre-line leading-relaxed mb-6 flex-grow" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                {sol.desc}
              </p>

              {/* Link / Button */}
              <Link href="/shop" className="group/link text-[14px] font-bold text-white bg-[#1a3b2b] rounded-full px-6 py-2.5 transition-all duration-300 flex items-center gap-2 mt-auto hover:bg-[#2c5a43] shadow-sm hover:shadow-md active:scale-95">
                Explore Tea <ArrowRight className="w-4 h-4 text-[#cda434] transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
