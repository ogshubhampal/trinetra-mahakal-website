'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/site';

interface NavbarProps {
  language: 'en' | 'hi';
  onOpenDonateModal: (sevaId?: string) => void;
}

export function Navbar({ language, onOpenDonateModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#nirman', en: 'Neev to Shikhar', hi: 'नीव से शिखर' },
    { href: '#shila-seva', en: 'Itemized Seva', hi: 'शिला एवं निर्माण सेवा' },
    { href: '#yagya', en: 'Tantrik Badha Relief', hi: 'तांत्रिक बाधा निवारण' },
    { href: '#ngo-seva', en: 'NGO Anna Daan', hi: 'अन्न एवं शिक्षा सेवा' },
    { href: '#track', en: 'Track UTR Status', hi: 'स्थिति जांच (UTR)' },
    { href: '#contact', en: 'Darshan & Helpline', hi: 'दर्शन एवं संपर्क' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0D0F12]/95 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Sacred Emblem */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Sacred Trishul & Third Eye Insignia */}
            <div className="relative w-11 h-11 rounded-full bg-[#161A22] border border-[#D4AF37]/60 flex items-center justify-center shadow-xs group-hover:border-[#D4AF37] transition-all">
              {/* Sacred Third Eye Glow */}
              <div className="absolute w-3 h-5 rounded-full bg-[#C83A22] opacity-80 blur-[1px]"></div>
              <div className="relative w-1.5 h-3 rounded-full bg-[#F4F1EA] shadow-xs"></div>
              {/* Crescent Brass Trim */}
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#D4AF37] opacity-60"></div>
            </div>

            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-[#F4F1EA] tracking-wide group-hover:text-[#D4AF37] transition-colors leading-tight">
                {language === 'hi' ? 'श्री त्रिनेत्र महाकाल मंदिर' : 'Shri Trinetra Mahakal'}
              </span>
              <span className="text-[11px] text-[#D4AF37] font-medium tracking-wider uppercase">
                {language === 'hi' ? 'धर्मार्थ सेवा एवं वैदिक यज्ञशाला' : 'Mandir Sanctuary & Reg. NGO'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-[#A39E93] hover:text-[#D4AF37] transition-colors tracking-wide py-1 border-b-2 border-transparent hover:border-[#D4AF37]"
              >
                {language === 'hi' ? link.hi : link.en}
              </a>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenDonateModal('shila')}
              className="px-4 py-2.5 rounded bg-gradient-to-r from-[#C83A22] to-[#9E2010] hover:from-[#D43F24] hover:to-[#B32412] text-[#F4F1EA] font-semibold text-xs uppercase tracking-wider border border-[#D4AF37]/40 shadow-xs hover:shadow-[#C83A22]/20 transition-all active:scale-[0.98]"
            >
              {language === 'hi' ? 'शिला दान / सेवा करें' : 'Sponsor Shila / Seva'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#A39E93] hover:text-[#F4F1EA] hover:bg-[#161A22] border border-[#D4AF37]/30"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0F12] border-b border-[#D4AF37]/30 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#F4F1EA] hover:text-[#D4AF37] border-b border-white/5"
            >
              {language === 'hi' ? link.hi : link.en}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${SITE_CONFIG.contact.tollFreeTrust}`}
              className="text-xs text-[#D4AF37] flex items-center gap-2 py-1"
            >
              <span>📞 {language === 'hi' ? 'टोल-फ्री हेल्पलाइन:' : 'Toll-Free Helpline:'}</span>
              <strong className="text-white">{SITE_CONFIG.contact.tollFreeTrust}</strong>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
