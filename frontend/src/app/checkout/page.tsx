'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../features/cart/cartStore';
import { placeOrder } from '../../lib/api';
import { ArrowLeft, CreditCard, Lock, ShieldAlert, X } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';

interface Address {
  id: string;
  fullName: string;
  mobileNo: string;
  postalCode: string;
  houseNumber: string;
  address: string;
  locality: string;
  city: string;
  stateName: string;
  addressType: string;
}

const PRODUCTS = [
  { id: 1, name: "Premium Herbal Blend", price: 450.00, originalPrice: 500, discount: 10, img: "/home/img1.jpg", rating: 4.5, reviews: 124, category: "Wellness Blends", type: "Herbal", weight: "100g", soldBy: "VIRENDRA KUMAR GUPTA" },
  { id: 2, name: "Calming Chamomile", price: 350.00, originalPrice: 400, discount: 12, img: "/home/img2.jpg", rating: 4.0, reviews: 89, category: "Loose Leaf", type: "Decaf", weight: "50g", soldBy: "ANAJ WALA ORGANICS" },
  { id: 3, name: "Morning Matcha", price: 850.00, originalPrice: 1000, discount: 15, img: "/home/img3.jpg", rating: 4.8, reviews: 342, category: "Matcha", type: "Caffeinated", weight: "250g", soldBy: "Shyam Enterprises" },
  { id: 4, name: "Detox Green Wellness", price: 400.00, originalPrice: 500, discount: 20, img: "/home/img4.jpg", rating: 4.1, reviews: 56, category: "Wellness Blends", type: "Caffeinated", weight: "100g", soldBy: "CHAMUNDA FASHION.." },
  { id: 5, name: "Sleepy Time Essence", price: 300.00, originalPrice: 350, discount: 14, img: "/home/img5.jpg", rating: 4.7, reviews: 210, category: "Tea Bags", type: "Herbal", weight: "50g", soldBy: "Dreamy Teas" },
  { id: 6, name: "Energy Boost Root", price: 600.00, originalPrice: 750, discount: 20, img: "/home/img6.jpg", rating: 4.3, reviews: 112, category: "Loose Leaf", type: "Caffeinated", weight: "250g", soldBy: "Root Energy" },
  { id: 7, name: "Immunity Shield", price: 550.00, originalPrice: 650, discount: 15, img: "/home/img7.jpg", rating: 4.9, reviews: 420, category: "Wellness Blends", type: "Herbal", weight: "100g", soldBy: "Shield Organics" },
  { id: 8, name: "Focus & Clarity", price: 750.00, originalPrice: 850, discount: 11, img: "/home/img8.jpg", rating: 4.6, reviews: 175, category: "Matcha", type: "Caffeinated", weight: "100g", soldBy: "Focus Teas" },
  { id: 9, name: "Digestive Soothe", price: 380.00, originalPrice: 420, discount: 9, img: "/home/herbal.jpg", rating: 4.2, reviews: 93, category: "Tea Bags", type: "Herbal", weight: "50g", soldBy: "Soothe Naturals" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalCents, clearCart, appliedCoupon } = useCartStore();
  const { user, idToken, loading: authLoading } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'address-list' | 'payment'>('address-list');
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [addressType, setAddressType] = useState('HOME');
  
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  
  const [firstErrorField, setFirstErrorField] = useState<string | null>(null);

  // Prepopulate authenticated user information and protect route
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/checkout');
    } else if (user && !fullName) {
      setFullName(user.displayName || '');
    }
  }, [user, authLoading, fullName, router]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMsg('Your cart is empty. Add items to checkout.');
      return;
    }
    
    const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId);
    if (!selectedAddress) {
      setErrorMsg('Please select a delivery address.');
      setCheckoutStep('address-list');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const addressObject = {
      fullName: selectedAddress.fullName,
      address: `${selectedAddress.houseNumber}, ${selectedAddress.address}, ${selectedAddress.locality}`,
      city: selectedAddress.city,
      state: selectedAddress.stateName,
      postalCode: selectedAddress.postalCode,
      country: 'USA'
    };

    const addressJson = JSON.stringify(addressObject);

    try {
      // MOCK BACKEND BEHAVIOR FOR FRONTEND TESTING
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network request

      clearCart();
      const mockOrderId = `ORD-${Date.now().toString().slice(-6)}`;
      router.push(`/checkout/success?orderId=${mockOrderId}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-[14px] font-medium text-[#555]">
        Verifying user credentials...
      </div>
    );
  }

  if (!user) {
    return null; // Prevent rendering checkout if not logged in, useEffect will redirect
  }
  
  const clearForm = () => {
    setFullName('');
    setMobileNo('');
    setPostalCode('');
    setHouseNumber('');
    setAddress('');
    setLocality('');
    setCity('');
    setStateName('');
    setAddressType('HOME');
    setEditingAddressId(null);
    setFirstErrorField(null);
  };

  const handleEditAddress = (addr: Address) => {
    setFullName(addr.fullName);
    setMobileNo(addr.mobileNo);
    setPostalCode(addr.postalCode);
    setHouseNumber(addr.houseNumber);
    setAddress(addr.address);
    setLocality(addr.locality);
    setCity(addr.city);
    setStateName(addr.stateName);
    setAddressType(addr.addressType);
    setEditingAddressId(addr.id);
    setFirstErrorField(null);
    setShowAddressModal(true);
  };

  const handleRemoveAddress = (id: string) => {
    const updated = savedAddresses.filter(a => a.id !== id);
    setSavedAddresses(updated);
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
    if (updated.length === 0) {
      setShowAddressModal(false);
    }
  };

  const validateForm = () => {
    if (!fullName) return 'fullName';
    if (!mobileNo) return 'mobileNo';
    if (!postalCode) return 'postalCode';
    if (!houseNumber) return 'houseNumber';
    if (!address) return 'address';
    if (!locality) return 'locality';
    if (!city) return 'city';
    if (!stateName) return 'stateName';
    return null;
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const firstErr = validateForm();
    
    if (firstErr) {
      setFirstErrorField(firstErr);
      return; 
    }
    
    setFirstErrorField(null);
    
    const newAddress: Address = {
      id: editingAddressId || Date.now().toString(),
      fullName,
      mobileNo,
      postalCode,
      houseNumber,
      address,
      locality,
      city,
      stateName,
      addressType
    };
    
    if (editingAddressId) {
      setSavedAddresses(prev => prev.map(a => a.id === editingAddressId ? newAddress : a));
    } else {
      setSavedAddresses(prev => [...prev, newAddress]);
    }
    
    setSelectedAddressId(newAddress.id);
    setShowAddressModal(false);
    clearForm();
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (fieldName === 'fullName') {
      val = val.replace(/[^a-zA-Z\s]/g, '');
    } else if (fieldName === 'mobileNo') {
      val = val.replace(/[^0-9]/g, '').slice(0, 10);
    }
    setter(val);
    if (firstErrorField === fieldName) {
      setFirstErrorField(null);
    }
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 6);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const renderFormFields = () => (
    <>
      <div>
        <h2 className="text-[13px] font-bold text-[#333] mb-4 uppercase tracking-wide">Contact Details</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={fullName}
              onChange={handleInputChange(setFullName, 'fullName')}
              className={`w-full rounded-sm border ${firstErrorField === 'fullName' ? 'border-[#ff3f6c]' : 'border-[#d5d5d5]'} bg-white px-3 py-2.5 text-[14px] text-[#333] focus:border-[#0F3D2E] outline-none`}
              placeholder="Name*"
            />
            {firstErrorField === 'fullName' && (
              <p className="text-[#ff3f6c] text-[11px] mt-1">This is a mandatory field</p>
            )}
          </div>
          <div>
            <input
              type="tel"
              value={mobileNo}
              onChange={handleInputChange(setMobileNo, 'mobileNo')}
              className={`w-full rounded-sm border ${firstErrorField === 'mobileNo' ? 'border-[#ff3f6c]' : 'border-[#d5d5d5]'} bg-white px-3 py-2.5 text-[14px] text-[#333] focus:border-[#0F3D2E] outline-none`}
              placeholder="Mobile No*"
            />
            {firstErrorField === 'mobileNo' && (
              <p className="text-[#ff3f6c] text-[11px] mt-1">This is a mandatory field</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[13px] font-bold text-[#333] mb-4 mt-8 uppercase tracking-wide">Address</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={postalCode}
              onChange={handleInputChange(setPostalCode, 'postalCode')}
              className={`w-full rounded-sm border ${firstErrorField === 'postalCode' ? 'border-[#ff3f6c]' : 'border-[#d5d5d5]'} bg-white px-3 py-2.5 text-[14px] text-[#333] focus:border-[#0F3D2E] outline-none`}
              placeholder="Pin Code*"
            />
            {firstErrorField === 'postalCode' && (
              <p className="text-[#ff3f6c] text-[11px] mt-1">This is a mandatory field</p>
            )}
          </div>
          <div>
            <input
              type="text"
              value={houseNumber}
              onChange={handleInputChange(setHouseNumber, 'houseNumber')}
              className={`w-full rounded-sm border ${firstErrorField === 'houseNumber' ? 'border-[#ff3f6c]' : 'border-[#d5d5d5]'} bg-white px-3 py-2.5 text-[14px] text-[#333] focus:border-[#0F3D2E] outline-none`}
              placeholder="House Number/Tower/Block*"
            />
            {firstErrorField === 'houseNumber' ? (
              <p className="text-[#ff3f6c] text-[11px] mt-1">This is a mandatory field</p>
            ) : (
              <p className="text-[#eab308] text-[11px] mt-1">*House Number will allow a doorstep delivery</p>
            )}
          </div>
          <div>
            <input
              type="text"
              value={address}
              onChange={handleInputChange(setAddress, 'address')}
              className={`w-full rounded-sm border ${firstErrorField === 'address' ? 'border-[#ff3f6c]' : 'border-[#d5d5d5]'} bg-white px-3 py-2.5 text-[14px] text-[#333] focus:border-[#0F3D2E] outline-none`}
              placeholder="Address (locality,building,street)*"
            />
            {firstErrorField === 'address' ? (
              <p className="text-[#ff3f6c] text-[11px] mt-1">This is a mandatory field</p>
            ) : (
              <p className="text-[#eab308] text-[11px] mt-1">*Please update society/apartment details</p>
            )}
          </div>
          <div>
            <input
              type="text"
              value={locality}
              onChange={handleInputChange(setLocality, 'locality')}
              className={`w-full rounded-sm border ${firstErrorField === 'locality' ? 'border-[#ff3f6c]' : 'border-[#d5d5d5]'} bg-white px-3 py-2.5 text-[14px] text-[#333] focus:border-[#0F3D2E] outline-none`}
              placeholder="Locality / Town*"
            />
            {firstErrorField === 'locality' && (
              <p className="text-[#ff3f6c] text-[11px] mt-1">This is a mandatory field</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={city}
                onChange={handleInputChange(setCity, 'city')}
                className={`w-full rounded-sm border ${firstErrorField === 'city' ? 'border-[#ff3f6c]' : 'border-[#d5d5d5]'} bg-white px-3 py-2.5 text-[14px] text-[#333] focus:border-[#0F3D2E] outline-none`}
                placeholder="City / District*"
              />
              {firstErrorField === 'city' && (
                <p className="text-[#ff3f6c] text-[11px] mt-1">This is a mandatory field</p>
              )}
            </div>
            <div>
              <input
                type="text"
                value={stateName}
                onChange={handleInputChange(setStateName, 'stateName')}
                className={`w-full rounded-sm border ${firstErrorField === 'stateName' ? 'border-[#ff3f6c]' : 'border-[#d5d5d5]'} bg-white px-3 py-2.5 text-[14px] text-[#333] focus:border-[#0F3D2E] outline-none`}
                placeholder="State*"
              />
              {firstErrorField === 'stateName' && (
                <p className="text-[#ff3f6c] text-[11px] mt-1">This is a mandatory field</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[13px] font-bold text-[#333] mb-4 mt-8 uppercase tracking-wide">Address Type</h2>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="addressType" 
              checked={addressType === 'HOME'}
              onChange={() => setAddressType('HOME')}
              className="w-4 h-4 accent-[#0F3D2E]" 
            />
            <span className="text-[14px] text-[#333]">Home</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="addressType" 
              checked={addressType === 'OFFICE'}
              onChange={() => setAddressType('OFFICE')}
              className="w-4 h-4 accent-[#0F3D2E]" 
            />
            <span className="text-[14px] text-[#333]">Office</span>
          </label>
        </div>
        
        {addressType === 'OFFICE' && (
          <div className="mt-6 space-y-4">
            <p className="text-[14px] text-[#878787]">Is your office open on weekends?<span className="text-[#ff3f6c]">*</span></p>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded-sm border-[#d5d5d5] accent-[#0F3D2E]" />
                <span className="text-[14px] text-[#333]">Open On Saturday</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded-sm border-[#d5d5d5] accent-[#0F3D2E]" />
                <span className="text-[14px] text-[#333]">Open On Sunday</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="pt-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded-sm border-[#d5d5d5] accent-[#0F3D2E]" />
          <span className="text-[14px] text-[#333]">Make this as my default address</span>
        </label>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f4f2ee] font-sans relative" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
      
      {/* Centered Modal for 2nd+ Address Add/Edit */}
      {showAddressModal && savedAddresses.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 transition-opacity" 
            onClick={() => setShowAddressModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-[500px] bg-white rounded-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-[#f0f0f0]">
              <h2 className="text-[14px] font-bold text-[#333] uppercase tracking-wide">
                {editingAddressId ? 'Edit Address' : 'Add New Address'}
              </h2>
              <button onClick={() => setShowAddressModal(false)} className="text-[#878787] hover:text-[#333] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form id="modal-address-form" onSubmit={handleAddressSubmit} noValidate className="space-y-6">
                {renderFormFields()}
              </form>
            </div>
            
            <div className="p-5 border-t border-[#f0f0f0] bg-white flex gap-4">
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                className="flex-1 rounded-sm border border-[#d5d5d5] py-3 text-[14px] font-bold text-[#333] hover:bg-gray-50 transition-colors uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="modal-address-form"
                className="flex-1 rounded-sm bg-[#0F3D2E] py-3 text-[14px] font-bold text-white hover:bg-[#1a5240] transition-all uppercase tracking-widest"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => checkoutStep === 'payment' ? setCheckoutStep('address-list') : router.back()}
          className="w-10 h-10 rounded-full border border-[#d1c8ba] flex items-center justify-center text-[#1c2e24] hover:bg-[#e8e5de] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        
        <div className="flex-1 flex justify-center mr-10">
          <div className="flex items-center gap-2 sm:gap-4 text-[12px] sm:text-[14px] font-bold tracking-widest">
            <span className="text-[#878787] cursor-pointer hover:text-[#333]" onClick={() => router.push('/cart')}>BAG</span>
            <span className="w-8 sm:w-16 h-px border-t border-dashed border-[#0F3D2E]"></span>
            <span className={`pb-1 ${checkoutStep === 'address-list' ? 'border-b-2 border-[#0F3D2E] text-[#0F3D2E]' : 'text-[#878787] cursor-pointer hover:text-[#333]'}`} onClick={() => { if (savedAddresses.length > 0) setCheckoutStep('address-list') }}>ADDRESS</span>
            <span className={`w-8 sm:w-16 h-px border-t border-dashed ${checkoutStep === 'payment' ? 'border-[#0F3D2E]' : 'border-[#878787]'}`}></span>
            <span className={`pb-1 ${checkoutStep === 'payment' ? 'border-b-2 border-[#0F3D2E] text-[#0F3D2E]' : 'text-[#878787]'}`}>PAYMENT</span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-8 flex items-center gap-3 rounded-md bg-red-50 p-4 text-xs font-medium text-red-800 border border-red-200">
          <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />
          <p>{errorMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8">
          {checkoutStep === 'address-list' ? (
            savedAddresses.length === 0 ? (
              // Inline form for the FIRST address
              <div className="bg-white border border-[#e5e7eb] rounded-sm p-6 shadow-sm">
                <h2 className="text-[16px] font-bold text-[#333] mb-6 uppercase tracking-wide">Add New Address</h2>
                <form onSubmit={handleAddressSubmit} noValidate className="space-y-6">
                  {renderFormFields()}
                  <div className="border-t border-[#f0f0f0] pt-6 mt-6">
                    <button
                      type="submit"
                      className="w-full rounded-sm bg-[#0F3D2E] py-3.5 text-[14px] font-bold text-white hover:bg-[#1a5240] transition-all uppercase tracking-widest"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[18px] font-bold text-[#333]">Select Delivery Address</h2>
                  <button 
                    onClick={() => { clearForm(); setShowAddressModal(true); }} 
                    className="border border-[#333] text-[#333] text-[12px] font-bold px-4 py-2 rounded-sm hover:bg-gray-50 uppercase"
                  >
                    Add New Address
                  </button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-[12px] font-bold text-[#878787] uppercase tracking-wide mb-3">Saved Addresses</h3>
                  {savedAddresses.map((addr) => (
                    <div key={addr.id} className={`bg-white border rounded-sm p-5 shadow-sm relative ${selectedAddressId === addr.id ? 'border-[#eab308]' : 'border-[#e5e7eb] hover:border-[#d5d5d5]'}`}>
                      <div className="flex items-start gap-3">
                        <input 
                          type="radio" 
                          name="selectedAddress"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 w-4 h-4 accent-[#eab308] cursor-pointer" 
                        />
                        <div className="flex-1 cursor-pointer" onClick={() => setSelectedAddressId(addr.id)}>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[15px] font-bold text-[#333]">{addr.fullName}</span>
                            <span className="text-[10px] font-bold text-[#0F3D2E] border border-[#0F3D2E] px-2 py-0.5 rounded-full uppercase tracking-wider">{addr.addressType}</span>
                          </div>
                          <p className="text-[13px] text-[#555] leading-relaxed mb-2">
                            {addr.houseNumber}, {addr.address}, {addr.locality}<br/>
                            {addr.city}, {addr.stateName} - {addr.postalCode}
                          </p>
                          <p className="text-[13px] text-[#555] mb-4">
                            Mobile: <span className="font-bold text-[#333]">{addr.mobileNo}</span>
                          </p>
                          <div className="text-[13px] text-[#555] flex items-center gap-2 mb-4">
                            <span className="w-1 h-1 bg-[#555] rounded-full"></span>
                            Pay on Delivery available
                          </div>
                        </div>
                      </div>
                      {selectedAddressId === addr.id && (
                        <div className="flex gap-4 ml-7">
                          <button onClick={() => handleRemoveAddress(addr.id)} className="border border-[#d5d5d5] text-[13px] font-bold px-6 py-2 rounded-sm hover:bg-gray-50 uppercase text-[#333]">Remove</button>
                          <button onClick={() => handleEditAddress(addr)} className="border border-[#d5d5d5] text-[13px] font-bold px-6 py-2 rounded-sm hover:bg-gray-50 uppercase text-[#333]">Edit</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div 
                  className="bg-white border border-dashed border-[#d5d5d5] rounded-sm p-4 text-left cursor-pointer hover:bg-gray-50 transition-colors" 
                  onClick={() => { clearForm(); setShowAddressModal(true); }}
                >
                  <span className="text-[#0F3D2E] font-bold text-[14px]">+ Add New Address</span>
                </div>
              </div>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-[16px] font-bold text-[#333] border-b border-[#f0f0f0] pb-2 mb-4">Payment Method</h2>
                <div className="rounded border border-[#e5e7eb] bg-white p-4 flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-[#0F3D2E]" />
                    <div>
                      <p className="text-[14px] font-bold text-[#333]">Simulated Secure Checkout</p>
                      <p className="text-[12px] text-[#878787]">Stripe & Razorpay simulated execution.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-[#eaf5f0] px-3 py-1 text-[12px] font-bold text-[#0F3D2E]">
                    <Lock className="h-3 w-3" /> Secure
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full rounded-sm bg-[#0F3D2E] py-3.5 text-[14px] font-bold uppercase tracking-widest text-white hover:bg-[#1a5240] transition-all shadow mt-6 disabled:bg-[#f0f0f0] disabled:text-[#878787] disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? 'Processing Order...' : 'Place Order'}
              </button>
            </form>
          )}
        </div>

        {/* Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Delivery Estimates */}
            <div className="space-y-3">
              <h2 className="text-[12px] font-bold text-[#878787] uppercase tracking-wide">Delivery Estimates</h2>
              <div className="bg-white border border-[#e5e7eb] rounded-sm p-4 shadow-sm">
                <div className="space-y-4 divide-y divide-[#f0f0f0]">
                  {enrichedItems.map((item, index) => {
                    const dDate = new Date();
                    dDate.setDate(dDate.getDate() + 4 + (index % 3));
                    const fDate = dDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                    return (
                      <div key={item.sku} className={`flex items-center gap-4 ${index > 0 ? 'pt-4' : ''}`}>
                        <div className="w-[44px] h-[54px] bg-[#f9f8f6] border border-[#e8e5de] rounded-sm overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                          <img src={item.image || item.product.img} alt="Product" className={`w-full h-full object-contain ${(item.image || item.product.img).includes('.png') ? 'mix-blend-multiply drop-shadow-sm' : ''}`} />
                        </div>
                        <span className="text-[14px] text-[#333]">
                          Estimated delivery by <span className="font-bold">{fDate}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded border border-[#e5e7eb] bg-white p-6 space-y-6 shadow-sm">
              <h2 className="text-[14px] font-bold text-[#333] border-b border-[#f0f0f0] pb-3 uppercase tracking-wide">Price Details ({items.length} Items)</h2>

              <div className="divide-y divide-[#f0f0f0] max-h-80 overflow-y-auto pr-2 space-y-4">
              {items.length === 0 ? (
                <p className="text-[13px] text-[#555]">No items in your cart.</p>
              ) : (
                items.map((item) => (
                  <div key={item.sku} className="flex justify-between items-start text-[14px] pt-4 first:pt-0">
                    <div className="space-y-0.5 max-w-[70%]">
                      <p className="font-medium text-[#333] truncate">{item.name}</p>
                      <p className="text-[12px] text-[#878787]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#333]">₹{((item.priceCents * item.quantity) / 100).toFixed(0)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-[#f0f0f0] space-y-4 text-[14px]">
              <div className="flex justify-between text-[#555]">
                <span>Total MRP</span>
                <span>₹{totalProductPrice.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-[#0F3D2E]">
                <span>Discount on MRP</span>
                <span>- ₹{totalDiscount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-[#555]">
                <span className="flex items-center gap-1">Coupon Discount</span>
                {appliedCoupon ? (
                  <span className="text-[#0F3D2E]">- ₹{appliedCoupon.discount}</span>
                ) : (
                  <span className="text-[#eab308] font-medium cursor-pointer" onClick={() => router.push('/cart')}>Apply Coupon</span>
                )}
              </div>
              <div className="flex justify-between text-[#555]">
                <span>Delivery Charges</span>
                <span>₹30</span>
              </div>
              <div className="flex justify-between text-[16px] font-bold text-[#333] pt-4 border-t border-dashed border-[#d5d5d5]">
                <span>Total Amount</span>
                <span>₹{orderTotal.toFixed(0)}</span>
              </div>
            </div>

            {checkoutStep === 'address-list' && savedAddresses.length > 0 && selectedAddressId && (
              <button
                onClick={() => setCheckoutStep('payment')}
                className="w-full rounded-sm bg-[#0F3D2E] py-3.5 text-[14px] font-bold tracking-widest text-white hover:bg-[#1a5240] transition-all uppercase"
              >
                Continue
              </button>
            )}
            {checkoutStep === 'address-list' && savedAddresses.length === 0 && !showAddressModal && (
              <div className="text-[12px] text-[#878787] text-center italic mt-2">
                Save your address to continue
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
