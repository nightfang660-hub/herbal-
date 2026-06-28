'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Moon, Leaf, Shield, Droplets, User, Zap, Heart, Star, Mail, ChevronLeft, ChevronRight, ArrowLeft, CheckCircle2, Flower2, Flower, Sprout, Wind, Flame, Wheat, Activity, Brain } from 'lucide-react';
import { JournalPost } from './types';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';

const benefitsData = [
  {
    tag: 'BETTER SLEEP',
    title: 'Calm Your Mind,\nSleep Better Naturally',
    desc: 'A soothing blend that relaxes the body and mind, promoting deeper and more restful sleep.',
    image: '/home/digestive_img.jpg',
    keyBenefits: [
      'Calms the nervous system',
      'Promotes deeper sleep',
      'Supports bedtime relaxation'
    ],
    recommendedBlend: {
      id: 5,
      name: 'Ruby Calm Tea',
      desc: 'A dreamy blend for restful nights.',
      img: '/shop/blue_tea1.png'
    },
    keyIngredients: [
      { name: 'Chamomile', desc: 'Soothes & relaxes', Icon: Flower2, color: 'text-yellow-500' },
      { name: 'Lavender', desc: 'Calms & comforts', Icon: Flower, color: 'text-purple-500' },
      { name: 'Tulsi', desc: 'Reduces stress', Icon: Leaf, color: 'text-green-600' }
    ]
  },
  {
    tag: 'STRESS RELIEF',
    title: 'Find Your Balance,\nRelieve Daily Stress',
    desc: 'Adaptogenic herbs help your body adapt to stress and promote mental clarity and relaxation.',
    image: '/journal/ruby_calm_tea.png',
    keyBenefits: [
      'Reduces anxiety and tension',
      'Uplifts your daily mood',
      'Enhances mental focus'
    ],
    recommendedBlend: {
      id: 4,
      name: 'Tulsi Detox Tea',
      desc: 'A balancing blend for daily calm.',
      img: '/shop/blue_tea1.png'
    },
    keyIngredients: [
      { name: 'Ashwagandha', desc: 'Stress adaptogen', Icon: Sprout, color: 'text-amber-700' },
      { name: 'Holy Basil', desc: 'Mental clarity', Icon: Leaf, color: 'text-emerald-600' },
      { name: 'Lemon Balm', desc: 'Calming effect', Icon: Droplets, color: 'text-yellow-500' }
    ]
  },
  {
    tag: 'DIGESTION SUPPORT',
    title: 'Soothe Your Gut,\nImprove Digestion',
    desc: 'Ingredients like Ginger, Fennel and Peppermint support digestion and reduce bloating naturally.',
    image: '/journal/flwr.png',
    keyBenefits: [
      'Reduces bloating naturally',
      'Soothes the stomach lining',
      'Supports healthy gut flora'
    ],
    recommendedBlend: {
      id: 9,
      name: 'Ginger Digest Tea',
      desc: 'A soothing blend for happy bellies.',
      img: '/shop/blue_tea1.png'
    },
    keyIngredients: [
      { name: 'Ginger', desc: 'Aids digestion', Icon: Flame, color: 'text-orange-500' },
      { name: 'Fennel', desc: 'Reduces gas', Icon: Wheat, color: 'text-yellow-600' },
      { name: 'Peppermint', desc: 'Cools & soothes', Icon: Wind, color: 'text-teal-500' }
    ]
  }
];

const journalFAQs = [
  { question: "How often do you publish new journal entries?", answer: "We aim to publish new articles, recipes, and wellness tips weekly. Subscribe to our newsletter to never miss an update!" },
  { question: "Can I submit my own herbal tea recipes?", answer: "We love hearing from our community! If you have a unique herbal blend recipe or a wellness story to share, please reach out to us via our contact page." },
  { question: "Are the wellness tips medically verified?", answer: "Our journal provides holistic wellness tips and traditional herbal knowledge. However, the information is for educational purposes and should not replace professional medical advice." },
  { question: "How do I find articles on specific ingredients?", answer: "You can use our 'Categories' navigation or the search feature at the top of the Journal page to easily filter and find articles about specific herbs, benefits, or wellness goals." }
];

const CustomIcons = {
  Lotus: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3c-1.5 3-3 6.5-3 10.5 0 2 1.5 3.5 3 3.5s3-1.5 3-3.5C15 9.5 13.5 6 12 3z"/>
      <path d="M12 17c-3 0-5.5-1-7-3-1-1.5-.5-3.5 1-4.5 1.5-1 3.5-1 5 0 1 1 1 3 1 4.5"/>
      <path d="M12 17c3 0 5.5-1 7-3 1-1.5.5-3.5-1-4.5-1.5-1-3.5-1-5 0-1 1-1 3-1 4.5"/>
    </svg>
  ),
  MoonStars: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      <path d="M17 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
      <path d="M21 8l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z" />
    </svg>
  ),
  ShieldPlus: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>
  ),
  Stomach: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 3v3c0 2 1 3 2 4s2 3 2 5-1 4-3 4-3-1-3-2" />
      <path d="M10 10c2-1 4-1 6 0 2 1 3 3 3 5s-2 5-5 5H9" />
    </svg>
  ),
  FaceSparkles: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 4a8 8 0 0 0-8 8c0 3 1.5 5.5 4 7 1 .5 2 1 3 1s2-.5 3-1c2.5-1.5 4-4 4-7a8 8 0 0 0-8-8z" />
      <path d="M9 11h.01" />
      <path d="M15 11h.01" />
      <path d="M10 15s1 1 2 1 2-1 2-1" />
      <path d="M5 8l1 1 1-1-1-1z" />
      <path d="M19 16l1 1 1-1-1-1z" />
    </svg>
  ),
  Torso: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 5c0 4 2 6 2 9s-2 5-2 9" />
      <path d="M17 5c0 4-2 6-2 9s2 5 2 9" />
      <path d="M9 14h6" />
      <path d="M4 14l3-3m0 6l-3-3" />
      <path d="M20 14l-3-3m0 6l3-3" />
    </svg>
  ),
  Lightning: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  BrainProfile: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4c-4 0-7 3-7 7 0 2 1 3.5 1.5 4.5.5 1 .5 2 .5 3 0 1.5 1.5 2.5 3 2.5h3c1.5 0 3-1 3-2.5v-1c1-1 2.5-2 3-4a7 7 0 0 0-7-9z" />
      <path d="M12 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
      <path d="M14 11a2 2 0 1 1 0 4" />
    </svg>
  )
};

interface JournalViewProps {
  posts: JournalPost[];
}

export default function JournalView({ posts }: JournalViewProps) {
  const [currentBenefitIdx, setCurrentBenefitIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefitIdx((prev) => (prev + 1) % benefitsData.length);
    }, 6000); // 6 seconds auto scroll
    return () => clearInterval(interval);
  }, []);

  const handlePrevBenefit = () => {
    setCurrentBenefitIdx((prev) => (prev === 0 ? benefitsData.length - 1 : prev - 1));
  };

  const handleNextBenefit = () => {
    setCurrentBenefitIdx((prev) => (prev + 1) % benefitsData.length);
  };

  const currentBenefit = benefitsData[currentBenefitIdx];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fdfbf7] font-sans">
      
      {/* Hero Section Wrapper for Mobile Padding */}
      <div className="w-full overflow-hidden">
        <section className="relative w-full overflow-hidden bg-[#f5f0e6] min-h-[60vh] lg:min-h-[85vh] flex flex-col">
          {/* Background Image covering the section */}
          <div 
            className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-[50%] xl:w-[55%] bg-no-repeat bg-cover bg-[position:60%_center] lg:bg-[90%_center] z-0"
            style={{ backgroundImage: `url('/assets/contactherosection.png')` }}
          >
            {/* Desktop gradient overlay to blend left edge */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-[150px] bg-gradient-to-r from-[#f5f0e6] via-[#f5f0e6]/60 to-transparent" style={{ zIndex: 1 }}></div>
          </div>

          <div className="flex-1 max-w-[1400px] w-full flex flex-col justify-start pt-32 lg:justify-center lg:py-20 mx-auto px-6 sm:px-8 xl:px-12 relative z-10">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[45%] xl:w-[48%] space-y-4 lg:space-y-8 z-10 relative"
            >
              {/* Localized white glow behind heading text for mobile readability */}
              <div className="lg:hidden absolute -inset-6 md:-inset-10 bg-white/70 blur-2xl rounded-full -z-10 pointer-events-none"></div>
              {/* Subtitle */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="hidden lg:block w-12 h-[2px] bg-[#c19236]"></div>
                <span className="text-[#c19236] font-bold text-[11px] lg:text-[13px] tracking-widest uppercase">
                  <span className="hidden lg:inline">Wellness Journal</span>
                </span>
                <div className="hidden lg:block w-12 h-[2px] bg-[#c19236]"></div>
              </div>

              {/* Title */}
              <h1 className="text-[32px] md:text-[52px] lg:text-[56px] xl:text-[64px] font-bold text-[#0F3D2E] leading-[1.1] tracking-tight drop-shadow-sm lg:drop-shadow-none" style={{ fontFamily: 'Playfair Display, serif' }}>
                Your Guide To <br />
                <span className="text-[#c19236]">Holistic Health</span>
              </h1>
              
              {/* Description */}
              <p className="text-[14px] md:text-[18px] text-[#4a5d53] font-medium leading-[1.6] lg:leading-[1.8] max-w-[280px] lg:max-w-md" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                <span className="lg:hidden">Discover expert insights and mindful practices to nurture your body and elevate your everyday life.</span>
                <span className="hidden lg:inline">Discover expert insights, traditional herbal wisdom, and mindful practices to nurture your body, calm your mind, and elevate your everyday life.</span>
              </p>

              {/* Button */}
              <div className="pt-2 lg:pt-0">
                <Link href="/shop" className="inline-flex items-center gap-3 bg-[#0F3D2E] text-white px-5 lg:px-8 py-2.5 lg:py-3.5 rounded-[8px] lg:rounded-full hover:bg-[#1a5441] transition-colors shadow-md text-[13px] lg:text-[15px] font-bold lg:font-semibold">
                  <span className="tracking-wide">Explore Our Teas</span>
                  <ArrowRight className="w-4 h-4 text-white lg:text-[#e2b755]" />
                </Link>
              </div>
            </motion.div>
          </div>


        </section>
      </div>

      {/* 2. Wellness Goals */}
      <section className="w-full bg-[#fcfbf9] border-y border-[#ece8dc]">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3 text-[#5e8b42] uppercase tracking-[0.2em] text-[11px] font-bold">
            <Leaf className="w-3.5 h-3.5" fill="currentColor" />
            WELLNESS GOALS
            <Leaf className="w-3.5 h-3.5" fill="currentColor" />
          </div>
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#0F3D2E] mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Choose Your <span className="text-[#c19236]">Wellness Goal</span>
          </h2>
          <p className="text-[15px] text-[#4a5d53] max-w-lg leading-relaxed font-medium">
            Every cup brings you closer to a better you. <br className="hidden sm:block" />
            Select a goal and let our teas support your wellness journey.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-[1.5px] w-16 md:w-24 bg-gradient-to-r from-transparent to-[#5e8b42]/30"></div>
            <Leaf className="w-5 h-5 text-[#5e8b42]" fill="currentColor" />
            <div className="h-[1.5px] w-16 md:w-24 bg-gradient-to-l from-transparent to-[#5e8b42]/30"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { icon: CustomIcons.Lotus, iconBg: 'bg-[#f4f7f4]', iconColor: 'text-[#5e8b42]', title: "Stress Relief", desc: "Calm your mind and\nreduce daily stress.", link: "#" },
            { icon: CustomIcons.MoonStars, iconBg: 'bg-[#f4f3fa]', iconColor: 'text-[#6b528a]', title: "Better Sleep", desc: "Relax your body and\nimprove sleep quality.", link: "#" },
            { icon: CustomIcons.ShieldPlus, iconBg: 'bg-[#f4f7f4]', iconColor: 'text-[#5e8b42]', title: "Immunity Boost", desc: "Strengthen your immunity\nnaturally.", link: "#" },
            { icon: CustomIcons.Stomach, iconBg: 'bg-[#f4f7f4]', iconColor: 'text-[#5e8b42]', title: "Digestive Support", desc: "Aid digestion and\nsupport gut health.", link: "#" },
            { icon: CustomIcons.FaceSparkles, iconBg: 'bg-[#fdf4f2]', iconColor: 'text-[#cf6c5d]', title: "Healthy Skin", desc: "Nourish your skin and\nbring out your natural glow.", link: "#" },
            { icon: CustomIcons.Torso, iconBg: 'bg-[#fdf7ee]', iconColor: 'text-[#a87f4c]', title: "Weight Management", desc: "Boost metabolism and\nsupport healthy weight.", link: "#" },
            { icon: CustomIcons.Lightning, iconBg: 'bg-[#fdf4ed]', iconColor: 'text-[#b97a3a]', title: "Energy Boost", desc: "Feel refreshed and\nstay active all day.", link: "#" },
            { icon: CustomIcons.BrainProfile, iconBg: 'bg-[#f2f6f8]', iconColor: 'text-[#4c7c8c]', title: "Mental Clarity", desc: "Improve focus, memory\nand mental clarity.", link: "#" },
          ].map((goal, i) => (
            <div key={i} className="bg-white border-2 border-[#ece8dc] hover:border-[#c19236] active:border-[#c19236] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-[24px] p-6 lg:p-8 flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative group cursor-pointer overflow-hidden">

               
               <div className="flex-1 flex flex-col items-center text-center relative z-10">
                 <div className={`w-[72px] h-[72px] ${goal.iconBg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white shadow-sm`}>
                   {typeof goal.icon === 'string' ? (
                     <img src={goal.icon} alt={goal.title} className="w-8 h-8 object-contain" />
                   ) : (
                     <goal.icon className={`w-8 h-8 ${goal.iconColor} stroke-[1.5]`} />
                   )}
                 </div>
                 <h4 className="font-bold text-[#0F3D2E] text-[17px] mb-2.5">{goal.title}</h4>
                 <p className="text-[14px] text-[#6b7b72] leading-[1.6] whitespace-pre-line mb-8">
                   {goal.desc}
                 </p>
                 <div className="mt-auto pt-2">
                   <span className="text-[13px] font-bold text-[#0F3D2E] flex items-center group-hover:text-[#5e8b42] transition-colors">
                     Explore Teas <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                   </span>
                 </div>
               </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 3. What Benefits Do Our Teas Offer? */}
      <section className="w-full bg-white">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-gradient-to-br from-[#eaf0e2] to-[#f3f6ee] border border-[#e0e8d5] rounded-3xl p-5 lg:p-8 flex flex-col lg:flex-row items-center gap-2 lg:gap-6 relative overflow-hidden shadow-sm">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-[35%] relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h4 className="text-[10px] font-bold tracking-[0.15em] text-[#b38529] uppercase mb-3 flex items-center justify-center lg:justify-start gap-2">
              THE POWER OF HERBAL BLENDS <Leaf className="w-3 h-3" />
            </h4>
            <h2 className="text-[28px] lg:text-[40px] font-bold text-[#0F3D2E] leading-[1.2] mb-3 lg:mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Benefits Do<br className="hidden lg:block"/>Our Teas Offer?
            </h2>
            <p className="text-[13px] lg:text-[15px] text-[#4a5d53] mb-5 lg:mb-6 leading-relaxed max-w-[300px] lg:max-w-[350px]">
              Our carefully crafted herbal blends are designed to support your holistic wellness journey.
            </p>
            <Link href="/blog" className="inline-flex items-center justify-center gap-2 bg-[#0F3D2E] text-white px-6 lg:px-7 py-2.5 lg:py-3 rounded-md hover:bg-[#1a5441] transition-colors font-semibold text-[12px] lg:text-[13px]">
              Explore All Benefits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Visual Content */}
          <div className="w-full lg:w-[65%] relative flex justify-center items-center h-[340px] sm:h-[380px] lg:h-[480px] mt-4 lg:mt-0">
             
             {/* Responsive Wrapper for Arc and Cup */}
             <div className="relative w-[75%] sm:w-[80%] lg:w-[85%] max-w-[500px] aspect-[2/1] mt-6 lg:mt-20">
             
                 {/* Central Tea Cup Image */}
                 <img src="/assets/Adobe%20Express%20-%20file.png" alt="Herbal Tea Cup" className="absolute top-[8%] sm:top-[18%] left-[22.5%] w-[55%] object-contain z-10 drop-shadow-2xl pointer-events-none" />
                 
                 {/* The Arc and Nodes Container */}
                 <div className="absolute inset-0 z-20">
                {/* The dashed border arc */}
                <div className="absolute inset-0 border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] border-dashed border-[#c19236] opacity-50 rounded-t-full pointer-events-none"></div>

                {/* The 4 Golden Dots perfectly positioned on the dashed arc line */}
                <div className="absolute top-[70%] left-[2.35%] -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] lg:w-[6px] lg:h-[6px] rounded-full bg-[#c19236]"></div>
                <div className="absolute top-[11.3%] left-[26.95%] -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] lg:w-[6px] lg:h-[6px] rounded-full bg-[#c19236]"></div>
                <div className="absolute top-[11.3%] left-[73.05%] -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] lg:w-[6px] lg:h-[6px] rounded-full bg-[#c19236]"></div>
                <div className="absolute top-[70%] left-[97.65%] -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] lg:w-[6px] lg:h-[6px] rounded-full bg-[#c19236]"></div>

                {/* Nodes with their icons perfectly centered on the arc line */}
                
                {/* 1. Better Sleep (90 deg - top center) */}
                <div className="absolute w-0 h-0" style={{ left: '50%', top: '0%' }}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                     <div className="flex flex-col text-center absolute bottom-full mb-2 sm:mb-4 w-max">
                       <span className="text-[12px] lg:text-[13px] font-bold text-[#0F3D2E] whitespace-nowrap">Better Sleep</span>
                       <span className="text-[11px] text-[#6b7b72] hidden md:block w-32 leading-tight mt-1">Calms the mind and promotes deep rest</span>
                     </div>
                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-[#5e8b42] shadow-sm border border-[#ece8dc] relative z-10">
                       <Moon className="w-4 h-4 sm:w-6 sm:h-6" />
                     </div>
                  </div>
                </div>

                {/* 2. Stress Relief (145 deg - left mid) */}
                <div className="absolute w-0 h-0" style={{ left: '9%', top: '42.7%' }}>
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center">
                    <div className="flex flex-col text-center sm:text-right absolute top-full sm:static sm:top-auto left-1/2 -translate-x-1/2 sm:-translate-x-0 mt-2 sm:mt-0 sm:mr-2">
                       <span className="text-[12px] lg:text-[13px] font-bold text-[#0F3D2E] whitespace-nowrap">Stress Relief</span>
                       <span className="text-[11px] text-[#6b7b72] hidden md:block w-32 leading-tight mt-1">Helps reduce anxiety and uplift mood</span>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-[#5e8b42] shadow-sm border border-[#ece8dc] shrink-0 translate-x-1/2 relative z-10">
                       <Leaf className="w-4 h-4 sm:w-6 sm:h-6" />
                     </div>
                  </div>
                </div>

                {/* 3. Immunity Boost (180 deg - bottom left) */}
                <div className="absolute w-0 h-0" style={{ left: '0%', top: '100%' }}>
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center">
                    <div className="flex flex-col text-center sm:text-right absolute top-full sm:static sm:top-auto left-1/2 -translate-x-1/2 sm:-translate-x-0 mt-2 sm:mt-0 sm:mr-2">
                       <span className="text-[12px] lg:text-[13px] font-bold text-[#0F3D2E] whitespace-nowrap">Immunity Boost</span>
                       <span className="text-[11px] text-[#6b7b72] hidden md:block w-32 leading-tight mt-1">Rich in antioxidants and natural nutrients</span>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-[#5e8b42] shadow-sm border border-[#ece8dc] shrink-0 translate-x-1/2 relative z-10">
                       <Shield className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>

                {/* 4. Digestion Support (35 deg - right mid) */}
                <div className="absolute w-0 h-0" style={{ left: '91%', top: '42.7%' }}>
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-[#5e8b42] shadow-sm border border-[#ece8dc] shrink-0 -translate-x-1/2 relative z-10">
                       <Zap className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex flex-col text-center sm:text-left absolute top-full sm:static sm:top-auto left-1/2 -translate-x-1/2 sm:translate-x-0 mt-2 sm:mt-0 sm:ml-2">
                       <span className="text-[12px] lg:text-[13px] font-bold text-[#0F3D2E] whitespace-nowrap">Digestion Support</span>
                       <span className="text-[11px] text-[#6b7b72] hidden md:block w-32 leading-tight mt-1">Aids digestion and reduces bloating</span>
                    </div>
                  </div>
                </div>

                {/* 5. Women's Wellness (0 deg - bottom right) */}
                <div className="absolute w-0 h-0" style={{ left: '100%', top: '100%' }}>
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-[#5e8b42] shadow-sm border border-[#ece8dc] shrink-0 -translate-x-1/2 relative z-10">
                       <User className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex flex-col text-center sm:text-left absolute top-full sm:static sm:top-auto left-1/2 -translate-x-1/2 sm:translate-x-0 mt-2 sm:mt-0 sm:ml-2">
                       <span className="text-[12px] lg:text-[13px] font-bold text-[#0F3D2E] whitespace-nowrap">Women's Wellness</span>
                       <span className="text-[11px] text-[#6b7b72] hidden md:block w-32 leading-tight mt-1">Supports hormonal balance and vitality</span>
                    </div>
                  </div>
                </div>

             </div>

             </div>

          </div>
        </div>
        </div>
      </section>


      {/* 5. Benefits Explained */}
      <section className="w-full bg-[#fcfbf9] border-t border-[#ece8dc]">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 lg:mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits Explained</h2>
              <Leaf className="w-5 h-5 text-[#c19236]" fill="currentColor" />
            </div>
            <p className="text-[15px] text-[#6b7b72]">Dive deeper into the benefits and ingredients that make our blends so effective.</p>
          </div>
          <a href="#" className="flex items-center text-[14px] font-bold text-[#0F3D2E] hover:text-[#5e8b42] transition-colors">
            View All Benefits <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[1100px] mx-auto mt-4">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrevBenefit}
            className="absolute top-[150px] md:top-[225px] lg:top-1/2 -translate-y-1/2 left-[-15px] md:left-[-24px] z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-[#ece8dc] text-[#c19236] hover:bg-[#fcfbf9] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Main Card */}
          <div className="w-full bg-white rounded-[24px] overflow-hidden border border-[#ece8dc] shadow-[0_4px_24px_rgba(0,0,0,0.04)] grid">
            
            <AnimatePresence>
              <motion.div 
                key={currentBenefitIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col lg:flex-row [grid-area:1/1]"
              >
                {/* Left Image */}
                <div className="w-full lg:w-[45%] xl:w-[50%] relative h-[300px] md:h-[450px] lg:h-auto min-h-[300px]">
                  <img src={currentBenefit.image} alt={currentBenefit.tag} className="absolute inset-0 w-full h-full object-cover" />
                </div>

                {/* Right Content */}
                <div className="w-full lg:w-[55%] xl:w-[50%] p-6 md:p-8 flex flex-col justify-center bg-white">
                  <span className="text-[#c19236] font-bold text-[12px] tracking-[0.2em] uppercase mb-2">
                    {currentBenefit.tag}
                  </span>
                  <h3 className="text-[28px] md:text-[34px] font-bold text-[#0F3D2E] leading-[1.2] mb-2 whitespace-pre-line" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {currentBenefit.title}
                  </h3>
                  <p className="text-[15px] text-[#6b7b72] leading-[1.6] mb-5 max-w-[450px]">
                    {currentBenefit.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 w-full">
                    
                    {/* Left Column: Top Benefits */}
                    <div className="flex-1">
                      <h4 className="text-[14px] font-bold text-[#0F3D2E] mb-4">Top Benefits</h4>
                      <ul className="space-y-4">
                        {currentBenefit.keyBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle2 className="w-[18px] h-[18px] text-[#c19236] shrink-0" />
                            <span className="text-[14px] text-[#4a5d53]">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Column: Key Ingredients */}
                    <div className="flex-1 sm:pl-4 lg:pl-12">
                      <h4 className="text-[14px] font-bold text-[#0F3D2E] mb-4">Key Ingredients</h4>
                      <div className="space-y-4">
                        {currentBenefit.keyIngredients.map((ingredient, idx) => {
                          const IconComp = ingredient.Icon;
                          return (
                            <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                              <div className="w-8 h-8 rounded-full bg-[#fcfbf9] border border-[#ece8dc] flex items-center justify-center shrink-0 group-hover:border-[#c19236] transition-colors">
                                <IconComp className={`w-4 h-4 ${ingredient.color || 'text-[#5e8b42]'}`} />
                              </div>
                              <span className="text-[14px] font-bold text-[#0F3D2E]">{ingredient.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNextBenefit}
            className="absolute top-[150px] md:top-[225px] lg:top-1/2 -translate-y-1/2 right-[-15px] md:right-[-24px] z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-[#ece8dc] text-[#c19236] hover:bg-[#fcfbf9] transition-colors"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

        </div>
        </div>
      </section>

      {/* 6. What Our Customers Say (Testimonials Component) */}
      <TestimonialsSection />

      {/* 7. FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions." 
        subtitle="Learn more about our wellness content, recipes, and community stories. Can't find what you're looking for? Feel free to contact us."
        faqs={journalFAQs} 
      />

    </div>
  );
}
