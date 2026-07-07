'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Mail, CheckCircle2, Shield, Heart, Coffee, Leaf, Smile, Sprout, Apple } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

const ARTICLES = [
  { id: 1, tag: "RESEARCH", title: "What Science Says About Hibiscus Tea", desc: "Studies suggest hibiscus may support healthy blood pressure and heart wellness.", author: "Ananya Sharma", authorImg: "https://i.pravatar.cc/150?img=32", date: "May 18, 2025", readTime: "6 min read", img: "/blog/blog1.png" },
  { id: 2, tag: "NUTRITION", title: "Antioxidants In Everyday Wellness", desc: "Understanding antioxidants and how they protect your cells naturally.", author: "Kavya Menon", authorImg: "https://i.pravatar.cc/150?img=5", date: "May 14, 2025", readTime: "5 min read", img: "/blog/blog2.png" },
  { id: 3, tag: "LIFESTYLE", title: "Creating A Tea Ritual For Better Sleep", desc: "Simple bedtime tea rituals to calm your mind and improve sleep quality.", author: "Ananya Sharma", authorImg: "https://i.pravatar.cc/150?img=32", date: "May 12, 2025", readTime: "6 min read", img: "/blog/blog_3.png" },
  { id: 4, tag: "INGREDIENTS", title: "Moringa Benefits Explained", desc: "The supergreen with incredible nutritional and healing properties.", author: "Kavya Menon", authorImg: "https://i.pravatar.cc/150?img=5", date: "May 10, 2025", readTime: "6 min read", img: "/blog/blog_4.png" },
  { id: 5, tag: "WELLNESS", title: "Stress Relief Through Herbal Blends", desc: "Herbal ingredients that help your body relax and manage daily stress.", author: "Ananya Sharma", authorImg: "https://i.pravatar.cc/150?img=32", date: "May 8, 2025", readTime: "6 min read", img: "/blog/blog_5.png" },
  { id: 6, tag: "RECIPES", title: "Golden Herbal Latte Recipe", desc: "A soothing turmeric latte recipe to nourish your body and mind.", author: "Kavya Menon", authorImg: "https://i.pravatar.cc/150?img=5", date: "May 6, 2025", readTime: "4 min read", img: "/blog/blog_6.png" }
];

export default function BlogPostPage() {
  const params = useParams();
  const articleId = params?.id ? Number(params.id) : 1;
  const article = ARTICLES.find(a => a.id === articleId) || ARTICLES[0];
  const relatedArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);
  const handleShare = (platform: string) => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    let shareUrl = '';
    
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    } else if (platform === 'pinterest') {
      // Create absolute URL for the image if it's relative
      const imgUrl = encodeURIComponent(window.location.origin + article.img);
      shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${imgUrl}&description=${title}`;
    } else if (platform === 'mail') {
      window.location.href = `mailto:?subject=${title}&body=I thought you might find this interesting: ${window.location.href}`;
      return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, 'share-dialog', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-0">

      {/* Dynamic Hero Section based on article */}
      <div className="w-full flex justify-end bg-[#f8f6f0]">
        <div className="max-w-[1400px] w-full flex flex-col md:flex-row items-center justify-between pl-4 sm:pl-8 lg:pl-16 pr-0 pb-8 md:pb-12 gap-8 md:gap-12">
          
          {/* Left Content Area */}
          <div className="w-full md:w-[40%] flex flex-col items-start">

            <h1 className="text-[36px] md:text-[46px] lg:text-[54px] font-bold text-[#0F3D2E] leading-[1.1] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {article.title}
            </h1>
            
            <p className="text-[#4a554e] text-[16px] leading-relaxed mb-8" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              {article.desc}
            </p>
            
            <div className="flex items-center gap-4 text-[#6b7b72] text-[13px] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <img src={article.authorImg} alt={article.author} className="w-10 h-10 rounded-full object-cover shadow-sm" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#0F3D2E] font-bold">By {article.author}</span>
                <span className="hidden sm:inline">|</span>
                <span>{article.date}</span>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center gap-1"><Coffee className="w-3.5 h-3.5" /> {article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Right Image Area */}
          <div className="w-full md:w-[55%] relative h-[350px] md:h-[450px]">
            <img 
              src={article.img} 
              alt={article.title} 
              className="w-full h-full object-cover rounded-l-[40px] shadow-lg" 
            />
            {/* Floating Card */}
            <div className="absolute -bottom-10 left-4 sm:left-6 md:left-8 bg-white rounded-xl p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)] max-w-[260px] sm:max-w-[280px] md:max-w-[320px] border border-[#e8e5de]">
               <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest block mb-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                 WELLNESS
               </span>
               <h3 className="text-[18px] font-bold text-[#0F3D2E] mb-2 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                 Well-being Stories, Rooted In Nature
               </h3>
               <p className="text-[#6b7b72] text-[12px] leading-relaxed line-clamp-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                 {article.desc}
               </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full bg-white">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 md:pt-24 pb-10 md:pb-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="lg:w-[70%] text-[#4a554e] font-sans">
               <div id="introduction" className="mb-12 scroll-mt-24">
                 <p className="text-[15px] leading-relaxed mb-6 text-[#0F3D2E]">
                   <span className="float-left text-[64px] leading-[0.8] pr-2 pt-2 text-[#0F3D2E] font-serif">I</span>
                   n today's fast-paced world, more people are turning to nature for balance, clarity, and healing. Herbal teas—rooted in ancient traditions and backed by modern research—offer a simple yet powerful way to support your body and mind.
                 </p>
                 <p className="text-[15px] leading-relaxed text-[#4a554e] mb-6">
                   From calming stress to boosting immunity, each cup is a step toward a healthier, more mindful you.
                 </p>
                 {article.id === 4 && (
                   <p className="text-[15px] leading-relaxed text-[#0F3D2E] font-medium bg-[#f8f6f0] p-5 rounded-xl border-l-[3px] border-[#D4AF37]">
                     <strong>Moringa Focus:</strong> Often referred to as the "Miracle Tree," Moringa is packed with essential vitamins, minerals, and amino acids. Regular consumption deeply nourishes your body at a cellular level, naturally boosting your daily energy and supporting healthy immunity.
                   </p>
                 )}
               </div>
               
               <section id="health-benefits" className="mb-12 scroll-mt-24">
                 <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-4 text-[#0F3D2E]">The Benefits Of Herbal Tea</h2>
                 <p className="text-[15px] leading-relaxed mb-6">Herbal teas are more than just comforting beverages. They are nature's way of nurturing your well-being.</p>
                 <ul className="space-y-3">
                   <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#8cb73d] shrink-0 mt-0.5" /><span className="text-[15px]">Packed with antioxidants and plant compounds</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#8cb73d] shrink-0 mt-0.5" /><span className="text-[15px]">Support digestion, immunity, and heart health</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#8cb73d] shrink-0 mt-0.5" /><span className="text-[15px]">Calming blends promote better sleep and reduced stress</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#8cb73d] shrink-0 mt-0.5" /><span className="text-[15px]">Naturally caffeine-free and gentle on the body</span></li>
                 </ul>
               </section>
               
               <section id="research-insights" className="mb-12 scroll-mt-24">
                  <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-4 text-[#0F3D2E]">What Research Says</h2>
                  <p className="text-[15px] leading-relaxed mb-6">Numerous studies have highlighted the positive effects of herbal ingredients:</p>
                  <ul className="list-disc pl-5 space-y-3 text-[15px] text-[#4a554e]">
                    <li><strong className="text-[#D4AF37]">Hibiscus</strong> may help support healthy blood pressure and heart function.</li>
                    <li><strong className="text-[#D4AF37]">Ashwagandha</strong> is known to help the body adapt to stress and promote mental clarity.</li>
                    <li><strong className="text-[#D4AF37]">Chamomile</strong> supports relaxation and better sleep quality.</li>
                    <li><strong className="text-[#D4AF37]">Rosehip</strong> is rich in Vitamin C and antioxidants that support immunity.</li>
                  </ul>
               </section>

               <section id="how-to-use" className="mb-12 scroll-mt-24">
                  <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-6 text-[#0F3D2E]">How To Use Herbal Tea For Best Results</h2>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-4"><div className="p-2 bg-[#f8f6f0] rounded-md"><Coffee className="w-5 h-5 text-[#6e8b3d]" /></div><span className="text-[15px] mt-2">Start your morning with a detox or immunity-boosting blend.</span></li>
                     <li className="flex items-start gap-4"><div className="p-2 bg-[#f8f6f0] rounded-md"><Leaf className="w-5 h-5 text-[#6e8b3d]" /></div><span className="text-[15px] mt-2">Sip a calming tea in the evening to unwind and relax.</span></li>
                     <li className="flex items-start gap-4"><div className="p-2 bg-[#f8f6f0] rounded-md"><Heart className="w-5 h-5 text-[#6e8b3d]" /></div><span className="text-[15px] mt-2">Drink consistently to experience long-term wellness benefits.</span></li>
                     <li className="flex items-start gap-4"><div className="p-2 bg-[#f8f6f0] rounded-md"><Shield className="w-5 h-5 text-[#6e8b3d]" /></div><span className="text-[15px] mt-2">Choose blends that align with your body's unique needs.</span></li>
                  </ul>
               </section>

               <section id="daily-wellness-tips" className="mb-12 scroll-mt-24">
                  <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-8 text-[#0F3D2E]">Daily Wellness Tips</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                     <div className="pl-5 border-l-[3px] border-[#D4AF37]">
                        <h4 className="font-bold text-[16px] text-[#0F3D2E] mb-2 flex items-center gap-2">
                           <Coffee className="w-4 h-4 text-[#6e8b3d]" /> Hydrate Mindfully
                        </h4>
                        <p className="text-[14px] text-[#6b7b72] leading-relaxed">Sip warm herbal tea throughout the day to keep your body balanced and refreshed naturally.</p>
                     </div>
                     <div className="pl-5 border-l-[3px] border-[#D4AF37]">
                        <h4 className="font-bold text-[16px] text-[#0F3D2E] mb-2 flex items-center gap-2">
                           <Leaf className="w-4 h-4 text-[#6e8b3d]" /> Choose Natural
                        </h4>
                        <p className="text-[14px] text-[#6b7b72] leading-relaxed">Pick blends with real herbs and absolutely no artificial flavors to maximize health benefits.</p>
                     </div>
                     <div className="pl-5 border-l-[3px] border-[#D4AF37]">
                        <h4 className="font-bold text-[16px] text-[#0F3D2E] mb-2 flex items-center gap-2">
                           <Heart className="w-4 h-4 text-[#6e8b3d]" /> Listen To Your Body
                        </h4>
                        <p className="text-[14px] text-[#6b7b72] leading-relaxed">Choose what your body truly needs each day and adjust your herbal blends accordingly.</p>
                     </div>
                     <div className="pl-5 border-l-[3px] border-[#D4AF37]">
                        <h4 className="font-bold text-[16px] text-[#0F3D2E] mb-2 flex items-center gap-2">
                           <Shield className="w-4 h-4 text-[#6e8b3d]" /> Make It A Ritual
                        </h4>
                        <p className="text-[14px] text-[#6b7b72] leading-relaxed">Create a calm tea ritual for better well-being, improved focus, and daily mindfulness.</p>
                     </div>
                  </div>
               </section>

               <section id="conclusion" className="mb-12 scroll-mt-24">
                 <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-4 text-[#0F3D2E]">Conclusion</h2>
                 <p className="text-[15px] leading-relaxed text-[#4a554e]">
                   Herbal tea is more than just a beautiful beverage — it's a daily wellness ritual that supports your heart, immunity, digestion, and overall well-being. Make it a part of your daily routine and experience the benefits of nature's healing power.
                 </p>
               </section>

            </div>

            {/* Right Sidebar */}
            <div className="lg:w-[30%] hidden lg:flex flex-col gap-8">
              
              {/* On This Page Box */}
              <div className="bg-[#fdfbf7] p-8 rounded-xl border border-[#e8e5de]">
                <h4 className="font-bold font-serif text-[18px] mb-6 text-[#0F3D2E]">On This Page</h4>
                <ul className="space-y-4 text-[14px] text-[#6b7b72] font-medium">
                  <li><a href="#introduction" className="hover:text-[#0F3D2E] transition-colors">1. Introduction</a></li>
                  <li><a href="#health-benefits" className="hover:text-[#0F3D2E] transition-colors">2. The Benefits Of Herbal Tea</a></li>
                  <li><a href="#research-insights" className="hover:text-[#0F3D2E] transition-colors">3. What Research Says</a></li>
                  <li><a href="#how-to-use" className="hover:text-[#0F3D2E] transition-colors">4. How To Use Herbal Tea</a></li>
                  <li><a href="#daily-wellness-tips" className="hover:text-[#0F3D2E] transition-colors">5. Daily Wellness Tips</a></li>
                  <li><a href="#conclusion" className="hover:text-[#0F3D2E] transition-colors">6. Conclusion</a></li>
                </ul>
              </div>

              {/* Share Box */}
              <div className="bg-[#fdfbf7] p-8 rounded-xl border border-[#e8e5de]">
                <h4 className="font-bold font-serif text-[18px] mb-6 text-[#0F3D2E]">Share This Article</h4>
                <div className="flex gap-3">
                   <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1877f2] hover:opacity-80 transition-opacity"><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></button>
                   <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-[#f1f3f4] flex items-center justify-center text-[#0F3D2E] hover:opacity-80 transition-opacity"><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></button>
                   <button onClick={() => handleShare('pinterest')} className="w-10 h-10 rounded-full bg-[#fce8e6] flex items-center justify-center text-[#ea4335] hover:opacity-80 transition-opacity"><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.66 7.89 6.44 9.32-.09-.78-.17-1.98.03-2.84l1.2-5.06s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.88 0 1.31.66 1.31 1.45 0 .88-.56 2.21-.85 3.44-.24 1.03.52 1.87 1.53 1.87 1.84 0 3.25-1.94 3.25-4.74 0-2.48-1.78-4.21-4.32-4.21-2.95 0-4.68 2.21-4.68 4.5 0 .88.34 1.83.76 2.34.08.1.09.18.07.28l-.24 1.01c-.04.16-.14.2-.31.12-1.16-.54-1.89-2.24-1.89-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.74 2.3 5.74 5.37 0 3.21-2.02 5.8-4.83 5.8-1.02 0-1.98-.53-2.31-1.16l-.63 2.4c-.23.86-.85 1.94-1.27 2.6C10.53 21.84 11.25 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"></path></svg></button>
                   <button onClick={() => handleShare('mail')} className="w-10 h-10 rounded-full bg-[#e6f4ea] flex items-center justify-center text-[#34a853] hover:opacity-80 transition-opacity"><Mail className="w-4 h-4"/></button>
                </div>
              </div>

              {/* Vertical Image Card */}
              <div className="relative rounded-xl overflow-hidden h-[400px]">
                <img src="/blog/blog_3.png" alt="Tea Set" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <h3 className="text-white font-serif text-[26px] leading-[1.2]">
                    Wellness begins<br/>with nature,<br/>nourished by<br/>tradition.
                  </h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Promotional Section */}
      <section className="w-full bg-[#fafafa] py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            
            {/* Left Image Area */}
            <div className="w-full md:w-1/2 flex justify-center h-[400px]">
              <img 
                src="/blog/blog_left_img.png" 
                alt="Ruby Calm Tea" 
                className="max-w-full h-full object-contain drop-shadow-xl"
              />
            </div>

            {/* Right Content Area */}
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F3D2E] mb-4 leading-[1.1]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Sip The Wellness<br />You Read About
              </h2>

              <p className="text-[15px] md:text-[16px] text-[#6b7b72] mb-8 leading-relaxed max-w-[450px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Bring ancient herbal wisdom into your daily ritual with our best-selling blends. Each cup is thoughtfully crafted to nourish your body and elevate your well-being.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-10">
                <div className="flex items-center gap-3">
                  <Smile className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Relaxation Support</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Naturally Caffeine Free</span>
                </div>

                <div className="flex items-center gap-3">
                  <Sprout className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Adaptogen Rich</span>
                </div>

                <div className="flex items-center gap-3">
                  <Apple className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Premium Ingredients</span>
                </div>
              </div>

              <Link href="/shop" className="bg-[#0F3D2E] hover:bg-[#0F3D2E] text-white px-8 py-3.5 rounded flex items-center gap-2 font-bold text-[14px] transition-colors shadow-sm">
                Shop Ruby Calm Tea
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Related Articles */}
      <div className="w-full bg-[#f8f6f0] pt-16 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative mb-12">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-[32px] md:text-[36px] font-bold font-serif text-[#0F3D2E]">Related Articles</h2>
            </div>
            
            <div className="md:absolute md:right-0 md:bottom-1 mt-6 md:mt-0 flex justify-center md:justify-end">
              <Link href="/blog#browse-by-topic" className="text-[15px] font-bold text-[#0F3D2E] flex items-center gap-2 hover:text-[#5e8b42] transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {relatedArticles.map((relArticle) => (
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                key={relArticle.id}
                className="group flex flex-col bg-white rounded-[12px] overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-8px_rgba(44,74,53,0.1)] border border-[#f0eee9] transition-all duration-300 h-full"
              >
                {/* Image Container */}
                <div className="relative h-[200px] w-full overflow-hidden shrink-0">
                  <img 
                    src={relArticle.img} 
                    alt={relArticle.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow bg-white relative">
                  
                  {/* Tag Overlay */}
                  <div className="absolute -top-[14px] left-5 bg-white px-3 py-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-10 rounded-[2px]">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {relArticle.tag}
                    </span>
                  </div>

                  <h3 
                    className="text-[17px] md:text-[19px] font-bold text-[#0F3D2E] leading-[1.3] mt-2 mb-2 group-hover:text-[#0F3D2E] transition-colors line-clamp-2 min-h-[48px]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {relArticle.title}
                  </h3>

                  <p className="text-[13px] text-[#6b7b72] mb-5 leading-[1.6] line-clamp-2 min-h-[42px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {relArticle.desc}
                  </p>
                  
                  {/* Author & Meta */}
                  <div className="flex items-center gap-3 mb-5">
                    <img src={relArticle.authorImg} alt={relArticle.author} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{relArticle.author}</span>
                      <span className="text-[11px] text-[#8a958f]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {relArticle.date} &nbsp;&bull;&nbsp; {relArticle.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Read Article Link */}
                  <Link href={`/blog/${relArticle.id}`} className="mt-auto pt-4 border-t border-[#f0eee9] text-[13px] font-bold text-[#0F3D2E] flex items-center gap-1.5 hover:text-[#5e8b42] transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
      {/* Newsletter Section */}
      <section className="w-full bg-[#2a4530] py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-white">
              <h3 className="text-[24px] md:text-[28px] font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Stay Inspired Naturally
              </h3>
              <p className="text-[14px] text-[#d1dcd5] leading-relaxed max-w-[400px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Receive herbal insights, exclusive wellness stories and new tea releases.
              </p>
            </div>

            {/* Right Form Area */}
            <div className="w-full md:w-1/2 flex flex-col w-full">
              <form className="w-full max-w-[480px] md:ml-auto" onSubmit={(e) => e.preventDefault()}>
                <div className="flex w-full rounded-[4px] overflow-hidden">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow px-4 py-3 md:py-3.5 text-[#0F3D2E] bg-white outline-none text-[14px] font-medium placeholder-[#8a958f]"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  />
                  <button type="submit" className="bg-[#D4AF37] hover:bg-[#c99f36] text-white px-6 md:px-8 py-3 md:py-3.5 font-bold text-[14px] transition-colors whitespace-nowrap" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    Subscribe
                  </button>
                </div>
                <p className="text-[11px] text-[#aebbb5] mt-2.5 text-left" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
