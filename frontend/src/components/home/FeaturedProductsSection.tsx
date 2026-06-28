'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { useCartStore } from '../../features/cart/cartStore';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURED_PRODUCTS = [
  { id: 1, name: "Ruby Calm Tea", desc: "A soothing blend to relax your mind and uplift your mood.", bestSeller: true, price: 450.00, img: "/assets/product/file_000000008de072079cfe74523df70bde.png", rating: 4.5, weight: "15 Packets" },
];

function FeaturedProductCard({ product, index, onAdd }: { product: any, index?: number, onAdd: (name: string) => void }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
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
    setIsAdded(true);
    onAdd(product.name);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
      }}
      onClick={() => router.push(`/shop/${product.id}`)}
      className="flex flex-col group cursor-pointer bg-white rounded-[20px] md:rounded-3xl border border-[#e8e5de] p-3 md:p-5 overflow-hidden shadow-sm transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative w-full h-[110px] md:h-[280px] mb-2 md:mb-3 flex items-center justify-center rounded-t-2xl pt-1 md:pt-2 px-1">
        <button 
          className={`absolute top-0 right-0 p-1 transition-colors z-10 ${mounted && isInWishlist(product.id) ? 'text-[#D84B5B]' : 'text-[#8b9992] hover:text-[#D84B5B]'}`} 
          onClick={(e) => { e.stopPropagation(); toggleItem(product.id); }}
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} fill={mounted && isInWishlist(product.id) ? 'currentColor' : 'none'} />
        </button>
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-contain drop-shadow-sm transition-transform duration-700 ease-in-out" 
        />
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col flex-1">


        <h4 className="font-bold text-[#0F3D2E] text-[13px] md:text-[17px] leading-tight mb-1 md:mb-2 transition-colors duration-300 line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
          {product.name}
        </h4>

        {/* Rating (5 Stars) */}
        <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
          <div className="flex items-center gap-[1px] md:gap-[2px]">
            {[...Array(5)].map((_, i) => (
               <Star key={i} className={`w-2.5 h-2.5 md:w-[14px] md:h-[14px] ${i < Math.floor(product.rating) ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-[#e8e5de] text-[#e8e5de]'}`} />
            ))}
          </div>
          <span className="text-[10px] md:text-[12px] font-bold text-[#6b7b72] ml-0.5">({product.rating.toFixed(1)})</span>
        </div>

        {/* Description */}
        <div className="mb-2 md:mb-3">
          <p className="text-[11px] md:text-[13px] text-[#6b7b72] leading-[1.4] md:leading-[1.5] line-clamp-2">
            {product.desc}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="font-bold text-[#0F3D2E] text-[14px] md:text-[18px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            ₹{product.price}
          </span>
          
          {/* Actions */}
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(); }}
              className={`flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full text-white transition-colors shadow-sm shrink-0 relative z-10 hover:scale-105 active:scale-95 ${isAdded ? 'bg-[#5b8c5a]' : 'bg-[#183a2d] hover:bg-[#0f281e]'}`}
            >
              {isAdded ? (
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProductsSection() {
  const [notification, setNotification] = useState<string | null>(null);

  const handleProductAdd = (productName: string) => {
    setNotification(`${productName} added to cart!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <section className="bg-[#f4f1e6] py-12 overflow-hidden relative" id="shop">
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
            <FeaturedProductCard key={product.id} product={product} index={idx} onAdd={handleProductAdd} />
          ))}
        </motion.div>
      </div>
      
      {/* Global Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#0F3D2E] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-semibold text-[13px] md:text-[14px]"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            <div className="bg-[#5b8c5a] rounded-full p-1">
              <Check className="w-3 h-3 md:w-4 md:h-4 text-white stroke-[3]" />
            </div>
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
