'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, ArrowLeft, Check, Leaf, Package, Coffee, ShoppingBasket, ShoppingCart, ShieldCheck, Droplet, Activity, MessageCircle, Link, X } from 'lucide-react';
import { useCartStore } from '../../../features/cart/cartStore';
import { useWishlistStore } from '../../../features/wishlist/wishlistStore';

// Custom SVG Icons for social media since they were removed from recent lucide-react versions
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

import { getProductById, getProducts, Product } from '../../../lib/products';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, items, updateQuantity, removeItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    async function loadProduct() {
      if (params.id) {
        const data = await getProductById(params.id as string);
        setProduct(data);
        const allData = await getProducts();
        setProducts(allData);
      }
      setLoading(false);
    }
    loadProduct();
  }, [params.id]);

  const productId = parseInt(params.id as string);

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customMix, setCustomMix] = useState<{[key: string]: number}>({});

  const customTotal = Object.values(customMix).reduce((a, b) => a + b, 0);

  const handleCustomMixChange = (prodId: string | number, increment: number) => {
    setCustomMix(prev => {
      const current = prev[prodId] || 0;
      const newVal = Math.max(0, current + increment);
      const currentTotal = Object.values(prev).reduce((a, b) => a + b, 0);
      if (increment > 0 && currentTotal + increment > 20) return prev;
      return { ...prev, [prodId]: newVal };
    });
  };

  // Zoom feature state
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const images = product?.images && product.images.length > 0 ? product.images : (product ? [product.img] : []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (images.length === 0) return;
      
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setMainImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setMainImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F3D2E]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-[#0F3D2E] mb-4">Product Not Found</h1>
        <button onClick={() => router.push('/shop')} className="text-[#D4AF37] hover:underline font-bold">
          Return to Shop
        </button>
      </div>
    );
  }

  // images array is defined at the top level to support the keyboard navigation hook

  const packSizes = [
    {
      weight: '20 Packets',
      price: product.price,
      originalPrice: product.originalPrice,
      discount: 15
    },
    {
      weight: '60 Packets',
      originalPrice: product.originalPrice === 270 ? 810 : product.originalPrice * 3,
      price: Math.round((product.originalPrice === 270 ? 810 : product.originalPrice * 3) * 0.85),
      discount: 15
    },
    {
      weight: '120 Packets',
      originalPrice: product.originalPrice === 270 ? 1630 : product.originalPrice * 6,
      price: Math.round((product.originalPrice === 270 ? 1630 : product.originalPrice * 6) * 0.85),
      discount: 15
    }
  ];

  const currentPack = packSizes[selectedPackIndex];
  const currentImage = images[mainImageIndex];
  const sku = `sku-${product.id}-${selectedPackIndex}`;
  const cartItem = items.find(i => i.sku === sku);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (selectedPackIndex === 1 && customTotal !== 20) {
      setShowCustomModal(true);
      return;
    }

    let mixDescription = "";
    if (selectedPackIndex === 1) {
       const mixDetails = Object.entries(customMix).filter(([_, q]) => q > 0).map(([id, q]) => {
         const p = products.find(prod => prod.id.toString() === id);
         return `${q}x ${p?.name}`;
       }).join(', ');
       mixDescription = ` [${mixDetails}]`;
    }

    if (!cartItem) {
      addItem({
        sku,
        name: `${product.name} (${currentPack.weight})${mixDescription}`,
        priceCents: currentPack.price * 100,
        image: images[0]
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `R-HerbalTea | ${product.name}`,
          text: `Check out ${product.name}! ${product.description}`,
          url: window.location.href,
        });
      } else {
        setShowShareModal(true);
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const copyToClipboard = () => {
    // Old school fallback for non-HTTPS contexts (like local network IP)
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Product link copied to clipboard!');
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
    setShowShareModal(false);
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
    <div className="flex flex-col w-full min-h-screen bg-white relative">
      {/* Share Modal Overlay */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-[24px] font-bold text-[#0F3D2E] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Share Product</h3>
              <p className="text-[#6b7b72] text-[15px] mb-6 font-medium">Share this herbal blend with your friends and family.</p>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                {/* WhatsApp */}
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} at Herbal Tea! ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300">
                    <WhatsAppIcon className="w-7 h-7 text-[#25D366] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[12px] font-bold text-[#0F3D2E]">WhatsApp</span>
                </a>

                {/* Facebook */}
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-[#1877F2] transition-colors duration-300">
                    <FacebookIcon className="w-7 h-7 text-[#1877F2] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[12px] font-bold text-[#0F3D2E]">Facebook</span>
                </a>

                {/* Twitter */}
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${product.name} at Herbal Tea!`)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                    <TwitterIcon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[12px] font-bold text-[#0F3D2E]">Twitter</span>
                </a>

                {/* Copy Link */}
                <button 
                  onClick={copyToClipboard}
                  className="flex flex-col items-center gap-2 group cursor-pointer border-none bg-transparent"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                    <Link className="w-6 h-6 text-gray-700" />
                  </div>
                  <span className="text-[12px] font-bold text-[#0F3D2E]">Copy Link</span>
                </button>
              </div>
              
              <div className="bg-[#F8F5EE] p-3 rounded-xl border border-[#e8e5de] flex items-center gap-3">
                <div className="flex-1 overflow-hidden">
                  <p className="text-[13px] text-[#6b7b72] truncate font-medium">{typeof window !== 'undefined' ? window.location.href : ''}</p>
                </div>
                <button onClick={copyToClipboard} className="text-[13px] font-bold text-[#0F3D2E] hover:text-[#8cb73d] transition-colors whitespace-nowrap">
                  Copy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Mix Modal Overlay */}
      <AnimatePresence>
        {showCustomModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={() => setShowCustomModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative max-h-[80vh] flex flex-col"
            >
              <button 
                onClick={() => setShowCustomModal(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-[24px] font-bold text-[#0F3D2E] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Customize Your Box</h3>
              <p className="text-[#6b7b72] text-[15px] mb-4 font-medium">Mix and match different teas. Total: {customTotal}/20 Packets (Select 5 for each)</p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full mb-6 overflow-hidden">
                <div className="bg-[#8cb73d] h-full transition-all duration-300" style={{ width: `${(customTotal/20)*100}%` }}></div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 min-h-[300px]">
                {products.map(p => (
                  <div key={p.id} className="flex items-center gap-4 bg-white p-3 md:p-4 rounded-2xl border border-[#e8e5de] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 group relative overflow-hidden">
                    {/* Selected state accent */}
                    {customMix[p.id] > 0 && <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0F3D2E] transition-all" />}
                    
                    <div className="bg-[#fcfbf9] border border-[#f0eee6] rounded-xl p-2 w-[60px] h-[60px] md:w-[72px] md:h-[72px] flex items-center justify-center shrink-0">
                      <img src={p.img} alt={p.name} className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-[#0F3D2E] text-[15px] md:text-[16px] mb-1">{p.name}</h4>
                      <span className="inline-block text-[#8cb73d] bg-[#f2f7e9] px-2 py-0.5 rounded text-[10px] md:text-[11px] font-bold uppercase tracking-wider">{p.category}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-[#fcfbf9] border border-[#e8e5de] rounded-xl p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] shrink-0">
                      <button 
                        onClick={() => handleCustomMixChange(p.id, -5)}
                        disabled={!customMix[p.id]}
                        className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-[#0F3D2E] font-medium hover:bg-white hover:shadow-sm rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      >-</button>
                      <span className="w-6 md:w-8 text-center font-bold text-[#0F3D2E] text-[14px] md:text-[15px]">{customMix[p.id] || 0}</span>
                      <button 
                        onClick={() => handleCustomMixChange(p.id, 5)}
                        disabled={customTotal >= 20}
                        className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-[#0F3D2E] font-medium hover:bg-white hover:shadow-sm rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#e8e5de] flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-[#0F3D2E] text-[20px]">₹{product.price}</span>
                  <span className="text-[#6b7b72] text-[13px]">for 20 Packets</span>
                </div>
                <button 
                  onClick={() => setShowCustomModal(false)}
                  disabled={customTotal !== 20}
                  className="bg-[#0F3D2E] text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a5743] transition-colors"
                >
                  {customTotal === 20 ? 'Confirm Mix' : `Add ${20 - customTotal} More`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Image Gallery */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 relative lg:z-30 z-10"
          >
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto scrollbar-hide p-1 shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
               {images.map((img, idx) => (
                 <button
                   key={idx}
                   onClick={() => setMainImageIndex(idx)}
                   className={`relative w-[60px] h-[60px] md:w-[85px] md:h-[85px] bg-transparent transition-all shrink-0 p-1 flex items-center justify-center ${mainImageIndex === idx ? 'border-2 border-[#b98e3b]' : 'border border-[#e8e5de] hover:border-[#d1c8ba]'}`}
                 >
                   <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                 </button>
               ))}
            </div>

            {/* Main Large Image */}
            <div 
              className="relative w-full h-[250px] md:h-auto md:flex-1 md:aspect-square bg-transparent flex items-center justify-center shrink-0 lg:cursor-crosshair group"
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              onMouseMove={handleImageMouseMove}
            >
               <img src={currentImage} alt={product.name} className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300" style={{ opacity: isHoveringImage ? 0.9 : 1 }} />
               
               {/* Zoom Portal for Desktop (shows at the right side) */}
               {isHoveringImage && (
                 <div className="hidden lg:block absolute top-0 left-full ml-16 w-full h-full bg-white z-[60] border border-[#e8e5de] shadow-2xl rounded-2xl overflow-hidden pointer-events-none">
                   <div 
                     className="w-full h-full"
                     style={{
                       backgroundImage: `url(${currentImage})`,
                       backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                       backgroundSize: '250%',
                       backgroundRepeat: 'no-repeat',
                       backgroundColor: '#fff'
                     }}
                   />
                 </div>
               )}
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
                    <img src={images[0]} alt="cart item" className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#0F3D2E] flex items-center gap-1"><Check className="w-4 h-4 text-[#8cb73d]" /> Added to cart!</p>
                    <p className="text-xs text-[#6b7b72] truncate max-w-[150px]">{product.name}</p>
                  </div>
                  <button 
                    onClick={() => router.push('/cart')}
                    className="text-xs font-bold bg-[#D4AF37] text-[#0F3D2E] px-3 py-1.5 rounded-lg hover:bg-[#d4a844] transition-colors"
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
                  <span className="text-[#D4AF37] text-[12px] font-bold uppercase tracking-widest mb-1">{product.category} BLEND</span>
                  <h1 className="text-[28px] md:text-[42px] font-bold text-[#0F3D2E] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {product.name}
                  </h1>
                </div>
                <div className="flex items-center gap-3 shrink-0 pt-2">
                  <button onClick={() => toggleItem(Number(product.id))} className="w-10 h-10 rounded-full bg-[#fdfbf6] flex items-center justify-center text-[#D4AF37] hover:bg-[#F8F5EE] transition-colors">
                    <Heart className={`w-5 h-5 ${isInWishlist(Number(product.id)) ? 'fill-current' : 'fill-transparent'}`} strokeWidth={2} />
                  </button>
                  <button onClick={handleShare} className="w-10 h-10 rounded-full bg-[#fdfbf6] flex items-center justify-center text-[#D4AF37] hover:bg-[#F8F5EE] transition-colors">
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
                {[1, 2, 3, 4, 5].map(star => {
                  const fillPercentage = Math.max(0, Math.min(100, (product.rating - star + 1) * 100));
                  return (
                    <div key={star} className="relative w-4 h-4">
                      <Star className="absolute top-0 left-0 w-4 h-4 text-[#d1c8ba] fill-transparent" />
                      <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${fillPercentage}%` }}>
                        <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <span className="text-[#6b7b72] text-[14px] font-medium ml-1">
                {product.rating} ({product.reviews} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-bold text-[#0F3D2E] text-[32px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>₹{currentPack.price}</span>
              {currentPack.originalPrice && (
                <span className="text-red-500 font-bold line-through text-[18px]">₹{currentPack.originalPrice}</span>
              )}
              {currentPack.discount && (
                <span className="text-[#4caf50] bg-[#edf7ed] text-[12px] font-bold px-2.5 py-1 rounded-md ml-2 tracking-wide">
                  Save {currentPack.discount}%
                </span>
              )}
            </div>

            {/* Tags / Pills */}
            <div className="flex items-center justify-between bg-[#eaf4d5] rounded-xl px-4 py-3 mb-6 border border-[#8cb73d]/30">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#4a6b3d]" />
                <span className="text-[#0F3D2E] text-[13px] font-bold">{product.type === 'Decaf' || product.type === 'Herbal' ? 'Caffeine Free' : 'Caffeinated'}</span>
              </div>
              <div className="w-[1px] h-4 bg-[#8cb73d]/30"></div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#4a6b3d]" />
                <span className="text-[#0F3D2E] text-[13px] font-bold">100% Natural</span>
              </div>
              <div className="w-[1px] h-4 bg-[#8cb73d]/30"></div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#4a6b3d]" />
                <span className="text-[#0F3D2E] text-[13px] font-bold">No Preservatives</span>
              </div>
            </div>

            {/* Choose Pack Size */}
            <div className="mb-4">
              <h4 className="text-[#0F3D2E] font-bold text-[15px] mb-3">Choose Pack Size</h4>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {packSizes.map((pack, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedPackIndex(index)}
                    className={`border-[1.5px] rounded-xl p-2 md:p-3 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white ${selectedPackIndex === index ? 'border-[#0F3D2E]' : 'border-[#e8e5de] hover:border-[#0F3D2E]'}`}
                  >
                    <span className={`font-bold text-[12px] md:text-[14px] ${selectedPackIndex === index ? 'text-[#0F3D2E]' : 'text-[#6b7b72]'} text-center`}>{pack.weight}</span>
                    <div className="flex flex-col xl:flex-row items-center gap-1 xl:gap-1.5 mt-0.5">
                      <span className="text-[#6b7b72] text-[11px] md:text-[13px]">₹{pack.price}</span>
                      <span className="text-[#4caf50] bg-[#edf7ed] text-[9px] md:text-[10px] font-bold px-1 md:px-1.5 py-0 md:py-0.5 rounded whitespace-nowrap">Save {pack.discount}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promotional Offers */}
            <div className="bg-[#f2f7e9] border border-[#8cb73d]/30 rounded-xl p-3 mb-6 flex flex-col gap-1.5">
              <p className="text-[#0F3D2E] text-[13px] md:text-[14px] font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8cb73d]"></span>
                But first time buyer - 15% off
              </p>
              <p className="text-[#0F3D2E] text-[13px] md:text-[14px] font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                Life time 5%
              </p>
            </div>

            <div className="flex gap-2 md:gap-4 mb-2">
              {/* Quantity */}
              <div className="flex items-center justify-between border border-[#e8e5de] rounded-[10px] px-1 md:px-2 py-1.5 md:py-2 w-[80px] md:w-[110px] bg-white shrink-0">
                <button onClick={decreaseQuantity} className="text-[#a0aab2] hover:text-[#0F3D2E] transition-colors font-medium text-[15px] md:text-lg w-6 md:w-8 h-6 md:h-8 flex items-center justify-center">-</button>
                <span className="font-bold text-[13px] md:text-[15px] text-[#0F3D2E]">{currentQuantity === 0 ? 1 : currentQuantity}</span>
                <button onClick={increaseQuantity} className="text-[#a0aab2] hover:text-[#0F3D2E] transition-colors font-medium text-[15px] md:text-lg w-6 md:w-8 h-6 md:h-8 flex items-center justify-center">+</button>
              </div>

              {/* Add to Cart */}
              <button 
                onClick={handleAddToCart}
                className="flex-[1.5] bg-[#D4AF37] text-[#0F3D2E] hover:bg-[#d4a844] font-bold text-[12px] md:text-[15px] rounded-[10px] transition-colors flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4"
              >
                <ShoppingBasket className="w-3.5 h-3.5 md:w-5 md:h-5" />
                Add to Cart
              </button>

              {/* Buy Now */}
              <button 
                onClick={() => {
                  if (currentQuantity === 0) handleAddToCart();
                  router.push('/checkout');
                }}
                className="flex-1 bg-[#0F3D2E] text-white hover:bg-[#0F3D2E] font-bold text-[12px] md:text-[15px] rounded-[10px] transition-colors px-2 md:px-4 whitespace-nowrap"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- Product Details Tabs Section --- */}
        <div className="w-full mt-8 md:mt-16">
          
          {/* Benefits & Ingredients Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 relative">
            
            {/* Left: Product Benefits Card */}
            <div className="bg-white rounded-[24px] border border-[#F8F5EE] p-6 md:p-12 shadow-sm relative overflow-hidden flex flex-col">
              {/* Decorative Leaves Bottom Left */}
              <Leaf className="absolute -bottom-10 -left-10 w-48 h-48 text-[#4a6b3d] opacity-[0.03] pointer-events-none -rotate-45" />
              
              <h3 className="font-bold text-[#0F3D2E] text-[24px] md:text-[28px] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Why You'll Love It</h3>
              <div className="w-12 h-[3px] bg-[#4a6b3d] mb-6 md:mb-10 rounded-full"></div>
              
              <div className="flex flex-col gap-5 md:gap-8 relative z-10">
                
                {/* Benefit 1 */}
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f4f7f5] flex items-center justify-center shrink-0 border border-[#e8ecea]">
                     <Leaf className="w-4 h-4 md:w-5 md:h-5 text-[#4a6b3d]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#0F3D2E] text-[15px] md:text-[16px] mb-1">Sustained Energy & Focus</h4>
                    <p className="text-[13px] md:text-[14px] text-[#6b7b72] leading-relaxed">
                      Provides clean, calm energy without the jitters or crashes.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f4f7f5] flex items-center justify-center shrink-0 border border-[#e8ecea]">
                     <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#4a6b3d]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#0F3D2E] text-[15px] md:text-[16px] mb-1">Antioxidant Rich</h4>
                    <p className="text-[13px] md:text-[14px] text-[#6b7b72] leading-relaxed">
                      Packed with catechins that help fight free radicals and support immunity.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f4f7f5] flex items-center justify-center shrink-0 border border-[#e8ecea]">
                     <Droplet className="w-4 h-4 md:w-5 md:h-5 text-[#4a6b3d]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#0F3D2E] text-[15px] md:text-[16px] mb-1">Detox & Cleanse</h4>
                    <p className="text-[13px] md:text-[14px] text-[#6b7b72] leading-relaxed">
                      Supports natural detoxification and helps your body feel lighter.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f4f7f5] flex items-center justify-center shrink-0 border border-[#e8ecea]">
                     <Activity className="w-4 h-4 md:w-5 md:h-5 text-[#4a6b3d]" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#0F3D2E] text-[15px] md:text-[16px] mb-1">Metabolism Support</h4>
                    <p className="text-[13px] md:text-[14px] text-[#6b7b72] leading-relaxed">
                      May help boost metabolism and support healthy weight management.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Ingredients Breakdown Card */}
            <div className="bg-white rounded-[24px] border border-[#F8F5EE] p-6 md:p-12 shadow-sm relative overflow-hidden flex flex-col">

              <h3 className="font-bold text-[#0F3D2E] text-[24px] md:text-[28px] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>What's Inside</h3>
              <p className="text-[13px] md:text-[14px] text-[#6b7b72] mb-5 md:mb-8 font-medium">100% natural ingredients, nothing else.</p>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4 relative z-10">
                
                {/* Ingredient 1 */}
                <div className="rounded-[16px] overflow-hidden border border-[#F8F5EE] flex flex-col bg-white">
                  <div className="w-full h-24 md:h-32 relative overflow-hidden">
                    <img src="/home/beetroot-v2.png" alt="Beetroot" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 md:py-3 px-2 text-center border-t border-[#F8F5EE]">
                    <span className="font-bold text-[#0F3D2E] text-[13px] md:text-[14px]">Beetroot</span>
                  </div>
                </div>

                {/* Ingredient 2 */}
                <div className="rounded-[16px] overflow-hidden border border-[#F8F5EE] flex flex-col bg-white">
                  <div className="w-full h-24 md:h-32 relative overflow-hidden">
                    <img src="/shop/petals.png" alt="Hibiscus" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 md:py-3 px-2 text-center border-t border-[#F8F5EE]">
                    <span className="font-bold text-[#0F3D2E] text-[13px] md:text-[14px]">Hibiscus</span>
                  </div>
                </div>

                {/* Ingredient 3 */}
                <div className="rounded-[16px] overflow-hidden border border-[#F8F5EE] flex flex-col bg-white">
                  <div className="w-full h-24 md:h-32 relative overflow-hidden">
                    <img src="/home/mulethi-v2.png" alt="Licorice" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 md:py-3 px-2 text-center border-t border-[#F8F5EE]">
                    <span className="font-bold text-[#0F3D2E] text-[13px] md:text-[14px]">Licorice</span>
                  </div>
                </div>

                {/* Ingredient 4 */}
                <div className="rounded-[16px] overflow-hidden border border-[#F8F5EE] flex flex-col bg-white">
                  <div className="w-full h-24 md:h-32 relative overflow-hidden">
                    <img src="/home/moringa-v2.png" alt="Moringa" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 md:py-3 px-2 text-center border-t border-[#F8F5EE]">
                    <span className="font-bold text-[#0F3D2E] text-[13px] md:text-[14px]">Moringa</span>
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
                  <div className="w-[90px] h-[90px] rounded-full bg-[#F8F5EE] border border-[#e8e5de] flex items-center justify-center mb-6 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] group-hover:border-[#fdbb0a] group-hover:bg-white transition-all duration-300 relative z-10">
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
                  <div className="w-[90px] h-[90px] rounded-full bg-[#F8F5EE] border border-[#e8e5de] flex items-center justify-center mb-6 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] group-hover:border-[#fdbb0a] group-hover:bg-white transition-all duration-300 relative z-10">
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
                  <div className="w-[90px] h-[90px] rounded-full bg-[#F8F5EE] border border-[#e8e5de] flex items-center justify-center mb-6 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] group-hover:border-[#fdbb0a] group-hover:bg-white transition-all duration-300 relative z-10">
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
                  <div className="w-[90px] h-[90px] rounded-full bg-[#F8F5EE] border border-[#e8e5de] flex items-center justify-center mb-6 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] group-hover:border-[#fdbb0a] group-hover:bg-white transition-all duration-300 relative z-10">
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
              <div className="marquee-track gap-4 md:gap-6 pb-2 md:pb-4">
                {[...reviewsList, ...reviewsList, ...reviewsList, ...reviewsList].map((review, idx) => (
                  <div 
                    key={`${review.id}-${idx}`} 
                    className="w-[280px] md:w-[350px] shrink-0 bg-white rounded-[16px] p-5 md:p-8 text-left border border-[#F8F5EE] shadow-sm flex flex-col hover:-translate-y-2 hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Stars & Text */}
                    <div className="flex gap-1 mb-3 md:mb-4">
                      {[1,2,3,4,5].map(s=>(
                        <Star key={s} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${s <= review.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}`}/>
                      ))}
                    </div>
                    <p className="text-[#556358] text-[13px] md:text-[14px] leading-relaxed mb-4 md:mb-6 flex-grow" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      "{review.text}"
                    </p>

                    {/* Profile Row */}
                    <div className="w-full h-[1px] bg-[#dccb96] opacity-60 mb-5"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#0F3D2E] text-[16px] bg-[#F8F5EE] border border-[#F8F5EE]">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="text-[14px] font-bold text-[#0F3D2E]">{review.name}</h5>
                        <p className="text-[12px] text-[#6b7b72]">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          <div className="bg-white p-6 md:p-10 rounded-[24px] border-2 border-[#F8F5EE] shadow-sm mb-16">
             <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4 sm:gap-0">
               <div>
                 <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F3D2E] mb-1 md:mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Add Reviews</h2>
                 <p className="text-[12px] md:text-[13px] text-[#6b7b72] font-medium">Your email address will not be published. Required fields are marked *</p>
               </div>
               <div className="flex flex-col items-start sm:items-end">
                 <span className="text-[11px] md:text-[12px] font-bold text-[#0F3D2E] mb-1">Select Rating:</span>
                 <div className="flex items-center gap-3">
                   {errors.rating && <span className="text-red-500 text-[11px] md:text-[12px] font-medium">{errors.rating}</span>}
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(s=>(
                        <Star 
                          key={s} 
                          onClick={() => { setRating(s); if(errors.rating) setErrors({...errors, rating: undefined}) }}
                          className={`w-4 h-4 md:w-5 md:h-5 cursor-pointer transition-colors ${rating >= s ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300 hover:text-[#D4AF37]'}`}
                        />
                      ))}
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="flex flex-col">
                  <input type="text" placeholder="Full Name *" value={name} onChange={(e) => {const val = e.target.value.replace(/[^a-zA-Z\s]/g, ''); setName(val); if(errors.name) setErrors({...errors, name: undefined})}} className={`p-3 md:p-4 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-[#F8F5EE]'} bg-[#fdfcf9] focus:outline-none focus:border-[#D4AF37] text-[13px] md:text-[15px] text-[#0F3D2E] placeholder:text-[#7a887f] placeholder:font-semibold font-medium transition-colors`} />
                  {errors.name && <span className="text-red-500 text-[11px] md:text-[12px] mt-1 ml-2 font-medium">{errors.name}</span>}
                </div>
                <div className="flex flex-col">
                  <input type="email" placeholder="Email Address *" value={email} onChange={(e) => {setEmail(e.target.value); if(errors.email) setErrors({...errors, email: undefined})}} className={`p-3 md:p-4 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-[#F8F5EE]'} bg-[#fdfcf9] focus:outline-none focus:border-[#D4AF37] text-[13px] md:text-[15px] text-[#0F3D2E] placeholder:text-[#7a887f] placeholder:font-semibold font-medium transition-colors`} />
                  {errors.email && <span className="text-red-500 text-[11px] md:text-[12px] mt-1 ml-2 font-medium">{errors.email}</span>}
                </div>
             </div>
             <div className="flex flex-col mb-4 md:mb-6">
               <textarea placeholder="Your Review (Optional for 4-5 stars, Required for 1-3 stars)" value={reason} onChange={(e) => {setReason(e.target.value); if(errors.reason) setErrors({...errors, reason: undefined})}} className={`w-full p-3 md:p-4 rounded-xl border-2 ${errors.reason ? 'border-red-500' : 'border-[#F8F5EE]'} bg-[#fdfcf9] h-24 md:h-32 focus:outline-none focus:border-[#D4AF37] text-[13px] md:text-[15px] text-[#0F3D2E] placeholder:text-[#7a887f] placeholder:font-semibold font-medium resize-none transition-colors`} />
               {errors.reason && <span className="text-red-500 text-[11px] md:text-[12px] mt-1 ml-2">{errors.reason}</span>}
             </div>
             <div className="flex items-center gap-4">
               <button onClick={handlePostReview} className="bg-[#0F3D2E] text-white hover:bg-[#0F3D2E] transition-colors px-6 py-3 md:px-8 md:py-3.5 rounded-[12px] md:rounded-[14px] font-bold text-[13px] md:text-[15px] shadow-sm w-full md:w-auto">
                 Post Review
               </button>
               {isReviewSuccess && <span className="text-[#0F3D2E] text-[13px] md:text-[14px] font-bold">Review posted successfully!</span>}
             </div>
          </div>

        </div>

        {/* Similar Products Section */}
        {products.filter((p: Product) => p.id !== product.id).length > 0 && (
          <div className="mt-8">
            <div className="mb-10">
              <h2 className="text-[24px] md:text-[30px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>Similar Products</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.filter((p: Product) => p.id !== product.id).slice(0, 4).map((similar: Product, idx: number) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={similar.id} 
                  onClick={() => router.push(`/shop/${similar.id}`)}
                  className="flex flex-col group cursor-pointer bg-white rounded-2xl md:rounded-3xl border border-[#e8e5de] p-3 md:p-5 overflow-hidden shadow-sm transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-[160px] md:h-[280px] mb-3 flex items-center justify-center rounded-t-2xl pt-2 px-1">
                    <button 
                      className={`absolute top-0 right-0 p-1 transition-colors z-10 ${mounted && isInWishlist(Number(similar.id)) ? 'text-[#D84B5B]' : 'text-[#8b9992] hover:text-[#D84B5B]'}`} 
                      onClick={(e) => { e.stopPropagation(); toggleItem(Number(similar.id)); }}
                    >
                      <Heart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} fill={mounted && isInWishlist(Number(similar.id)) ? 'currentColor' : 'none'} />
                    </button>
                    <img 
                      src={similar.img} 
                      alt={similar.name} 
                      className={`w-full h-full object-contain drop-shadow-sm transition-transform duration-700 ease-in-out ${similar.img.endsWith('/blue.png') ? 'scale-[1.4] translate-y-1' : (similar.img.endsWith('/ruby_detox.png') || similar.img.endsWith('/blue_tea1.png') ? 'scale-[1.3] translate-y-2' : '')}`} 
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex flex-col flex-1">
                    <h4 className="font-bold text-[#0F3D2E] group-hover:text-[#0F3D2E] text-[14px] md:text-[18px] leading-tight mb-1.5 transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {similar.name}
                    </h4>

                    {/* Rating (5 Stars) */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-[2px]">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const rating = similar.rating || 5;
                          const fillPercentage = Math.max(0, Math.min(100, (rating - star + 1) * 100));
                          return (
                            <div key={star} className="relative w-3 h-3 md:w-3.5 md:h-3.5">
                              <Star className="absolute top-0 left-0 w-3 h-3 md:w-3.5 md:h-3.5 text-[#e8e5de] fill-[#e8e5de]" />
                              <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${fillPercentage}%` }}>
                                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <span className="text-[11px] md:text-[13px] font-bold text-[#4a5d53]">({(similar.rating || 5).toFixed(1)})</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto gap-3 pt-1">
                      <span className="font-bold text-[#0F3D2E] text-[15px] md:text-[20px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        ₹{similar.price}
                      </span>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); router.push(`/shop/${similar.id}`); }}
                          className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0F3D2E] text-white hover:bg-[#0F3D2E] transition-colors shadow-sm shrink-0 relative z-10"
                        >
                          <ShoppingCart className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
