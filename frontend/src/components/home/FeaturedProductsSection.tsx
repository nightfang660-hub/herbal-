'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '../../features/cart/cartStore';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const FEATURED_PRODUCTS = [
  { id: 1, name: "Premium Herbal Blend", price: 450.00, img: "/shop/red_tea.png", rating: 4.5, weight: "15 Packets" },
  { id: 2, name: "Calming Chamomile", price: 350.00, img: "/shop/green_tea.png", rating: 4.0, weight: "10 Packets" },
  { id: 3, name: "Morning Matcha", price: 850.00, img: "/shop/blue.png", rating: 4.8, weight: "30 Packets" },
  { id: 4, name: "Detox Green Wellness", price: 400.00, img: "/shop/ruby_detox.png", rating: 4.1, weight: "15 Packets" },
];

function FeaturedProductCard({ product, index }: { product: any, index?: number }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    addItem({
      sku: `PACK-${product.id}-1`,
      name: `${product.name} (${product.weight})`,
      priceCents: product.price * 100,
      image: product.img
    });
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
      }}
      onClick={() => router.push(`/shop/${product.id}`)}
      className="flex flex-col group cursor-pointer bg-white rounded-2xl md:rounded-3xl border border-[#e8e5de] p-3 md:p-5 overflow-hidden shadow-sm transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative w-full h-[160px] md:h-[280px] mb-3 flex items-center justify-center rounded-t-2xl pt-2 px-1">
        <button 
          className={`absolute top-0 right-0 p-1 transition-colors z-10 ${mounted && isInWishlist(product.id) ? 'text-[#D84B5B]' : 'text-[#8b9992] hover:text-[#D84B5B]'}`} 
          onClick={(e) => { e.stopPropagation(); toggleItem(product.id); }}
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} fill={mounted && isInWishlist(product.id) ? 'currentColor' : 'none'} />
        </button>
        <img 
          src={product.img} 
          alt={product.name} 
          className={`w-full h-full object-contain drop-shadow-sm transition-transform duration-700 ease-in-out ${product.img.endsWith('/blue.png') ? 'scale-[1.4] translate-y-1' : (product.img.endsWith('/ruby_detox.png') || product.img.endsWith('/blue_tea1.png') ? 'scale-[1.3] translate-y-2' : '')}`} 
        />
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <h4 className="font-bold text-[#2c4a35] group-hover:text-[#0F3D2E] text-[14px] md:text-[18px] leading-tight mb-1.5 transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
          {product.name}
        </h4>

        {/* Rating (5 Stars) */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-[2px]">
            {[...Array(5)].map((_, i) => (
               <Star key={i} className={`w-3 h-3 md:w-3.5 md:h-3.5 ${i < Math.floor(product.rating) ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-[#e8e5de] text-[#e8e5de]'}`} />
            ))}
          </div>
          <span className="text-[11px] md:text-[13px] font-bold text-[#4a5d53]">({product.rating.toFixed(1)})</span>
        </div>
        
        <div className="flex items-center justify-between mt-auto gap-3 pt-1">
          <span className="font-bold text-[#0F3D2E] text-[15px] md:text-[20px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            ₹{product.price}
          </span>
          
          {/* Actions */}
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
              className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0F3D2E] text-white hover:bg-[#1a5441] transition-colors shadow-sm shrink-0 relative z-10"
            >
              <ShoppingCart className="w-4 h-4 md:w-[18px] md:h-[18px]" />
            </button>
          </div>
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
