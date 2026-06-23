'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, ArrowLeft, Check, Leaf, Package, Coffee, ShoppingBasket } from 'lucide-react';
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
        
        {/* Back Navigation */}
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full border border-[#d1c8ba] flex items-center justify-center text-[#0F3D2E] hover:bg-[#e8e5de] transition-colors mb-6"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Simple Text Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-[#0F3D2E] text-[32px] md:text-[50px] font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Shop Details
          </h1>
          <p className="text-[#6b7b72] text-sm md:text-xs mt-2 uppercase tracking-[0.2em] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            HOME <span className="text-[#ffc107] mx-1">|</span> SHOP DETAILS
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column: Image Gallery */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {/* Main Large Image */}
            <div className="relative aspect-[4/5] md:aspect-square bg-[#f9f9f9] rounded-2xl border border-[#fdbb0a] p-8 flex items-center justify-center overflow-hidden">
              <img
                src={currentVariant.img}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImageIndex(idx)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden border bg-[#f9f9f9] transition-all shrink-0 p-2 flex items-center justify-center ${mainImageIndex === idx ? 'border-[#fdbb0a]' : 'border-[#e8e5de] hover:border-[#d1c8ba]'}`}
                >
                  <img src={variant.img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </motion.div>


          {/* Right Column: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col pt-2 relative"
          >
            {/* Added to Cart Popup */}
            <AnimatePresence>
              {isAdded && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-0 right-0 bg-white border border-[#8cb73d]/30 text-[#0F3D2E] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-4 flex items-center gap-4 z-50 min-w-[300px]"
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
            <div className="mb-4 relative">
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-[36px] md:text-[46px] font-bold text-[#0F3D2E] leading-tight mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 shrink-0 pt-3">
                  <button onClick={() => toggleItem(product.id)} className="text-[#e2b755] hover:text-[#d4a844] transition-colors">
                    <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : 'fill-transparent'}`} strokeWidth={1.5} />
                  </button>
                  <button className="text-[#e2b755] hover:text-[#d4a844] transition-colors">
                    <Share2 className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <p className="text-[#6b7b72] text-[16px] leading-[1.6] max-w-[90%]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                A premium {product.category.toLowerCase()} blend to support {product.benefit.toLowerCase()} and rejuvenate your body.
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'fill-[#e2b755] text-[#e2b755]' : 'fill-transparent text-[#d1c8ba]'}`}
                  />
                ))}
              </div>
              <span className="text-[#6b7b72] text-[14px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                ({product.reviews} customer reviews)
              </span>
            </div>

            {/* Price Block */}
            <div className="flex items-baseline gap-4 mb-8" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <span className="text-[28px] md:text-[32px] text-[#0F3D2E] leading-none font-medium">
                ₹{currentVariant.price}
              </span>
              {currentVariant.originalPrice && (
                <span className="text-[#a0aab2] text-[18px] line-through decoration-[#c8d1cc] font-light">
                  ₹{currentVariant.originalPrice}
                </span>
              )}
              {currentVariant.discount && (
                <span className="text-[#8cb73d] text-[16px] font-medium tracking-wide">
                  {currentVariant.discount}% off
                </span>
              )}
            </div>

            {/* Tags / Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 border border-[#e8e5de] rounded-lg px-4 py-2 bg-transparent">
                <Package className="w-4 h-4 text-[#6b7b72]" />
                <span className="text-[#0F3D2E] text-[13px] font-semibold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{currentVariant.weight}</span>
              </div>
              <div className="flex items-center gap-2 border border-[#e8e5de] rounded-lg px-4 py-2 bg-transparent">
                <Leaf className="w-4 h-4 text-[#6b7b72]" />
                <span className="text-[#0F3D2E] text-[13px] font-semibold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{product.type === 'Decaf' || product.type === 'Herbal' ? 'Caffeine Free' : 'Caffeinated'}</span>
              </div>
              <div className="flex items-center gap-2 border border-[#e8e5de] rounded-lg px-4 py-2 bg-transparent">
                <Coffee className="w-4 h-4 text-[#6b7b72]" />
                <span className="text-[#0F3D2E] text-[13px] font-semibold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>No Preservatives</span>
              </div>
            </div>


            <div className="flex gap-4 border-t border-[#e8e5de] pt-8 mb-10">
              {/* Action Buttons Column */}
              <div className="flex flex-row gap-4 w-full max-w-[480px]">
                
                {/* Dynamic Add to Cart / Quantity Selector */}
                {currentQuantity === 0 ? (
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#fdbb0a] text-[#0F3D2E] hover:bg-[#e5a600] font-bold text-[16px] px-4 py-3.5 rounded-xl transition-colors shadow-sm whitespace-nowrap"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-between bg-[#fdbb0a] text-[#0F3D2E] rounded-xl px-2 py-2 shadow-sm">
                    <button 
                      onClick={decreaseQuantity} 
                      className="text-[#0F3D2E] hover:bg-black/10 transition-colors w-10 h-10 flex items-center justify-center rounded-lg text-2xl font-medium"
                    >
                      -
                    </button>
                    <span className="font-bold text-[18px]">{currentQuantity}</span>
                    <button 
                      onClick={increaseQuantity} 
                      className="text-[#0F3D2E] hover:bg-black/10 transition-colors w-10 h-10 flex items-center justify-center rounded-lg text-2xl font-medium"
                    >
                      +
                    </button>
                  </div>
                )}

                <button 
                  onClick={() => {
                    if (currentQuantity === 0) handleAddToCart();
                    router.push('/checkout');
                  }}
                  className="flex-1 bg-[#1c2e24] text-white hover:bg-[#2a4536] font-semibold tracking-wide text-[15px] px-4 py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- Product Details Tabs Section --- */}
        <div className="w-full mt-16 border-t border-[#e8e5de] pt-12">
          
          {/* Benefits & Ingredients Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Left: Product Benefits */}
            <div>
              <h3 className="font-bold text-[#0F3D2E] text-[20px] md:text-[24px] uppercase tracking-wide mb-6 text-center lg:text-left" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Product Benefits</h3>
              <div className="flex flex-col gap-8 mt-4">
                
                {/* Benefit 1 */}
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#0F3D2E] text-[18px] mb-2 flex items-center gap-3" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1c2e24]"></span>
                    Calmness
                  </h4>
                  <p className="text-[15px] text-[#4a554e] leading-relaxed pl-5">
                    Promotes deep relaxation, reduces stress, and aids sleep with our carefully selected herbal blend.
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#0F3D2E] text-[18px] mb-2 flex items-center gap-3" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1c2e24]"></span>
                    Digestion
                  </h4>
                  <p className="text-[15px] text-[#4a554e] leading-relaxed pl-5">
                    Aids digestive comfort, reduces bloating, and supports overall gut health naturally.
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#0F3D2E] text-[18px] mb-2 flex items-center gap-3" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1c2e24]"></span>
                    Hormonal Support
                  </h4>
                  <p className="text-[15px] text-[#4a554e] leading-relaxed pl-5">
                    Supports hormonal balance and well-being through natural, potent plant extracts.
                  </p>
                </div>

              </div>
            </div>

            {/* Right: Ingredients Breakdown */}
            <div>
              <h3 className="font-bold text-[#0F3D2E] text-[20px] md:text-[24px] uppercase tracking-wide mb-6 text-center lg:text-left" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Ingredients Breakdown</h3>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Ingredient 1 */}
                <div className="rounded-xl overflow-hidden border border-[#dce4e0] flex flex-col shadow-sm bg-[#f4f7f5]">
                  <div className="w-full h-24 bg-[#e8ecea] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-0 left-0 bg-[#1c2e24] text-white text-[12px] font-bold px-2 py-0.5 rounded-br-lg z-10">1</div>
                    <img src="/shop/beetroot.png" alt="Beetroot" className="w-full h-full object-contain scale-[2.5] object-center -translate-y-6" />
                  </div>
                  <div className="py-2 px-1 text-center">
                    <span className="font-bold text-[#0F3D2E] text-[14px]">Beetroot</span>
                  </div>
                </div>

                {/* Ingredient 2 */}
                <div className="rounded-xl overflow-hidden border border-[#dce4e0] flex flex-col shadow-sm bg-[#f4f7f5]">
                  <div className="w-full h-24 bg-[#e8ecea] relative">
                    <div className="absolute top-0 left-0 bg-[#1c2e24] text-white text-[12px] font-bold px-2 py-0.5 rounded-br-lg z-10">2</div>
                    <img src="/shop/petals.png" alt="Hibiscus" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 px-1 text-center">
                    <span className="font-bold text-[#0F3D2E] text-[14px]">Hibiscus</span>
                  </div>
                </div>

                {/* Ingredient 3 */}
                <div className="rounded-xl overflow-hidden border border-[#dce4e0] flex flex-col shadow-sm bg-[#f4f7f5]">
                  <div className="w-full h-24 bg-[#e8ecea] relative">
                    <div className="absolute top-0 left-0 bg-[#1c2e24] text-white text-[12px] font-bold px-2 py-0.5 rounded-br-lg z-10">3</div>
                    <img src="/shop/mulethi_1.png" alt="Mulethi" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 px-1 text-center">
                    <span className="font-bold text-[#0F3D2E] text-[14px]">Mulethi</span>
                  </div>
                </div>

                {/* Ingredient 4 */}
                <div className="rounded-xl overflow-hidden border border-[#dce4e0] flex flex-col shadow-sm bg-[#f4f7f5]">
                  <div className="w-full h-24 bg-[#e8ecea] relative">
                    <div className="absolute top-0 left-0 bg-[#1c2e24] text-white text-[12px] font-bold px-2 py-0.5 rounded-br-lg z-10">4</div>
                    <img src="/shop/moringa.png" alt="Moringa" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 px-1 text-center">
                    <span className="font-bold text-[#0F3D2E] text-[14px]">Moringa</span>
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
                  <div key={`${review.id}-${idx}`} className="flex flex-col gap-4 border border-[#e8e5de] p-6 rounded-[20px] bg-white shadow-sm hover:shadow-md transition-shadow w-[400px] shrink-0">
                     <div className="flex items-center justify-between w-full">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center font-bold text-[#0F3D2E] text-[20px] bg-[#f0e6e6] border border-[#dce4e0]">
                           {review.name.charAt(0).toUpperCase()}
                         </div>
                         <div className="flex flex-col">
                           <h4 className="font-bold text-[#0F3D2E] text-[15px]">{review.name}</h4>
                           <span className="text-[10px] text-[#6b7b72] uppercase font-bold tracking-wider mt-0.5">{review.date}</span>
                         </div>
                       </div>
                       <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s=>(
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-[#e2b755] text-[#e2b755]' : 'text-gray-300'}`}/>
                          ))}
                       </div>
                     </div>
                     <p className="text-[14px] text-[#4a554e] leading-relaxed italic line-clamp-3">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          <div className="bg-[#f5f5f5] p-8 md:p-10 rounded-[30px] border border-[#e8e5de] mb-16">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <h2 className="text-[24px] font-bold text-[#0F3D2E] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Add Reviews</h2>
                 <p className="text-[13px] text-[#6b7b72]">Your email address will not be published. Required fields are marked *</p>
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
                          className={`w-5 h-5 cursor-pointer transition-colors ${rating >= s ? 'fill-[#1c2e24] text-[#0F3D2E]' : 'text-[#0F3D2E] hover:fill-[#1c2e24] opacity-50 hover:opacity-100'}`}
                        />
                      ))}
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <input type="text" placeholder="Full Name" value={name} onChange={(e) => {const val = e.target.value.replace(/[^a-zA-Z\s]/g, ''); setName(val); if(errors.name) setErrors({...errors, name: undefined})}} className={`p-4 rounded-xl border ${errors.name ? 'border-red-500' : 'border-[#e8e5de]'} bg-white focus:outline-none focus:border-[#e2b755] text-[14px]`} />
                  {errors.name && <span className="text-red-500 text-[12px] mt-1 ml-2">{errors.name}</span>}
                </div>
                <div className="flex flex-col">
                  <input type="email" placeholder="Email Address" value={email} onChange={(e) => {setEmail(e.target.value); if(errors.email) setErrors({...errors, email: undefined})}} className={`p-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-[#e8e5de]'} bg-white focus:outline-none focus:border-[#e2b755] text-[14px]`} />
                  {errors.email && <span className="text-red-500 text-[12px] mt-1 ml-2">{errors.email}</span>}
                </div>
             </div>
             <div className="flex flex-col mb-6">
               <textarea placeholder="Your Review (Optional for 4-5 stars, Required for 1-3 stars)" value={reason} onChange={(e) => {setReason(e.target.value); if(errors.reason) setErrors({...errors, reason: undefined})}} className={`w-full p-4 rounded-xl border ${errors.reason ? 'border-red-500' : 'border-[#e8e5de]'} bg-white h-32 focus:outline-none focus:border-[#e2b755] text-[14px] resize-none`} />
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
                        ₹{(similar.price || 0).toFixed(2)}
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
