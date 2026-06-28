'use client';

import React from 'react';
import { 
  Leaf, HeartHandshake, ShieldCheck, Globe, Droplet, Heart, 
  Sparkles, Activity, Shield, Zap, Plus, Minus, ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FAQSection from '@/components/home/FAQSection';

const ingredientFAQs = [
  { question: "Where do you source your botanical ingredients?", answer: "We partner directly with sustainable farms and ethical harvesters across the globe. From the pristine valleys of India to the lush fields of Southeast Asia, we trace every leaf and root to its source to guarantee authenticity and fair trade practices." },
  { question: "Are all of your herbs and flowers organic?", answer: "Yes, we are deeply committed to clean wellness. We prioritize USDA-certified organic ingredients and work closely with farmers who strictly adhere to natural, pesticide-free cultivation methods." },
  { question: "How do you ensure the purity and potency of your ingredients?", answer: "Quality is non-negotiable. Every batch of our ingredients undergoes rigorous third-party laboratory testing. We test for heavy metals, pesticides, microbial contaminants, and active botanical compounds to ensure maximum potency." },
  { question: "Are your ingredients processed or irradiated?", answer: "Never. We believe in the power of whole botanicals. Our ingredients are gently sun-dried or shade-dried to preserve their essential oils, vibrant colors, and natural therapeutic properties. We never use radiation or harsh chemical processing." },
  { question: "Do you use any artificial flavorings or additives?", answer: "Absolutely not. The vibrant tastes and colors of our teas come 100% from nature. We never use artificial flavors, synthetic colors, or hidden preservatives in any of our blends." }
];

export default function IngredientsPage() {

  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#f5f0e6] border-b border-[#ece8dc] min-h-[60vh] lg:min-h-[85vh] flex flex-col">
        {/* Right Side Background Image (Desktop) */}
        <div 
          className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-[50%] xl:w-[55%] bg-no-repeat bg-cover bg-[position:60%_center] lg:bg-[90%_center] z-0"
          style={{ backgroundImage: `url('/assets/Ingredients-hero.png')` }}
        >
           {/* Dark gradient on mobile so the white text at the bottom is highly legible */}
           <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" style={{ zIndex: 1 }}></div>
           <div className="hidden lg:block absolute inset-y-0 left-0 w-[150px] bg-gradient-to-r from-[#f5f0e6] via-[#f5f0e6]/60 to-transparent"></div>
        </div>

        <div className="flex-1 max-w-[1400px] w-full flex flex-col justify-end pb-10 pt-20 lg:justify-center lg:py-20 mx-auto px-6 sm:px-8 xl:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] xl:w-[48%] space-y-8"
          >
            {/* Subtitle */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[#c19236]"></div>
              <span className="text-[#c19236] font-bold text-[13px] tracking-widest uppercase">
                Pure Botanicals
              </span>
              <div className="w-12 h-[2px] bg-[#c19236]"></div>
            </div>

            {/* Title */}
            <h1 className="text-[38px] md:text-[46px] lg:text-[48px] xl:text-[56px] font-bold text-white lg:text-[#0F3D2E] leading-[1.1] tracking-tight drop-shadow-md lg:drop-shadow-none" style={{ fontFamily: 'Playfair Display, serif' }}>
              Nature's Finest <br className="hidden sm:block" />
              <span className="text-[#c19236] inline-block mt-2 sm:mt-0">Wellness Ingredients</span>
            </h1>
            
            {/* Description */}
            <p className="text-[16px] md:text-[18px] text-white/95 lg:text-[#4a5d53] font-medium max-w-md leading-[1.8] drop-shadow-md lg:drop-shadow-none" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Discover the carefully selected herbs, flowers, roots and botanicals that make every blend naturally effective and deeply nourishing.
            </p>

          </motion.div>
        </div>
      </section>

      {/* Explore Our Botanical Collection */}
      <section className="py-10 lg:py-12 bg-[#fcfbf9] relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#1c2e24] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Explore Our Botanical Collection
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
              <Leaf className="w-4 h-4 text-[#cda434]" fill="currentColor" />
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: 'Flowers', desc: 'Hibiscus, Rose,\nChamomile & more', img: '/home/flowers-v2.png', icon: <Sparkles className="w-5 h-5" /> },
              { title: 'Herbs', desc: 'Tulsi, Mint,\nAshwagandha & more', img: '/home/herbs-v2.png', icon: <Leaf className="w-5 h-5" /> },
              { title: 'Roots', desc: 'Mulethi, Ginger,\nAshwagandha & more', img: '/home/roots-v2.png', icon: <Activity className="w-5 h-5" /> },
              { title: 'Citrus', desc: 'Lemon Peel,\nOrange Peel & more', img: '/home/citrus-v2.png', icon: <Droplet className="w-5 h-5" /> }
            ].map((col, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
                }}
                className="bg-[#fcfbf9] rounded-[24px] overflow-hidden border border-[#ece8dc] shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-[180px] relative overflow-hidden">
                  <img src={col.img} alt={col.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="relative pt-10 pb-6 px-4 text-center bg-white">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center border border-[#ece8dc] shadow-sm text-[#cda434]">
                    {col.icon}
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1c2e24] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{col.title}</h3>
                  <p className="text-[14px] text-[#556358] whitespace-pre-line leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {col.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Signature Ingredients */}
      <section className="py-10 lg:py-12 bg-white border-t border-[#ece8dc]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#1c2e24] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Signature Ingredients
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
              <Leaf className="w-4 h-4 text-[#cda434]" fill="currentColor" />
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-10 relative">
            {[
              {
                id: "beetroot",
                name: "BEETROOT",
                title: "The Ruby Root",
                desc: "Known for its vibrant color and earthy flavor, Beetroot is packed with essential nutrients, supports healthy blood flow, and enhances natural stamina.",
                img: "/home/beetroot-v2.png",
                features: [
                  { icon: <Heart className="w-5 h-5"/>, text: "Heart Health" },
                  { icon: <Zap className="w-5 h-5"/>, text: "Boosts Stamina" },
                  { icon: <Activity className="w-5 h-5"/>, text: "Rich in Iron" }
                ],
                imageLeft: true
              },
              {
                id: "aquatic-fern",
                name: "AQUATIC FERN",
                title: "Nature's Purifier",
                desc: "A unique botanical treasure that helps cleanse the body, support healthy digestion, and provide a refreshing, cooling effect.",
                img: "/home/aquatic_fern-v2.png",
                features: [
                  { icon: <Droplet className="w-5 h-5"/>, text: "Cooling Effect" },
                  { icon: <ShieldCheck className="w-5 h-5"/>, text: "Detoxifying" },
                  { icon: <Leaf className="w-5 h-5"/>, text: "Digestion Support" }
                ],
                imageLeft: false
              },
              {
                id: "hibiscus",
                name: "HIBISCUS FLOWER",
                title: "The Jewel Of Wellness",
                desc: "Rich in antioxidants and naturally cooling, hibiscus helps support heart health, maintain healthy skin and boost overall vitality.",
                img: "/home/hibiscus.png",
                features: [
                  { icon: <Droplet className="w-5 h-5"/>, text: "Antioxidant Rich" },
                  { icon: <Heart className="w-5 h-5"/>, text: "Supports Vitality" },
                  { icon: <Sparkles className="w-5 h-5"/>, text: "Women's Wellness" }
                ],
                imageLeft: true
              },
              {
                id: "mulethi",
                name: "MULETHI (LICORICE ROOT)",
                title: "The Sweet Soother",
                desc: "Revered in Ayurveda, Mulethi is known to soothe the throat, support respiratory health, and promote a healthy glow.",
                img: "/home/mulethi-v2.png",
                features: [
                  { icon: <Activity className="w-5 h-5"/>, text: "Soothes Throat" },
                  { icon: <Shield className="w-5 h-5"/>, text: "Respiratory Health" },
                  { icon: <Sparkles className="w-5 h-5"/>, text: "Healthy Skin" }
                ],
                imageLeft: false
              },
              {
                id: "moringa",
                name: "MORINGA",
                title: "The Miracle Tree",
                desc: "A nutrient powerhouse loaded with vitamins and minerals. Moringa helps boost energy, support immunity, and nourish the body deeply.",
                img: "/home/moringa-v2.png",
                features: [
                  { icon: <Zap className="w-5 h-5"/>, text: "Energy Booster" },
                  { icon: <ShieldCheck className="w-5 h-5"/>, text: "Immunity Support" },
                  { icon: <Leaf className="w-5 h-5"/>, text: "Nutrient Dense" }
                ],
                imageLeft: true
              }
            ].map((ingredient, idx) => (
              <div 
                key={ingredient.id}
                className={`sticky bg-white rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-[#ece8dc] flex ${ingredient.imageLeft ? 'flex-col md:flex-row' : 'flex-col-reverse md:flex-row'} transition-all duration-500`}
                style={{ top: `${10 + (idx * 3)}vh`, zIndex: (idx + 1) * 10 }}
              >
                {ingredient.imageLeft && (
                  <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                    <img src={ingredient.img} alt={ingredient.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                )}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-[#fdfbf6]">
                  <span className="text-[#cda434] text-[13px] font-bold uppercase tracking-[0.2em] mb-4">{ingredient.name}</span>
                  <h3 className="text-[32px] md:text-[40px] font-bold text-[#1c2e24] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{ingredient.title}</h3>
                  <p className="text-[#556358] text-[16px] leading-[1.8] mb-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {ingredient.desc}
                  </p>
                  <div className="flex items-center justify-between gap-4 max-w-sm">
                    {ingredient.features.map((f, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white border border-[#ece8dc] flex items-center justify-center text-[#4a6b3d] shadow-sm">{f.icon}</div>
                        <span className="text-[12px] font-bold text-[#1c2e24] leading-tight">{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {!ingredient.imageLeft && (
                  <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                    <img src={ingredient.img} alt={ingredient.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why These Ingredients Matter */}
      <section className="py-10 lg:py-12 bg-[#fcfbf9] border-t border-[#ece8dc] relative z-[60]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 max-w-3xl mx-auto"
          >
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#1c2e24] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why These Ingredients Matter
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
              <Leaf className="w-4 h-4 text-[#cda434]" fill="currentColor" />
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
            </div>
            <p className="text-[16px] md:text-[18px] text-[#556358] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Every herb, root, and flower in our collection is carefully selected not just for its flavor, but for its profound functional benefits. We believe that true wellness starts from within, which is why our ingredients work synergistically to support your body's natural balance, enhance your daily energy, and provide holistic care.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {[
              { icon: <Leaf />, title: "Natural\nWellness", desc: "Ingredients that work with your body" },
              { icon: <Droplet />, title: "Daily\nDetox", desc: "Helps eliminate toxins and supports cleansing" },
              { icon: <ShieldCheck />, title: "Boosts\nImmunity", desc: "Strengthens your body's natural defense" },
              { icon: <Zap />, title: "Enhances\nEnergy", desc: "Nourishes the body for all-day energy" },
              { icon: <Activity />, title: "Supports\nBalance", desc: "Promotes harmony of mind and body" },
              { icon: <Heart />, title: "Holistic\nCare", desc: "Rooted in nature, backed by tradition" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
                }}
                className="flex flex-col items-center text-center group relative"
              >
                {/* Vertical Divider for Desktop */}
                {i < 5 && (
                  <div className="hidden lg:block absolute -right-4 top-[10%] bottom-[10%] w-[1px] bg-[#cda434]/30"></div>
                )}
                <div className="w-[80px] h-[80px] rounded-full border border-[#ece8dc] bg-[#fcfbf9] flex items-center justify-center text-[#4a6b3d] mb-5 shadow-sm group-hover:-translate-y-2 group-hover:shadow-md transition-all duration-300">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                </div>
                <div className="flex items-center justify-center gap-[6px] mb-4">
                  <div className="w-4 h-[1px] bg-[#cda434]"></div>
                  <div className="w-[4px] h-[4px] rounded-full bg-[#cda434]"></div>
                  <div className="w-4 h-[1px] bg-[#cda434]"></div>
                </div>
                <h4 className="text-[16px] font-bold text-[#1c2e24] mb-3 whitespace-pre-line leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h4>
                <p className="text-[13px] text-[#556358] leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="relative z-[60] bg-white border-t border-[#ece8dc]">
        <FAQSection 
        title="Frequently Asked Questions" 
        subtitle="Everything you need to know about our herbal ingredients, sourcing, and benefits. Can't find your answer? Reach out to our herbalist team."
        faqs={ingredientFAQs} 
      />
      </div>
    </main>
  );
}
