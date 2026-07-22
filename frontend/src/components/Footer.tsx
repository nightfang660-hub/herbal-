'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#2a3f30] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="md:col-span-5 lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8F5EE] rounded-full p-1.5 flex items-center justify-center relative w-11 h-11">
                <Image src="/home/herbal_logo.png" alt="HerbalTea Logo" fill className="object-contain p-1.5" sizes="44px" />
              </div>
              <h3 className="text-md font-semibold tracking-wider uppercase text-[#D4AF37]" style={{ fontFamily: 'Playfair Display, serif' }}>R - Herbal Tea</h3>
            </div>
            <p className="text-[13px] text-white/80 leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Your go-to spot for natural herbal teas and <br /> plant remedies for a R - Herbal Tea lifestyle.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61577110637671" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#D4AF37] hover:text-[#2a3f30] hover:border-[#D4AF37] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://x.com/realherbalteaco" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#D4AF37] hover:text-[#2a3f30] hover:border-[#D4AF37] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/real-herbal-tea-herbaltea-5bb818423/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#D4AF37] hover:text-[#2a3f30] hover:border-[#D4AF37] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://pin.it/4pK5PtGwt" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#D4AF37] hover:text-[#2a3f30] hover:border-[#D4AF37] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.436 2.981 7.436 6.966 0 4.156-2.618 7.502-6.257 7.502-1.22 0-2.368-.634-2.763-1.385l-.754 2.873c-.272 1.042-1.011 2.342-1.507 3.136 1.157.356 2.373.551 3.633.551 6.621 0 11.988-5.367 11.988-11.987C24.017 5.367 18.638 0 12.017 0z"/></svg>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 lg:col-span-2 lg:pl-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-5">Quick Links</h4>
            <ul className="space-y-3 text-[13px] text-white/80">
              <li><a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
              <li><a href="/shop" className="hover:text-[#D4AF37] transition-colors">Shop</a></li>
              <li><a href="/about" className="hover:text-[#D4AF37] transition-colors">About</a></li>
              <li><a href="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
            </ul>
          </div>


          {/* Social Media */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-5">Social Media</h4>
            <ul className="space-y-3 text-[13px] text-white/80">
              <li><a href="https://www.facebook.com/profile.php?id=61577110637671" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">Facebook</a></li>
              <li><a href="https://x.com/realherbalteaco" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">Twitter</a></li>
              <li><a href="https://www.linkedin.com/in/real-herbal-tea-herbaltea-5bb818423/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">LinkedIn</a></li>
              <li><a href="https://pin.it/4pK5PtGwt" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">Pinterest</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-4 lg:col-span-4 space-y-4 lg:pl-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Contact Us</h4>
            <ul className="space-y-3 text-[13px] text-white/80">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Bachupally Area , Hyderabad , Telangana - 500090 , India</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:rherbaltea@gmail.com" className="hover:text-[#D4AF37] transition-colors">rherbaltea@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href="tel:+917799733755" className="hover:text-[#D4AF37] transition-colors">+91-7799733755</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[12px] text-white/50">
          <p>© {new Date().getFullYear()} R - Herbal Tea. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
