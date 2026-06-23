'use client';

import React from 'react';
import { Leaf, Flower2, Coffee, MoonStar, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CraftedWithNatureSection() {
  const cards = [
    { Icon: Leaf,     title: '100% Herbal',    titleLines: ['100% Herbal'],         desc: 'Pure plant-based\ningredients.' },
    { Icon: Flower2,  title: 'Hormonal Wellness', titleLines: ['Hormonal', 'Wellness'], desc: "Crafted for women's\nbalance and comfort." },
    { Icon: Coffee,   title: 'Supports Digestion', titleLines: ['Supports', 'Digestion'], desc: 'Helps maintain everyday\ndigestive wellbeing.' },
    { Icon: MoonStar, title: 'Promotes Calmness', titleLines: ['Promotes', 'Calmness'],  desc: 'A soothing ritual for\nrelaxation and peace.' },
    { Icon: ShieldCheck, title: 'Made In India',   titleLines: ['Made In India'],       desc: 'Carefully blended with\npremium ingredients.' },
  ] as { Icon: React.ComponentType<any>, title: string, titleLines: string[], desc: string }[];

  return (
    <section className="w-full relative overflow-hidden" style={{ background: '#F8F6F0' }}>
      {/* ── Solid dark forest green bottom band (cards sit on this) ── */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ 
        height: '35%', 
        background: '#395c47', 
        borderTopLeftRadius: '24px', 
        borderTopRightRadius: '24px' 
      }} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
              Rooted In Nature
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
            Our products are thoughtfully crafted with natural ingredients<br className="hidden sm:block" />
            to support your body, mind, and everyday balance.
          </p>
        </motion.div>

        {/* ── 5 Feature Cards ── */}
        <motion.div 
             initial="hidden"
             whileInView="show"
             viewport={{ once: true }}
             variants={{
               hidden: {},
               show: { transition: { staggerChildren: 0.1 } }
             }}
             style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}
             className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
        >
          {cards.map(({ Icon, titleLines, desc }, idx) => (
            <motion.div 
              key={idx} 
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
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
                padding: '44px 20px 48px', // Balanced padding
                marginBottom: '20px', // Lift cards slightly higher on the green band
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
        </motion.div>
      </div>
    </section>
  );
}
