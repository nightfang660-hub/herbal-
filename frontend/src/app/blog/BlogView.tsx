'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, ArrowRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const POPULAR_TOPICS = [
  { name: 'Immunity Boost', count: '14' },
  { name: 'Detox & Cleanse', count: '12' },
  { name: 'Better Sleep', count: '10' },
  { name: 'Stress Relief', count: '09' },
  { name: "Women's Wellness", count: '06' },
];

const FEATURED_ARTICLES = [
  {
    tag: "WELLNESS",
    title: "The Healing Power\nof Hibiscus Tea",
    desc: "Discover how this vibrant flower supports heart health, skin glow, and natural vitality.",
    author: "Ananya R.",
    date: "May 20, 2024",
    readTime: "5 min read",
    authorImg: "https://i.pravatar.cc/150?img=32",
    img: "/home/hibiscus.png",
    link: "/blog/1"
  },
  {
    tag: "AYURVEDA",
    title: "Understanding\nAshwagandha",
    desc: "A deep dive into the ancient adaptogen that helps balance stress and anxiety naturally.",
    author: "Ritu Sharma",
    date: "May 18, 2024",
    readTime: "6 min read",
    authorImg: "https://i.pravatar.cc/150?img=5",
    img: "/home/img6.jpg",
    link: "/blog/7"
  },
  {
    tag: "HERBAL TEA",
    title: "The Ultimate Guide\nto Green Tea",
    desc: "Explore the different types of green tea, their unique benefits, and how to brew the perfect cup.",
    author: "Kavya Iyer",
    date: "May 15, 2024",
    readTime: "4 min read",
    authorImg: "https://i.pravatar.cc/150?img=9",
    img: "/home/img1.jpg",
    link: "/blog/2"
  },
  {
    tag: "INGREDIENTS",
    title: "The Magic of\nTurmeric",
    desc: "Why this golden spice is a must-have in your daily routine for inflammation and immunity.",
    author: "Priya Desai",
    date: "May 12, 2024",
    readTime: "7 min read",
    authorImg: "https://i.pravatar.cc/150?img=43",
    img: "/home/img2.jpg",
    link: "/blog/10"
  },
  {
    tag: "LIFESTYLE",
    title: "Creating a\nMinimalist Space",
    desc: "How a decluttered environment leads to a decluttered mind and greater daily focus.",
    author: "Ananya R.",
    date: "May 08, 2024",
    readTime: "5 min read",
    authorImg: "https://i.pravatar.cc/150?img=32",
    img: "/home/img4.jpg",
    link: "/blog/12"
  },
  {
    tag: "SELF CARE",
    title: "Sunday Bath Rituals\nwith Herbs",
    desc: "Elevate your weekend soak with essential botanicals for complete relaxation.",
    author: "Ritu Sharma",
    date: "May 05, 2024",
    readTime: "4 min read",
    authorImg: "https://i.pravatar.cc/150?img=5",
    img: "/home/img5.jpg",
    link: "/blog/13"
  }
];

const ARTICLES = [
  {
    id: 1,
    tag: "WELLNESS",
    title: "7 Ayurvedic Herbs For Better Digestion",
    desc: "Simple herbs that support gut health and improve metabolism naturally.",
    author: "Ananya R.",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 20, 2024",
    img: "/blog/blog1.png"
  },
  {
    id: 2,
    tag: "HERBAL TEA",
    title: "Tulsi Benefits For Daily Wellness",
    desc: "Discover the amazing health benefits of tulsi for immunity and stress relief.",
    author: "Ritu Sharma",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "May 18, 2024",
    img: "/blog/blog2.png"
  },
  {
    id: 3,
    tag: "LIFESTYLE",
    title: "Chamomile Tea For Better Sleep",
    desc: "How chamomile helps calm your mind and improve sleep quality.",
    author: "Ananya R.",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 16, 2024",
    img: "/blog/blog_3.png"
  },
  {
    id: 4,
    tag: "INGREDIENTS",
    title: "Moringa: The Miracle Leaf Of Ayurveda",
    desc: "Nutrition, benefits, and uses of moringa in daily life.",
    author: "Ritu Sharma",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "May 12, 2024",
    img: "/blog/blog_4.png"
  },
  {
    id: 5,
    tag: "RECIPES",
    title: "Create A Relaxing Tea Ritual",
    desc: "Simple tea rituals to reduce stress and bring mindfulness to your day.",
    author: "Ananya R.",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 10, 2024",
    img: "/blog/blog_5.png"
  },
  {
    id: 6,
    tag: "HERBAL TEA",
    title: "Brewing the Perfect Cup of Oolong",
    desc: "A step-by-step guide to preparing oolong tea to perfection.",
    author: "Kavya Iyer",
    authorImg: "https://i.pravatar.cc/150?img=9",
    date: "May 08, 2024",
    img: "/blog/blog_6.png"
  },
  {
    id: 7,
    tag: "AYURVEDA",
    title: "Ashwagandha For Stress Relief",
    desc: "How this powerful adaptogen helps balance stress and anxiety.",
    author: "Ritu Sharma",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "May 09, 2024",
    img: "/home/img6.jpg" 
  },
  {
    id: 8,
    tag: "SELF CARE",
    title: "Herbal Ingredients To Boost Immunity",
    desc: "Explore the top herbs and botanicals that strengthen your immune system.",
    author: "Ananya R.",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 06, 2024",
    img: "/home/hibiscus.png" 
  },
  {
    id: 9,
    tag: "WELLNESS",
    title: "Morning Rituals for Lasting Energy",
    desc: "Start your day right with these natural wellness practices.",
    author: "Priya Desai",
    authorImg: "https://i.pravatar.cc/150?img=43",
    date: "May 04, 2024",
    img: "/home/img1.jpg"
  },
  {
    id: 10,
    tag: "INGREDIENTS",
    title: "The Magic of Turmeric",
    desc: "Why this golden spice is a must-have in your daily routine.",
    author: "Kavya Iyer",
    authorImg: "https://i.pravatar.cc/150?img=9",
    date: "May 02, 2024",
    img: "/home/img2.jpg"
  },
  {
    id: 11,
    tag: "RECIPES",
    title: "Golden Milk Lattes at Home",
    desc: "Learn how to make the perfectly spiced, warming golden milk.",
    author: "Ananya R.",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "Apr 28, 2024",
    img: "/home/img3.jpg"
  },
  {
    id: 12,
    tag: "LIFESTYLE",
    title: "Creating a Minimalist Space",
    desc: "How a decluttered environment leads to a decluttered mind.",
    author: "Ritu Sharma",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "Apr 25, 2024",
    img: "/home/img4.jpg"
  },
  {
    id: 13,
    tag: "SELF CARE",
    title: "Sunday Bath Rituals with Herbs",
    desc: "Elevate your weekend soak with essential botanicals.",
    author: "Priya Desai",
    authorImg: "https://i.pravatar.cc/150?img=43",
    date: "Apr 21, 2024",
    img: "/home/img5.jpg"
  },
  {
    id: 14,
    tag: "AYURVEDA",
    title: "Triphala: The Master Detoxifier",
    desc: "Understanding the ancient three-fruit blend for complete health.",
    author: "Kavya Iyer",
    authorImg: "https://i.pravatar.cc/150?img=9",
    date: "Apr 18, 2024",
    img: "/home/img6.jpg"
  },
  {
    id: 15,
    tag: "HERBAL TEA",
    title: "Matcha vs. Green Tea",
    desc: "Unpacking the differences and benefits of these two powerhouses.",
    author: "Ananya R.",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "Apr 15, 2024",
    img: "/blog/blog1.png"
  },
  {
    id: 16,
    tag: "WELLNESS",
    title: "The Importance of Hydration",
    desc: "Why water and herbal infusions are the cornerstone of vitality.",
    author: "Ritu Sharma",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "Apr 12, 2024",
    img: "/blog/blog2.png"
  }
];

export default function BlogPage() {
  const [currentFeaturedIdx, setCurrentFeaturedIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeaturedIdx((prev) => (prev + 1) % FEATURED_ARTICLES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featured = FEATURED_ARTICLES[currentFeaturedIdx];

  const filteredArticles = activeTopic
    ? ARTICLES.filter((article) => {
        const query = activeTopic.toLowerCase();
        const keywords = query.replace(/&/g, '').split(/\s+/).filter(w => w.length > 3);
        const textToSearch = `${article.title} ${article.desc} ${article.tag}`.toLowerCase();
        
        if (textToSearch.includes(query)) return true;
        return keywords.some(kw => textToSearch.includes(kw));
      })
    : ARTICLES;

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white pb-10">
      
      {/* Hero Section (Matching About/Contact) */}
      <section className="relative w-full overflow-hidden bg-white min-h-[50vh] lg:min-h-[70vh] flex flex-col">
        {/* Right Side Background Image (Desktop) */}
        <div 
          className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-[50%] xl:w-[55%] bg-no-repeat bg-cover bg-[position:60%_center] lg:bg-[90%_center] z-0"
          style={{ backgroundImage: `url('/assets/Journalherosection.png')` }}
        >
           {/* Dark gradient on mobile so the white text at the bottom is highly legible */}
           <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" style={{ zIndex: 1 }}></div>
           <div className="hidden lg:block absolute inset-y-0 -left-[2px] w-[200px] bg-gradient-to-r from-white via-white/70 to-white/0" style={{ zIndex: 1 }}></div>
        </div>

        <div className="flex-1 max-w-[1400px] w-full flex flex-col justify-end pb-10 pt-20 lg:justify-center lg:py-20 mx-auto px-4 sm:px-6 xl:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[45%] xl:w-[48%] space-y-8"
            >
              {/* Subtitle */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
                <span className="text-[#D4AF37] font-bold text-[13px] tracking-widest uppercase">
                  OUR JOURNAL
                </span>
                <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
              </div>
  
              {/* Title */}
              <h1 className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[42px] 2xl:text-[46px] whitespace-nowrap font-bold text-white lg:text-[#0F3D2E] leading-[1.2] tracking-tight drop-shadow-md lg:drop-shadow-none" style={{ fontFamily: 'Playfair Display, serif' }}>
                Herbal Wisdom & <span className="text-[#D4AF37]">Insights</span>
              </h1>
              
              {/* Description */}
              <p className="text-[16px] md:text-[18px] text-white/95 lg:text-[#4a5d53] font-medium leading-[1.8] max-w-[500px] drop-shadow-md lg:drop-shadow-none" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Discover simple tips, natural remedies, and easy ways to stay healthy every day.
              </p>
  
            </motion.div>
        </div>
      </section>

      {/* Main Content Area Removed */}

      {/* 4. Latest Articles Grid */}
      <section className="py-10 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#0F3D2E] flex items-center gap-2 shrink-0" style={{ fontFamily: 'Playfair Display, serif' }}>
              Latest Articles <Leaf className="w-5 h-5 text-[#D4AF37]" fill="currentColor" />
            </h2>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              <button 
                onClick={() => setActiveTopic(null)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${!activeTopic ? 'bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/30 border border-[#D4AF37]' : 'bg-white text-[#6b7b72] hover:text-[#D4AF37] border border-[#F8F5EE] hover:border-[#D4AF37]/50'}`}
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                All Articles
              </button>
              {POPULAR_TOPICS.map((pt, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTopic(pt.name)}
                  className={`shrink-0 px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${activeTopic === pt.name ? 'bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/30 border border-[#D4AF37]' : 'bg-white text-[#6b7b72] hover:text-[#D4AF37] border border-[#F8F5EE] hover:border-[#D4AF37]/50'}`}
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  {pt.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleArticles.length > 0 ? visibleArticles.map((article, idx) => (
              <Link href={`/blog/${article.id}`} key={idx}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-[12px] border border-[#F8F5EE] overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg transition-all duration-300 h-full"
                >
                  <div className="h-[200px] relative overflow-hidden bg-[#F8F5EE]">
                    <img src={article.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{article.tag}</span>
                    <h4 className="text-[17px] font-bold text-[#0F3D2E] mb-2 leading-[1.3] group-hover:text-[#0F3D2E] transition-colors min-h-[44px]" style={{ fontFamily: 'Playfair Display, serif' }}>{article.title}</h4>
                    <p className="text-[13px] text-[#6b7b72] mb-5 leading-[1.5] line-clamp-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{article.desc}</p>
                    <div className="mt-auto flex items-center gap-2 pt-4 border-t border-[#F8F5EE]/50">
                      <img src={article.authorImg} className="w-6 h-6 rounded-full border border-[#F8F5EE]" />
                      <span className="text-[11px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{article.author}</span>
                      <span className="text-[10px] text-[#8a958f] ml-auto font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{article.date}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )) : (
              <div className="col-span-full py-12 text-center text-[#6b7b72]">
                No articles found for this topic.
              </div>
            )}
          </div>

          {filteredArticles.length > visibleCount && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="group flex items-center gap-2 border-[1.5px] border-[#0F3D2E]/40 text-[#0F3D2E] bg-transparent hover:bg-[#0F3D2E] hover:border-[#0F3D2E] hover:text-white px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-[14px] font-bold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                Load More Articles <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          )}
        </div>
      </section>




    </div>
  );
}
