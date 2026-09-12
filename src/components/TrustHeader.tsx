'use client';

import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/config/site';

interface TrustHeaderProps {
  language: 'en' | 'hi';
  onLanguageToggle: (lang: 'en' | 'hi') => void;
}

export function TrustHeader({ language, onLanguageToggle }: TrustHeaderProps) {
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg');
    root.classList.add(`font-scale-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (isHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  return (
    <div className="bg-[#0B0D11] border-b border-[#D4AF37]/20 text-[#A39E93] text-xs py-1.5 px-3 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        {/* Left: Sovereign Trust & Official NGO Badge */}
        <div className="flex items-center gap-2">
          {/* Tiranga Micro-Flag Bar */}
          <div className="flex h-3 w-4.5 rounded overflow-hidden shadow-xs border border-white/20">
            <span className="w-1.5 bg-[#FF9933]"></span>
            <span className="w-1.5 bg-[#FFFFFF] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#000080]"></span>
            </span>
            <span className="w-1.5 bg-[#138808]"></span>
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-[#D4AF37] hidden sm:inline">
              {language === 'hi' ? 'पंजीकृत ट्रस्ट:' : 'Trust Reg:'}
            </span>
            <span className="text-[#F4F1EA] truncate max-w-[160px] sm:max-w-none">
              {SITE_CONFIG.trust.registrationNo}
            </span>
            <span className="text-[#D4AF37]/50 hidden lg:inline">|</span>
            <span className="text-[#A39E93] hidden lg:inline">
              <span className="text-[#D4AF37]">Darpan ID:</span> {SITE_CONFIG.trust.nitiAayogDarpanId}
            </span>
            <span className="text-[#D4AF37]/50 hidden md:inline">|</span>
            <span className="text-[#34A853] hidden md:inline font-semibold">
              {language === 'hi' ? '८०जी एवं १२ए कर छूट मान्य' : '80G & 12A Tax Exempt'}
            </span>
          </div>
        </div>

        {/* Right: GIGW 3.0 Accessibility Controls */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Skip to Main Content (Screen Reader) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-4 focus:z-50 focus:bg-[#C83A22] focus:text-white focus:px-3 focus:py-1 focus:rounded focus:ring-2 focus:ring-[#D4AF37]"
          >
            {language === 'hi' ? 'मुख्य सामग्री पर जाएं' : 'Skip to main content'}
          </a>

          {/* Font Resizing Controls (A- | A | A+) */}
          <div className="flex items-center bg-[#161A22] border border-[#D4AF37]/25 rounded px-1 py-0.5" role="group" aria-label="Text Size Controls">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${fontSize === 'sm' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#A39E93] hover:text-white'}`}
              title="Decrease Font Size"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${fontSize === 'md' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#A39E93] hover:text-white'}`}
              title="Standard Font Size"
              aria-label="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${fontSize === 'lg' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#A39E93] hover:text-white'}`}
              title="Increase Font Size"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Accessibility Mode */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`px-2 py-0.5 rounded border text-[11px] font-medium transition-all ${
              isHighContrast
                ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                : 'border-[#D4AF37]/30 text-[#A39E93] hover:border-[#D4AF37] hover:text-[#F4F1EA]'
            }`}
            title="Toggle High Contrast Mode"
            aria-pressed={isHighContrast}
          >
            {isHighContrast ? 'Standard' : 'Contrast'}
          </button>

          {/* Bilingual English / Devanagari Switcher */}
          <div className="flex items-center bg-[#161A22] border border-[#D4AF37]/30 rounded overflow-hidden">
            <button
              onClick={() => onLanguageToggle('hi')}
              className={`px-2 py-0.5 text-xs transition-colors ${
                language === 'hi' ? 'bg-[#C83A22] text-white font-bold' : 'text-[#A39E93] hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageToggle('en')}
              className={`px-2 py-0.5 text-xs transition-colors ${
                language === 'en' ? 'bg-[#C83A22] text-white font-bold' : 'text-[#A39E93] hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
