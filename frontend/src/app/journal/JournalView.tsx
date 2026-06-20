'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Droplets, Moon, Coffee, Heart, Leaf } from 'lucide-react';
import { JournalPost } from './types';

interface JournalViewProps {
  posts: JournalPost[];
}

export default function JournalView({ posts }: JournalViewProps) {
  const [activeCategory, setActiveCategory] = useState('All Articles');
  
  const categories = ['All Articles', 'Research', 'Nutrition', 'Lifestyle', 'Ingredients', 'Wellness', 'Recipes'];

  const filteredPosts = activeCategory === 'All Articles' 
    ? posts 
    : posts.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#fdfbf7] flex flex-col md:flex-row items-center h-auto md:h-[550px]">
        {/* Left Content */}
        <div className="w-full md:w-[45%] flex justify-end px-6 py-12 md:p-12 lg:pr-16 z-20">
          <div className="max-w-[400px] w-full pt-10 md:pt-0">
            <h1 className="text-[42px] md:text-[56px] lg:text-[72px] font-bold text-[#143325] mb-4 md:mb-6 leading-[1.05] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Wellness<br />Journal
            </h1>
            <p className="text-[14px] md:text-[16px] text-[#4a5a51] mb-8 leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Insights, rituals, and natural wellness guides crafted to support your daily health journey.
            </p>
            <button className="bg-[#1b3b2b] hover:bg-[#122a1f] text-white px-8 py-3.5 rounded-[4px] font-bold text-[14px] transition-colors shadow-sm inline-flex items-center">
              Explore Articles
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-[55%] h-[350px] md:h-full relative">
          <img 
            src="/journal/hero.png" 
            alt="Wellness Journal Hero" 
            className="w-full h-full object-cover object-left md:object-center mix-blend-multiply"
          />
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="w-full pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 max-w-[1000px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <img 
              src="/journal/flwr.png" 
              alt="Benefits of Hibiscus Tea" 
              className="w-full h-auto aspect-square object-cover rounded-[16px] shadow-sm"
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <span className="bg-[#cd5c4b] text-white px-3.5 py-1 rounded-[20px] text-[11px] font-bold tracking-wide" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Wellness
              </span>
              <span className="text-[#6b7b72] text-[11px] font-bold ml-4 tracking-wider uppercase" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                7 Min Read
              </span>
            </div>

            <h2 className="text-[36px] md:text-[44px] lg:text-[48px] font-bold text-[#143325] mb-4 leading-[1.15] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Benefits of<br />Hibiscus Tea
            </h2>

            <p className="text-[14px] md:text-[16px] text-[#4a5a51] mb-8 leading-[1.6] max-w-[380px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Benefits, rituals, and natural wellness guides crafted to support your daily health journey.
            </p>

            <button className="bg-[#1b3b2b] hover:bg-[#122a1f] text-white px-8 py-3 rounded-[4px] font-bold text-[14px] transition-colors shadow-sm inline-flex items-center">
              Read Article
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 03 - ARTICLE CATEGORIES */}
      <section className="bg-transparent pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="max-w-[1050px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-[13px] font-bold text-[#0F3D2E] mb-6 tracking-widest uppercase" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            SECTION 03 - ARTICLE CATEGORIES
          </h3>
          
          {/* Categories Row */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full border text-[13px] font-bold transition-colors ${
                  activeCategory === cat 
                    ? 'bg-[#e8f2e1] border-[#c5e1b5] text-[#1a3b2b]' 
                    : 'bg-white border-[#e8e5de] text-[#6b7b72] hover:border-[#1a3b2b] hover:text-[#1a3b2b]'
                }`}
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={post.id}
                className="group flex flex-col bg-white rounded-[12px] overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-8px_rgba(44,74,53,0.1)] border border-[#f0eee9] transition-all duration-300 h-full"
              >
                {/* Image Container */}
                <div className="relative h-[200px] w-full overflow-hidden shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow bg-white relative">
                  
                  {/* Tag Overlay */}
                  <div className="absolute -top-[14px] left-5 bg-white px-3 py-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-10 rounded-[2px]">
                    <span className="text-[10px] font-bold text-[#d6a524] uppercase tracking-wider" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {post.category}
                    </span>
                  </div>

                  <h3 
                    className="text-[17px] md:text-[19px] font-bold text-[#0F3D2E] leading-[1.3] mt-2 mb-2 group-hover:text-[#2c4a35] transition-colors line-clamp-2 min-h-[48px]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-[13px] text-[#6b7b72] mb-5 leading-[1.6] line-clamp-2 min-h-[42px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {post.excerpt}
                  </p>
                  
                  {/* Author & Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <img src={`https://i.pravatar.cc/150?img=${idx + 12}`} alt={post.author} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{post.author}</span>
                      <span className="text-[11px] text-[#8a958f]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &nbsp;&bull;&nbsp; {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Read Article Link */}
                  <Link href={`/journal/${post.id}`} className="mt-auto text-[13px] font-bold text-[#2c4a35] flex items-center gap-1.5 hover:text-[#5e8b42] transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 05 - WELLNESS TIPS SECTION */}
      <section className="bg-transparent pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-[13px] font-bold text-[#0F3D2E] mb-6 tracking-widest uppercase" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            SECTION 05 - WELLNESS TIPS SECTION
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { title: 'Stay Hydrated', icon: Droplets },
              { title: 'Improve Sleep Quality', icon: Moon },
              { title: 'Daily Herbal Ritual', icon: Coffee },
              { title: 'Mindful Living', icon: Heart },
              { title: 'Natural Stress Relief', icon: Leaf },
            ].map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className="bg-white rounded-[16px] p-6 flex flex-col items-center justify-center text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-[#f0eee9] hover:shadow-[0_8px_24px_-8px_rgba(44,74,53,0.1)] transition-all duration-300">
                  <div className="w-12 h-12 flex items-center justify-center mb-4 text-[#1b3b2b]">
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[14px] font-bold text-[#143325] leading-[1.3]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {tip.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
