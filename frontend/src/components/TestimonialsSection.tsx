'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Leaf, ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialsSection({ title = "What Our Customers Say", subtitle = "Real stories and experiences from our beloved community. Discover how our herbal blends are transforming daily wellness routines." }: { title?: string, subtitle?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Yoga Instructor",
      text: "These herbal teas have become a part of my daily routine. I feel more energetic, calm and healthy. Absolutely love the taste!",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      id: 2,
      name: "Neha Verma",
      role: "IT Professional",
      text: "The quality is exceptional! You can truly taste the purity and freshness in every sip. My go-to tea for wellness.",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      role: "Entrepreneur",
      text: "I was struggling with bloating and indigestion. Digestive Wellness Tea has been a game changer for me. Highly recommended!",
      avatar: "https://i.pravatar.cc/150?img=11",
    }
  ];

  const nextPage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevPage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  // Handle auto-scroll interval
  useEffect(() => {
    const timer = setInterval(nextPage, 3000);
    return () => clearInterval(timer);
  }, [nextPage]);

  // Handle actual scrolling when currentIndex changes
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[0] as HTMLElement;
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 24; // gap-6 is 24px
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const targetLeft = currentIndex * (cardWidth + gap);
        
        container.scrollTo({
          left: Math.min(targetLeft, maxScrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  return (
    <section className="bg-[#fdfbf6] py-16 relative overflow-hidden border-b border-[#F8F5EE]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-[40px] md:text-[52px] font-bold text-[#1a3b2b] capitalize mb-5 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h2>
          <div className="flex items-center justify-center w-[250px]">
            <div className="h-[2px] w-full bg-[#D4AF37]"></div>
            <Leaf className="w-5 h-5 text-[#D4AF37] mx-2 shrink-0 -rotate-[60deg]" fill="currentColor" />
            <div className="h-[2px] w-full bg-[#D4AF37]"></div>
          </div>
          {subtitle && (
            <p className="mt-6 text-[15px] md:text-[16px] text-[#556358] max-w-2xl mx-auto" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Container */}
        <div className="flex items-center justify-between w-full gap-2 md:gap-6 mt-4">
          
          {/* Left Button */}
          <button onClick={prevPage} className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#dccb96] text-[#D4AF37] bg-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md group z-10">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Cards */}
          <div 
             ref={scrollRef}
             className="flex items-stretch gap-6 w-full overflow-x-auto snap-x snap-mandatory px-2 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
          >
            {testimonials.map((t) => (
              <div 
                 key={t.id} 
                 className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-center bg-white rounded-[16px] p-8 text-left border border-[#F8F5EE] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col h-auto min-h-[320px] hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Quote Text */}
                <p className="text-[#556358] text-[14px] leading-relaxed mb-8 flex-grow" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  "{t.text}"
                </p>

                {/* Profile Row */}
                <div className="w-full h-[1px] bg-[#dccb96] opacity-60 mb-6 group-hover:w-full transition-all duration-500"></div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-[#fdfbf6] shadow-sm" />
                  <div>
                    <h5 className="text-[14px] font-bold text-[#0F3D2E]">{t.name}</h5>
                    <p className="text-[12px] text-[#6b7b72]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button onClick={nextPage} className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#dccb96] text-[#D4AF37] bg-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md group z-10">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </section>
  );
}
