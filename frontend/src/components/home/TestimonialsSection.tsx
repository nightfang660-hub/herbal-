'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';

export default function TestimonialsSection() {
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
    },
    {
      id: 4,
      name: "Amit Desai",
      role: "Fitness Coach",
      text: "The Immunity Support blend has kept me feeling 100% all year round. The natural ingredients and rich aroma are simply unbeatable.",
      avatar: "https://i.pravatar.cc/150?img=60",
    },
    {
      id: 5,
      name: "Kavita Reddy",
      role: "Wellness Blogger",
      text: "I have tried many herbal brands, but this one stands out. The respiratory blend really helped soothe my throat during the cold season.",
      avatar: "https://i.pravatar.cc/150?img=44",
    },
    {
      id: 6,
      name: "Sneha Kapoor",
      role: "Nutritionist",
      text: "I recommend these blends to all my clients. The natural herbs offer fantastic digestive benefits without any artificial additives.",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: 7,
      name: "Siddharth Jain",
      role: "Software Engineer",
      text: "The energy blend is fantastic for long coding sessions. No jitters, just clean, focused energy all day.",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 8,
      name: "Anjali Gupta",
      role: "Life Coach",
      text: "I start every morning with the detox blend. It feels incredibly cleansing and sets a positive tone for my entire day.",
      avatar: "https://i.pravatar.cc/150?img=43",
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

    // Set interval to auto-scroll every 3 seconds
    const autoScrollTimer = setInterval(() => {
      scrollByOneCard('right');
    }, 3000);

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
      clearInterval(autoScrollTimer);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollByOneCard]);

  return (
    <section className="bg-[#fdfbf6] py-12 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize mb-5 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center w-[250px]">
            <div className="h-[2px] w-full bg-[#cda434]"></div>
            <Leaf className="w-5 h-5 text-[#cda434] mx-2 shrink-0 -rotate-[60deg]" fill="currentColor" />
            <div className="h-[2px] w-full bg-[#cda434]"></div>
          </div>
          <p className="mt-6 text-[15px] md:text-[16px] text-[#556358] max-w-2xl mx-auto" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Real stories and experiences from our beloved community. Discover how our herbal blends are transforming daily wellness routines.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="flex items-center justify-between w-full gap-2 md:gap-6 mt-4">
          
          {/* Left Button */}
          <button 
            onClick={() => scrollByOneCard('left')} 
            className="cursor-pointer relative z-20 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#dccb96] text-[#cda434] bg-white flex items-center justify-center hover:bg-[#cda434] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md group"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Cards */}
          <div 
             ref={scrollRef}
             className="flex items-stretch gap-6 w-full overflow-x-auto snap-x snap-mandatory px-2 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
          >
            {extendedTestimonials.map((t, index) => (
              <div 
                 key={`${t.id}-${index}`} 
                 className="w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-center bg-white rounded-[16px] p-6 md:p-8 text-left border border-[#ece8dc] shadow-sm flex flex-col hover:-translate-y-2 hover:shadow-md transition-all duration-300 group"
              >
                {/* Quote Text */}
                <p className="text-[#556358] text-[14px] leading-relaxed mb-6 flex-grow" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  "{t.text}"
                </p>

                {/* Profile Row */}
                <div className="w-full h-[1px] bg-[#dccb96] opacity-60 mb-5"></div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h5 className="text-[14px] font-bold text-[#1c2e24]">{t.name}</h5>
                    <p className="text-[12px] text-[#6b7b72]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button 
            onClick={() => scrollByOneCard('right')} 
            className="cursor-pointer relative z-20 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#dccb96] text-[#cda434] bg-white flex items-center justify-center hover:bg-[#cda434] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md group"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </section>
  );
}
