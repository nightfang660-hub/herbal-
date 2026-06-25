'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';
import { ArrowLeft, Star, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data
const PRODUCTS = [
  { id: 1, name: "Premium Herbal Blend", price: 450.00, originalPrice: 500, discount: 10, img: "/shop/red_tea.png", rating: 4.5, reviews: 124, category: "Wellness Blends", type: "Herbal", weight: "15 Packets", benefit: "Relaxation", ingredient: "Mint" },
  { id: 2, name: "Calming Chamomile", price: 350.00, originalPrice: 400, discount: 12, img: "/shop/green_tea.png", rating: 4.0, reviews: 89, category: "Loose Leaf", type: "Decaf", weight: "10 Packets", benefit: "Relaxation", ingredient: "Chamomile" },
  { id: 3, name: "Morning Matcha", price: 850.00, originalPrice: 1000, discount: 15, img: "/shop/blue.png", rating: 4.8, reviews: 342, category: "Matcha", type: "Caffeinated", weight: "30 Packets", benefit: "Energy", ingredient: "Matcha" },
  { id: 4, name: "Detox Green Wellness", price: 400.00, originalPrice: 500, discount: 20, img: "/shop/ruby_detox.png", rating: 4.1, reviews: 56, category: "Wellness Blends", type: "Caffeinated", weight: "15 Packets", benefit: "Digestion", ingredient: "Mint" },
  { id: 5, name: "Sleepy Time Essence", price: 300.00, originalPrice: 350, discount: 14, img: "/shop/blue_tea1.png", rating: 4.7, reviews: 210, category: "Tea Bags", type: "Herbal", weight: "10 Packets", benefit: "Relaxation", ingredient: "Chamomile" },
  { id: 6, name: "Energy Boost Root", price: 600.00, originalPrice: 750, discount: 20, img: "/shop/red_tea.png", rating: 4.3, reviews: 112, category: "Loose Leaf", type: "Caffeinated", weight: "20 Packets", benefit: "Energy", ingredient: "Ginger" },
  { id: 7, name: "Immunity Shield", price: 550.00, originalPrice: 650, discount: 15, img: "/shop/green_tea.png", rating: 4.9, reviews: 420, category: "Wellness Blends", type: "Herbal", weight: "20 Packets", benefit: "Immunity", ingredient: "Ginger" },
  { id: 8, name: "Focus & Clarity", price: 750.00, originalPrice: 850, discount: 11, img: "/shop/ruby_detox.png", rating: 4.6, reviews: 175, category: "Matcha", type: "Caffeinated", weight: "30 Packets", benefit: "Energy", ingredient: "Matcha" },
  { id: 9, name: "Digestive Soothe", price: 380.00, originalPrice: 420, discount: 9, img: "/shop/blue_tea1.png", rating: 4.2, reviews: 93, category: "Tea Bags", type: "Herbal", weight: "10 Packets", benefit: "Digestion", ingredient: "Ginger" },
];

export default function WishlistPage() {
  const router = useRouter();
  const { items, toggleItem, clearWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#f4efe6]"></div>;

  const wishlistProducts = items
    .map(item => PRODUCTS.find(p => p.id === item.productId))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#f4efe6] py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full border border-[#d1c8ba] flex items-center justify-center text-[#1c2e24] hover:bg-[#e8e5de] transition-colors mb-6"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-[28px] md:text-[36px] font-bold text-[#1c2e24]" style={{ fontFamily: 'Playfair Display, serif' }}>
              My Wishlist
            </h1>
            <p className="text-[#6b7b72] mt-2">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          
          {wishlistProducts.length > 0 && (
            <button 
              onClick={() => clearWishlist()}
              className="text-[#e2b755] hover:text-[#d4a844] font-medium text-sm flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#e8e5de]">
            <div className="w-16 h-16 bg-[#f9f8f6] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#d1c8ba]" />
            </div>
            <h2 className="text-xl font-bold text-[#1c2e24] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Your wishlist is empty</h2>
            <p className="text-[#6b7b72] mb-6 max-w-md mx-auto">Looks like you haven't added any products to your wishlist yet. Explore our shop to find your perfect blend.</p>
            <button
              onClick={() => router.push('/shop')}
              className="bg-[#1c2e24] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2a4536] transition-colors"
            >
              Explore Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product: any, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={`wishlist-${product.id}`} 
                onClick={() => router.push(`/shop/${product.id}`)}
                className="flex flex-col group cursor-pointer bg-white rounded-3xl border border-[#e8e5de] p-5 overflow-hidden shadow-sm transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative w-full h-[280px] mb-2 flex items-center justify-center rounded-t-3xl pt-2 px-1">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className={`w-full h-full object-contain drop-shadow-sm transition-transform duration-700 ease-in-out ${product.img.endsWith('/blue.png') ? 'scale-[1.4] translate-y-1' : (product.img.endsWith('/ruby_detox.png') || product.img.endsWith('/blue_tea1.png') ? 'scale-[1.3] translate-y-2' : '')}`} 
                  />
                  
                  {/* Remove from wishlist button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(product.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-white shadow-sm transition-all z-10"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
                
                {/* Product Details */}
                <div className="flex flex-col flex-1">
                  {/* Rating (5 Stars) */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-[#e8e5de] text-[#e8e5de]'}`} />
                    ))}
                  </div>

                  <h4 className="font-bold text-[#1c2e24] group-hover:text-[#4caf50] text-[18px] leading-tight mb-2 transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {product.name}
                  </h4>
                  
                  <span className="text-[#8b9992] text-[13px] font-medium mb-4 uppercase">
                    {product.category} {product.weight}
                  </span>
                  
                  <div className="flex items-center justify-between mt-auto gap-3">
                    <div className="flex flex-col shrink-0">
                      <span className="font-bold text-[#1c2e24] text-[20px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        ₹{product.price}
                      </span>
                    </div>
                    
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          router.push(`/shop/${product.id}`);
                        }}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0F3D2E] text-white hover:bg-[#1a5441] transition-colors shadow-sm shrink-0 relative z-10"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
