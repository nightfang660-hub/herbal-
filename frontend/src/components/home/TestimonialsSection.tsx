'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Dr.Manishaa",
      role: "Medical and health",
      text: "These herbal teas have become a part of my daily routine. I feel more energetic, calm and healthy. Absolutely love the taste!",
      avatar: "/assets/testmoniols/theperfecthealthclineckoti.png",
    },
    {
      id: 2,
      name: "Neha Verma",
      role: "IT Professional",
      text: "The quality is exceptional! You can truly taste the purity and freshness in every sip. My go-to tea for wellness.",
      avatar: "https://i.pravatar.cc/600?img=5",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      role: "Entrepreneur",
      text: "I was struggling with bloating and indigestion. Digestive Wellness Tea has been a game changer for me. Highly recommended!",
      avatar: "https://i.pravatar.cc/600?img=11",
    },
    {
      id: 4,
      name: "Amit Desai",
      role: "Fitness Coach",
      text: "The Immunity Support blend has kept me feeling 100% all year round. The natural ingredients and rich aroma are simply unbeatable.",
      avatar: "https://i.pravatar.cc/600?img=60",
    },
    {
      id: 5,
      name: "Kavita Reddy",
      role: "Wellness Blogger",
      text: "I have tried many herbal brands, but this one stands out. The respiratory blend really helped soothe my throat during the cold season.",
      avatar: "https://i.pravatar.cc/600?img=44",
    },
    {
      id: 6,
      name: "Sneha Kapoor",
      role: "Nutritionist",
      text: "I recommend these blends to all my clients. The natural herbs offer fantastic digestive benefits without any artificial additives.",
      avatar: "https://i.pravatar.cc/600?img=47",
    },
    {
      id: 7,
      name: "Siddharth Jain",
      role: "Software Engineer",
      text: "The energy blend is fantastic for long coding sessions. No jitters, just clean, focused energy all day.",
      avatar: "https://i.pravatar.cc/600?img=12",
    },
    {
      id: 8,
      name: "Anjali Gupta",
      role: "Life Coach",
      text: "I start every morning with the detox blend. It feels incredibly cleansing and sets a positive tone for my entire day.",
      avatar: "https://i.pravatar.cc/600?img=43",
    }
  ];

  // Extend the testimonials by repeating them multiple times to create a buffer for infinite scrolling
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  const scrollByOneCard = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.children[0] as HTMLElement;
      if (!card) return;
      
      const cardWidth = card.offsetWidth;
      const gap = 24; // 24px is gap-6
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Infinite loop handler
    const handleScroll = () => {
      const singleSetWidth = container.scrollWidth / 4;
      
      // If we scroll past the 3rd set, jump back to 2nd set instantly
      if (container.scrollLeft >= singleSetWidth * 3) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft -= singleSetWidth;
        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
        });
      }
      // If we scroll before the 2nd set, jump forward to 3rd set
      else if (container.scrollLeft <= singleSetWidth) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft += singleSetWidth;
        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
        });
      }
    };

    container.addEventListener('scroll', handleScroll);

    // Initialize position to the middle to allow scrolling left immediately
    container.style.scrollBehavior = 'auto';
    container.scrollLeft = container.scrollWidth / 4;
    requestAnimationFrame(() => {
      container.style.scrollBehavior = 'smooth';
    });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollByOneCard]);

  return (
    <section className="bg-[#fdfbf6] py-8 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#0F3D2E] capitalize mb-5 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center w-[250px]">
            <div className="h-[2px] w-full bg-[#D4AF37]"></div>
            <Leaf className="w-5 h-5 text-[#D4AF37] mx-2 shrink-0 -rotate-[60deg]" fill="currentColor" />
            <div className="h-[2px] w-full bg-[#D4AF37]"></div>
          </div>
          <p className="mt-6 text-[15px] md:text-[16px] text-[#556358] max-w-2xl mx-auto" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Real stories and experiences from our beloved community. Discover how our herbal blends are transforming daily wellness routines.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="flex items-center justify-center w-full gap-2 md:gap-6 mt-4">
          
          {/* Left Button */}
          <button 
            onClick={() => scrollByOneCard('left')} 
            className="cursor-pointer relative z-20 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#dccb96] text-[#D4AF37] bg-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md group"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Cards */}
          <div 
             ref={scrollRef}
             className="flex items-stretch gap-6 w-full max-w-[90vw] md:max-w-[880px] lg:max-w-[1060px] overflow-x-auto snap-x snap-mandatory py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
          >
            {extendedTestimonials.map((t, index) => (
              <div 
                 key={`${t.id}-${index}`} 
                 className="w-full shrink-0 snap-center bg-white rounded-[24px] text-left border border-[#F8F5EE] shadow-sm flex flex-col md:flex-row hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Left side: Image (45%) */}
                <div className="w-full md:w-[45%] relative aspect-[4/3] sm:aspect-[4/3] md:aspect-auto md:h-auto md:min-h-[480px]">
                  <img src={t.avatar} alt={t.name} className="w-full h-full absolute inset-0 object-cover object-top" />
                </div>

                {/* Right side text: 55% */}
                <div className="w-full md:w-[55%] flex flex-col justify-center pt-8 pb-8 px-6 sm:px-8 md:px-12 lg:px-16 md:py-16">
                  {/* Quote text */}
                  <p className="text-[17px] md:text-[20px] lg:text-[24px] text-[#4a5d53] leading-relaxed mb-6 md:mb-8" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {t.text}
                  </p>
                  
                  <div className="w-16 h-[2px] bg-[#dccb96] opacity-60 mb-6"></div>
                  
                  <div>
                    <h5 className="text-[20px] font-bold text-[#0F3D2E] tracking-wide uppercase" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {t.name}
                    </h5>
                    <p className="text-[15px] text-[#D4AF37] mt-1 font-semibold">{t.role}</p>
                    {t.id === 1 && (
                      <a 
                        href="https://www.instagram.com/theperfecthealthhyd_koti/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#0F3D2E] hover:text-[#D4AF37] transition-colors inline-block mt-3"
                        title="Visit Instagram Profile"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button 
            onClick={() => scrollByOneCard('right')} 
            className="cursor-pointer relative z-20 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#dccb96] text-[#D4AF37] bg-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md group"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </section>
  );
}
