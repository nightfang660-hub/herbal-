'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#2a3f30] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8F5EE] rounded-full p-1.5 flex items-center justify-center">
                <img src="/home/herbal_logo.png" alt="HerbalTea Logo" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="text-md font-semibold tracking-wider uppercase text-[#c49d56]" style={{ fontFamily: 'Playfair Display, serif' }}>Herbal Tea</h3>
            </div>
            <p className="text-[13px] text-white/80 leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Curating premium, high-altitude herbal tea powders and holistic wellness botanical remedies to nurture your mind, body, and spirit.
            </p>
            <div className="flex gap-4 pt-1">
              <a href="#" className="text-white/70 hover:text-[#d7b56d] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-white/70 hover:text-[#d7b56d] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-white/70 hover:text-[#d7b56d] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c49d56] mb-5">Quick Links</h4>
            <ul className="space-y-3 text-[13px] text-white/80">
              <li><a href="/" className="hover:text-[#d7b56d] transition-colors">Home</a></li>
              <li><a href="/shop" className="hover:text-[#d7b56d] transition-colors">Shop</a></li>
              <li><a href="/journal" className="hover:text-[#d7b56d] transition-colors">Journal</a></li>
              <li><a href="/blog" className="hover:text-[#d7b56d] transition-colors">Blog</a></li>
              <li><a href="/about" className="hover:text-[#d7b56d] transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-[#d7b56d] transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c49d56] mb-5">Information</h4>
            <ul className="space-y-3 text-[13px] text-white/80">
              <li><a href="/ingredients" className="hover:text-[#d7b56d] transition-colors">Ingredients</a></li>
              <li><a href="/cart" className="hover:text-[#d7b56d] transition-colors">Cart</a></li>
              <li><a href="/wishlist" className="hover:text-[#d7b56d] transition-colors">Wishlist</a></li>
              <li><a href="#" className="hover:text-[#d7b56d] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#d7b56d] transition-colors">FAQS</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c49d56]">Contact Us</h4>
            <ul className="space-y-3 text-[13px] text-white/80">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-[#c49d56]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>123 Herbal Way, Wellness City, HW 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#c49d56]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:support@herbaltea.com" className="hover:text-[#d7b56d] transition-colors">support@herbaltea.com</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#c49d56]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href="tel:+1234567890" className="hover:text-[#d7b56d] transition-colors">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[12px] text-white/50">
          <p>© {new Date().getFullYear()} Herbal Tea. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[#d7b56d] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d7b56d] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
