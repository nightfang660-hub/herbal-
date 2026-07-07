'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../providers/AuthProvider';
import { 
  User, Settings, MapPin, Package, LogOut, RefreshCw,
  Bell, CreditCard, ChevronRight, ArrowLeft, Download, Eye, FileText, X,
  CheckCircle2, AlertCircle, Edit2, Trash2, Plus, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserAddresses, addUserAddress, updateUserAddress, deleteUserAddress, getUserOrders, getUserProfile, updateUserProfile, Address } from '../../lib/userProfile';

type ViewState = 'dashboard' | 'orders' | 'addresses' | 'notifications' | 'settings';

function ProfileContent() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view') as ViewState | null;
  
  const [activeView, setActiveView] = useState<ViewState>(viewParam || 'dashboard');
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [profileData, setProfileData] = useState({ fullName: '', phoneNumber: '' });

  useEffect(() => {
    if (viewParam && ['dashboard', 'orders', 'addresses', 'notifications', 'settings'].includes(viewParam)) {
      setActiveView(viewParam);
    } else if (!viewParam) {
      setActiveView('dashboard');
    }
  }, [viewParam]);

  const handleSetView = (view: ViewState) => {
    setActiveView(view);
    if (view === 'dashboard') {
      router.push('/profile');
    } else {
      router.push(`/profile?view=${view}`);
    }
  };

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    title: '',
    name: '',
    addressLine1: '',
    addressLine2: '',
    phone: '',
    isDefault: false
  });

  const handleEditAddress = (address: any) => {
    setAddressForm(address);
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id: string) => {
    if (user) {
      await deleteUserAddress(user.uid, id);
      setAddresses(addresses.filter(a => a.id !== id));
    }
  };

  const handleSaveAddress = async () => {
    if (!user) return;
    
    if (editingAddressId) {
      // If setting as default, update others first (this is optimistic locally)
      if (addressForm.isDefault) {
        setAddresses(addresses.map(a => a.id === editingAddressId ? { ...addressForm, id: editingAddressId } : { ...a, isDefault: false }));
      } else {
        setAddresses(addresses.map(a => a.id === editingAddressId ? { ...addressForm, id: editingAddressId } : a));
      }
      
      await updateUserAddress(user.uid, editingAddressId, addressForm);
    } else {
      const newId = await addUserAddress(user.uid, addressForm);
      const newAddress = { ...addressForm, id: newId };
      if (newAddress.isDefault) {
        setAddresses([...addresses.map(a => ({ ...a, isDefault: false })), newAddress]);
      } else {
        setAddresses([...addresses, newAddress]);
      }
    }
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      // Load addresses from Firestore
      getUserAddresses(user.uid).then((fetchedAddresses) => {
        if (fetchedAddresses.length > 0) {
          setAddresses(fetchedAddresses);
        } else {
          // Keep a mock default if none exist in firestore for showcase, or just leave empty
          setAddresses([]);
        }
      }).catch((err) => {
        console.error("Failed to load addresses:", err);
        setAddresses([]);
      });
      
      // Load orders from Firestore
      getUserOrders(user.uid).then((fetchedOrders) => {
        setOrders(fetchedOrders);
      }).catch((err) => {
        console.error("Failed to load orders:", err);
        setOrders([]);
      });
      
      // Load profile info
      getUserProfile(user.uid).then((profile) => {
        if (profile) {
          setProfileData({ fullName: profile.fullName || user.displayName || '', phoneNumber: profile.phoneNumber || '' });
        } else {
          setProfileData({ fullName: user.displayName || '', phoneNumber: '' });
        }
      }).catch((err) => {
        console.error("Failed to load profile data:", err);
        setProfileData({ fullName: user.displayName || '', phoneNumber: '' });
      });
    }
  }, [user, loading, router]);

  // Sync current user to savedAccounts
  useEffect(() => {
    if (user && (profileData.fullName || user.displayName)) {
      try {
        const saved = JSON.parse(localStorage.getItem('savedAccounts') || '[]');
        const currentAcc = { 
          uid: user.uid, 
          email: user.email, 
          fullName: profileData.fullName || user.displayName || 'Wellness Explorer' 
        };
        const existingIdx = saved.findIndex((a: any) => a.uid === user.uid);
        if (existingIdx >= 0) {
          saved[existingIdx] = currentAcc;
        } else {
          saved.push(currentAcc);
        }
        localStorage.setItem('savedAccounts', JSON.stringify(saved));
        setSavedAccounts(saved);
      } catch (e) {
        console.error("Failed to parse saved accounts");
      }
    }
  }, [user, profileData]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0F3D2E]/20 border-t-[#0F3D2E] rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleSwitchToAccount = async (account: any) => {
    if (account.uid === user?.uid) {
      setShowSwitchAccount(false);
      return;
    }
    await logout();
    router.push(`/login?email=${encodeURIComponent(account.email)}`);
  };

  const PROFILE_MENU = [
    { id: 'orders', icon: Package, label: 'My Orders', description: 'Track, return, or buy things again' },
    { id: 'addresses', icon: MapPin, label: 'Saved Addresses', description: 'Manage delivery locations' },
    { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Communication preferences' },
    { id: 'settings', icon: Settings, label: 'Account Settings', description: 'Password, email, and personal info' },
  ];

  // --- SUB-VIEWS ---

  const renderDashboard = () => (
    <div className="bg-white border border-[#F8F5EE] rounded-[16px] shadow-sm overflow-hidden">
      <div className="divide-y divide-[#F0F0F0]">
        {PROFILE_MENU.map((item, index) => (
          <motion.button 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full flex items-center p-5 hover:bg-[#F5F8F3] transition-colors group text-left"
            onClick={() => handleSetView(item.id as ViewState)}
          >
            <div className="w-[48px] h-[48px] rounded-full bg-[#F5F8F3] group-hover:bg-white flex items-center justify-center shrink-0 border border-transparent group-hover:border-[#F8F5EE] transition-all">
              <item.icon className="w-5 h-5 text-[#0F3D2E]" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-[16px] font-bold text-[#1D2E25] group-hover:text-[#0F3D2E] transition-colors">{item.label}</h3>
              <p className="text-[13px] text-[#6E7C70] mt-0.5">{item.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#A0AAB2] group-hover:text-[#0F3D2E] transition-colors transform group-hover:translate-x-1" />
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => {
    return (
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white border border-[#F8F5EE] rounded-[16px] p-8 text-center text-[#6E7C70] shadow-sm">
            <Package className="w-12 h-12 mx-auto mb-4 text-[#A0AAB2]" />
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : orders.map(order => (
          <div key={order.id} className="bg-white border border-[#F8F5EE] rounded-[16px] p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 border-b border-[#F0F0F0] pb-4">
              <div>
                <h4 className="font-bold text-[#1D2E25] text-[15px]">Order #{order.orderId || order.id}</h4>
                <p className="text-[13px] text-[#6E7C70]">Placed on {order.date}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-[12px] font-bold self-start sm:self-auto ${order.status === 'Confirmed' ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50'}`}>
                {order.status || 'Delivered'}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <p className="text-[14px] text-[#333] font-medium">{Array.isArray(order.items) ? order.items.map((i: any) => `${i.name} (${i.quantity})`).join(', ') : order.items}</p>
                <p className="text-[14px] font-bold text-[#0F3D2E] mt-1">Total: ₹{order.total}</p>
              </div>
              <button 
                onClick={() => setSelectedInvoice(order)}
                className="flex items-center justify-center gap-2 border border-[#F8F5EE] hover:bg-[#F5F8F3] text-[#0F3D2E] px-4 py-2 rounded-lg text-[13px] font-bold transition-colors"
              >
                <Eye className="w-4 h-4" /> View Payslip
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAddresses = () => {
    if (showAddressForm) {
      return (
        <div className="bg-white border border-[#F8F5EE] rounded-[16px] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-[#1D2E25]">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
            <button onClick={() => { setShowAddressForm(false); setEditingAddressId(null); }} className="text-[#A0AAB2] hover:text-[#1D2E25] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#878787] uppercase mb-1">Title (e.g. Home, Work)</label>
              <input type="text" value={addressForm.title} onChange={e => setAddressForm({...addressForm, title: e.target.value})} className="w-full border border-[#F8F5EE] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0F3D2E]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#878787] uppercase mb-1">Full Name</label>
              <input type="text" value={addressForm.name} onChange={e => setAddressForm({...addressForm, name: e.target.value})} placeholder={user?.displayName || 'Wellness User'} className="w-full border border-[#F8F5EE] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0F3D2E]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold text-[#878787] uppercase mb-1">Address Line 1</label>
              <input type="text" value={addressForm.addressLine1} onChange={e => setAddressForm({...addressForm, addressLine1: e.target.value})} className="w-full border border-[#F8F5EE] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0F3D2E]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold text-[#878787] uppercase mb-1">Address Line 2 (City, State, ZIP)</label>
              <input type="text" value={addressForm.addressLine2} onChange={e => setAddressForm({...addressForm, addressLine2: e.target.value})} className="w-full border border-[#F8F5EE] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0F3D2E]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#878787] uppercase mb-1">Phone Number</label>
              <input type="tel" value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} className="w-full border border-[#F8F5EE] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0F3D2E]" />
            </div>
            <div className="flex items-center mt-6">
              <input type="checkbox" id="isDefault" checked={addressForm.isDefault} onChange={e => setAddressForm({...addressForm, isDefault: e.target.checked})} className="w-4 h-4 text-[#0F3D2E] rounded border-[#F8F5EE] focus:ring-[#0F3D2E]" />
              <label htmlFor="isDefault" className="ml-2 text-[14px] text-[#1D2E25]">Set as Default Address</label>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-[#F0F0F0] mt-6">
            <button onClick={() => { setShowAddressForm(false); setEditingAddressId(null); }} className="px-5 py-2.5 rounded-lg text-[#6E7C70] text-[14px] font-bold hover:bg-[#F5F8F3] transition-colors">Cancel</button>
            <button onClick={handleSaveAddress} className="bg-[#0F3D2E] text-white text-[14px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#146B43] shadow-md transition-colors">Save Address</button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {addresses.map(address => (
          <div key={address.id} className={`${address.isDefault ? 'bg-[#e8f2e1] border-[#0F3D2E]/20' : 'bg-white border-[#F8F5EE]'} border rounded-[16px] p-5 flex items-start gap-4 transition-colors`}>
            <MapPin className={`w-5 h-5 mt-0.5 ${address.isDefault ? 'text-[#0F3D2E]' : 'text-[#A0AAB2]'}`} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-bold ${address.isDefault ? 'text-[#0F3D2E]' : 'text-[#1D2E25]'} text-[15px]`}>
                  {address.title || address.addressType || 'ADDRESS'}
                </h4>
                {address.isDefault && <span className="bg-[#0F3D2E] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Primary</span>}
              </div>
              <p className="text-[14px] text-[#6E7C70] leading-relaxed">
                {address.name || address.fullName || user?.displayName || 'Wellness User'}<br/>
                {address.addressLine1 || (address.houseNumber ? `${address.houseNumber}, ${address.address || ''}` : '')}<br/>
                {address.addressLine2 || (address.city ? `${address.locality ? address.locality + ', ' : ''}${address.city}, ${address.stateName || ''} - ${address.postalCode || ''}` : '')}<br/>
                Ph: {address.phone || address.mobileNo}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEditAddress(address)} className="text-[#A0AAB2] hover:text-[#0F3D2E] transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDeleteAddress(address.id || '')} className="text-[#A0AAB2] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}

        <button 
          onClick={() => { 
            setAddressForm({ title: '', name: '', addressLine1: '', addressLine2: '', phone: '', isDefault: addresses.length === 0 }); 
            setShowAddressForm(true); 
            setEditingAddressId(null); 
          }} 
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#A0AAB2]/50 bg-white text-[#0F3D2E] rounded-[16px] p-4 hover:border-[#0F3D2E]/70 transition-all font-bold text-[14px]"
        >
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>
    );
  };

  const renderNotifications = () => {
    const notifications = [
      { id: 1, title: 'Order Shipped!', desc: 'Your order ORD-654123 is out for delivery.', time: '2 hours ago', unread: true },
      { id: 2, title: 'Exclusive Offer', desc: 'Get 20% off on your next purchase with code HERBAL20.', time: '1 day ago', unread: false },
      { id: 3, title: 'Welcome to R-HerbalTea', desc: 'Thank you for joining our premium wellness community.', time: '3 days ago', unread: false },
    ];
    return (
      <div className="bg-white border border-[#F8F5EE] rounded-[16px] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#F0F0F0]">
          {notifications.map(notif => (
            <div key={notif.id} className={`p-5 flex gap-4 ${notif.unread ? 'bg-[#F9FBFC]' : 'bg-white'}`}>
              <div className="mt-1">
                {notif.unread ? <div className="w-2.5 h-2.5 rounded-full bg-[#0F3D2E]" /> : <div className="w-2.5 h-2.5 rounded-full bg-[#F8F5EE]" />}
              </div>
              <div>
                <h4 className={`text-[15px] ${notif.unread ? 'font-bold text-[#1D2E25]' : 'font-semibold text-[#6E7C70]'}`}>{notif.title}</h4>
                <p className="text-[14px] text-[#6E7C70] mt-1">{notif.desc}</p>
                <p className="text-[12px] text-[#A0AAB2] mt-2">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleSaveProfile = async () => {
    if (user) {
      await updateUserProfile(user.uid, profileData);
      alert('Profile updated successfully!');
    }
  };

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        
        {/* Profile Avatar Section */}
        <div className="bg-white border border-[#F8F5EE] rounded-[24px] shadow-sm p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-[80px] h-[80px] rounded-full bg-[#F5F8F3] border-4 border-white shadow-md flex items-center justify-center shrink-0">
              <span className="text-[32px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {(profileData.fullName || user.displayName) ? (profileData.fullName || user.displayName)?.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#1D2E25] mb-1">Profile Photo</h3>
              <p className="text-[14px] text-[#6E7C70]">This will be displayed on your profile.</p>
            </div>
          </div>
          <button className="text-[#0F3D2E] bg-[#F5F8F3] text-[14px] font-bold px-5 py-2.5 rounded-full hover:bg-[#e8f2e1] transition-colors">
            Update
          </button>
        </div>

        {/* Personal Details Form */}
        <div className="bg-white border border-[#F8F5EE] rounded-[24px] shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-[#F0F0F0] bg-[#FAFAFA]">
            <h3 className="text-[18px] font-bold text-[#1D2E25] mb-1">Personal Details</h3>
            <p className="text-[14px] text-[#6E7C70]">Update your information and how we can reach you.</p>
          </div>
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-[#1D2E25] mb-2">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[#A0AAB2] group-focus-within:text-[#0F3D2E] transition-colors" />
                  </div>
                  <input type="text" value={profileData.fullName} onChange={e => setProfileData({...profileData, fullName: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-[#F8F5EE] border border-transparent rounded-[12px] text-[15px] focus:outline-none focus:bg-white focus:border-[#0F3D2E] focus:ring-[4px] focus:ring-[#0F3D2E]/10 transition-all text-[#1D2E25]" />
                </div>
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-[#1D2E25] mb-2">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#A0AAB2]" />
                  </div>
                  <input type="email" disabled defaultValue={user.email || ''} className="w-full pl-11 pr-4 py-3 bg-[#F0F0F0] border border-transparent rounded-[12px] text-[15px] text-[#878787] cursor-not-allowed" />
                </div>
                <p className="text-[12px] text-[#878787] mt-2">Email address cannot be changed.</p>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1D2E25] mb-2">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-[#A0AAB2] font-semibold text-[15px] group-focus-within:text-[#0F3D2E] transition-colors">+91</span>
                  </div>
                  <input type="tel" value={profileData.phoneNumber} onChange={e => setProfileData({...profileData, phoneNumber: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-[#F8F5EE] border border-transparent rounded-[12px] text-[15px] focus:outline-none focus:bg-white focus:border-[#0F3D2E] focus:ring-[4px] focus:ring-[#0F3D2E]/10 transition-all text-[#1D2E25]" placeholder="Enter mobile number" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white border border-[#F8F5EE] rounded-[24px] shadow-sm overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 sm:p-8">
          <div>
            <h3 className="text-[18px] font-bold text-[#1D2E25] mb-1">Account Security</h3>
            <p className="text-[14px] text-[#6E7C70]">Keep your account secure by regularly updating your password.</p>
          </div>
          <button className="mt-4 md:mt-0 whitespace-nowrap text-[#0F3D2E] text-[15px] font-bold border-2 border-[#0F3D2E] px-6 py-2.5 rounded-full hover:bg-[#F5F8F3] transition-colors">
            Change Password
          </button>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button onClick={handleSaveProfile} className="bg-[#0F3D2E] text-white text-[15px] font-bold px-10 py-3.5 rounded-full hover:bg-[#146B43] transition-all shadow-[0_8px_16px_rgba(15,61,46,0.2)] hover:shadow-[0_12px_24px_rgba(15,61,46,0.25)] hover:-translate-y-0.5">
            Save All Changes
          </button>
        </div>
      </div>
    );
  };

  const getActiveViewTitle = () => {
    if (activeView === 'dashboard') return 'Account Dashboard';
    const match = PROFILE_MENU.find(m => m.id === activeView);
    return match ? match.label : '';
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] font-sans pt-8 pb-20" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        {activeView === 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-[100px] h-[100px] rounded-full bg-white border border-[#F8F5EE] shadow-sm flex items-center justify-center shrink-0">
              <span className="text-[40px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {(profileData.fullName || user.displayName) ? (profileData.fullName || user.displayName)?.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-[32px] md:text-[40px] font-bold text-[#0F3D2E] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                {profileData.fullName || user.displayName || 'Wellness Explorer'}
              </h1>
              <p className="text-[#6E7C70] text-[16px]">{user.email}</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#e8f2e1] text-[#0F5132] rounded-full text-[12px] font-bold tracking-wide uppercase">
                Premium Member
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className={`${activeView === 'dashboard' ? 'md:col-span-8' : 'md:col-span-12 max-w-4xl mx-auto w-full'} space-y-4`}>
            <div className="flex items-center gap-3 mb-2">
              {activeView !== 'dashboard' && (
                <button 
                  onClick={() => handleSetView('dashboard')}
                  className="p-1 text-[#6E7C70] hover:text-[#0F3D2E] transition-colors rounded-full hover:bg-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-[14px] font-bold text-[#878787] uppercase tracking-wider">
                {getActiveViewTitle()}
              </h2>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeView === 'dashboard' && renderDashboard()}
                {activeView === 'orders' && renderOrders()}
                {activeView === 'addresses' && renderAddresses()}
                {activeView === 'notifications' && renderNotifications()}
                {activeView === 'settings' && renderSettings()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Actions Sidebar */}
          {activeView === 'dashboard' && (
            <div className="md:col-span-4 space-y-4">
              <h2 className="text-[14px] font-bold text-[#878787] uppercase tracking-wider mb-2">Account Actions</h2>
              
              <div className="bg-white border border-[#F8F5EE] rounded-[16px] shadow-sm p-2">
              
              <button 
                onClick={() => setShowSwitchAccount(true)}
                className="w-full flex items-center gap-3 p-4 rounded-[12px] text-[#0F3D2E] font-semibold hover:bg-[#F5F8F3] transition-all text-left group"
              >
                <div className="w-[36px] h-[36px] rounded-full bg-[#e8f2e1] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <RefreshCw className="w-4 h-4 text-[#0F3D2E]" />
                </div>
                <span>Switch Account</span>
              </button>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 rounded-[12px] text-[#D84B5B] font-semibold hover:bg-[#FFF5F5] transition-all text-left group mt-1"
              >
                <div className="w-[36px] h-[36px] rounded-full bg-[#FFF5F5] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <LogOut className="w-4 h-4 text-[#D84B5B]" />
                </div>
                <span>Sign Out</span>
              </button>

            </div>

            {/* Support Card */}
            <div className="mt-8 bg-[#0F3D2E] rounded-[16px] p-6 text-white relative overflow-hidden shadow-lg">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <h3 className="text-[18px] font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Need Help?</h3>
              <p className="text-[13px] text-white/80 mb-4 leading-relaxed">
                Our herbal experts and support team are here to assist you with your orders and wellness journey.
              </p>
              <button 
                onClick={() => router.push('/contact')}
                className="bg-white text-[#0F3D2E] text-[13px] font-bold px-5 py-2 rounded-full hover:bg-[#e8f2e1] transition-colors"
              >
                Contact Support
              </button>
            </div>
            </div>
          )}

        </div>
      </div>

      {/* Payslip Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)} 
              className="absolute inset-0 bg-black" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[600px] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#F0F0F0] bg-[#F5F8F3]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <FileText className="w-5 h-5 text-[#0F3D2E]" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>Order Invoice</h2>
                    <p className="text-[13px] text-[#6E7C70]">#{selectedInvoice.orderId || selectedInvoice.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="p-2 text-[#A0AAB2] hover:text-[#1D2E25] hover:bg-[#F8F5EE] rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-[12px] font-bold text-[#878787] uppercase tracking-wider mb-2">Billed To</h3>
                    <p className="text-[14px] text-[#1D2E25] font-bold">
                      {selectedInvoice?.shippingAddress?.fullName || user.displayName || 'Wellness Explorer'}
                    </p>
                    <p className="text-[13px] text-[#6E7C70] mt-1">
                      {selectedInvoice?.shippingAddress ? (
                        <>
                          {selectedInvoice.shippingAddress.address}<br/>
                          {selectedInvoice.shippingAddress.city}, {selectedInvoice.shippingAddress.state}<br/>
                          {selectedInvoice.shippingAddress.country} - {selectedInvoice.shippingAddress.postalCode}
                        </>
                      ) : (
                        <>
                          Apt 4B, Herbal Heights<br/>
                          MG Road, Bangalore<br/>
                          Karnataka - 560001
                        </>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-[12px] font-bold text-[#878787] uppercase tracking-wider mb-2">Order Date</h3>
                    <p className="text-[14px] text-[#1D2E25] font-bold">{selectedInvoice.date}</p>
                  </div>
                </div>

                <div className="border border-[#F8F5EE] rounded-[12px] overflow-hidden mb-6">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F5F8F3] border-b border-[#F8F5EE]">
                      <tr>
                        <th className="py-3 px-4 text-[12px] font-bold text-[#878787] uppercase">Item</th>
                        <th className="py-3 px-4 text-[12px] font-bold text-[#878787] uppercase text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F0F0]">
                      {Array.isArray(selectedInvoice.items) 
                        ? selectedInvoice.items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td className="py-4 px-4 text-[14px] text-[#1D2E25]">{item.name} x {item.quantity}</td>
                          <td className="py-4 px-4 text-[14px] text-[#1D2E25] text-right font-medium">₹{(item.priceCents * item.quantity / 100).toFixed(0)}</td>
                        </tr>
                      ))
                        : typeof selectedInvoice.items === 'string' ? selectedInvoice.items.split(',').map((item: string, i: number) => (
                        <tr key={i}>
                          <td className="py-4 px-4 text-[14px] text-[#1D2E25]">{item.trim()}</td>
                          <td className="py-4 px-4 text-[14px] text-[#1D2E25] text-right font-medium">{i === 0 ? `₹${selectedInvoice.total}` : 'Included'}</td>
                        </tr>
                      )) : null}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <div className="w-[200px] space-y-2">
                    <div className="flex justify-between text-[13px] text-[#6E7C70]">
                      <span>Subtotal</span>
                      <span>₹{selectedInvoice.total}</span>
                    </div>
                    <div className="flex justify-between text-[13px] text-[#6E7C70]">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-[16px] font-bold text-[#0F3D2E] pt-2 border-t border-[#F0F0F0]">
                      <span>Total</span>
                      <span>₹{selectedInvoice.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[#F0F0F0] bg-gray-50 flex justify-end gap-3">
                <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-2.5 border border-[#0F3D2E] text-[#0F3D2E] rounded-lg font-bold text-[13px] hover:bg-[#F5F8F3] transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Switch Account Modal */}
      <AnimatePresence>
        {showSwitchAccount && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              onClick={() => setShowSwitchAccount(false)} 
              className="absolute inset-0 bg-black" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[400px] bg-white rounded-[24px] shadow-2xl overflow-hidden z-10"
            >
              <div className="px-6 py-5 border-b border-[#F0F0F0] flex justify-between items-center bg-[#F8F5EE]/50">
                <h3 className="text-[18px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>Switch Account</h3>
                <button onClick={() => setShowSwitchAccount(false)} className="text-[#6E7C70] hover:text-[#0F3D2E] transition-colors p-1 rounded-full hover:bg-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
                {savedAccounts.map((account) => {
                  const isCurrent = account.uid === user?.uid;
                  return (
                    <button
                      key={account.uid}
                      onClick={() => handleSwitchToAccount(account)}
                      className={`w-full flex items-center gap-4 p-4 rounded-[16px] transition-all text-left ${isCurrent ? 'bg-[#e8f2e1] border border-[#0F3D2E]/10' : 'hover:bg-[#F5F8F3] border border-transparent'}`}
                    >
                      <div className="w-[48px] h-[48px] rounded-full bg-white border border-[#F8F5EE] shadow-sm flex items-center justify-center shrink-0">
                        <span className="text-[20px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {account.fullName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-[#0F3D2E] text-[15px] truncate">{account.fullName}</h4>
                          {isCurrent && <CheckCircle2 className="w-5 h-5 text-[#0F5132] shrink-0 ml-2" />}
                        </div>
                        <p className="text-[13px] text-[#6E7C70] truncate">{account.email}</p>
                      </div>
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    setShowSwitchAccount(false);
                    logout().then(() => router.push('/login'));
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-[16px] hover:bg-[#F5F8F3] transition-all text-left group border border-transparent mt-2"
                >
                  <div className="w-[48px] h-[48px] rounded-full bg-white border border-[#e8e4d9] flex items-center justify-center shrink-0 group-hover:border-[#0F3D2E]/30 transition-colors">
                    <Plus className="w-5 h-5 text-[#0F3D2E]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0F3D2E] text-[15px]">Log into another account</h4>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0F3D2E]/20 border-t-[#0F3D2E] rounded-full animate-spin" />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
