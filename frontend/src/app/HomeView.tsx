'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useCartStore } from '../features/cart/cartStore';
import { Star, Flame, Sparkles, HeartPulse, ShieldAlert, ArrowRight, Leaf, Globe, Sprout, Heart, Wind, ShieldCheck, ChevronDown, X, Clock, ShoppingBag, ShoppingCart, CreditCard, Coffee, ClipboardCheck, Quote, ChevronLeft, ChevronRight, Award, Smile, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MockProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  category: string;
  rating: number;
}


const PRODUCTS: MockProduct[] = [
  {
    id: "prod-1",
    sku: "MATCH-ORG-100",
    name: "Ceremonial Organic Matcha",
    slug: "ceremonial-organic-matcha",
    description: "Stone-ground, shade-grown high-altitude ceremonial grade green tea powder with natural sweetness.",
    priceCents: 3800,
    category: "Matcha",
    rating: 4.9
  },
  {
    id: "prod-2",
    sku: "CHAM-BLND-050",
    name: "Royal Chamomile Sleep Infusion",
    slug: "royal-chamomile-sleep",
    description: "Calming Egyptian chamomile flower heads blended with organic lavender buds and fresh mint leaves.",
    priceCents: 2400,
    category: "Herbal Blends",
    rating: 4.8
  },
  {
    id: "prod-3",
    sku: "CHAI-SPIC-080",
    name: "Golden Turmeric Herbal Chai",
    slug: "golden-turmeric-herbal-chai",
    description: "A restorative, warming blend of premium organic ginger roots, wild cardamoms, cinnamon, and turmeric.",
    priceCents: 2800,
    category: "Restorative",
    rating: 4.7
  },
  {
    id: "prod-4",
    sku: "HIBI-ROSE-060",
    name: "Hibiscus Rose Glow Nectar",
    slug: "hibiscus-rose-glow-nectar",
    description: "Antioxidant-rich organic hibiscus petals, wild rosehips, and elderberries for cellular regeneration.",
    priceCents: 2600,
    category: "Wellness",
    rating: 4.9
  }
];

interface CategoryItem {
  name: string;
  tag: string;
  image: string;
  description: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: "Ceremonial Matcha",
    tag: "01 / Stone-Ground",
    image: "/home/img1.jpg",
    description: "Stone-ground, shade-grown high-altitude green tea powders rich in L-theanine and antioxidants."
  },
  {
    name: "Herbal Infusions",
    tag: "02 / Caffeine-Free",
    image: "/home/img2.jpg",
    description: "Naturally caffeine-free calming botanical blends featuring chamomile, lavender, and mint."
  },
  {
    name: "Restorative Spices",
    tag: "03 / Wellness Blends",
    image: "/home/img3.jpg",
    description: "Restorative warming spices including organic ginger, cinnamon, cardamom, and turmeric."
  },
  {
    name: "Daily Wellness",
    tag: "04 / Organic Roots",
    image: "/home/img4.jpg",
    description: "Nutrient-rich hibiscus and rosehip blends designed to support immune defense and daily vitality."
  }
];

const FAQS = [
  { question: "Are your herbal teas 100% natural and organic?", answer: "Yes, we are committed to providing only the highest quality herbal teas. All our blends use 100% natural, ethically sourced botanical ingredients with absolutely no artificial additives, colors, or flavors." },
  { question: "How should I store my loose leaf tea to keep it fresh?", answer: "To preserve the potency and flavor of your herbal tea, store it in a cool, dark, and dry place. Keep it in an airtight container away from direct sunlight, moisture, and strong odors." },
  { question: "How many cups of herbal tea can I drink daily?", answer: "While herbal teas are generally safe and gentle, we recommend 2 to 3 cups a day for optimal wellness benefits. However, if you are pregnant, nursing, or taking medication, please consult your healthcare provider first." },
  { question: "Are your tea blends caffeine-free?", answer: "The vast majority of our herbal blends (tisanes) are naturally 100% caffeine-free, making them perfect for any time of day, including before bed. Any blend containing caffeine (like Matcha or Yerba Mate) is clearly labeled." },
  { question: "Do you test your herbs for heavy metals and pesticides?", answer: "Absolutely. Safety is our top priority. Every single batch of our herbs undergoes rigorous third-party lab testing for purity, heavy metals, pesticides, and microbial contaminants before it reaches your cup." },
  { question: "How long should I steep the herbal blends?", answer: "For the best flavor and maximum health benefits, we recommend steeping most of our herbal blends in boiling water (212°F) for 5 to 7 minutes. Some robust roots and berries can even be steeped longer!" }
];

const WELLNESS_CARDS = [
  {
    id: "womens-wellness",
    title: "Women's Wellness Support",
    cardImage: "/home/womens wellness.png",
    imageClass: "object-cover",
    modalImage: "/home/womens wellness.png",
    subtitle: "A nurturing blend crafted to support hormonal balance and daily tranquility.",
    benefits: [
      {
        title: "Emotional Equilibrium",
        desc: "Specifically formulated to soothe stress and emotional fatigue.",
        icon: <Leaf className="w-5 h-5 text-[#2c4a35]" />
      },
      {
        title: "Cellular Protection",
        desc: "Rich in organic antioxidants for long-term restorative health.",
        icon: <Sparkles className="w-5 h-5 text-[#2c4a35]" />
      }
    ],
    ingredients: [
      { type: "FLOWER", name: "Rose Petals" },
      { type: "HERB", name: "Holy Basil" },
      { type: "LEAF", name: "Lemon Balm" },
      { type: "ROOT", name: "Shatavari" }
    ],
    ritual: "Steep 1 generous teaspoon in freshly boiled water for 5-7 minutes. Inhale the botanical aromas before enjoying daily as a grounding ritual."
  },
  {
    id: "immunity-support",
    title: "Maximum Immunity Guard",
    cardImage: "/home/immunity support.png",
    imageClass: "object-cover",
    modalImage: "/home/immunity support.png",
    subtitle: "Fortify your body's natural defenses with concentrated botanical power.",
    benefits: [
      {
        title: "Immune Boosting",
        desc: "Packed with vitamin C and antioxidants to support natural defenses.",
        icon: <ShieldAlert className="w-5 h-5 text-[#2c4a35]" />
      },
      {
        title: "Cellular Protection",
        desc: "Rich in organic antioxidants for long-term restorative health.",
        icon: <Sparkles className="w-5 h-5 text-[#2c4a35]" />
      }
    ],
    ingredients: [
      { type: "FLOWER", name: "Elderflower" },
      { type: "HERB", name: "Echinacea" },
      { type: "ROOT", name: "Ginger" },
      { type: "BERRY", name: "Rosehip" }
    ],
    ritual: "Steep 1 generous teaspoon in freshly boiled water for 5-7 minutes. Inhale the botanical aromas before enjoying daily as a grounding ritual."
  },
  {
    id: "respiratory-wellness",
    title: "Clear Respiratory Relief",
    cardImage: "/home/respiratory wellness.png",
    imageClass: "object-cover",
    modalImage: "/home/respiratory wellness.png",
    subtitle: "Breathe easier with our soothing blend of lung-supporting herbs.",
    benefits: [
      {
        title: "Airway Clearing",
        desc: "Helps to clear congestion and soothe respiratory pathways.",
        icon: <Wind className="w-5 h-5 text-[#2c4a35]" />
      },
      {
        title: "Throat Soothing",
        desc: "Coats and comforts scratchy, irritated throats.",
        icon: <Leaf className="w-5 h-5 text-[#2c4a35]" />
      }
    ],
    ingredients: [
      { type: "LEAF", name: "Peppermint" },
      { type: "HERB", name: "Thyme" },
      { type: "BARK", name: "Slippery Elm" },
      { type: "ROOT", name: "Licorice" }
    ],
    ritual: "Steep 1 generous teaspoon in freshly boiled water for 5-7 minutes. Inhale the botanical aromas before enjoying daily as a grounding ritual."
  },
  {
    id: "digestive-wellness",
    title: "Gentle Digestive Balance",
    cardImage: "/home/digestive wellness.png",
    imageClass: "object-cover",
    modalImage: "/home/digestive wellness.png",
    subtitle: "Support gut health and ease discomfort with this calming botanical blend.",
    benefits: [
      {
        title: "Gut Soothing",
        desc: "Relieves bloating, gas, and occasional indigestion.",
        icon: <Sprout className="w-5 h-5 text-[#2c4a35]" />
      },
      {
        title: "Microbiome Support",
        desc: "Promotes a healthy environment for beneficial gut flora.",
        icon: <Sparkles className="w-5 h-5 text-[#2c4a35]" />
      }
    ],
    ingredients: [
      { type: "SEED", name: "Fennel" },
      { type: "ROOT", name: "Ginger" },
      { type: "LEAF", name: "Peppermint" },
      { type: "HERB", name: "Chamomile" }
    ],
    ritual: "Steep 1 generous teaspoon in freshly boiled water for 5-7 minutes. Inhale the botanical aromas before enjoying daily as a grounding ritual."
  }
];

import { getProducts, Product } from '../lib/products';

function FeaturedProductCard({ product, index }: { product: Product, index?: number }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      sku: `PACK-${product.id}-1`,
      name: `${product.name} (1 Packet)`,
      priceCents: product.price * 100,
      image: product.img
    });
  };

  return (
    <div 
      className="flex flex-col group cursor-pointer bg-white rounded-[20px] md:rounded-3xl border border-[#e8e5de] p-3 md:p-5 overflow-hidden shadow-sm transition-all duration-300 h-full"
    >
      {/* Product Image */}
      <div className="relative w-full h-[110px] md:h-[280px] mb-2 md:mb-3 flex items-center justify-center rounded-t-2xl pt-1 md:pt-2 px-1">
        <button 
          className="absolute top-0 right-0 p-1 transition-colors z-10 text-[#8b9992] hover:text-[#D84B5B]"
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} fill="none" />
        </button>
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-contain drop-shadow-sm transition-transform duration-700 ease-in-out" 
        />
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col flex-1">
        {/* Best Seller Badge */}
        {product.bestSeller && (
          <div className="mb-1 md:mb-2 flex items-start">
            <span className="bg-[#f0f4e3] text-[#2c4a35] px-1.5 md:px-2 py-0.5 rounded-[3px] md:rounded-[4px] text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
              BEST SELLER
            </span>
          </div>
        )}

        <h4 className="font-bold text-[#0F3D2E] text-[13px] md:text-[17px] leading-tight mb-1 md:mb-2 transition-colors duration-300 line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
          {product.name}
        </h4>

        {/* Rating (5 Stars) */}
        <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
          <div className="flex items-center gap-[1px] md:gap-[2px]">
            {[...Array(5)].map((_, i) => (
               <Star key={i} className={`w-2.5 h-2.5 md:w-[14px] md:h-[14px] ${i < Math.floor(product.rating) ? 'fill-[#ffc107] text-[#ffc107]' : (i === Math.floor(product.rating) && product.rating % 1 !== 0 ? 'fill-[#ffc107] text-[#ffc107] opacity-50' : 'fill-[#e8e5de] text-[#e8e5de]')}`} />
            ))}
          </div>
          <span className="text-[10px] md:text-[12px] font-bold text-[#6b7b72] ml-0.5">({product.rating.toFixed(1)})</span>
        </div>

        {/* Description */}
        <div className="mb-2 md:mb-3">
          <p className="text-[11px] md:text-[13px] text-[#6b7b72] leading-[1.4] md:leading-[1.5] line-clamp-2">
            {product.description || product.desc}
          </p>
        </div>
        
        {/* Price & Cart */}
        <div className="flex items-center justify-between mt-auto pt-1 relative">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[14px] md:text-[18px] font-bold text-[#2c4a35]">₹{product.price}</span>
              <span className="text-[11px] md:text-[13px] text-[#8b9992] line-through">₹{product.originalPrice}</span>
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 bg-[#183a2d] hover:bg-[#0f281e] rounded-full text-white transition-colors shadow-sm shrink-0 relative z-10 hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}


function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#fcfbf9] py-14 lg:py-16 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8cb73d] mb-4 block">Got Questions?</span>
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Everything you need to know about our herbal blends, sourcing, and brewing process. Can't find your answer? Reach out to our herbalist team.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-[800px] mx-auto space-y-3">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="bg-[#fdfcf9] rounded-[20px] border border-[#e8e5de] hover:border-[#8cb73d]/30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-6px_rgba(44,74,53,0.08)] transition-all duration-300 overflow-hidden"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
              >
                <span className="text-[15px] md:text-[16px] font-semibold text-[#1c2e24] group-hover:text-[#2c4a35] transition-colors pr-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{faq.question}</span>
                <div className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all duration-400 ease-in-out ${openIndex === index ? 'rotate-180 bg-[#1c2e24] text-[#c49d56]' : 'bg-[#f4f2ee] text-[#6b7b72] group-hover:bg-[#e8f2e1] group-hover:text-[#6b9933]'}`}>
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-5 pb-5 pt-0 text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: "CHOOSE BLEND",
      desc: "Explore our range of herbal blends and choose your favorite.",
      Icon: ShoppingBag,
      color: "from-[#f2f7ed] to-[#e4eed7]",
      iconColor: "text-[#5e8b42]",
      badgeColor: "bg-[#5e8b42]"
    },
    {
      num: 2,
      title: "ADD TO CART",
      desc: "Add your selected products to the cart with ease.",
      Icon: ShoppingCart,
      color: "from-[#fff5ed] to-[#ffe5cf]",
      iconColor: "text-[#d97746]",
      badgeColor: "bg-[#d97746]"
    },
    {
      num: 3,
      title: "CHECKOUT",
      desc: "Review your order and choose a safe & secure payment method.",
      Icon: ClipboardCheck,
      color: "from-[#f0f8ff] to-[#d6efff]",
      iconColor: "text-[#4b8aa3]",
      badgeColor: "bg-[#4b8aa3]"
    },
    {
      num: 4,
      title: "ENJOY YOUR TEA",
      desc: "Relax, unwind and enjoy the goodness of herbal wellness.",
      Icon: Coffee,
      color: "from-[#fffce8] to-[#fff4ba]",
      iconColor: "text-[#d6a524]",
      badgeColor: "bg-[#d6a524]"
    }
  ];

  return (
    <section className="bg-white pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
              How It Works
            </h2>
          </div>
          <p className="text-[16px] md:text-[18px] text-[#6b7b72] tracking-wide" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Your journey to a healthier you is simple
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-6 lg:gap-10 relative mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              {/* Step */}
              <div className="group flex flex-col items-center text-center max-w-[170px] hover:-translate-y-3 transition-all duration-500 cursor-default">
                <div className="relative mb-5">
                  {/* Circle background */}
                  <div className={`w-32 h-32 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${step.color} border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-105`}>
                     {/* Inner faint ring */}
                     <div className="absolute inset-2.5 rounded-full border border-black/5 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                     <step.Icon className={`w-8 h-8 md:w-10 md:h-10 ${step.iconColor} group-hover:scale-110 transition-transform duration-500 z-10`} />
                  </div>
                  {/* Number Badge */}
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full ${step.badgeColor} text-white flex items-center justify-center text-[12px] md:text-[14px] font-bold shadow-md group-hover:-translate-y-1 group-hover:shadow-lg transition-all duration-500`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {step.num}
                  </div>
                </div>
                <h3 className={`text-[13px] md:text-[14px] font-bold ${step.iconColor} uppercase tracking-wider mb-2 transition-colors duration-300`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-[11px] md:text-[12px] text-[#6b7b72] leading-relaxed group-hover:text-[#4a5c51] transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {step.desc}
                </p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mt-12 md:mt-16">
                  <ArrowRight className="w-4 h-4 text-[#a4aca7] opacity-60" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}

function WellnessSolutionsSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const solutions = [
    {
      id: 1,
      title: "Digestive\nComfort",
      desc: "Support your gut\nhealth naturally.",
      bgColor: "bg-[#e8efe2]",
      iconColor: "text-[#4a5c3f]",
      icon: <img src="/home/diges.png" alt="Digestion" className="w-[100px] h-[100px] object-contain scale-110" />
    },
    {
      id: 2,
      title: "Deep\nRelaxation",
      desc: "Calm your mind and\nrelax your body.",
      bgColor: "bg-[#ece5fb]", // light purple
      iconColor: "text-[#6543b5]", // purple
      icon: <img src="/home/meditation.png" alt="Relaxation" className="w-[100px] h-[100px] object-contain scale-110" />
    },
    {
      id: 3,
      title: "Total Body\nDetox",
      desc: "Cleanse and refresh\nyour body.",
      bgColor: "bg-[#e8efe2]",
      iconColor: "text-[#4a5c3f]",
      icon: <img src="/home/jar.png" alt="Detox" className="w-[100px] h-[100px] object-contain scale-110" />
    },
    {
      id: 4,
      title: "Hormonal\nHarmony",
      desc: "Support your natural\nbalance everyday.",
      bgColor: "bg-[#fce9ec]", // light pink
      iconColor: "text-[#d6556d]", // pink/red
      icon: <img src="/home/red_flwr.png" alt="Hormonal Balance" className="w-[100px] h-[100px] object-contain scale-110" />
    }
  ];

  return (
    <section className="bg-[#fcfbf9] py-20 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
            Wellness Solutions
          </h2>
          <div className="flex items-center justify-center w-[250px] mx-auto mb-6">
            <div className="h-[2px] w-full bg-[#cda434]"></div>
            <Leaf className="w-5 h-5 text-[#cda434] mx-2 shrink-0 -rotate-[60deg]" fill="currentColor" />
            <div className="h-[2px] w-full bg-[#cda434]"></div>
          </div>
          <p className="text-[15px] md:text-[16px] text-[#6b7b72] leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Discover specialized herbal formulations crafted for your unique health needs. Find the perfect natural remedy to support your daily wellness journey.
          </p>
        </div>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 relative">
          {solutions.map((sol) => {
            const isActive = activeId === sol.id;
            const isAnyActive = activeId !== null;

            return (
              <div 
                key={sol.id} 
                onClick={() => setActiveId(isActive ? null : sol.id)}
                className={`flex flex-col items-center text-center px-6 py-6 relative group cursor-pointer rounded-[30px] transition-all duration-500 ease-out ${
                  isActive ? 'bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] scale-105 z-10' : 
                  isAnyActive ? 'opacity-40 scale-95' : 'hover:bg-white/50'
                }`}
              >
                
                {/* Custom Shorter Divider (hidden on last item, and hidden if active state is engaged to prevent visual clutter) */}
                {sol.id !== 4 && !isAnyActive && (
                  <div className="hidden lg:block absolute right-0 top-[25%] bottom-[10%] w-[1px] bg-black/[0.06]" />
                )}
                
                {/* Icon Circle */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: sol.id * 0.3 }}
                  className={`w-[90px] h-[90px] rounded-full flex items-center justify-center mb-7 shadow-sm transition-transform duration-300 ${isActive ? 'scale-110 shadow-md' : 'group-hover:scale-105'} ${sol.bgColor} ${sol.iconColor}`}
                >
                  {sol.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-[18px] md:text-[20px] font-bold text-[#2c4a35] mb-4 whitespace-pre-line leading-[1.3] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {sol.title}
                </h3>

                {/* Desc */}
                <p className="text-[14px] md:text-[15px] text-[#6b7b72] whitespace-pre-line leading-relaxed mb-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {sol.desc}
                </p>

                {/* Link */}
                <Link href="#shop" onClick={(e) => { e.stopPropagation(); }} className={`text-[14px] font-semibold transition-all flex items-center gap-1.5 mt-auto ${isActive ? 'text-[#2c4a35] underline' : 'text-[#4a5c3f] hover:text-[#2c4a35] hover:underline'}`}>
                  Explore Teas <span>&rarr;</span>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function IngredientStorySection() {
  const features = [
    {
      title: "Hibiscus & Beetroot",
      desc: "Deeply detoxifies the blood, enhances natural stamina, and is rich in vital antioxidants.",
      icon: <Heart className="w-6 h-6 text-[#8cb73d]" />
    },
    {
      title: "Organic Moringa",
      desc: "Often called the Miracle Tree, it boosts natural immunity and reduces internal inflammation.",
      icon: <ShieldCheck className="w-6 h-6 text-[#8cb73d]" />
    },
    {
      title: "Pure Mulethi",
      desc: "Soothes sore throats, promotes digestive comfort, and helps balance hormones naturally.",
      icon: <Sparkles className="w-6 h-6 text-[#8cb73d]" />
    },
    {
      title: "3rd Party Testing",
      desc: "Every single batch undergoes rigorous testing for purity, potency, and maximum benefits.",
      icon: <ClipboardCheck className="w-6 h-6 text-[#8cb73d]" />
    }
  ];

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize mb-16 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              The Ingredient Story
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
              {features.map((f, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Icon Container */}
                  <div className="w-[60px] h-[60px] rounded-full border-[2.5px] border-[#8cb73d] flex items-center justify-center mb-6 relative bg-white">
                     {/* Leaf flair mimicking the reference leaf */}
                     <div className="absolute -top-[14px] -right-[18px] text-[#8cb73d] opacity-90 pointer-events-none">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"/></svg>
                     </div>
                     {f.icon}
                  </div>
                  <h3 className="text-[19px] font-bold text-[#111827] mb-3" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {f.title}
                  </h3>
                  <p className="text-[15px] text-[#6b7280] leading-relaxed font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - The Image with Circle Background */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-16 lg:mt-0 py-8 lg:py-0 min-h-[400px] sm:min-h-[500px]">
            {/* Perfect Yellow Circle Background */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] bg-[#fad836] rounded-full"></div>
            
            {/* The Ingredients Image */}
            <img 
              src="/home/ingredients.png" 
              alt="Herbal Ingredients" 
              className="relative z-10 w-full max-w-[550px] h-auto object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Yoga Instructor",
      text: "These herbal teas have become a part of my daily routine. I feel more energetic, calm and healthy. Absolutely love the taste!",
      avatar: "https://i.pravatar.cc/150?img=32",
      productImage: "/home/ruby_calm_hero.png"
    },
    {
      id: 2,
      name: "Neha Verma",
      role: "IT Professional",
      text: "The quality is exceptional! You can truly taste the purity and freshness in every sip. My go-to tea for wellness.",
      avatar: "https://i.pravatar.cc/150?img=5",
      productImage: "/home/calm_tea.png"
    },
    {
      id: 3,
      name: "Rahul Mehta",
      role: "Entrepreneur",
      text: "I was struggling with bloating and indigestion. Digestive Wellness Tea has been a game changer for me. Highly recommended!",
      avatar: "https://i.pravatar.cc/150?img=11",
      productImage: "/home/digestive_herbal_img.png"
    },
    {
      id: 4,
      name: "Amit Desai",
      role: "Fitness Coach",
      text: "The Immunity Support blend has kept me feeling 100% all year round. The natural ingredients and rich aroma are simply unbeatable.",
      avatar: "https://i.pravatar.cc/150?img=60",
      productImage: "/home/detox_tea.png"
    },
    {
      id: 5,
      name: "Kavita Reddy",
      role: "Wellness Blogger",
      text: "I have tried many herbal brands, but this one stands out. The respiratory blend really helped soothe my throat during the cold season.",
      avatar: "https://i.pravatar.cc/150?img=44",
      productImage: "/home/hero.png"
    },
    {
      id: 6,
      name: "Sneha Kapoor",
      role: "Nutritionist",
      text: "I recommend these blends to all my clients. The natural herbs offer fantastic digestive benefits without any artificial additives.",
      avatar: "https://i.pravatar.cc/150?img=47",
      productImage: "/home/ruby_calm_hero.png"
    }
  ];

  const visibleCards = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  const nextPage = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevPage = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="bg-[#fcfbf9] py-14 relative overflow-hidden">
      {/* Decorative leaf motifs background (abstracted as subtle blobs) */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-[#e8f2e1]/40 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#e8f2e1]/40 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
            What Our Customers Say
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#7a6c5b]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Real stories. Real people. Real wellness.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex flex-col items-center justify-center">
          
          <div className="flex items-center justify-between w-full">
            {/* Cards */}
            <div className="overflow-hidden w-full px-1 py-3">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 w-full"
                >
                  {visibleCards.map((t) => (
                    <div key={t.id} className="bg-white rounded-[24px] p-6 md:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex flex-col items-center text-center border border-black/5 hover:-translate-y-1.5 transition-transform duration-300">
                      <img 
                        src={t.productImage} 
                        alt="Product" 
                        className="w-16 h-16 object-cover rounded-[12px] mb-4 shadow-sm border-[2px] border-[#8cb73d]/20 bg-white p-1" 
                      />
                      
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#f5a623] fill-current" />
                        ))}
                      </div>

                      <p className="text-[#4a5c51] text-[13px] md:text-[14px] leading-[1.75] flex-1" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {t.text}
                      </p>

                      <div className="w-full flex items-center justify-center gap-3 my-5">
                        <div className="flex-1 h-[1px] bg-[#e8e5de]"></div>
                        <Leaf className="w-3.5 h-3.5 text-[#5e8b42]" />
                        <div className="flex-1 h-[1px] bg-[#e8e5de]"></div>
                      </div>

                      <div className="flex items-center gap-3">
                        <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover shadow-sm border-2 border-white" />
                        <div className="text-left">
                          <h4 className="text-[14px] font-bold text-[#2c4a35]" style={{ fontFamily: 'Playfair Display, serif' }}>{t.name}</h4>
                          <p className="text-[12px] text-[#7a6c5b]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Pagination Navigation */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button onClick={prevPage} className="w-10 h-10 rounded-full bg-[#5e8b42] text-white flex items-center justify-center hover:bg-[#4a6b3d] transition-colors shadow-md">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextPage} className="w-10 h-10 rounded-full bg-[#5e8b42] text-white flex items-center justify-center hover:bg-[#4a6b3d] transition-colors shadow-md">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}


export default function Home() {
  const addItem = useCartStore((state) => state.addItem);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const [selectedWellness, setSelectedWellness] = useState<typeof WELLNESS_CARDS[0] | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(products => {
      setFeaturedProducts(products);
    });
    
    let animationFrameId: number;
    const scrollContainer = scrollRef.current;
    let scrollPos = scrollContainer ? scrollContainer.scrollLeft : 0;

    const scrollStep = () => {
      if (scrollContainer && !isHovered) {
        // Sync if user manually scrolled while hovering or interacting
        if (Math.abs(scrollContainer.scrollLeft - scrollPos) > 1) {
          scrollPos = scrollContainer.scrollLeft;
        }
        scrollPos += 0.5; // Slower scroll speed
        
        // Snap back to start when reaching the middle (for duplicated infinite list)
        if (scrollPos >= scrollContainer.scrollWidth / 2) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#F4EFE6] to-[#E5E9E0]" style={{ minHeight: '88vh' }}>
        {/* Soft background blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-[#A8B5A2]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-full flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 lg:py-20">

            {/* ── LEFT: Content ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 max-w-[650px]"
            >

              {/* Headline */}
              <h1
                className="text-[38px] sm:text-[48px] lg:text-[56px] font-bold text-[#0F3D2E] leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <span className="block whitespace-nowrap">Nature's Calm,</span>
                <span className="block whitespace-nowrap">Balanced From Within.</span>
              </h1>

              {/* Gold divider */}
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-12 bg-[#D4AF37] rounded-full" />
                <span className="text-[#D4AF37] text-lg">✦</span>
              </div>

              {/* Description */}
              <p
                className="text-[16px] text-[#5a6b60] leading-[1.8] max-w-[460px]"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                Thoughtfully crafted herbal tea blends designed to support hormonal balance, menstrual wellness, digestion, relaxation, and everyday calm.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#0F3D2E] hover:bg-[#1a5240] text-white px-7 py-4 rounded-xl text-[15px] font-bold transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(15,61,46,0.35)] hover:-translate-y-0.5"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  Shop Collection <span>🌿</span>
                </Link>
                <Link
                  href="/#about"
                  className="inline-flex items-center gap-2 bg-transparent border-[1.5px] border-[#0F3D2E]/40 text-[#0F3D2E] hover:bg-[#0F3D2E]/5 px-7 py-3.5 rounded-xl text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  Our Story
                </Link>
              </div>

              {/* Trust Icons */}
              <div className="flex flex-wrap xl:flex-nowrap items-center gap-4 sm:gap-5 lg:gap-6 mt-4 pt-4 border-t border-[#e0dcd3]">
                {[
                  { img: '/home/girl_icon.png', label: 'Hormonal\nBalance', separator: true },
                  { img: '/home/dijestive.png', label: 'Supports\nDigestion' },
                  { img: '/home/half_flower.png', label: 'Promotes\nCalmness' },
                  { img: '/home/2_leaves_icon.png', label: '100%\nHerbal' },
                ].map(({ img, label, separator }, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full border-[1.5px] border-[#A8B5A2] flex items-center justify-center bg-transparent">
                        <img src={img} alt={label.replace('\n', ' ')} className="w-8 h-8 object-contain" />
                      </div>
                      <span className="text-[13px] font-semibold text-[#0F3D2E] leading-[1.3] whitespace-pre-line" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {label}
                      </span>
                    </div>
                    {separator && <div className="hidden sm:block w-[1px] h-10 bg-[#A8B5A2]/40" />}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT: Product Visual ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative flex items-center justify-center"
            >
              {/* Glowing orb behind product */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#A8B5A2]/30 via-[#F8F5EE] to-[#D4AF37]/10 blur-[50px]" />

              {/* Product image */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-full max-w-[480px]"
              >
                <img
                  src="/home/hero.png"
                  alt="R-HerbalTea Ruby Calm Tea – Women's Wellness Blend"
                  className="w-full h-auto object-contain drop-shadow-xl"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── TRUST & WELLNESS BENEFITS STRIP ── */}
      <section className="w-full relative bg-[#fcfbf9] py-20 lg:py-24 overflow-hidden border-y border-[#ece8dc]">
        {/* Subtle Background Decor */}
        {/* Soft sage green gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#A8B5A2]/10 to-transparent rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-[#D4AF37]/5 to-transparent rounded-full blur-[60px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        {/* Botanical leaf illustrations in corners */}
        <div className="absolute top-10 left-10 w-40 h-40 opacity-[0.04] pointer-events-none rotate-45 transform -scale-x-100">
          <img src="/home/2_leaves_icon.png" alt="" className="w-full h-full object-contain filter grayscale" />
        </div>
        <div className="absolute top-20 right-10 w-48 h-48 opacity-[0.03] pointer-events-none -rotate-12">
          <img src="/home/2_leaves_icon.png" alt="" className="w-full h-full object-contain filter grayscale" />
        </div>

        {/* Faint floating leaves */}
        <div className="absolute top-48 left-[20%] w-14 h-14 opacity-[0.03] pointer-events-none rotate-[30deg]">
          <img src="/home/2_leaves_icon.png" alt="" className="w-full h-full object-contain filter grayscale" />
        </div>
        <div className="absolute bottom-40 right-[15%] w-16 h-16 opacity-[0.03] pointer-events-none -rotate-[45deg]">
          <img src="/home/2_leaves_icon.png" alt="" className="w-full h-full object-contain filter grayscale" />
        </div>

        {/* Organic flowing shapes at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none z-0 transform translate-y-[2px]">
          <svg className="relative block w-full h-[100px] lg:h-[150px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#A8B5A2" fillOpacity="0.15" d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,213.3C672,224,768,192,864,160C960,128,1056,96,1152,106.7C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="#EFE7D7" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,181.3C384,203,480,213,576,202.7C672,192,768,160,864,160C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Label & Heading */}
          <div className="flex flex-col items-center text-center mb-16 space-y-7">

            
            <h2 className="text-[34px] md:text-[44px] lg:text-[48px] font-bold text-[#0F3D2E] leading-[1.25] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Crafted With Nature,<br className="hidden sm:block" />
              Designed For Everyday Wellbeing
            </h2>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5 xl:gap-8">
            {[
              { img: '/home/2_leaves_icon.png', title: '100% Herbal', desc: 'Pure plant-based\ningredients.' },
              { img: '/home/full_flower.png', title: 'Hormonal Wellness', desc: "Crafted for women's\nbalance and comfort." },
              { img: '/home/cup_icon.png', title: 'Supports Digestion', desc: 'Helps maintain everyday\ndigestive wellbeing.' },
              { img: '/home/moon.png', title: 'Promotes Calmness', desc: 'A soothing ritual for\nrelaxation and peace.' },
              { img: '/home/shield_icon.png', title: 'Made In India', desc: 'Carefully blended with\npremium ingredients.' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group bg-white rounded-[24px] p-8 md:p-6 xl:p-8 flex flex-col items-center text-center shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(15,61,46,0.08)] hover:-translate-y-2 transition-all duration-500 relative border border-[#EFE7D7]/30"
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  {/* Soft gold glow behind icon container */}
                  <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-[20px] group-hover:bg-[#D4AF37]/25 transition-colors duration-500" />
                  
                  {/* Thin gold circle outline */}
                  <div className="relative w-[76px] h-[76px] rounded-full border border-[#D4AF37] bg-white group-hover:bg-[#0F3D2E] group-hover:border-[#0F3D2E] flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm">
                    {/* Icon Image */}
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-[36px] h-[36px] object-contain opacity-90 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert group-hover:rotate-[360deg] transition-all duration-700" 
                    />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-[#0F3D2E] font-bold text-[18px] md:text-[17px] xl:text-[18px] mb-3 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.title}
                </h4>

                {/* Tiny Gold Leaf Separator */}
                <div className="flex items-center justify-center gap-1.5 mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 w-full">
                  <div className="w-[18px] h-[1px] bg-[#D4AF37]/40" />
                  <Leaf className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={2.5} />
                  <div className="w-[18px] h-[1px] bg-[#D4AF37]/40" />
                </div>

                {/* Description */}
                <p className="text-[#5a6b60] text-[13.5px] leading-[1.65] whitespace-pre-line group-hover:text-[#0F3D2E]/80 transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Products Collection */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-center relative mb-14 gap-6">
            <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
              <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Herbal Tea Collection
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#6b7b72] leading-[1.7] max-w-2xl" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Discover our carefully crafted herbal tea blends designed to support your daily wellness journey naturally.
              </p>
            </div>
            <Link href="#shop" className="md:absolute md:right-0 md:bottom-2 text-[13px] font-bold tracking-[0.15em] text-[#e2b755] hover:text-[#f2c765] transition-colors uppercase shrink-0">
              Shop All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mx-auto">
            {featuredProducts.slice(0, 4).map((product, idx) => (
              <FeaturedProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <WellnessSolutionsSection />
      <IngredientStorySection />

      <TestimonialsSection />



      {/* About Us Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
            {/* Left Image */}
            <div className="w-full lg:w-1/2 relative flex justify-center items-start">
              <div 
                className="relative w-full max-w-[550px] rounded-[30px] overflow-hidden bg-[#f4f1e6]" 
                style={{ aspectRatio: '1.15' }}
              >
                <img 
                  src="/home/about_us.png" 
                  alt="Herbal Wellness Tea" 
                  className="absolute top-0 left-0 w-full h-auto" 
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="space-y-2">
                <span className="text-[13px] font-bold uppercase tracking-[0.25em] text-[#4a6b3d] block">About Us</span>
                <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Rooted in Nature.<br />Inspired by Wellness.
                </h2>
              </div>
              
              <p className="text-[15px] md:text-[17px] text-[#4a5c51] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                At Herbal Wellness Tea, we believe that true wellness begins with nature. Our herbal teas are carefully crafted using handpicked, 100% natural ingredients to support your body, calm your mind, and uplift your everyday life.
              </p>
              
              <p className="text-[15px] md:text-[17px] text-[#4a5c51] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                From calming blends to immunity boosters, every cup is made with love, purity and a promise of better well-being.
              </p>
              
              <div>
                <Link href="#about" className="inline-flex items-center gap-2 bg-[#4a6b3d] hover:bg-[#3b5930] text-white px-8 py-4 rounded-xl font-semibold text-[15px] transition-all shadow-[0_8px_20px_-6px_rgba(74,107,61,0.4)] hover:-translate-y-1">
                  Learn More About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Features Bar */}
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 md:divide-x divide-black/[0.08]">
              {[
                { title: "Natural Ingredients", desc: "We use the finest herbs and botanicals, carefully selected for purity and maximum benefits.", icon: <Leaf className="w-6 h-6" /> },
                { title: "Premium Quality", desc: "Our teas are crafted with high-quality ingredients and the highest standards.", icon: <Award className="w-6 h-6" /> },
                { title: "Wellness Focused", desc: "Every blend is designed to support your health, harmony and holistic well-being.", icon: <Coffee className="w-6 h-6" /> },
                { title: "Made with Care", desc: "Blended with love and passion to bring you the best nature has to offer.", icon: <Heart className="w-6 h-6" /> },
                { title: "Sustainable & Ethical", desc: "We care for the planet as much as we care for your wellness.", icon: <Globe className="w-6 h-6" /> }
              ].map((f, i) => (
                <div key={i} className="group flex flex-col items-center text-center px-4 first:pl-0 last:pr-0 cursor-default">
                  <div className="w-14 h-14 bg-[#e8eedd] rounded-full flex items-center justify-center text-[#4a6b3d] mb-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:bg-[#8cb73d] group-hover:text-white transition-all duration-300 ease-out">
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-[#1c2e24] mb-3 text-[16px] group-hover:text-[#4a6b3d] transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{f.title}</h4>
                  <p className="text-[13px] text-[#6b7b72] leading-relaxed max-w-[200px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          


        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Wellness Modal */}
      <AnimatePresence>
        {selectedWellness && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWellness(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#fcfbf9] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="overflow-y-auto no-scrollbar pb-8">
                {/* Header Image Area */}
                <div className="relative aspect-[4/3] w-full bg-[#1c2e24]">
                  <img src={selectedWellness.modalImage} alt={selectedWellness.title} className="w-full h-full object-cover opacity-80" />
                  
                  {/* Close button */}
                  <button 
                    onClick={() => setSelectedWellness(null)}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-[#1c2e24] hover:bg-white/40 transition-colors z-20"
                  >
                    <X className="w-5 h-5" />
                  </button>



                  {/* Title */}
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#fcfbf9] via-[#fcfbf9]/90 to-transparent pt-20">
                    <h3 className="text-2xl font-bold text-[#1c2e24] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {selectedWellness.title}
                    </h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="px-6 space-y-8 mt-2">
                  {/* Subtitle */}
                  <p className="text-[15px] italic text-[#6b7b72] border-l-2 border-[#8cb73d]/30 pl-4 py-1" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {selectedWellness.subtitle}
                  </p>

                  {/* Therapeutic Benefits */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8cb73d] mb-4 border-b border-black/5 pb-2">Therapeutic Benefits</h4>
                    <div className="space-y-3">
                      {selectedWellness.benefits.map((benefit: any, idx: number) => (
                        <div key={idx} className="bg-[#f4f2ee] p-4 rounded-xl flex items-start gap-4">
                          <div className="mt-0.5">{benefit.icon}</div>
                          <div>
                            <h5 className="text-[14px] font-bold text-[#1c2e24] mb-1">{benefit.title}</h5>
                            <p className="text-[12.5px] text-[#6b7b72] leading-relaxed">{benefit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Ingredients */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8cb73d] mb-4 border-b border-black/5 pb-2">Active Ingredients</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedWellness.ingredients.map((ing: any, idx: number) => (
                        <div key={idx} className="bg-[#f4f2ee] p-4 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 border border-transparent hover:border-[#8cb73d]/20 transition-colors">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#6b7b72]">{ing.type}</span>
                          <span className="text-[15px] font-semibold text-[#1c2e24]" style={{ fontFamily: 'Playfair Display, serif' }}>{ing.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ritual */}
                  <div className="bg-[#f4f2ee] p-6 rounded-2xl border border-black/5 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-[#8cb73d]/10">
                      <Clock className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-[#2c4a35] font-semibold text-[13px] tracking-widest uppercase mb-3">
                        <Clock className="w-4 h-4" /> The Ritual
                      </div>
                      <p className="text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {selectedWellness.ritual}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <Link href="/shop" className="w-full py-4 bg-[#0a1811] hover:bg-[#1c2e24] text-white rounded-full font-bold text-[13px] tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 group shadow-xl">
                    Explore Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
