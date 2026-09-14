'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/site';

interface NavbarProps {
  language: 'en' | 'hi';
  onOpenDonateModal: (sevaId?: string) => void;
}

export function Navbar({ language, onOpenDonateModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavAction = (action: string) => {
    setMobileMenuOpen(false);
    if (action === 'shila' || action === 'nirman' || action === 'ngo') {
      onOpenDonateModal(action === 'ngo' ? 'anna_daan' : 'shila');
    } else if (action === 'yagya') {
      const text = encodeURIComponent(
        language === 'hi'
          ? 'प्रणाम आचार्य जी, मुझे भगवान त्रिनेत्र महाकाल के पावन यज्ञ एवं तांत्रिक बाधा/ग्रह दोष निवारण परामर्श हेतु जानकारी चाहिए।'
          : 'Pranam Acharya Ji, I would like to consult regarding Bhagwan Trinetra Mahakal Vedic Yagya and spiritual relief.'
      );
      window.open(`https://wa.me/${SITE_CONFIG.contact.whatsappSeva.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    } else if (action === 'helpline') {
      window.location.href = `tel:${SITE_CONFIG.contact.acharyaHelpline}`;
    }
  };

  const navLinks = [
    { action: 'shila', en: 'Sacred Shila Seva', hi: 'शिला दान सेवा' },
    { action: 'yagya', en: 'Vedic Yagya & Tantrik Relief', hi: 'तांत्रिक बाधा निवारण' },
    { action: 'ngo', en: 'Anna Daan Mahaprasad', hi: 'अन्न क्षेत्र भंडारा' },
    { action: 'helpline', en: 'Acharya Helpline', hi: 'आचार्य संपर्क' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0D0F12]/95 backdrop-blur-md border-b border-[#D4AF37]/25 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand & Sacred Emblem */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Sacred Trishul & Third Eye Insignia */}
            <div className="relative w-11 h-11 rounded-full bg-[#161A22] border-2 border-[#D4AF37]/70 flex items-center justify-center shadow-xs group-hover:border-[#D4AF37] transition-all">
              <div className="absolute w-3 h-5 rounded-full bg-[#C83A22] opacity-80 blur-[1px]"></div>
              <div className="relative w-1.5 h-3 rounded-full bg-[#F4F1EA] shadow-xs"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#D4AF37] opacity-70"></div>
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
              <button
                key={link.action}
                onClick={() => handleNavAction(link.action)}
                className="text-xs font-medium text-[#A39E93] hover:text-[#D4AF37] transition-colors tracking-wide py-1 border-b-2 border-transparent hover:border-[#D4AF37] cursor-pointer"
              >
                {language === 'hi' ? link.hi : link.en}
              </button>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenDonateModal('shila')}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C83A22] to-[#9E2010] hover:from-[#D43F24] hover:to-[#B32412] text-[#F4F1EA] font-bold text-xs uppercase tracking-wider border border-[#D4AF37]/50 shadow-md hover:shadow-[#C83A22]/20 transition-all active:scale-[0.98]"
            >
              {language === 'hi' ? 'शिला दान / सेवा करें' : 'Sponsor Shila / Seva'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#A39E93] hover:text-[#F4F1EA] hover:bg-[#161A22] border border-[#D4AF37]/30"
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
            <button
              key={link.action}
              onClick={() => handleNavAction(link.action)}
              className="block w-full text-left py-2.5 text-sm font-medium text-[#F4F1EA] hover:text-[#D4AF37] border-b border-white/5"
            >
              {language === 'hi' ? link.hi : link.en}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${SITE_CONFIG.contact.acharyaHelpline}`}
              className="text-xs text-[#D4AF37] flex items-center gap-2 py-1"
            >
              <span>📞 {language === 'hi' ? 'आचार्य हेल्पलाइन:' : 'Acharya Helpline:'}</span>
              <strong className="text-white">{SITE_CONFIG.contact.acharyaHelpline}</strong>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
