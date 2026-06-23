'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingBasket } from 'lucide-react';
import { useCartStore } from '../../features/cart/cartStore';
import { motion } from 'framer-motion';

const FEATURED_PRODUCTS = [
  {
    id: "fp-1",
    name: "Ruby Calm Tea",
    badge: "Relaxation Blend",
    description: "A soothing blend to help you relax and find your inner calm.",
    price: 399,
    originalPrice: 499,
    image: "/assets/herosection.png",
    bestseller: true
  },
  {
    id: "fp-2",
    name: "Ruby Calm Tea",
    badge: "Women's Wellness Blend",
    description: "Carefully crafted to support hormonal balance and harmony from within.",
    price: 449,
    originalPrice: 599,
    image: "/home/ruby_calm_hero.png",
    bestseller: true
  },
  {
    id: "fp-3",
    name: "Daily Detox Tea",
    badge: "Purifying Blend",
    description: "A refreshing blend that supports daily detox and inner clarity.",
    price: 349,
    originalPrice: 449,
    image: "/home/detox_tea.png",
    bestseller: true
  },
  {
    id: "fp-4",
    name: "Zen Digest Blend",
    badge: "Daily Digestive Relief",
    description: "Daily digestive relief blend with Ginger, Peppermint, Fennel, and Chamomile.",
    price: 399,
    originalPrice: 499,
    image: "/home/digestive_herbal_img.png",
    bestseller: false
  }
];

function FeaturedProductCard({ product, index }: { product: any, index?: number }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      sku: `PACK-${product.id}-1`,
      name: `${product.name} (1 Packet)`,
      priceCents: product.price * 100,
      image: product.image
    });
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
      }}
      className="group flex flex-col h-full bg-white rounded-[24px] overflow-hidden transition-all duration-300 border-2 border-transparent shadow-[0_0_0_1px_#f0f0f0] hover:shadow-lg hover:border-[#FFC107]"
    >
      {/* Top Section: Image Area */}
      <div className="relative aspect-square sm:aspect-[4/5] w-full flex items-center justify-center overflow-hidden bg-[#f9f9f9]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
      </div>

      {/* Content Section */}
      <div className="pt-5 pb-6 px-6 flex flex-col flex-grow text-left">
        {/* Stars */}
        <div className="flex items-center gap-[4px] mb-3">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="w-[16px] h-[16px] text-[#FFC107] fill-[#FFC107]" />
          ))}
          <Star className="w-[16px] h-[16px] text-[#e0e0e0] fill-[#e0e0e0]" />
        </div>

        {/* Title */}
        <h3 className="text-[19px] font-bold leading-tight mb-2 text-[#1f2937] group-hover:text-[#0F3D2E] transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
          {product.name}
        </h3>
        
        {/* Badge / Subtitle */}
        <p className="text-[12px] font-bold text-[#a0a0a0] uppercase tracking-wider mb-6 flex-grow">
          {product.badge}
        </p>

        {/* Bottom Row: Price & Button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[20px] font-extrabold text-[#1f2937]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            ₹{product.price}.00
          </span>
          
          <button 
             onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} 
             className="flex items-center justify-end rounded-full h-[40px] bg-[#FFC107] group-hover:bg-[#0F3D2E] transition-all duration-300 ease-in-out cursor-pointer p-[4px] group-hover:pl-4 group-hover:pr-1 active:scale-95 shadow-sm group-hover:shadow-md"
          >
             <span className="text-white font-bold text-[13px] tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:mr-3">
               Add To Cart
             </span>
             <div className="w-[32px] h-[32px] bg-transparent group-hover:bg-[#FFC107] rounded-full flex items-center justify-center text-[#1f2937] shrink-0 transition-colors duration-300">
               <ShoppingBasket className="w-[18px] h-[18px] group-hover:w-[16px] group-hover:h-[16px] transition-all duration-300" strokeWidth={2.5} />
             </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProductsSection() {
  return (
    <section className="bg-[#f4f1e6] py-12 border-b border-black/5 overflow-hidden relative" id="shop">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center relative mb-14 gap-6"
        >
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Herbal Tea Collection
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#6b7b72] leading-[1.7] max-w-2xl" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Discover our carefully crafted herbal tea blends designed to support your daily wellness journey naturally.
            </p>
          </div>
          <Link href="/shop" className="md:absolute md:right-0 md:bottom-2 text-[13px] font-bold tracking-[0.15em] text-[#e2b755] hover:text-[#f2c765] transition-colors uppercase shrink-0">
            Shop All &rarr;
          </Link>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mx-auto"
        >
          {FEATURED_PRODUCTS.map((product, idx) => (
            <FeaturedProductCard key={product.id} product={product} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
