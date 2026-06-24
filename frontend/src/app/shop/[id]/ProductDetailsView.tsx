'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, ArrowLeft, Check, Leaf, Package, Coffee, ShoppingBasket, ShieldCheck, Droplet, Activity } from 'lucide-react';
import { useCartStore } from '../../../features/cart/cartStore';
import { useWishlistStore } from '../../../features/wishlist/wishlistStore';

const PRODUCTS = [
  { id: 1, name: "Premium Herbal Blend", price: 450.00, originalPrice: 500, discount: 10, img: "/shop/red_tea.png", rating: 4.5, reviews: 124, category: "Wellness Blends", type: "Herbal", weight: "15 Packets", benefit: "Relaxation", ingredient: "Mint", description: "A soothing blend of premium herbs designed to promote relaxation. Perfect for winding down after a long day." },
  { id: 2, name: "Calming Chamomile", price: 350.00, originalPrice: 400, discount: 12, img: "/shop/green_tea.png", rating: 4.0, reviews: 89, category: "Loose Leaf", type: "Decaf", weight: "10 Packets", benefit: "Relaxation", ingredient: "Chamomile", description: "Classic chamomile tea with a gentle, calming effect. Known for its sleep-promoting properties and mild flavor." },
  { id: 3, name: "Morning Matcha", price: 850.00, originalPrice: 1000, discount: 15, img: "/shop/blue.png", rating: 4.8, reviews: 342, category: "Matcha", type: "Caffeinated", weight: "30 Packets", benefit: "Energy", ingredient: "Matcha", description: "High-grade ceremonial matcha to give you a clean, sustained energy boost throughout your morning." },
  { id: 4, name: "Detox Green Wellness", price: 400.00, originalPrice: 500, discount: 20, img: "/shop/ruby_detox.png", rating: 4.1, reviews: 56, category: "Wellness Blends", type: "Caffeinated", weight: "15 Packets", benefit: "Digestion", ingredient: "Mint", description: "A refreshing green tea detox blend. Helps cleanse the body and support healthy digestion naturally." },
  { id: 5, name: "Sleepy Time Essence", price: 300.00, originalPrice: 350, discount: 14, img: "/shop/blue_tea1.png", rating: 4.7, reviews: 210, category: "Tea Bags", type: "Herbal", weight: "10 Packets", benefit: "Relaxation", ingredient: "Chamomile", description: "The ultimate bedtime companion. This herbal essence is specially crafted to help you drift off into a deep sleep." },
  { id: 6, name: "Energy Boost Root", price: 600.00, originalPrice: 750, discount: 20, img: "/shop/red_tea.png", rating: 4.3, reviews: 112, category: "Loose Leaf", type: "Caffeinated", weight: "20 Packets", benefit: "Energy", ingredient: "Ginger", description: "A powerful root-based blend to revitalize your senses and provide a strong natural energy boost." },
  { id: 7, name: "Immunity Shield", price: 550.00, originalPrice: 650, discount: 15, img: "/shop/green_tea.png", rating: 4.9, reviews: 420, category: "Wellness Blends", type: "Herbal", weight: "20 Packets", benefit: "Immunity", ingredient: "Ginger", description: "Strengthen your body's natural defenses with our Immunity Shield blend, rich in antioxidants and vitamins." },
  { id: 8, name: "Focus & Clarity", price: 750.00, originalPrice: 850, discount: 11, img: "/shop/ruby_detox.png", rating: 4.6, reviews: 175, category: "Matcha", type: "Caffeinated", weight: "30 Packets", benefit: "Energy", ingredient: "Matcha", description: "Enhance your concentration and mental clarity with this specialized matcha mix, perfect for deep work sessions." },
  { id: 9, name: "Digestive Soothe", price: 380.00, originalPrice: 420, discount: 9, img: "/shop/blue_tea1.png", rating: 4.2, reviews: 93, category: "Tea Bags", type: "Herbal", weight: "10 Packets", benefit: "Digestion", ingredient: "Ginger", description: "A gentle, soothing blend formulated to aid digestion and settle the stomach after meals." },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, items, updateQuantity, removeItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Review Form States
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<{name?: string, email?: string, reason?: string, rating?: string}>({});
  const [isReviewSuccess, setIsReviewSuccess] = useState(false);

  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: "David Warnner",
      date: "January 7, 2024",
      rating: 5,
      text: "Nisl quam vestibulum ac quam nec odio elementu sucan ligula. Orci varius natoque penatibus et ma urient monte nascete ridiculus vestibulum ac quam necy sque.",
      avatar: "/home/testimonial1.jpg"
    },
    {
      id: 2,
      name: "Thomas Walkar",
      date: "March 7, 2024",
      rating: 5,
      text: "Nisl quam vestibulum ac quam nec odio elementu sucan ligula. Orci varius natoque penatibus et ma urient monte nascete ridiculus vestibulum ac quam necy sque.",
      avatar: "/home/testimonial2.jpg"
    }
  ]);

  const handlePostReview = () => {
    const newErrors: any = {};
    if (!name.trim()) {
      newErrors.name = "This field is required";
    }
    if (!email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address (e.g., name@gmail.com)";
    }
    if (rating === 0) newErrors.rating = "Please select a rating";
    
    if (rating > 0 && rating <= 3 && !reason.trim()) {
      newErrors.reason = "This field is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      const newReview = {
        id: Date.now(),
        name: name,
        date: today,
        rating: rating,
        text: reason.trim() || "Excellent product! Highly recommended.",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F3D2E&color=fff`
      };

      setReviewsList([newReview, ...reviewsList]);
      
      setIsReviewSuccess(true);
      setTimeout(() => setIsReviewSuccess(false), 3000);

      setRating(0);
      setName('');
      setEmail('');
      setReason('');
      setErrors({});
    }
  };

  // Find product by ID from URL params
  // Find product by ID from URL params
  const productId = Number(params.id);
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  let secondThumbnailImg = '/shop/red_1.png';
  if (product.name === 'Calming Chamomile' || product.name === 'Immunity Shield') {
    secondThumbnailImg = '/shop/green_bg.png';
  } else if (product.name === 'Detox Green Wellness') {
    secondThumbnailImg = '/shop/blue_bg.png';
  } else if (product.name === 'Sleepy Time Essence' || product.name === 'Digestive Soothe') {
    secondThumbnailImg = '/shop/blue_bg1.png';
  }

  const variants = [
    {
      img: product.img,
      weight: product.weight,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount
    },
    {
      img: secondThumbnailImg,
      weight: product.weight,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount
    },
    {
      img: '/shop/ruby_detox.png',
      weight: '30 Packets',
      price: product.price + 200,
      originalPrice: product.originalPrice ? product.originalPrice + 240 : null,
      discount: product.discount
    },
    {
      img: '/shop/green_tea.png',
      weight: '50 Packets',
      price: product.price + 350,
      originalPrice: product.originalPrice ? product.originalPrice + 400 : null,
      discount: product.discount
    }
  ];

  const currentVariant = variants[mainImageIndex];
  const sku = `sku-${product.id}-${mainImageIndex}`;
  const cartItem = items.find(i => i.sku === sku);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!cartItem) {
      addItem({
        sku,
        name: `${product.name} (${currentVariant.weight})`,
        priceCents: currentVariant.price * 100,
        image: currentVariant.img
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const increaseQuantity = () => {
    if (cartItem) updateQuantity(sku, currentQuantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (currentQuantity === 1) {
      removeItem(sku);
    } else if (cartItem) {
      updateQuantity(sku, currentQuantity - 1);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6]">
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Simple Text Header / Breadcrumbs */}
        <div className="mb-8 md:mb-10 flex items-center gap-2 text-[14px] text-[#6b7b72] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
          <span className="hover:text-[#0F3D2E] cursor-pointer" onClick={() => router.push('/')}>Home</span>
          <ChevronRight className="w-4 h-4 text-[#d1c8ba]" />
          <span className="hover:text-[#0F3D2E] cursor-pointer" onClick={() => router.push('/shop')}>Shop</span>
          <ChevronRight className="w-4 h-4 text-[#d1c8ba]" />
          <span className="hover:text-[#0F3D2E] cursor-pointer">Herbal Tea</span>
          <ChevronRight className="w-4 h-4 text-[#d1c8ba]" />
          <span className="text-[#0F3D2E]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Image Gallery */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col-reverse md:flex-row gap-4 md:gap-6"
          >
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto scrollbar-hide p-1 shrink-0">
               {variants.map((variant, idx) => (
                 <button
                   key={idx}
                   onClick={() => setMainImageIndex(idx)}
                   className={`relative w-[85px] h-[85px] rounded-xl overflow-hidden bg-white transition-all shrink-0 p-2 flex items-center justify-center shadow-sm ${mainImageIndex === idx ? 'border-2 border-[#b98e3b]' : 'border border-[#e8e5de] hover:border-[#d1c8ba]'}`}
                 >
                   <img src={variant.img} alt={`Thumbnail ${idx + 1}`} className="w-[85%] h-[85%] object-contain" />
                 </button>
               ))}
            </div>

            {/* Main Large Image */}
            <div className="relative flex-1 aspect-[4/3] md:aspect-square bg-[#f8f4e6] rounded-[32px] p-8 flex items-center justify-center overflow-hidden">
               <div className="absolute top-6 left-6 bg-[#b98e3b] text-white text-[13px] font-bold px-4 py-1.5 rounded-full z-10 shadow-sm tracking-wide">
                 Bestseller
               </div>
               <img src={currentVariant.img} alt={product.name} className="w-[85%] h-[85%] object-contain drop-shadow-2xl" />
            </div>
          </motion.div>


          {/* Right Column: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col relative"
          >
            {/* Added to Cart Popup */}
            <AnimatePresence>
              {isAdded && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -top-16 right-0 bg-white border border-[#8cb73d]/30 text-[#0F3D2E] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-4 flex items-center gap-4 z-50 min-w-[300px]"
                >
                  <div className="w-12 h-12 rounded bg-[#eaf4d5] flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={currentVariant.img} alt="cart item" className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#0F3D2E] flex items-center gap-1"><Check className="w-4 h-4 text-[#8cb73d]" /> Added to cart!</p>
                    <p className="text-xs text-[#6b7b72] truncate max-w-[150px]">{product.name}</p>
                  </div>
                  <button 
                    onClick={() => router.push('/cart')}
                    className="text-xs font-bold bg-[#e2b755] text-[#0F3D2E] px-3 py-1.5 rounded-lg hover:bg-[#d4a844] transition-colors"
                  >
                    View Cart
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Title and Short Description */}
            <div className="mb-3 relative">
              <div className="flex justify-between items-start gap-4 mb-1">
                <div className="flex flex-col">
                  <span className="text-[#c19236] text-[12px] font-bold uppercase tracking-widest mb-1">{product.category} BLEND</span>
                  <h1 className="text-[36px] md:text-[42px] font-bold text-[#0F3D2E] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {product.name}
                  </h1>
                </div>
                <div className="flex items-center gap-3 shrink-0 pt-2">
                  <button onClick={() => toggleItem(product.id)} className="w-10 h-10 rounded-full bg-[#fdfbf6] flex items-center justify-center text-[#c19236] hover:bg-[#f5f0e6] transition-colors">
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : 'fill-transparent'}`} strokeWidth={2} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#fdfbf6] flex items-center justify-center text-[#c19236] hover:bg-[#f5f0e6] transition-colors">
                    <Share2 className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
              <p className="text-[#4a5d53] text-[15px] leading-[1.6] max-w-[90%] mb-3">
                {product.description || `A premium ${product.category.toLowerCase()} blend to support ${product.benefit.toLowerCase()} and rejuvenate your body.`}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'fill-[#e2b755] text-[#e2b755]' : 'fill-transparent text-[#d1c8ba]'}`}
                  />
                ))}
              </div>
              <span className="text-[#6b7b72] text-[14px] font-medium ml-1">
                {product.rating} ({product.reviews} Reviews)
              </span>
            </div>

            {/* Price Block */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[32px] text-[#0F3D2E] font-bold tracking-tight">
                ₹{currentVariant.price}
              </span>
              {currentVariant.originalPrice && (
                <span className="text-[#a0aab2] text-[20px] line-through font-medium">
                  ₹{currentVariant.originalPrice}
                </span>
              )}
              {currentVariant.discount && (
                <span className="text-[#4caf50] bg-[#edf7ed] text-[12px] font-bold px-2.5 py-1 rounded-md ml-2 tracking-wide">
                  Save {currentVariant.discount}%
                </span>
              )}
            </div>

            {/* Tags / Pills */}
            <div className="flex items-center justify-between border-y border-[#e8e5de] py-4 mb-6">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#a0aab2]" />
                <span className="text-[#6b7b72] text-[13px] font-medium">{product.type === 'Decaf' || product.type === 'Herbal' ? 'Caffeine Free' : 'Caffeinated'}</span>
              </div>
              <div className="w-[1px] h-4 bg-[#e8e5de]"></div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#a0aab2]" />
                <span className="text-[#6b7b72] text-[13px] font-medium">100% Natural</span>
              </div>
              <div className="w-[1px] h-4 bg-[#e8e5de]"></div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#a0aab2]" />
                <span className="text-[#6b7b72] text-[13px] font-medium">No Preservatives</span>
              </div>
            </div>

            {/* Choose Pack Size */}
            <div className="mb-6">
              <h4 className="text-[#0F3D2E] font-bold text-[15px] mb-3">Choose Pack Size</h4>
              <div className="grid grid-cols-3 gap-4">
                {/* Size 1 */}
                <div className="border-[1.5px] border-[#0F3D2E] rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer bg-white">
                  <span className="text-[#0F3D2E] font-bold text-[14px]">30 Packets</span>
                  <span className="text-[#6b7b72] text-[13px] mt-0.5">₹499</span>
                </div>
                {/* Size 2 */}
                <div className="border border-[#e8e5de] rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D2E] transition-colors bg-white">
                  <span className="text-[#0F3D2E] font-bold text-[14px]">60 Packets</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[#6b7b72] text-[13px]">₹999</span>
                    <span className="text-[#4caf50] bg-[#edf7ed] text-[10px] font-bold px-1.5 py-0.5 rounded">Save 20%</span>
                  </div>
                </div>
                {/* Size 3 */}
                <div className="border border-[#e8e5de] rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D2E] transition-colors bg-white">
                  <span className="text-[#0F3D2E] font-bold text-[14px]">100 Packets</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[#6b7b72] text-[13px]">₹1,799</span>
                    <span className="text-[#4caf50] bg-[#edf7ed] text-[10px] font-bold px-1.5 py-0.5 rounded">Save 25%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-2">
              {/* Quantity */}
              <div className="flex items-center justify-between border border-[#e8e5de] rounded-[10px] px-2 py-2 w-[110px] bg-white">
                <button onClick={decreaseQuantity} className="text-[#a0aab2] hover:text-[#0F3D2E] transition-colors font-medium text-lg w-8 h-8 flex items-center justify-center">-</button>
                <span className="font-bold text-[15px] text-[#0F3D2E]">{currentQuantity === 0 ? 1 : currentQuantity}</span>
                <button onClick={increaseQuantity} className="text-[#a0aab2] hover:text-[#0F3D2E] transition-colors font-medium text-lg w-8 h-8 flex items-center justify-center">+</button>
              </div>

              {/* Add to Cart */}
              <button 
                onClick={handleAddToCart}
                className="flex-[1.5] bg-[#e2b755] text-[#0F3D2E] hover:bg-[#d4a844] font-bold text-[15px] rounded-[10px] transition-colors flex items-center justify-center gap-2 px-4"
              >
                <ShoppingBasket className="w-5 h-5" />
                Add to Cart
              </button>

              {/* Buy Now */}
              <button 
                onClick={() => {
                  if (currentQuantity === 0) handleAddToCart();
                  router.push('/checkout');
                }}
                className="flex-1 bg-[#0F3D2E] text-white hover:bg-[#1a5441] font-bold text-[15px] rounded-[10px] transition-colors px-4"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- Product Details Tabs Section --- */}
        <div className="w-full mt-16 border-t border-[#e8e5de] pt-12">
          
          {/* Benefits & Ingredients Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 relative">
            
            {/* Left: Product Benefits Card */}
            <div className="bg-white rounded-[24px] border border-[#ece8dc] p-10 md:p-12 shadow-sm relative overflow-hidden flex flex-col">
              {/* Decorative Leaves Bottom Left */}
              <Leaf className="absolute -bottom-10 -left-10 w-48 h-48 text-[#4a6b3d] opacity-[0.03] pointer-events-none -rotate-45" />
              
              <h3 className="font-bold text-[#1c2e24] text-[28px] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Why You'll Love It</h3>
              <div className="w-12 h-[3px] bg-[#4a6b3d] mb-10 rounded-full"></div>
              
              <div className="flex flex-col gap-8 relative z-10">
                
                {/* Benefit 1 */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#f4f7f5] flex items-center justify-center shrink-0 border border-[#e8ecea]">
                     <Leaf className="w-5 h-5 text-[#4a6b3d]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#1c2e24] text-[16px] mb-1">Sustained Energy & Focus</h4>
                    <p className="text-[14px] text-[#6b7b72] leading-relaxed">
                      Provides clean, calm energy without the jitters or crashes.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#f4f7f5] flex items-center justify-center shrink-0 border border-[#e8ecea]">
                     <ShieldCheck className="w-5 h-5 text-[#4a6b3d]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#1c2e24] text-[16px] mb-1">Antioxidant Rich</h4>
                    <p className="text-[14px] text-[#6b7b72] leading-relaxed">
                      Packed with catechins that help fight free radicals and support immunity.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#f4f7f5] flex items-center justify-center shrink-0 border border-[#e8ecea]">
                     <Droplet className="w-5 h-5 text-[#4a6b3d]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#1c2e24] text-[16px] mb-1">Detox & Cleanse</h4>
                    <p className="text-[14px] text-[#6b7b72] leading-relaxed">
                      Supports natural detoxification and helps your body feel lighter.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#f4f7f5] flex items-center justify-center shrink-0 border border-[#e8ecea]">
                     <Activity className="w-5 h-5 text-[#4a6b3d]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#1c2e24] text-[16px] mb-1">Metabolism Support</h4>
                    <p className="text-[14px] text-[#6b7b72] leading-relaxed">
                      May help boost metabolism and support healthy weight management.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Ingredients Breakdown Card */}
            <div className="bg-white rounded-[24px] border border-[#ece8dc] p-10 md:p-12 shadow-sm relative overflow-hidden flex flex-col">

              <h3 className="font-bold text-[#1c2e24] text-[28px] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>What's Inside</h3>
              <p className="text-[14px] text-[#6b7b72] mb-8 font-medium">100% natural ingredients, nothing else.</p>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                
                {/* Ingredient 1 */}
                <div className="rounded-[16px] overflow-hidden border border-[#ece8dc] flex flex-col bg-white">
                  <div className="w-full h-32 relative overflow-hidden">
                    <img src="/home/beetroot-v2.png" alt="Beetroot" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-3 px-2 text-center border-t border-[#ece8dc]">
                    <span className="font-bold text-[#1c2e24] text-[14px]">Beetroot</span>
                  </div>
                </div>

                {/* Ingredient 2 */}
                <div className="rounded-[16px] overflow-hidden border border-[#ece8dc] flex flex-col bg-white">
                  <div className="w-full h-32 relative overflow-hidden">
                    <img src="/shop/petals.png" alt="Hibiscus" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-3 px-2 text-center border-t border-[#ece8dc]">
                    <span className="font-bold text-[#1c2e24] text-[14px]">Hibiscus</span>
                  </div>
                </div>

                {/* Ingredient 3 */}
                <div className="rounded-[16px] overflow-hidden border border-[#ece8dc] flex flex-col bg-white">
                  <div className="w-full h-32 relative overflow-hidden">
                    <img src="/home/mulethi-v2.png" alt="Licorice" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-3 px-2 text-center border-t border-[#ece8dc]">
                    <span className="font-bold text-[#1c2e24] text-[14px]">Licorice</span>
                  </div>
                </div>

                {/* Ingredient 4 */}
                <div className="rounded-[16px] overflow-hidden border border-[#ece8dc] flex flex-col bg-white">
                  <div className="w-full h-32 relative overflow-hidden">
                    <img src="/home/moringa-v2.png" alt="Moringa" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-3 px-2 text-center border-t border-[#ece8dc]">
                    <span className="font-bold text-[#1c2e24] text-[14px]">Moringa</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* How To Prepare - Timeline UI */}
          <div className="mb-24 mt-16">
            <div className="text-center mb-16">
              <h3 className="font-bold text-[#0F3D2E] text-[24px] md:text-[32px] tracking-wide mb-3 uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>How to Prepare</h3>
              <p className="text-[#6b7b72] text-[16px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Follow these simple steps for the perfect cup</p>
            </div>
            
            <div className="relative max-w-5xl mx-auto px-4">
              {/* Connecting Line for Desktop */}
              <div className="absolute top-[45px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#d1c8ba] to-transparent hidden lg:block z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-[90px] h-[90px] rounded-full bg-[#f5f0e6] border border-[#e8e5de] flex items-center justify-center mb-6 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] group-hover:border-[#fdbb0a] group-hover:bg-white transition-all duration-300 relative z-10">
                     <div className="w-[70px] h-[70px] rounded-full bg-[#0F3D2E] text-[#fdbb0a] flex items-center justify-center text-[32px] font-bold group-hover:bg-[#fdbb0a] group-hover:text-[#0F3D2E] group-hover:scale-110 transition-all duration-300 shadow-inner" style={{ fontFamily: 'Playfair Display, serif' }}>
                       1
                     </div>
                  </div>
                  <h4 className="font-bold text-[#0F3D2E] text-[20px] mb-3 transition-colors group-hover:text-[#8cb73d]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Open Sachet</h4>
                  <p className="text-[#6b7b72] text-[15px] leading-relaxed max-w-[220px]">
                    Carefully open one sachet of your premium herbal blend to release its fresh aroma.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-[90px] h-[90px] rounded-full bg-[#f5f0e6] border border-[#e8e5de] flex items-center justify-center mb-6 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] group-hover:border-[#fdbb0a] group-hover:bg-white transition-all duration-300 relative z-10">
                     <div className="w-[70px] h-[70px] rounded-full bg-[#0F3D2E] text-[#fdbb0a] flex items-center justify-center text-[32px] font-bold group-hover:bg-[#fdbb0a] group-hover:text-[#0F3D2E] group-hover:scale-110 transition-all duration-300 shadow-inner" style={{ fontFamily: 'Playfair Display, serif' }}>
                       2
                     </div>
                  </div>
                  <h4 className="font-bold text-[#0F3D2E] text-[20px] mb-3 transition-colors group-hover:text-[#8cb73d]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Pour Hot Water</h4>
                  <p className="text-[#6b7b72] text-[15px] leading-relaxed max-w-[220px]">
                    Pour freshly boiled hot water gently over the tea to begin the natural infusion.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-[90px] h-[90px] rounded-full bg-[#f5f0e6] border border-[#e8e5de] flex items-center justify-center mb-6 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] group-hover:border-[#fdbb0a] group-hover:bg-white transition-all duration-300 relative z-10">
                     <div className="w-[70px] h-[70px] rounded-full bg-[#0F3D2E] text-[#fdbb0a] flex items-center justify-center text-[32px] font-bold group-hover:bg-[#fdbb0a] group-hover:text-[#0F3D2E] group-hover:scale-110 transition-all duration-300 shadow-inner" style={{ fontFamily: 'Playfair Display, serif' }}>
                       3
                     </div>
                  </div>
                  <h4 className="font-bold text-[#0F3D2E] text-[20px] mb-3 transition-colors group-hover:text-[#8cb73d]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Steep 3-4 Mins</h4>
                  <p className="text-[#6b7b72] text-[15px] leading-relaxed max-w-[220px]">
                    Allow the blend to steep for 3-4 minutes to fully extract herbs and flavors.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-[90px] h-[90px] rounded-full bg-[#f5f0e6] border border-[#e8e5de] flex items-center justify-center mb-6 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] group-hover:border-[#fdbb0a] group-hover:bg-white transition-all duration-300 relative z-10">
                     <div className="w-[70px] h-[70px] rounded-full bg-[#0F3D2E] text-[#fdbb0a] flex items-center justify-center text-[32px] font-bold group-hover:bg-[#fdbb0a] group-hover:text-[#0F3D2E] group-hover:scale-110 transition-all duration-300 shadow-inner" style={{ fontFamily: 'Playfair Display, serif' }}>
                       4
                     </div>
                  </div>
                  <h4 className="font-bold text-[#0F3D2E] text-[20px] mb-3 transition-colors group-hover:text-[#8cb73d]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Enjoy</h4>
                  <p className="text-[#6b7b72] text-[15px] leading-relaxed max-w-[220px]">
                    Sip slowly, relax, and let the wellness benefits naturally rejuvenate you.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-12">
            <h3 className="font-bold text-[#0F3D2E] text-[20px] md:text-[24px] uppercase tracking-wide mb-8" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Customer Reviews</h3>
            <style>{`
              @keyframes scroll-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-track {
                display: flex;
                width: max-content;
                animation: scroll-marquee 40s linear infinite;
              }
              .marquee-track:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="overflow-hidden w-full relative">
              <div className="marquee-track gap-6 pb-4">
                {[...reviewsList, ...reviewsList, ...reviewsList, ...reviewsList].map((review, idx) => (
                  <div 
                    key={`${review.id}-${idx}`} 
                    className="w-[350px] shrink-0 bg-white rounded-[16px] p-6 md:p-8 text-left border border-[#ece8dc] shadow-sm flex flex-col hover:-translate-y-2 hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Stars & Text */}
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(s=>(
                        <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-[#e2b755] text-[#e2b755]' : 'text-gray-300'}`}/>
                      ))}
                    </div>
                    <p className="text-[#556358] text-[14px] leading-relaxed mb-6 flex-grow" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      "{review.text}"
                    </p>

                    {/* Profile Row */}
                    <div className="w-full h-[1px] bg-[#dccb96] opacity-60 mb-5"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#1c2e24] text-[16px] bg-[#f5f0e6] border border-[#ece8dc]">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="text-[14px] font-bold text-[#1c2e24]">{review.name}</h5>
                        <p className="text-[12px] text-[#6b7b72]">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          <div className="bg-white p-8 md:p-10 rounded-[24px] border-2 border-[#ece8dc] shadow-sm mb-16">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <h2 className="text-[24px] font-bold text-[#0F3D2E] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Add Reviews</h2>
                 <p className="text-[13px] text-[#6b7b72] font-medium">Your email address will not be published. Required fields are marked *</p>
               </div>
               <div className="flex flex-col items-end">
                 <span className="text-[12px] font-bold text-[#0F3D2E] mb-1">Select Rating:</span>
                 <div className="flex items-center gap-3">
                   {errors.rating && <span className="text-red-500 text-[12px] font-medium">{errors.rating}</span>}
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(s=>(
                        <Star 
                          key={s} 
                          onClick={() => { setRating(s); if(errors.rating) setErrors({...errors, rating: undefined}) }}
                          className={`w-5 h-5 cursor-pointer transition-colors ${rating >= s ? 'fill-[#cda434] text-[#cda434]' : 'text-gray-300 hover:text-[#cda434]'}`}
                        />
                      ))}
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <input type="text" placeholder="Full Name *" value={name} onChange={(e) => {const val = e.target.value.replace(/[^a-zA-Z\s]/g, ''); setName(val); if(errors.name) setErrors({...errors, name: undefined})}} className={`p-4 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-[#ece8dc]'} bg-[#fdfcf9] focus:outline-none focus:border-[#cda434] text-[15px] text-[#1c2e24] placeholder:text-[#7a887f] placeholder:font-semibold font-medium transition-colors`} />
                  {errors.name && <span className="text-red-500 text-[12px] mt-1 ml-2 font-medium">{errors.name}</span>}
                </div>
                <div className="flex flex-col">
                  <input type="email" placeholder="Email Address *" value={email} onChange={(e) => {setEmail(e.target.value); if(errors.email) setErrors({...errors, email: undefined})}} className={`p-4 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-[#ece8dc]'} bg-[#fdfcf9] focus:outline-none focus:border-[#cda434] text-[15px] text-[#1c2e24] placeholder:text-[#7a887f] placeholder:font-semibold font-medium transition-colors`} />
                  {errors.email && <span className="text-red-500 text-[12px] mt-1 ml-2 font-medium">{errors.email}</span>}
                </div>
             </div>
             <div className="flex flex-col mb-6">
               <textarea placeholder="Your Review (Optional for 4-5 stars, Required for 1-3 stars)" value={reason} onChange={(e) => {setReason(e.target.value); if(errors.reason) setErrors({...errors, reason: undefined})}} className={`w-full p-4 rounded-xl border-2 ${errors.reason ? 'border-red-500' : 'border-[#ece8dc]'} bg-[#fdfcf9] h-32 focus:outline-none focus:border-[#cda434] text-[15px] text-[#1c2e24] placeholder:text-[#7a887f] placeholder:font-semibold font-medium resize-none transition-colors`} />
               {errors.reason && <span className="text-red-500 text-[12px] mt-1 ml-2">{errors.reason}</span>}
             </div>
             <div className="flex items-center gap-4">
               <button onClick={handlePostReview} className="bg-[#0F3D2E] text-white hover:bg-[#1a5240] transition-colors px-8 py-3.5 rounded-[14px] font-bold text-[15px] shadow-sm">
                 Post Review
               </button>
               {isReviewSuccess && <span className="text-[#0F3D2E] text-[14px] font-bold">Review posted successfully!</span>}
             </div>
          </div>

        </div>

        {/* Similar Products Section */}
        <div className="mt-8">
          <div className="mb-10">
            <h2 className="text-[24px] md:text-[30px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>Similar Products</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((similar, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={similar.id} 
                onClick={() => router.push(`/shop/${similar.id}`)}
                className="flex flex-col group cursor-pointer bg-white rounded-3xl border border-[#e8e5de] hover:border-[#ffc107] p-5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative w-full h-[280px] mb-2 flex items-center justify-center rounded-t-3xl pt-2 px-1">
                  <img 
                    src={similar.img} 
                    alt={similar.name} 
                    className={`w-full h-full object-contain drop-shadow-sm transition-transform duration-700 ease-in-out ${similar.img.endsWith('/blue.png') ? 'scale-[1.4] translate-y-1' : (similar.img.endsWith('/ruby_detox.png') || similar.img.endsWith('/blue_tea1.png') ? 'scale-[1.3] translate-y-2' : '')}`} 
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex flex-col flex-1">
                  {/* Rating (5 Stars) */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(similar.rating || 5) ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-[#e8e5de] text-[#e8e5de]'}`} />
                    ))}
                  </div>

                  <h4 className="font-bold text-[#0F3D2E] group-hover:text-[#4caf50] text-[18px] leading-tight mb-2 transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {similar.name}
                  </h4>
                  
                  <span className="text-[#8b9992] text-[13px] font-medium mb-4 uppercase">
                    {similar.category} {similar.weight}
                  </span>
                  
                  <div className="flex items-center justify-between mt-auto gap-3">
                    <div className="flex flex-col shrink-0">
                      <span className="font-bold text-[#0F3D2E] text-[20px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        ₹{(similar.price || 0)}
                      </span>
                    </div>
                    
                    {/* Add To Cart Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); router.push(`/shop/${similar.id}`); }}
                      className="relative group/btn flex items-center justify-end h-10 w-10 group-hover:w-[135px] cursor-pointer transition-all duration-300"
                    >
                      {/* Expanding text pill */}
                      <div className="absolute right-4 h-[26px] flex items-center rounded-l-full bg-[#4caf50] text-white overflow-hidden transition-all duration-300 w-0 group-hover:w-[115px] group-hover/btn:!bg-[#ffc107] group-hover/btn:!text-[#0F3D2E] z-0">
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
          </div>
        </div>

      </div>
    </div>
  );
}
