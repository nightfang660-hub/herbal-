'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/AuthProvider';
import { 
  User, Settings, MapPin, Package, LogOut, RefreshCw,
  Bell, CreditCard, ChevronRight, ArrowLeft, Download, Eye, FileText, X,
  CheckCircle2, AlertCircle, Edit2, Trash2, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ViewState = 'dashboard' | 'orders' | 'addresses' | 'notifications' | 'settings';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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

  const PROFILE_MENU = [
    { id: 'orders', icon: Package, label: 'My Orders', description: 'Track, return, or buy things again' },
    { id: 'addresses', icon: MapPin, label: 'Saved Addresses', description: 'Manage delivery locations' },
    { id: 'notifications', icon: Bell, label: 'Notifications', description: 'Communication preferences' },
    { id: 'settings', icon: Settings, label: 'Account Settings', description: 'Password, email, and personal info' },
  ];

  // --- SUB-VIEWS ---

  const renderDashboard = () => (
    <div className="bg-white border border-[#E8E6DE] rounded-[16px] shadow-sm overflow-hidden">
      <div className="divide-y divide-[#F0F0F0]">
        {PROFILE_MENU.map((item, index) => (
          <motion.button 
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full flex items-center p-5 hover:bg-[#F5F8F3] transition-colors group text-left"
            onClick={() => setActiveView(item.id as ViewState)}
          >
            <div className="w-[48px] h-[48px] rounded-full bg-[#F5F8F3] group-hover:bg-white flex items-center justify-center shrink-0 border border-transparent group-hover:border-[#E8E6DE] transition-all">
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
    const mockOrders = [
      { id: 'ORD-738291', date: 'Oct 12, 2026', items: 'Premium Herbal Blend (2)', total: '₹900', status: 'Delivered', statusColor: 'text-green-600 bg-green-50' },
      { id: 'ORD-654123', date: 'Sep 28, 2026', items: 'Calming Chamomile, Morning Matcha', total: '₹1200', status: 'In Transit', statusColor: 'text-blue-600 bg-blue-50' },
    ];
    return (
      <div className="space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="bg-white border border-[#E8E6DE] rounded-[16px] p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 border-b border-[#F0F0F0] pb-4">
              <div>
                <h4 className="font-bold text-[#1D2E25] text-[15px]">Order #{order.id}</h4>
                <p className="text-[13px] text-[#6E7C70]">Placed on {order.date}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-[12px] font-bold self-start sm:self-auto ${order.statusColor}`}>
                {order.status}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <p className="text-[14px] text-[#333] font-medium">{order.items}</p>
                <p className="text-[14px] font-bold text-[#0F3D2E] mt-1">Total: {order.total}</p>
              </div>
              <button 
                onClick={() => setSelectedInvoice(order)}
                className="flex items-center justify-center gap-2 border border-[#E8E6DE] hover:bg-[#F5F8F3] text-[#0F3D2E] px-4 py-2 rounded-lg text-[13px] font-bold transition-colors"
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
    return (
      <div className="space-y-4">
        <div className="bg-[#e8f2e1] border border-[#0F3D2E]/20 rounded-[16px] p-5 flex items-start gap-4">
          <MapPin className="w-5 h-5 text-[#0F3D2E] mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-[#0F3D2E] text-[15px]">Home (Default)</h4>
              <span className="bg-[#0F3D2E] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Primary</span>
            </div>
            <p className="text-[14px] text-[#6E7C70] leading-relaxed">
              {user.displayName || 'Wellness User'}<br/>
              Apt 4B, Herbal Heights, MG Road<br/>
              Bangalore, Karnataka - 560001<br/>
              Ph: +91 9876543210
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="text-[#A0AAB2] hover:text-[#0F3D2E] transition-colors"><Edit2 className="w-4 h-4" /></button>
            <button className="text-[#A0AAB2] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#E8E6DE] text-[#0F3D2E] rounded-[16px] p-4 hover:bg-white hover:border-[#0F3D2E]/30 transition-all font-bold text-[14px]">
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
      <div className="bg-white border border-[#E8E6DE] rounded-[16px] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#F0F0F0]">
          {notifications.map(notif => (
            <div key={notif.id} className={`p-5 flex gap-4 ${notif.unread ? 'bg-[#F9FBFC]' : 'bg-white'}`}>
              <div className="mt-1">
                {notif.unread ? <div className="w-2.5 h-2.5 rounded-full bg-[#0F3D2E]" /> : <div className="w-2.5 h-2.5 rounded-full bg-[#E8E6DE]" />}
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

  const renderSettings = () => {
    return (
      <div className="bg-white border border-[#E8E6DE] rounded-[16px] shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-[15px] font-bold text-[#1D2E25] mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-[#878787] uppercase mb-1">Full Name</label>
              <input type="text" defaultValue={user.displayName || ''} className="w-full border border-[#E8E6DE] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0F3D2E]" />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#878787] uppercase mb-1">Email Address</label>
              <input type="email" disabled defaultValue={user.email || ''} className="w-full border border-[#E8E6DE] bg-[#F9F9F9] text-[#878787] rounded-lg px-4 py-2.5 text-[14px] cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#878787] uppercase mb-1">Phone Number</label>
              <input type="tel" placeholder="+91" className="w-full border border-[#E8E6DE] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#0F3D2E]" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#F0F0F0]">
          <h3 className="text-[15px] font-bold text-[#1D2E25] mb-4">Security</h3>
          <button className="text-[#0F3D2E] text-[14px] font-bold border border-[#0F3D2E] px-5 py-2.5 rounded-lg hover:bg-[#F5F8F3] transition-colors">
            Change Password
          </button>
        </div>

        <div className="pt-6 border-t border-[#F0F0F0] flex justify-end">
          <button className="bg-[#0F3D2E] text-white text-[14px] font-bold px-8 py-3 rounded-lg hover:bg-[#146B43] transition-colors shadow-md">
            Save Changes
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-[100px] h-[100px] rounded-full bg-white border border-[#E8E6DE] shadow-sm flex items-center justify-center shrink-0">
            <span className="text-[40px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#0F3D2E] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {user.displayName || 'Wellness Explorer'}
            </h1>
            <p className="text-[#6E7C70] text-[16px]">{user.email}</p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[#e8f2e1] text-[#0F5132] rounded-full text-[12px] font-bold tracking-wide uppercase">
              Premium Member
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              {activeView !== 'dashboard' && (
                <button 
                  onClick={() => setActiveView('dashboard')}
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
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-[14px] font-bold text-[#878787] uppercase tracking-wider mb-2">Account Actions</h2>
            
            <div className="bg-white border border-[#E8E6DE] rounded-[16px] shadow-sm p-2">
              
              <button 
                onClick={handleLogout}
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
                    <p className="text-[13px] text-[#6E7C70]">#{selectedInvoice.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="p-2 text-[#A0AAB2] hover:text-[#1D2E25] hover:bg-[#E8E6DE] rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-[12px] font-bold text-[#878787] uppercase tracking-wider mb-2">Billed To</h3>
                    <p className="text-[14px] text-[#1D2E25] font-bold">{user.displayName || 'Wellness Explorer'}</p>
                    <p className="text-[13px] text-[#6E7C70] mt-1">
                      Apt 4B, Herbal Heights<br/>
                      MG Road, Bangalore<br/>
                      Karnataka - 560001
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-[12px] font-bold text-[#878787] uppercase tracking-wider mb-2">Order Date</h3>
                    <p className="text-[14px] text-[#1D2E25] font-bold">{selectedInvoice.date}</p>
                  </div>
                </div>

                <div className="border border-[#E8E6DE] rounded-[12px] overflow-hidden mb-6">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F5F8F3] border-b border-[#E8E6DE]">
                      <tr>
                        <th className="py-3 px-4 text-[12px] font-bold text-[#878787] uppercase">Item</th>
                        <th className="py-3 px-4 text-[12px] font-bold text-[#878787] uppercase text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F0F0]">
                      {selectedInvoice.items.split(',').map((item: string, i: number) => (
                        <tr key={i}>
                          <td className="py-4 px-4 text-[14px] text-[#1D2E25]">{item.trim()}</td>
                          <td className="py-4 px-4 text-[14px] text-[#1D2E25] text-right font-medium">{i === 0 ? selectedInvoice.total : 'Included'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <div className="w-[200px] space-y-2">
                    <div className="flex justify-between text-[13px] text-[#6E7C70]">
                      <span>Subtotal</span>
                      <span>{selectedInvoice.total}</span>
                    </div>
                    <div className="flex justify-between text-[13px] text-[#6E7C70]">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-[16px] font-bold text-[#0F3D2E] pt-2 border-t border-[#F0F0F0]">
                      <span>Total</span>
                      <span>{selectedInvoice.total}</span>
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

    </div>
  );
}
