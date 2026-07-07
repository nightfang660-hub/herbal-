'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { JournalPost } from '../types';

interface JournalPostViewProps {
  post: JournalPost;
}

export default function JournalPostView({ post }: JournalPostViewProps) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8F5EE]">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 md:pb-16 text-center">
          <Link href="/journal" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 mx-auto text-[14px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
          <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-[13px] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-[13px] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[12px] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-[#f0eee9]">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#0F3D2E] prose-p:text-[#4a5a51] prose-p:leading-relaxed prose-p:font-sans">
            {post.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 text-[16px] md:text-[18px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
