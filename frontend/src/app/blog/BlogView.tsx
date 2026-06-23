'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Search, LayoutGrid, Coffee, Heart, Sprout, Utensils, Sun, Smile, ArrowRight, RefreshCw, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOPICS = [
  { name: 'All Articles', icon: LayoutGrid },
  { name: 'Herbal Tea', icon: Coffee },
  { name: 'Ayurveda', icon: Leaf },
  { name: 'Wellness', icon: Heart },
  { name: 'Ingredients', icon: Sprout },
  { name: 'Recipes', icon: Utensils },
  { name: 'Lifestyle', icon: Sun },
  { name: 'Self Care', icon: Smile }
];

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
  const [activeTopic, setActiveTopic] = useState('All Articles');
  const [currentFeaturedIdx, setCurrentFeaturedIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeaturedIdx((prev) => (prev + 1) % FEATURED_ARTICLES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featured = FEATURED_ARTICLES[currentFeaturedIdx];

  const filteredArticles = activeTopic === 'All Articles' 
    ? ARTICLES 
    : ARTICLES.filter(article => article.tag.toLowerCase().includes(activeTopic.toLowerCase()) || activeTopic.toLowerCase().includes(article.tag.toLowerCase()));

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcfbf9] pb-10">
      
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#f5f0e6] py-16 lg:py-24">
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-[50%] xl:w-[55%] bg-no-repeat bg-cover bg-center opacity-40 lg:opacity-100 z-0"
          style={{ backgroundImage: `url('/assets/Journalherosection.png')` }}
        >
           <div className="hidden lg:block absolute inset-y-0 left-0 w-[400px] bg-gradient-to-r from-[#f5f0e6] via-[#f5f0e6]/60 to-transparent"></div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 xl:px-8 relative z-10 flex">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] xl:w-[48%] space-y-6"
          >
            <h4 className="text-[10px] font-bold tracking-[0.15em] text-[#b38529] uppercase flex items-center gap-2">
              HERBAL JOURNAL <Leaf className="w-3 h-3" />
            </h4>

            <h1 className="text-[38px] md:text-[48px] lg:text-[56px] font-bold text-[#0F3D2E] leading-[1.1]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Insights for a<br />
              Healthier You
            </h1>
            
            <p className="text-[15px] md:text-[16px] text-[#4a5d53] leading-[1.6] max-w-[450px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Explore expert tips, herbal guides, wellness rituals, and Ayurvedic wisdom to support your natural wellness journey.
            </p>

            <div className="relative max-w-[450px] mt-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] rounded-full overflow-hidden bg-white flex border border-[#ece8dc] focus-within:border-[#c19236]/50 focus-within:shadow-[0_4px_24px_-4px_rgba(193,146,54,0.15)] transition-all duration-300">
              <input type="text" placeholder="Search articles, topics, ingredients..." className="flex-1 px-6 py-4 outline-none text-[#4a5d53] text-[14px] bg-transparent" style={{ fontFamily: 'Nunito Sans, sans-serif' }} />
              <button className="bg-[#0F3D2E] text-white px-8 py-4 hover:bg-[#1a5441] transition-colors flex items-center justify-center font-bold text-[14px] gap-2">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Navigation Pills */}
      <section className="bg-[#fcfbf9] py-6 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
          <div className="bg-white rounded-full border border-[#ece8dc] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] py-3 px-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 w-max lg:mx-auto">
              {TOPICS.map((topic, idx) => {
                const Icon = topic.icon;
                const isActive = topic.name === activeTopic;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTopic(topic.name)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'bg-[#0F3D2E] border-[#0F3D2E] text-white shadow-md'
                        : 'bg-white border-transparent text-[#4a5d53] hover:bg-[#fcfbf9] hover:border-[#ece8dc] hover:shadow-sm'
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-[#8a958f]'}`} strokeWidth={2} />
                    <span className="text-[13px] font-bold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{topic.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Article & Popular Topics */}
      <section className="py-12 bg-[#fcfbf9]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Featured Article */}
            {/* Featured Article */}
            <div className="flex-1 bg-white rounded-[16px] border border-[#ece8dc] overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
              
              {/* Ghost Element for Layout Height */}
              <div className="flex flex-col md:flex-row opacity-0 pointer-events-none invisible">
                <div className="w-full md:w-[45%] h-[240px] md:h-auto shrink-0"></div>
                <div className="w-full md:w-[55%] p-5 lg:p-6 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase mb-1.5" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{FEATURED_ARTICLES[0].tag}</span>
                  <h3 className="text-[22px] lg:text-[24px] font-bold mb-2.5 leading-[1.2] whitespace-pre-line" style={{ fontFamily: 'Playfair Display, serif' }}>{FEATURED_ARTICLES[0].title}</h3>
                  <p className="text-[13px] mb-4 leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{FEATURED_ARTICLES[0].desc}</p>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full" />
                    <div className="text-[11px] lg:text-[12px] flex items-center gap-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      <span className="font-bold">{FEATURED_ARTICLES[0].author}</span> &bull; <span>{FEATURED_ARTICLES[0].date}</span>
                    </div>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-[8px] text-[12px] font-bold">Read Full Article</div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                <motion.div 
                  key={currentFeaturedIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col md:flex-row group"
                >
                  <div className="w-full md:w-[45%] h-[240px] md:h-auto relative overflow-hidden bg-[#f5f0e6] shrink-0">
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-[6px] z-10 border border-[#ece8dc]/50 shadow-sm">
                       <span className="text-[10px] font-bold text-[#0F3D2E] tracking-wider" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>FEATURED ARTICLE</span>
                    </div>
                    <img src={featured.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="w-full md:w-[55%] p-5 lg:p-6 flex flex-col justify-center">
                    <span className="text-[#c19236] text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{featured.tag}</span>
                    <h3 className="text-[22px] lg:text-[24px] font-bold text-[#0F3D2E] mb-2.5 leading-[1.2] group-hover:text-[#2c4a35] transition-colors whitespace-pre-line" style={{ fontFamily: 'Playfair Display, serif' }}>{featured.title}</h3>
                    <p className="text-[13px] text-[#4a5d53] mb-4 leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{featured.desc}</p>
                    <div className="flex items-center gap-3 mb-5">
                      <img src={featured.authorImg} className="w-8 h-8 rounded-full border border-[#ece8dc]" />
                      <div className="text-[11px] lg:text-[12px] text-[#6b7b72] flex items-center gap-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        <span className="font-bold text-[#0F3D2E]">{featured.author}</span> &bull; <span>{featured.date}</span> &bull; <span>{featured.readTime}</span>
                      </div>
                    </div>
                    <div>
                      <Link href={featured.link} className="inline-flex items-center gap-2 bg-[#0F3D2E] text-white px-5 py-2 rounded-[8px] hover:bg-[#1a5441] transition-colors text-[12px] font-bold">
                        Read Full Article <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
                {FEATURED_ARTICLES.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentFeaturedIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentFeaturedIdx ? 'bg-[#0F3D2E] w-4' : 'bg-[#0F3D2E]/20 hover:bg-[#0F3D2E]/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* Popular Topics Sidebar */}
            <div className="w-full lg:w-[300px] shrink-0 bg-[#fdfcf9] border border-[#ece8dc] rounded-[16px] p-5 lg:p-6 flex flex-col shadow-sm">
              <h3 className="text-[18px] font-bold text-[#0F3D2E] mb-4 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Popular Topics <Leaf className="w-4 h-4 text-[#c19236]" fill="currentColor" />
              </h3>
              <div className="flex flex-col gap-3 flex-1">
                {POPULAR_TOPICS.map((pt, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-[#ece8dc]/80 pb-2 last:border-0 hover:border-[#c19236]/30 transition-colors">
                    <span className="text-[13px] text-[#4a5d53] group-hover:text-[#c19236] font-bold transition-colors" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{pt.name}</span>
                    <span className="text-[11px] text-[#8a958f] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>({pt.count})</span>
                  </div>
                ))}
              </div>
              <Link href="/topics" className="mt-4 text-[12px] font-bold text-[#0F3D2E] flex items-center gap-1.5 hover:text-[#c19236] transition-colors" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                View All Topics <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Latest Articles Grid */}
      <section className="py-10 bg-[#fcfbf9]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
          <div className="mb-8">
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#0F3D2E] flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Latest Articles <Leaf className="w-5 h-5 text-[#c19236]" fill="currentColor" />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredArticles.length > 0 ? filteredArticles.map((article, idx) => (
              <Link href={`/blog/${article.id}`} key={idx}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-[12px] border border-[#ece8dc] overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg transition-all duration-300 h-full"
                >
                  <div className="h-[200px] relative overflow-hidden bg-[#f5f0e6]">
                    <img src={article.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[#c19236] text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{article.tag}</span>
                    <h4 className="text-[17px] font-bold text-[#0F3D2E] mb-2 leading-[1.3] group-hover:text-[#2c4a35] transition-colors min-h-[44px]" style={{ fontFamily: 'Playfair Display, serif' }}>{article.title}</h4>
                    <p className="text-[13px] text-[#6b7b72] mb-5 leading-[1.5] line-clamp-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{article.desc}</p>
                    <div className="mt-auto flex items-center gap-2 pt-4 border-t border-[#fcfbf9]">
                      <img src={article.authorImg} className="w-6 h-6 rounded-full border border-[#ece8dc]" />
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

          <div className="mt-12 flex justify-center">
            <button className="group flex items-center gap-2 border-[1.5px] border-[#0F3D2E]/40 text-[#0F3D2E] bg-transparent hover:bg-[#0F3D2E] hover:border-[#0F3D2E] hover:text-white px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-[14px] font-bold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Load More Articles <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </section>


    </div>
  );
}
