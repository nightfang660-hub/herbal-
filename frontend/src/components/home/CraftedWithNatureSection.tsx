'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Palette, Coffee, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CraftedWithNatureSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.getAttribute('data-index')));
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.6, // Trigger when 60% of the card is visible
      }
    );

    const cards = scrollContainerRef.current?.querySelectorAll('.nature-card');
    if (cards) {
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    { Icon: Coffee,      title: 'Refreshing Taste', titleLines: ['Refreshing Taste'], desc: 'A delightful and\nrefreshing herbal blend.' },
    { Icon: Palette,     title: 'Vibrant Hues',     titleLines: ['Vibrant Hues'],     desc: 'Beautiful colors from\npure natural ingredients.' },
    { Icon: Leaf,        title: 'Natural Sweet',    titleLines: ['Natural Sweet'],    desc: 'Naturally sweetened\n(liquorice in natural sweet).' },
    { Icon: ShieldCheck, title: 'Made In India',    titleLines: ['Made In India'],    desc: 'Carefully blended with\npremium ingredients.' },
  ] as { Icon: React.ComponentType<any>, title: string, titleLines: string[], desc: string }[];

  return (
    <section className="w-full relative overflow-hidden" style={{ background: '#F8F6F0' }}>
      {/* ── Solid dark forest green bottom band (cards sit on this) ── */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ 
        height: '35%', 
        background: '#1c3524', 
        borderTopLeftRadius: '24px', 
        borderTopRightRadius: '24px' 
      }} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          {/* Eyebrow — "🍃 ROOTED IN NATURE 🍃" in muted gold */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <Leaf className="w-3 h-3" style={{ color: '#c9a55a' }} strokeWidth={1.8} />
            <span style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: '#c9a55a',
              textTransform: 'uppercase',
            }}>
              Where Real herbs Begins
            </span>
            <Leaf className="w-3 h-3 rotate-180" style={{ color: '#c9a55a' }} strokeWidth={1.8} />
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(30px, 4.5vw, 56px)',
            fontWeight: 700,
            color: '#0d3528',
            lineHeight: 1.18,
            textAlign: 'center',
            marginBottom: 20,
            letterSpacing: '-0.01em',
          }}>
            Crafted With Nature,<br />
            Designed For Everyday Wellbeing
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: 14.5,
            color: '#7a8c7e',
            textAlign: 'center',
            lineHeight: 1.7,
            maxWidth: 480,
            margin: '0 auto 56px',
          }}>
            Experience the power of nature in every sip. Our herbal teas are crafted with love, inspired by family, and made with 100% natural ingredients
          </p>
        </motion.div>

        {/* ── 4 Feature Cards ── */}
        <div 
             ref={scrollContainerRef}
             className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-8 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map(({ Icon, titleLines, desc }, idx) => (
            <motion.div 
              key={idx}
              data-index={idx}
              className={`nature-card min-w-[240px] sm:min-w-[280px] lg:min-w-0 snap-center shrink-0 border-[1.5px] transition-colors duration-300 ${activeIndex === idx ? 'border-[#c9a55a] lg:border-transparent lg:hover:border-[#c9a55a]' : 'border-transparent lg:hover:border-[#c9a55a]'}`}
              initial={{ opacity: 1, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.7 }}
              transition={{ type: "spring", bounce: 0.4 }}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 15px 35px rgba(255,182,193,0.5), 0 5px 15px rgba(255,182,193,0.3)' 
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
                background: '#FDFCF9', // Off-white card background
                alignItems: 'center',
                padding: '42.5px 18.5px 46.5px', // Adjusted for border width
                marginBottom: '20px', // Lift cards slightly higher on the green band
                cursor: 'pointer', // Add pointer cursor to indicate interactivity
              }}
            >
              {/* Pale mint outlined icon circle */}
              <div style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: '#EEF2E6',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}>
                <Icon width={42} height={42} style={{ color: '#1f5a46' }} strokeWidth={1.5} />
              </div>

              {/* Bold serif title — multi-line */}
              <h4 style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                fontSize: 16,
                color: '#1a3d2b',
                textAlign: 'center',
                lineHeight: 1.3,
                marginBottom: 16,
              }}>
                {titleLines.map((line, i) => (
                  <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
                ))}
              </h4>

              {/* Tiny gold leaf divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
                <div style={{ width: 16, height: 1, background: '#c9a55a', opacity: 0.7 }} />
                <Leaf className="w-[10px] h-[10px]" style={{ color: '#c9a55a' }} strokeWidth={2} />
                <div style={{ width: 16, height: 1, background: '#c9a55a', opacity: 0.7 }} />
              </div>

              {/* Card description (now on white background) */}
              <p style={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: 13.5,
                color: '#6b7b72', // Grayish green text for white background
                textAlign: 'center',
                lineHeight: 1.65,
                whiteSpace: 'pre-line',
              }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
