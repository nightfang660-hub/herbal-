'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Star, Heart, Search, ShoppingBasket, ArrowRight, FlaskConical, Sprout } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../features/cart/cartStore';

// Herbal Tea specific products with rich data for filtering
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
  { id: 10, name: "Ginger Glow Wellness", price: 420.00, originalPrice: 480, discount: 12, img: "/shop/red_tea.png", rating: 4.6, reviews: 105, category: "Wellness Blends", type: "Herbal", weight: "15 Packets", benefit: "Digestion", ingredient: "Ginger" },
  { id: 11, name: "Minty Fresh Start", price: 340.00, originalPrice: 390, discount: 13, img: "/shop/green_tea.png", rating: 4.4, reviews: 67, category: "Tea Bags", type: "Caffeinated", weight: "20 Packets", benefit: "Energy", ingredient: "Mint" },
  { id: 12, name: "Pure Matcha Premium", price: 920.00, originalPrice: 1050, discount: 12, img: "/shop/blue.png", rating: 4.9, reviews: 412, category: "Matcha", type: "Caffeinated", weight: "30 Packets", benefit: "Energy", ingredient: "Matcha" },
  { id: 13, name: "Nighttime Harmony", price: 410.00, originalPrice: 450, discount: 9, img: "/shop/blue_tea1.png", rating: 4.7, reviews: 156, category: "Loose Leaf", type: "Decaf", weight: "15 Packets", benefit: "Relaxation", ingredient: "Chamomile" },
  { id: 14, name: "Tropical Detox", price: 460.00, originalPrice: 520, discount: 11, img: "/shop/ruby_detox.png", rating: 4.3, reviews: 88, category: "Wellness Blends", type: "Herbal", weight: "20 Packets", benefit: "Digestion", ingredient: "Mint" },
  { id: 15, name: "Golden Immunity", price: 580.00, originalPrice: 660, discount: 12, img: "/shop/red_tea.png", rating: 4.8, reviews: 234, category: "Loose Leaf", type: "Herbal", weight: "15 Packets", benefit: "Immunity", ingredient: "Ginger" },
];

const CATEGORIES = ['All', 'Loose Leaf', 'Tea Bags', 'Matcha', 'Wellness Blends'];
const BENEFITS = ['All', 'Relaxation', 'Energy', 'Immunity', 'Digestion'];
const INGREDIENTS = ['All', 'Chamomile', 'Matcha', 'Ginger', 'Mint'];
const RATINGS = ['All', '4 Stars & Up', '3 Stars & Up'];

export default function ShopPage() {
  const router = useRouter();

  // Dynamic States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBenefit, setSelectedBenefit] = useState('All');
  const [selectedIngredient, setSelectedIngredient] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [priceValue, setPriceValue] = useState(1020); // Default to max

  // Powerful Filtering Logic
  const filteredProducts = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchBenefit = selectedBenefit === 'All' || p.benefit === selectedBenefit;
    const matchIngredient = selectedIngredient === 'All' || p.ingredient === selectedIngredient;
    let matchRating = true;
    if (selectedRating === '4 Stars & Up') matchRating = p.rating >= 4.0;
    if (selectedRating === '3 Stars & Up') matchRating = p.rating >= 3.0;
    const matchPrice = p.price <= priceValue;

    return matchSearch && matchCategory && matchBenefit && matchIngredient && matchRating && matchPrice;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#f5f0e6] min-h-[85vh] flex items-center">
        {/* Right Side Background Image (Desktop) */}
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-[50%] xl:w-[55%] bg-no-repeat bg-cover bg-center lg:bg-[90%_center] opacity-30 lg:opacity-100 z-0"
          style={{ backgroundImage: `url('/assets/shopheros.png')` }}
        >
           <div className="hidden lg:block absolute inset-y-0 left-0 w-[400px] bg-gradient-to-r from-[#f5f0e6] via-[#f5f0e6]/60 to-transparent"></div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 xl:px-8 py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] xl:w-[48%] space-y-8"
          >
            {/* Subtitle */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[#c19236]"></div>
              <span className="text-[#c19236] font-bold text-[13px] tracking-widest uppercase">
                Shop Our Collection
              </span>
              <div className="w-12 h-[2px] bg-[#c19236]"></div>
            </div>

            {/* Title */}
            <h1 className="text-[44px] md:text-[52px] lg:text-[56px] xl:text-[64px] font-bold text-[#0F3D2E] leading-[1.1] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Find Your Perfect <br />
              <span className="text-[#c19236]">Herbal Blend</span>
            </h1>
            
            {/* Description */}
            <p className="text-[16px] md:text-[18px] text-[#4a5d53] font-medium leading-[1.8] max-w-md" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Carefully crafted herbal teas made with 100% natural ingredients to support your body, calm your mind and elevate your everyday.
            </p>

            {/* Button */}
            <div>
              <button className="flex items-center gap-3 bg-[#0F3D2E] text-white px-8 py-3.5 rounded-full hover:bg-[#1a5441] transition-colors shadow-md">
                <span className="font-semibold text-[15px] tracking-wide">Shop All Teas</span>
                <ArrowRight className="w-4 h-4 text-[#e2b755]" />
              </button>
            </div>


          </motion.div>
        </div>
      </section>



      {/* Main Shop Content Area */}
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 md:pt-6 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-start">
          
          {/* Right Column: Products Grid (3 columns) */}
          <div className="w-full lg:w-3/4 order-2 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map(product => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  key={product.id} 
                  onClick={() => router.push(`/shop/${product.id}`)}
                  className="flex flex-col group cursor-pointer bg-white rounded-3xl border border-[#e8e5de] hover:border-[#ffc107] p-5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-[280px] mb-2 flex items-center justify-center rounded-t-3xl pt-2 px-1">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className={`w-full h-full object-contain drop-shadow-sm transition-transform duration-700 ease-in-out ${product.img.endsWith('/blue.png') ? 'scale-[1.4] translate-y-1' : (product.img.endsWith('/ruby_detox.png') || product.img.endsWith('/blue_tea1.png') ? 'scale-[1.3] translate-y-2' : '')}`} 
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex flex-col flex-1">
                    {/* Rating (5 Stars) */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                         <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-[#e8e5de] text-[#e8e5de]'}`} />
                      ))}
                    </div>

                    <h4 className="font-bold text-[#2c4a35] group-hover:text-[#0F3D2E] text-[18px] leading-tight mb-2 transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {product.name}
                    </h4>
                    
                    <span className="text-[#8b9992] text-[13px] font-medium mb-4 uppercase">
                      {product.category} {product.weight}
                    </span>
                    
                    <div className="flex items-center justify-between mt-auto gap-3">
                      <div className="flex flex-col shrink-0">
                        <span className="font-bold text-[#0F3D2E] text-[20px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                          ₹{product.price.toFixed(2)}
                        </span>
                      </div>
                      
                      {/* Add To Cart Button */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); router.push(`/shop/${product.id}`); }}
                        className="relative group/btn flex items-center justify-end h-10 w-10 group-hover:w-[135px] cursor-pointer transition-all duration-300"
                      >
                        {/* Expanding text pill */}
                        <div className="absolute right-4 h-[26px] flex items-center rounded-l-full bg-[#0F3D2E] text-white overflow-hidden transition-all duration-300 w-0 group-hover:w-[115px] group-hover/btn:!bg-[#ffc107] group-hover/btn:!text-[#0F3D2E] z-0">
                          <span className="whitespace-nowrap font-bold text-[13px] pl-3">
                            Add To Cart
                          </span>
                        </div>
                        {/* Fixed yellow circle */}
                        <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#ffc107] text-[#0F3D2E] shrink-0">
                          <ShoppingBasket className="w-5 h-5" />
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center text-[#6b7b72]">
                  No products found matching your filters. Try adjusting the price or categories.
                </div>
              )}
            </div>
          </div>

          {/* Left Column: Sidebar Filters */}
          <div className="w-full lg:w-1/4 order-1 lg:order-1 flex flex-col gap-10 sticky top-28">
            
            {/* Search */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Search by Products</h3>
              </div>
              <div className="relative flex items-center bg-white border border-[#e8e5de] rounded-full pl-4 pr-1.5 py-1 w-[85%] shadow-sm focus-within:border-[#e2b755] focus-within:ring-1 focus-within:ring-[#e2b755] transition-all">
                <input 
                  type="text" 
                  placeholder="Search products...." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[16px] text-[#0F3D2E] placeholder:text-[#8b9992] focus:outline-none w-full pr-4 py-2.5" 
                />
                <button className="bg-[#e2b755] text-white p-2.5 rounded-full hover:bg-[#d4a844] transition-colors flex items-center justify-center cursor-pointer shrink-0">
                  <Search className="h-4 w-4 text-slate-800" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {BENEFITS.map(ben => (
                   <label key={ben} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                       <input 
                         type="radio" 
                         name="benefit" 
                         checked={selectedBenefit === ben}
                         onChange={() => setSelectedBenefit(ben)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors ${selectedBenefit === ben ? 'text-[#0F3D2E] font-medium' : 'text-[#6b7b72] group-hover:text-[#0F3D2E]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                       {ben}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Ingredients</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {INGREDIENTS.map(ing => (
                   <label key={ing} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                       <input 
                         type="radio" 
                         name="ingredient" 
                         checked={selectedIngredient === ing}
                         onChange={() => setSelectedIngredient(ing)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors ${selectedIngredient === ing ? 'text-[#0F3D2E] font-medium' : 'text-[#6b7b72] group-hover:text-[#0F3D2E]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                       {ing}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Category</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {CATEGORIES.map(cat => (
                   <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                       <input 
                         type="radio" 
                         name="category" 
                         checked={selectedCategory === cat}
                         onChange={() => setSelectedCategory(cat)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors ${selectedCategory === cat ? 'text-[#0F3D2E] font-medium' : 'text-[#6b7b72] group-hover:text-[#0F3D2E]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                       {cat}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Rating</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {RATINGS.map(rate => (
                   <label key={rate} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                       <input 
                         type="radio" 
                         name="rating" 
                         checked={selectedRating === rate}
                         onChange={() => setSelectedRating(rate)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors flex items-center gap-1 ${selectedRating === rate ? 'text-[#0F3D2E] font-medium' : 'text-[#6b7b72] group-hover:text-[#0F3D2E]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                       {rate} {rate !== 'All' && <Star className="w-3 h-3 fill-[#e2b755] text-[#e2b755]" />}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Filter by Price */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Filter by Price</h3>
              </div>
              <div className="px-1 flex flex-col w-[85%]">
                <input 
                  type="range" 
                  min="200" 
                  max="1020" 
                  value={priceValue}
                  onChange={(e) => setPriceValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#d1c8ba] rounded-full appearance-none outline-none cursor-pointer accent-[#2c4a35] mb-3"
                />
                <div className="flex justify-between text-[13px] text-[#0F3D2E] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  <span>₹200</span>
                  <span className="text-[#8cb73d] font-bold">Max: ₹{priceValue}</span>
                  <span>₹1020</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
