'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../features/cart/cartStore';
import { ArrowLeft, Minus, Plus, X, Trash2 } from 'lucide-react';
import { useWishlistStore } from '../../features/wishlist/wishlistStore';
import { useAuth } from '../../providers/AuthProvider';

// Temporary mock data to map cart items to full product details
const PRODUCTS = [
  { id: 1, name: "Ruby Calm Tea", price: 230.00, originalPrice: 270, discount: 15, img: "/assets/product/file_000000008de072079cfe74523df70bde.png", rating: 4.5, reviews: 124, category: "Wellness Blends", type: "Herbal", weight: "20 Packets", soldBy: "R-HerbalTea Organics" },
  { id: 2, name: "Calming Chamomile", price: 350.00, originalPrice: 400, discount: 12, img: "/home/img2.jpg", rating: 4.0, reviews: 89, category: "Loose Leaf", type: "Decaf", weight: "50g", soldBy: "ANAJ WALA ORGANICS" },
  { id: 3, name: "Morning Matcha", price: 850.00, originalPrice: 1000, discount: 15, img: "/home/img3.jpg", rating: 4.8, reviews: 342, category: "Matcha", type: "Caffeinated", weight: "250g", soldBy: "Shyam Enterprises" },
  { id: 4, name: "Detox Green Wellness", price: 400.00, originalPrice: 500, discount: 20, img: "/home/img4.jpg", rating: 4.1, reviews: 56, category: "Wellness Blends", type: "Caffeinated", weight: "100g", soldBy: "CHAMUNDA FASHION.." },
  { id: 5, name: "Sleepy Time Essence", price: 300.00, originalPrice: 350, discount: 14, img: "/home/img5.jpg", rating: 4.7, reviews: 210, category: "Tea Bags", type: "Herbal", weight: "50g", soldBy: "Dreamy Teas" },
  { id: 6, name: "Energy Boost Root", price: 600.00, originalPrice: 750, discount: 20, img: "/home/img6.jpg", rating: 4.3, reviews: 112, category: "Loose Leaf", type: "Caffeinated", weight: "250g", soldBy: "Root Energy" },
  { id: 7, name: "Immunity Shield", price: 550.00, originalPrice: 650, discount: 15, img: "/home/img7.jpg", rating: 4.9, reviews: 420, category: "Wellness Blends", type: "Herbal", weight: "100g", soldBy: "Shield Organics" },
  { id: 8, name: "Focus & Clarity", price: 750.00, originalPrice: 850, discount: 11, img: "/home/img8.jpg", rating: 4.6, reviews: 175, category: "Matcha", type: "Caffeinated", weight: "100g", soldBy: "Focus Teas" },
  { id: 9, name: "Digestive Soothe", price: 380.00, originalPrice: 420, discount: 9, img: "/home/herbal.jpg", rating: 4.2, reviews: 93, category: "Tea Bags", type: "Herbal", weight: "50g", soldBy: "Soothe Naturals" },
];

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, appliedCoupon, setAppliedCoupon } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [isCouponSelected, setIsCouponSelected] = useState(true);

  const handleOpenModal = () => {
    setIsCouponSelected(!!appliedCoupon);
    setShowCouponModal(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#f9f9f9]"></div>;

  // Enrich cart items with product details
  const enrichedItems = items.map(cartItem => {
    const productId = parseInt(cartItem.sku.replace('sku-', ''), 10);
    const product = PRODUCTS.find(p => p.id === productId);
    return {
      ...cartItem,
      product: product || {
        img: "/home/img1.jpg",
        originalPrice: (cartItem.priceCents / 100) * 1.2,
        discount: 20,
        weight: "100g",
        soldBy: "Herbal Tea Inc."
      }
    };
  });

  const totalProductPrice = enrichedItems.reduce((total, item) => total + (item.product.originalPrice * item.quantity), 0);
  const totalDiscount = enrichedItems.reduce((total, item) => total + ((item.product.originalPrice - (item.priceCents / 100)) * item.quantity), 0);
  const totalAppliedDiscount = totalDiscount + (appliedCoupon ? appliedCoupon.discount : 0);
  const shippingCents = 3000;
  const orderTotal = totalProductPrice - totalAppliedDiscount + (shippingCents / 100);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F5EE] py-8 font-sans" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full border border-[#d1c8ba] flex items-center justify-center text-[#0F3D2E] hover:bg-[#e8e5de] transition-colors shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          
          <div className="flex-1 flex justify-center sm:mr-10 ml-4 sm:ml-0 overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-4 text-[10px] min-[400px]:text-[12px] sm:text-[14px] font-bold tracking-widest text-[#03a685] whitespace-nowrap">
              <span className="border-b-2 border-[#03a685] pb-1">BAG</span>
              <span className="w-4 min-[400px]:w-8 sm:w-16 h-px border-t border-dashed border-[#878787]"></span>
              <span className="text-[#878787]">ADDRESS</span>
              <span className="w-4 min-[400px]:w-8 sm:w-16 h-px border-t border-dashed border-[#878787]"></span>
              <span className="text-[#878787]">PAYMENT</span>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#333] mb-4">Your Cart is Empty</h2>
            <p className="text-[#666] mb-6">Looks like you haven't added anything to your cart yet.</p>
            <button 
              onClick={() => router.push('/shop')}
              className="bg-[#0F3D2E] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#2a4536] transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: Product Details */}
            <div className="flex-1">
              <h2 className="text-[18px] font-semibold text-[#333] mb-4">Product Details</h2>
              
              <div 
                className="bg-white border border-[#e5e7eb] rounded p-4 mb-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
                onClick={() => router.push('/wishlist')}
              >
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F3D2E]">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span className="text-[14px] font-bold text-[#0F3D2E]">Add More From Wishlist</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#333]">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>

              <div className="space-y-3">
                {enrichedItems.map((item) => (
                  <div key={item.sku} className="bg-white border border-[#e5e7eb] rounded overflow-hidden shadow-sm">
                    <div className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-[72px] h-[72px] border border-[#e5e7eb] rounded flex items-center justify-center overflow-hidden shrink-0">
                          <img src={item.product.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[15px] text-[#333] font-medium pr-4">{item.name}</h3>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[16px] font-bold text-[#333]">₹{(item.priceCents / 100).toFixed(0)}</span>
                            <span className="text-[13px] text-[#878787] line-through">₹{item.product.originalPrice.toFixed(0)}</span>
                            <span className="text-[12px] font-bold text-[#03a685]">{item.product.discount}% Off</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1.5 text-[13px] text-[#555]">
                            <span>Size: {item.product.weight}</span>
                            <span className="w-[3px] h-[3px] rounded-full bg-[#878787]"></span>
                            
                            <div className="flex items-center ml-2 border border-[#e5e7eb] rounded overflow-hidden bg-white">
                              <button 
                                onClick={() => updateQuantity(item.sku, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                                className="px-2 py-1 bg-[#f9f9f9] text-[#555] hover:bg-[#f0f0f0] transition-colors disabled:opacity-50 flex items-center justify-center"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-[#333] font-bold text-[13px] w-8 text-center bg-white flex items-center justify-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.sku, Math.min(10, item.quantity + 1))}
                                disabled={item.quantity >= 10}
                                className="px-2 py-1 bg-[#f9f9f9] text-[#555] hover:bg-[#f0f0f0] transition-colors disabled:opacity-50 flex items-center justify-center"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#f0f0f0] text-[13px] font-bold text-[#555]">
                            <button 
                              onClick={() => removeItem(item.sku)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#fff0f2] text-[#D84B5B] hover:bg-[#ffe4e8] hover:text-[#c43848] transition-colors border border-[#ffd1d7]"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="tracking-wide">REMOVE</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sold By */}
                    <div className="border-t border-[#f0f0f0] bg-[#fafafa] px-4 py-2.5">
                      <p className="text-[13px] text-[#555]">Sold by: {item.product.soldBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Price Details */}
            <div className="w-full lg:w-[320px]">
              <div className="sticky top-24">
                
                {/* Coupons Section */}
                <h2 className="text-[12px] font-bold text-[#555] mb-2 uppercase tracking-wide">Offers & Coupons</h2>
                <div className="bg-white border border-[#e5e7eb] rounded p-4 shadow-sm mb-4">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#333]">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        <div>
                          <div className="text-[14px] font-bold text-[#333]">1 Coupon applied</div>
                          <div className="text-[12px] text-[#03a685]">You saved additional ₹{appliedCoupon.discount}</div>
                        </div>
                      </div>
                      <button 
                        onClick={handleOpenModal}
                        className="border border-[#eab308] text-[#eab308] px-4 py-1 rounded text-[12px] font-bold hover:bg-[#fefce8] transition-colors"
                      >
                        EDIT
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#333]">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        <span className="text-[14px] font-bold text-[#333]">Apply Coupons</span>
                      </div>
                      <button 
                        onClick={handleOpenModal}
                        className="border border-[#eab308] text-[#eab308] px-4 py-1 rounded text-[12px] font-bold hover:bg-[#fefce8] transition-colors"
                      >
                        APPLY
                      </button>
                    </div>
                  )}
                </div>

                <h2 className="text-[12px] font-bold text-[#555] mb-2 uppercase tracking-wide border-t border-[#f0f0f0] pt-4">Price Details ({totalItems} Items)</h2>
                
                <div className="bg-white border border-[#e5e7eb] rounded p-4 shadow-sm">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-[14px] text-[#555]">
                      <span>Total MRP</span>
                      <span>₹{totalProductPrice.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-[14px] text-[#03a685]">
                      <span>Discount on MRP</span>
                      <span>- ₹{totalDiscount.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-[14px] text-[#03a685]">
                      <span className="text-[#555] flex items-center gap-1">Coupon Discount</span>
                      {appliedCoupon ? (
                        <span>-₹{appliedCoupon.discount}</span>
                      ) : (
                        <span className="text-[#eab308] font-medium cursor-pointer" onClick={handleOpenModal}>Apply Coupon</span>
                      )}
                    </div>
                    <div className="flex justify-between text-[14px] text-[#555]">
                      <span>Delivery Charges</span>
                      <span>₹30</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-dashed border-[#d5d5d5] pt-4 mb-4">
                    <div className="flex justify-between text-[16px] font-bold text-[#333]">
                      <span>Total Amount</span>
                      <span>₹{orderTotal.toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#eaf5f0] text-[#03a685] text-[12px] font-bold py-2.5 px-3 rounded mb-4 flex items-center gap-2">
                    <div className="w-[14px] h-[14px] rounded-full bg-[#03a685] text-white flex items-center justify-center text-[10px] leading-none shrink-0">
                      %
                    </div>
                    Yay! Your total discount is ₹{totalAppliedDiscount.toFixed(0)}
                  </div>
                  
                  <div className="text-center relative">
                    <div className="bg-[#f0f4f9] text-[#555] text-[11px] py-2 px-3 rounded mb-1 text-center font-medium">
                      Clicking on 'Continue' will not deduct any money
                    </div>
                    <button 
                      onClick={() => {
                        if (user) {
                          router.push('/checkout');
                        } else {
                          router.push('/login?redirect=/checkout');
                        }
                      }}
                      className="w-full bg-[#0F3D2E] text-white font-bold text-[16px] py-3 rounded hover:bg-[#2a4536] transition-colors"
                    >
                      Continue
                    </button>
                  </div>

                  <div className="mt-4 flex items-start gap-3 bg-[#fdfdfd] p-3 rounded border border-[#f0f0f0]">
                    <div className="w-8 h-8 rounded-full bg-[#e8f0fe] flex items-center justify-center shrink-0">
                      <span className="text-[#1967d2] font-bold text-[14px]">S</span>
                    </div>
                    <div className="text-[11px] text-[#555] leading-snug">
                      <span className="font-bold text-[#333] block mb-0.5 text-[12px]">Your Safety, Our Priority</span>
                      We make sure that your package is safe at every point of contact.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[400px] h-[500px] rounded flex flex-col relative overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-[#f0f0f0] flex justify-between items-center">
              <h3 className="text-[14px] font-bold text-[#333]">APPLY COUPON</h3>
              <button onClick={() => setShowCouponModal(false)} className="text-[#555] hover:text-[#333]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 bg-[#f9f9f9]">
              <div className="flex h-[40px] bg-white border border-[#e5e7eb] rounded overflow-hidden">
                <input 
                  type="text" 
                  placeholder="Enter coupon code" 
                  className="flex-1 px-3 text-[14px] outline-none"
                />
                <button className="text-[#eab308] font-bold px-4 text-[14px] hover:bg-[#fefce8]">
                  CHECK
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-[#f9f9f9]">
              <div className="flex gap-3 mb-4">
                <input 
                  type="checkbox" 
                  checked={isCouponSelected} 
                  onChange={(e) => setIsCouponSelected(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#eab308] rounded shrink-0 cursor-pointer" 
                />
                <div className="flex-1 border border-[#eab308] rounded bg-white relative overflow-hidden">
                  {/* Dashed Left Border detail like myntra */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#eab308]"></div>
                  
                  <div className="p-3 pl-4">
                    <div className="inline-block border border-[#eab308] border-dashed text-[#eab308] font-bold px-2 py-1 text-[14px] mb-2 rounded-sm bg-[#fefce8]">
                      EORS50OFF
                    </div>
                    <div className="text-[14px] font-bold text-[#333] mb-1">Save ₹118</div>
                    <div className="text-[13px] text-[#555] mb-2 leading-tight">50% off on minimum purchase of Rs. 149.</div>
                    <div className="text-[12px] text-[#878787] pt-2 border-t border-[#f0f0f0]">Expires on: 14th June 2026 | 11:59 PM</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#f0f0f0] p-4 flex justify-between items-center bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div>
                <div className="text-[12px] text-[#555]">Maximum savings:</div>
                <div className="text-[18px] font-bold text-[#333]">₹118</div>
              </div>
              <button 
                onClick={() => {
                  if (isCouponSelected) {
                    setAppliedCoupon({ code: 'EORS50OFF', discount: 118 });
                  } else {
                    setAppliedCoupon(null);
                  }
                  setShowCouponModal(false);
                }}
                className="bg-[#eab308] text-white px-10 py-2.5 rounded font-bold text-[14px] hover:bg-[#ca8a04] transition-colors"
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
