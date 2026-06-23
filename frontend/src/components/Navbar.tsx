'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '../features/cart/cartStore';
import { useWishlistStore } from '../features/wishlist/wishlistStore';
import { ShoppingBag, X, Plus, Minus, Trash2, User as UserIcon, LogOut, Search, Heart, Menu, ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../providers/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const { items, addItem, removeItem, updateQuantity, getTotalCents, getItemCount } = useCartStore();
  const wishlistItems = useWishlistStore(state => state.items);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true); 
    
    // Force scroll to top on page reload
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);


  const totalItems = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Journal', href: '/journal' },
    { label: 'Ingredients', href: '/ingredients' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div
        className="w-full bg-[#0F3D2E] text-white text-center py-[10px] px-4 text-[13px] font-medium tracking-wide"
        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
      >
        🚚&nbsp;&nbsp;Free Shipping On Orders Above ₹499
      </div>

      {/* ── Sticky Navigation ── */}
      <header className="sticky top-0 z-40 w-full bg-[#F8F5EE]/95 backdrop-blur-md border-b border-[#e8e4d9] shadow-sm">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => router.push('/')}>
            <img src="/home/herbal_logo.png" alt="R-HerbalTea Logo" className="h-9 w-9 object-contain" />
            <span
              className="text-[20px] font-bold tracking-tight text-[#0F3D2E]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              R-HerbalTea
            </span>
          </div>

          {/* Center Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-6 text-[15px] font-semibold text-[#2c4a35]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link key={label} href={href} className={`relative group py-1 transition-colors ${isActive ? 'text-[#0F3D2E]' : 'hover:text-[#0F3D2E]'}`}>
                  {label}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#0F3D2E] rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button className="p-2 rounded-full text-[#2c4a35] hover:bg-[#e8f2e1] transition-colors cursor-pointer" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>

            {/* Account */}
            {mounted && (
              user ? (
                <button onClick={() => logout()} className="p-2 rounded-full text-[#2c4a35] hover:bg-[#e8f2e1] transition-colors cursor-pointer" title="Sign Out">
                  <LogOut className="h-5 w-5" />
                </button>
              ) : (
                <Link href="/login" className="p-2 rounded-full text-[#2c4a35] hover:bg-[#e8f2e1] transition-colors" aria-label="Account">
                  <UserIcon className="h-5 w-5" />
                </Link>
              )
            )}

            {/* Wishlist */}
            <button
              onClick={() => router.push('/wishlist')}
              className="relative p-2 rounded-full text-[#2c4a35] hover:bg-[#e8f2e1] transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D84B5B] text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => router.push('/cart')}
              className="relative flex items-center gap-1.5 bg-[#0F3D2E] hover:bg-[#1a5240] text-white px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer shadow-sm ml-1"
              aria-label="Cart"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {mounted && totalItems > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#0F3D2E]">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full text-[#2c4a35] hover:bg-[#e8e5de] transition-colors ml-1 cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Cart Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 bg-black" />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl border-l border-border"
            >
              <div className="flex items-center justify-between border-b border-border p-5">
                <h2 className="text-lg font-semibold text-primary">Your Selection ({totalItems})</h2>
                <button onClick={() => setIsOpen(false)} className="rounded-full p-1.5 text-foreground/60 hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {!mounted || items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <ShoppingBag className="h-12 w-12 text-muted mb-4 stroke-[1]" />
                    <p className="text-sm text-foreground/75 font-medium">Your cart is empty</p>
                    <button onClick={() => setIsOpen(false)} className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent hover:underline cursor-pointer">Start Shopping</button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.sku} className="flex gap-4 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                        <p className="text-xs text-muted mt-0.5">SKU: {item.sku}</p>
                        <p className="text-sm font-semibold text-primary mt-2">₹{(item.priceCents / 100).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeItem(item.sku)} className="text-muted hover:text-red-600 transition-colors cursor-pointer" aria-label="Remove item">
                          <Trash2 className="h-4 w-4 stroke-[1.5]" />
                        </button>
                        <div className="flex items-center gap-2.5 rounded-full border border-border bg-background px-2.5 py-1">
                          <button onClick={() => { if (item.quantity - 1 === 0) { removeItem(item.sku); } else { updateQuantity(item.sku, item.quantity - 1); } }} className="text-foreground/70 hover:text-primary cursor-pointer"><Minus className="h-3 w-3" /></button>
                          <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => addItem(item)} className="text-foreground/70 hover:text-primary cursor-pointer"><Plus className="h-3 w-3" /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {mounted && items.length > 0 && (
                <div className="border-t border-border bg-secondary/30 p-5 space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="text-primary font-semibold">₹{(getTotalCents() / 100).toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] text-muted">Shipping and discounts calculated at checkout.</p>
                  <button onClick={() => { setIsOpen(false); router.push('/checkout'); }} className="w-full rounded-md bg-primary py-3 text-center text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-all shadow-md active:scale-[0.98] cursor-pointer">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mobile Nav Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-50 bg-black lg:hidden" />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#F8F5EE] shadow-2xl border-r border-[#e8e5de] lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[#e8e5de] p-5">
                <div className="flex items-center gap-2">
                  <img src="/home/herbal_logo.png" alt="Logo" className="h-7 w-7 object-contain" />
                  <span className="text-lg font-bold tracking-tight text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>R-HerbalTea</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="rounded-full p-1.5 text-[#2c4a35] hover:bg-[#e8e5de] transition-colors cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col p-5 space-y-5 mt-4">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
                  return (
                    <Link 
                      key={label} 
                      href={href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`text-[18px] font-semibold transition-colors flex items-center ${isActive ? 'text-[#D4AF37]' : 'text-[#0F3D2E] hover:text-[#D4AF37]'}`}
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {label}
                      {isActive && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-auto border-t border-[#e8e5de] p-5">
                <p className="text-xs text-[#6b7b72] text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  © 2026 R-HerbalTea. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
