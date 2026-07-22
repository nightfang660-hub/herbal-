
'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Dr.Manisha",
      role: "Medical and health",
      text: "Real Herbal Tea – Ruby Calm Tea is a high-quality herbal tea with a refreshing taste and excellent packaging. Our patients have shared positive feedback after trying it. The product is consistent, natural, and easy to include in a daily routine. We appreciate the team's professionalism and are happy with our experience",
      avatar: "/assets/testmoniols/theperfecthealthclineckoti.png",
    },
    {
      id: 2,
      name: "Peddinti Suresh",
      role: "IT Professional",
      text: "Real Herbal Tea has been a fantastic addition to my busy schedule. The quality is exceptional, and you can truly taste the purity and freshness in every sip. It offers a reliable and natural way to de-stress after long hours of work. I highly recommend it for anyone looking to boost their daily wellness routine.",
      avatar: "/assets/testmoniols/surash.png",
    },
    {
      id: 3,
      name: "vaddi bhanusankar",
      role: "Entrepreneur",
      text: "The Digestive Wellness Tea from Real Herbal Tea has been an absolute game changer for me. It effectively helped manage my bloating and indigestion with its consistent, natural ingredients. The soothing flavor makes it a delight to drink every day. It's a high-quality product that I now consider an essential part of my health journey.",
      avatar: "/assets/testmoniols/bhanu.png",
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
            className="hidden md:flex cursor-pointer relative z-20 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#dccb96] text-[#D4AF37] bg-white items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md group"
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
                className="w-full h-auto shrink-0 snap-center bg-white rounded-[24px] text-left border border-[#F8F5EE] shadow-sm flex flex-col md:flex-row hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Left side: Image (45%) */}
                <div className="w-full md:w-[45%] h-[240px] sm:h-[280px] md:h-auto relative md:min-h-[480px]">
                  <img src={t.avatar} alt={t.name} className="w-full h-full absolute inset-0 object-cover object-top" />
                </div>

                {/* Right side text: 55% */}
                <div className="w-full md:w-[55%] flex flex-col justify-center p-5 sm:p-6 md:px-12 lg:px-16 md:py-16">
                  {/* Quote text */}
                  <p className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] text-[#4a5d53] leading-relaxed mb-4 md:mb-10 text-justify text-left" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {t.text}
                  </p>

                  <div className="w-12 md:w-16 h-[2px] bg-[#dccb96] opacity-60 mb-4 md:mb-6 shrink-0 mt-2 md:mt-8"></div>

                  <div className="shrink-0">
                    <h5 className="text-[16px] md:text-[20px] font-bold text-[#0F3D2E] tracking-wide uppercase flex items-center gap-2 md:gap-3" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {t.name}
                      {t.id === 1 && (
                        <a
                          href="https://www.instagram.com/theperfecthealthhyd_koti/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0F3D2E] hover:text-[#D4AF37] transition-colors"
                          title="Visit Instagram Profile"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                      )}
                    </h5>
                    <p className="text-[15px] text-[#D4AF37] mt-1 font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scrollByOneCard('right')}
            className="hidden md:flex cursor-pointer relative z-20 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#dccb96] text-[#D4AF37] bg-white items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shadow-sm hover:shadow-md group"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </section>
  );
}
