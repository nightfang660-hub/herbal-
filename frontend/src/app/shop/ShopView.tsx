'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Leaf, Star, StarHalf, Heart, Search, ShoppingBasket, ShoppingCart, ArrowRight, FlaskConical, Sprout, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartStore } from '../../features/cart/cartStore';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';

import { getProducts, Product } from '../../lib/products';

const CATEGORIES = ['All', 'Loose Leaf', 'Tea Bags', 'Matcha', 'Wellness Blends'];
const BENEFITS = ['All', 'Relaxation', 'Energy', 'Immunity', 'Digestion'];
const INGREDIENTS = ['All', 'Chamomile', 'Matcha', 'Ginger', 'Mint'];
const RATINGS = ['All', '4 Stars & Up', '3 Stars & Up'];

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  // Dynamic States
  const [searchQuery, setSearchQuery] = useState(q || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBenefit, setSelectedBenefit] = useState('All');
  const [selectedIngredient, setSelectedIngredient] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [priceValue, setPriceValue] = useState(1020); // Default to max
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [addedItems, setAddedItems] = useState<{[key: string | number]: boolean}>({});
  const [notification, setNotification] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      sku: `product-${product.id}`,
      name: product.name,
      priceCents: product.price * 100,
      image: product.img
    });
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setNotification(`${product.name} added to cart!`);
    
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  React.useEffect(() => {
    setMounted(true);
    
    // Restore scroll position when returning from product details
    const savedScroll = sessionStorage.getItem('shopScrollPosition');
    if (savedScroll && !q) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'instant' });
        sessionStorage.removeItem('shopScrollPosition');
      }, 100);
    }
    
    if (q) {
      setSearchQuery(q);
      // Automatically scroll to the shop section when searching
      const el = document.getElementById('shop-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [q]);

  const handleProductClick = (id: string | number) => {
    sessionStorage.setItem('shopScrollPosition', window.scrollY.toString());
    router.push(`/shop/${id}`);
  };

  // Powerful Filtering Logic
  const filteredProducts = products.filter(p => {
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
    <div className="flex flex-col w-full min-h-screen bg-[#F8F5EE]">
      {/* Hero Section Wrapper */}
      <div className="w-full overflow-hidden">
        <section className="relative w-full overflow-hidden bg-white min-h-[50vh] lg:min-h-[70vh] flex flex-col">
        {/* Right Side Background Image */}
        <div 
          className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-[50%] xl:w-[55%] bg-no-repeat bg-cover bg-[position:60%_center] lg:bg-[90%_center] z-0"
          style={{ backgroundImage: `url('/assets/shopheros.png')` }}
        >
           {/* Dark gradient on mobile so the white text at the bottom is highly legible */}
           <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" style={{ zIndex: 1 }}></div>
           <div className="hidden lg:block absolute inset-y-0 -left-[2px] w-[200px] bg-gradient-to-r from-white via-white/70 to-white/0" style={{ zIndex: 1 }}></div>
        </div>

        <div className="flex-1 max-w-[1400px] w-full flex flex-col justify-end pb-10 pt-20 lg:justify-center lg:py-20 mx-auto px-6 sm:px-8 xl:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] xl:w-[48%] space-y-3 lg:space-y-8"
          >
            {/* Subtitle */}
            <div className="hidden lg:flex items-center gap-4">
              <span className="text-[#c9a55a] font-bold text-[11px] lg:text-[13px] tracking-widest uppercase">
                <span className="hidden lg:inline">Shop Our Collection</span>
              </span>
              <div className="hidden lg:block w-12 h-[2px] bg-[#c9a55a]"></div>
            </div>

            {/* Title */}
            <h1 className="text-[34px] sm:text-[46px] md:text-[52px] lg:text-[56px] xl:text-[64px] font-bold text-white lg:text-[#0F3D2E] leading-[1.05] tracking-tight drop-shadow-md lg:drop-shadow-none" style={{ fontFamily: 'Playfair Display, serif' }}>
              Find Your Perfect <br />
              <span className="text-[#c9a55a]">Herbal Blend.</span>
            </h1>
            
            {/* Description */}
            <p className="text-[14px] md:text-[18px] text-white/95 lg:text-[#4a5d53] font-medium leading-[1.6] lg:leading-[1.8] max-w-[320px] lg:max-w-md drop-shadow-md lg:drop-shadow-none" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <span className="lg:hidden">Carefully crafted herbal teas made with 100% natural ingredients to support your health, uplift your mood and nourish your soul.</span>
              <span className="hidden lg:inline">Carefully crafted herbal teas made with 100% natural ingredients to support your body, calm your mind and elevate your everyday.</span>
            </p>

            {/* Button */}
            <div className="pt-3 lg:pt-0 pb-4 lg:pb-0">
              <button className="flex items-center gap-2 bg-[#0F3D2E] text-white px-5 lg:px-8 py-2.5 lg:py-3.5 rounded-[6px] lg:rounded-[8px] hover:bg-[#0F3D2E] transition-colors shadow-md lg:shadow-lg text-[13px] lg:text-[15px] font-bold justify-center transition-all hover:shadow-lg lg:hover:shadow-xl hover:-translate-y-0.5 w-max" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                <span className="lg:hidden tracking-wide">View All Teas</span>
                <span className="hidden lg:inline tracking-wide">Shop All Teas</span>
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white lg:text-[#c9a55a]" />
              </button>
            </div>

          </motion.div>
        </div>
      </section>
      </div>



      {/* Main Shop Content Area */}
      <div id="shop-section" className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-start">
          
          {/* Right Column: Products Grid (3 columns) */}
          <div className="w-full lg:w-3/4 order-3 lg:order-2 flex flex-col gap-6">

            {/* Top Bar for Mobile inside products section */}
            <div className="flex flex-col gap-4 mb-2 lg:hidden">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[28px] font-bold text-[#0F3D2E] leading-none mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Shop All Teas</h2>
                  <p className="text-[13px] text-[#4a5d53] font-medium">Explore our range of 100% natural herbal blends.</p>
                </div>
              </div>

              {/* Mobile Search Input */}
              <div className="flex items-center gap-2 md:max-w-[450px]">
                <div className="relative flex-1 flex items-center bg-white border border-[#e8e5de] rounded-xl px-3 py-2 shadow-sm focus-within:border-[#D4AF37]">
                  <Search className="h-4 w-4 text-[#8b9992] mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search teas, ingredients..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-[14px] text-[#0F3D2E] placeholder:text-[#8b9992] focus:outline-none w-full" 
                  />
                </div>
                {/* Mobile Filter Toggle */}
                <button 
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-[#e8e5de] text-[#0F3D2E] font-bold text-[14px]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Filter
                </button>
              </div>

              {/* Product Count & Sort */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-[13px] font-bold text-[#4a5d53]">{filteredProducts.length} Products Found</span>
              </div>
            </div>

            {loading ? (
              <div className="col-span-2 lg:col-span-3 flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F3D2E]"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 text-center">
                <Leaf className="w-12 h-12 text-[#D4AF37] mb-4 opacity-50" />
                <h3 className="text-[20px] font-bold text-[#0F3D2E] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>No Teas Found</h3>
                <p className="text-[14px] text-[#6b7b72]">We couldn't find any blends matching your exact criteria.</p>
                <button onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBenefit('All');
                  setSelectedIngredient('All');
                  setSelectedRating('All');
                  setPriceValue(1020);
                  setSearchQuery('');
                }} className="mt-6 text-[#D4AF37] font-bold text-[14px] hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredProducts.map(product => (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    key={product.id} 
                    onClick={() => handleProductClick(product.id)}
                    className="flex flex-col group cursor-pointer bg-white rounded-2xl md:rounded-[20px] border border-[#e8e5de] p-3 md:p-5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                  {/* Product Image */}
                  <div className="relative w-full h-[160px] md:h-[280px] mb-4 bg-white rounded-t-xl pt-1 md:pt-2 px-1 overflow-hidden group/image">
                    <button 
                      className={`absolute top-0 right-0 p-1 transition-colors z-20 ${mounted && isInWishlist(Number(product.id)) ? 'text-[#D84B5B]' : 'text-[#8b9992] hover:text-[#D84B5B]'}`} 
                      onClick={(e) => { e.stopPropagation(); toggleItem(Number(product.id)); }}
                    >
                      <Heart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} fill={mounted && isInWishlist(Number(product.id)) ? 'currentColor' : 'none'} />
                    </button>
                    <div className="w-full h-full flex transition-transform duration-700 ease-out group-hover:-translate-x-full">
                      <div className="w-full h-full shrink-0 flex items-center justify-center">
                        <img 
                          src={product.img} 
                          alt={product.name} 
                          className="w-full h-full object-contain mix-blend-multiply scale-[1.15] md:scale-110 transition-transform duration-700" 
                        />
                      </div>
                      <div className="w-full h-full shrink-0 flex items-center justify-center">
                        <img 
                          src={product.images && product.images.length > 1 ? product.images[1] : product.img} 
                          alt={`${product.name} alternate view`} 
                          className="w-full h-full object-contain mix-blend-multiply scale-[1.15] md:scale-110 transition-transform duration-700" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex flex-col flex-1">


                    <h4 className="font-extrabold text-[#0F3D2E] text-[14px] md:text-[18px] leading-tight mb-1 md:mb-2 transition-colors duration-300 line-clamp-2 md:line-clamp-none" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {product.name}
                    </h4>

                    {/* Rating (5 Stars) */}
                    <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
                      <div className="flex items-center gap-[1px] md:gap-[2px]">
                        {[...Array(5)].map((_, i) => {
                          const ratingValue = i + 1;
                          if (product.rating >= ratingValue) {
                            return <Star key={i} className="w-2.5 h-2.5 md:w-[14px] md:h-[14px] fill-[#D4AF37] text-[#D4AF37]" />;
                          } else if (product.rating >= ratingValue - 0.5) {
                            return <StarHalf key={i} className="w-2.5 h-2.5 md:w-[14px] md:h-[14px] fill-[#D4AF37] text-[#D4AF37]" />;
                          } else {
                            return <Star key={i} className="w-2.5 h-2.5 md:w-[14px] md:h-[14px] fill-[#e8e5de] text-[#e8e5de]" />;
                          }
                        })}
                      </div>
                      <span className="text-[10px] md:text-[12px] font-bold text-[#6b7b72] ml-0.5">({product.rating.toFixed(1)})</span>
                    </div>

                    {/* Description */}
                    <div className="mb-2 md:mb-3">
                      <p className="text-[11px] md:text-[13px] text-[#6b7b72] leading-[1.4] md:leading-[1.5] line-clamp-2">
                        {product.desc}
                      </p>
                    </div>
                    
                    <div className="flex items-end justify-between mt-auto pt-1">
                      <div className="flex items-center gap-2 leading-tight flex-wrap">
                        {product.originalPrice && product.originalPrice > product.price ? (
                          <>
                            <span className="text-[#0F3D2E] text-[13px] md:text-[15px] line-through font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                              MRP ₹{product.originalPrice.toFixed(2)}
                            </span>
                            <span className="font-black text-[#ef4444] text-[18px] md:text-[22px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                              ₹{product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="font-black text-[#0F3D2E] text-[18px] md:text-[22px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                            ₹{product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 relative">
                        <button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full text-white transition-colors shadow-sm shrink-0 relative z-10 hover:scale-105 active:scale-95 ${addedItems[product.id] ? 'bg-[#5b8c5a]' : 'bg-[#0F3D2E] hover:bg-[#0F3D2E]'}`}
                        >
                          {addedItems[product.id] ? (
                            <Check className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
                          ) : (
                            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            )}
          </div>



          {/* Left Column: Sidebar Filters (Desktop Only) */}
          <div className="hidden lg:flex w-1/4 flex-col gap-10 sticky top-28">
            
            {/* Search */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Search by Products</h3>
              </div>
              <div className="relative flex items-center bg-white border border-[#e8e5de] rounded-full pl-4 pr-1.5 py-1 w-[85%] shadow-sm focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37] transition-all">
                <input 
                  type="text" 
                  placeholder="Search products...." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[16px] text-[#0F3D2E] placeholder:text-[#8b9992] focus:outline-none w-full pr-4 py-2.5" 
                />
                <button className="bg-[#D4AF37] text-white p-2.5 rounded-full hover:bg-[#d4a844] transition-colors flex items-center justify-center cursor-pointer shrink-0">
                  <Search className="h-4 w-4 text-slate-800" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
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
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#0F3D2E] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#0F3D2E] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
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
                <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
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
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#0F3D2E] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#0F3D2E] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
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
                <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
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
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#0F3D2E] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#0F3D2E] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
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
                <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
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
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#0F3D2E] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#0F3D2E] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors flex items-center gap-1 ${selectedRating === rate ? 'text-[#0F3D2E] font-medium' : 'text-[#6b7b72] group-hover:text-[#0F3D2E]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                       {rate} {rate !== 'All' && <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Filter by Price */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Filter by Price</h3>
              </div>
              <div className="px-1 flex flex-col w-[85%] relative pt-8">
                <div 
                  className="absolute top-0 text-[#0F3D2E] bg-white border border-[#e8e5de] px-2 py-0.5 rounded-md font-bold text-[12px] transform -translate-x-1/2 whitespace-nowrap shadow-sm pointer-events-none"
                  style={{ left: `calc(${((priceValue - 200) / 820) * 100}% + ${8 - (((priceValue - 200) / 820) * 16)}px)` }}
                >
                  ₹{priceValue}
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="1020" 
                  value={priceValue}
                  onChange={(e) => setPriceValue(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none outline-none cursor-pointer accent-[#0F3D2E] mb-3"
                  style={{ background: `linear-gradient(to right, #0F3D2E 0%, #0F3D2E ${((priceValue - 200) / 820) * 100}%, #d1c8ba ${((priceValue - 200) / 820) * 100}%, #d1c8ba 100%)` }}
                />
                <div className="flex justify-between text-[13px] text-[#0F3D2E] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  <span>Min: ₹200</span>
                  <span>Max: ₹1020</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <motion.div 
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setIsMobileFiltersOpen(false);
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] flex flex-col h-[75vh] max-h-[75vh] lg:hidden"
            >
              {/* Handle */}
              <div className="w-full flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-[#e8e5de] rounded-full"></div>
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pb-4 border-b border-[#e8e5de]">
                <h2 className="text-[24px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>Filters</h2>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedBenefit('All');
                    setSelectedIngredient('All');
                    setSelectedRating('All');
                    setPriceValue(1020);
                    setSearchQuery('');
                  }}
                  className="text-[#D4AF37] font-bold text-[14px] hover:text-[#a87b2c]"
                >
                  Clear All
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6 pb-28 space-y-8">
                
                {/* Search */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
                    <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Search by Products</h3>
                  </div>
                  <div className="relative flex items-center bg-white border border-[#e8e5de] rounded-full pl-4 pr-1.5 py-1 w-full shadow-sm focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37] transition-all">
                    <input 
                      type="text" 
                      placeholder="Search products...." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-[14px] text-[#0F3D2E] placeholder:text-[#8b9992] focus:outline-none w-full pr-4 py-2" 
                    />
                    <button className="bg-[#D4AF37] text-white p-2 rounded-full hover:bg-[#d4a844] transition-colors flex items-center justify-center shrink-0">
                      <Search className="h-4 w-4 text-slate-800" />
                    </button>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
                    <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits</h3>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                    {BENEFITS.map(ben => (
                      <label key={ben} className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="mobile-benefit" checked={selectedBenefit === ben} onChange={() => setSelectedBenefit(ben)} className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#0F3D2E]" />
                          <div className="absolute w-2 h-2 rounded-full bg-[#0F3D2E] opacity-0 peer-checked:opacity-100 transition-opacity scale-50 peer-checked:scale-100" />
                        </div>
                        <span className={`text-[14px] ${selectedBenefit === ben ? 'text-[#0F3D2E] font-medium' : 'text-[#8b9992]'}`}>{ben}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
                    <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Ingredients</h3>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                    {INGREDIENTS.map(ing => (
                      <label key={ing} className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="mobile-ingredient" checked={selectedIngredient === ing} onChange={() => setSelectedIngredient(ing)} className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#0F3D2E]" />
                          <div className="absolute w-2 h-2 rounded-full bg-[#0F3D2E] opacity-0 peer-checked:opacity-100 transition-opacity scale-50 peer-checked:scale-100" />
                        </div>
                        <span className={`text-[14px] ${selectedIngredient === ing ? 'text-[#0F3D2E] font-medium' : 'text-[#8b9992]'}`}>{ing}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
                    <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Category</h3>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                    {CATEGORIES.map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="mobile-category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#0F3D2E]" />
                          <div className="absolute w-2 h-2 rounded-full bg-[#0F3D2E] opacity-0 peer-checked:opacity-100 transition-opacity scale-50 peer-checked:scale-100" />
                        </div>
                        <span className={`text-[14px] ${selectedCategory === cat ? 'text-[#0F3D2E] font-medium' : 'text-[#8b9992]'}`}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
                    <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Rating</h3>
                  </div>
                  <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                    {RATINGS.map(rate => (
                      <label key={rate} className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="mobile-rating" checked={selectedRating === rate} onChange={() => setSelectedRating(rate)} className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#0F3D2E]" />
                          <div className="absolute w-2 h-2 rounded-full bg-[#0F3D2E] opacity-0 peer-checked:opacity-100 transition-opacity scale-50 peer-checked:scale-100" />
                        </div>
                        <span className={`text-[14px] flex items-center gap-1 ${selectedRating === rate ? 'text-[#0F3D2E] font-medium' : 'text-[#8b9992]'}`}>
                          {rate} {rate !== 'All' && <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter by Price */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-5 h-5 text-[#0F3D2E] fill-[#0F3D2E]" />
                    <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Filter by Price</h3>
                  </div>
                  <div className="px-1 relative pt-8">
                    <div 
                      className="absolute top-0 text-[#0F3D2E] bg-white border border-[#e8e5de] px-2 py-0.5 rounded-md font-bold text-[12px] transform -translate-x-1/2 whitespace-nowrap shadow-sm pointer-events-none"
                      style={{ left: `calc(${((priceValue - 200) / 820) * 100}% + ${8 - (((priceValue - 200) / 820) * 16)}px)` }}
                    >
                      ₹{priceValue}
                    </div>
                    <input 
                      type="range" 
                      min="200" 
                      max="1020" 
                      value={priceValue}
                      onChange={(e) => setPriceValue(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none outline-none cursor-pointer accent-[#0F3D2E] mb-4"
                      style={{ background: `linear-gradient(to right, #0F3D2E 0%, #0F3D2E ${((priceValue - 200) / 820) * 100}%, #d1c8ba ${((priceValue - 200) / 820) * 100}%, #d1c8ba 100%)` }}
                    />
                    <div className="flex justify-between text-[13px] text-[#0F3D2E] font-medium">
                      <span>Min: ₹200</span>
                      <span>Max: ₹1020</span>
                    </div>
                  </div>
                </div>
                
              </div>

              {/* Footer Actions */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-[#e8e5de] flex gap-4 rounded-b-3xl">
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedBenefit('All');
                    setSelectedIngredient('All');
                    setSelectedRating('All');
                    setPriceValue(1020);
                    setSearchQuery('');
                  }}
                  className="flex-1 py-3.5 rounded-xl border border-[#d1c8ba] text-[#0F3D2E] font-bold text-[15px] hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 py-3.5 rounded-xl bg-[#0F3D2E] text-white font-bold text-[15px] hover:bg-[#0F3D2E] transition-colors"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
    </div>
  );
}
