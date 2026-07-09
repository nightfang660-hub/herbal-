'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <section className="bg-[#F8F5EE] py-8 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center mb-12">
          {/* Content */}
          <div className="w-full max-w-4xl mx-auto space-y-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-[36px] md:text-[46px] font-bold text-[#1c3524] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
                Why I Created R-Herbal Tea ?
              </h2>
            </div>
            <p className="text-[15px] md:text-[17px] text-[#4a5c51] leading-[1.8] text-justify" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              It all started at home when I saw my parents struggling with their health, including <strong className="font-bold text-[#0F3D2E]">sugar levels and weight issues</strong>. I wanted to help them naturally, so I spent <strong className="font-bold text-[#0F3D2E]">18 months researching Ayurvedic herbs</strong> and testing over 50 different blends. When I finally found <strong className="font-bold text-[#0F3D2E]">natural solutions that worked</strong> for them, I knew I had to share this with others. That is how R-Herbal Tea was born. We only use <strong className="font-bold text-[#0F3D2E]">100% real, pure herbs with zero artificial additives</strong>. <strong className="font-bold text-[#0F3D2E]">I didn't create this just to start a business. I created it out of genuine care.</strong> Every cup of R-Herbal Tea is my personal promise that your health matters to me as much as my family's health does.
            </p>
            
            <div className="pt-6">
              <Link href="/about" className="inline-flex items-center gap-2 bg-[#4a6b3d] hover:bg-[#3b5930] text-white px-8 py-4 rounded-xl font-semibold text-[15px] transition-all shadow-[0_8px_20px_-6px_rgba(74,107,61,0.4)] hover:-translate-y-1">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
