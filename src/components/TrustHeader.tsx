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
    <div className="bg-[#0B1B3D] border-b border-[#D4AF37]/30 text-[#E0E6ED] text-xs py-1.5 px-2.5 sm:px-6 relative z-50 shadow-xs">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-1 sm:gap-2">
        {/* Left: Sovereign Trust & Official NGO Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Tiranga Micro-Flag Bar */}
          <div className="flex h-3.5 w-5 rounded overflow-hidden shadow-xs border border-white/30 shrink-0">
            <span className="w-1.5 bg-[#FF9933]"></span>
            <span className="w-2 bg-[#FFFFFF] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#000080]"></span>
            </span>
            <span className="w-1.5 bg-[#138808]"></span>
          </div>

          <div className="flex items-center gap-1.5 font-medium text-xs">
            <span className="text-[#E2C365] font-semibold hidden sm:inline">
              {language === 'hi' ? 'पंजीकृत ट्रस्ट:' : 'Regd. Trust:'}
            </span>
            <span className="text-white font-mono text-[11px] sm:text-xs tracking-tight sm:tracking-normal font-semibold">
              {SITE_CONFIG.trust.registrationNo}
            </span>
            <span className="text-white/30 hidden lg:inline">|</span>
            <span className="text-[#E0E6ED] hidden lg:inline">
              <span className="text-[#E2C365] font-semibold">Darpan ID:</span> {SITE_CONFIG.trust.nitiAayogDarpanId}
            </span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span className="text-[#4ADE80] hidden md:inline font-bold">
              {language === 'hi' ? '८०जी एवं १२ए कर छूट मान्य' : '80G & 12A Tax Exempt'}
            </span>
          </div>
        </div>

        {/* Right: GIGW 3.0 Accessibility Controls */}
        <div className="flex items-center gap-1 sm:gap-2.5 ml-auto shrink-0">
          {/* Skip to Main Content (Screen Reader) */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-4 focus:z-50 focus:bg-[#C83A22] focus:text-white focus:px-3 focus:py-1 focus:rounded focus:ring-2 focus:ring-[#D4AF37]"
          >
            {language === 'hi' ? 'मुख्य सामग्री पर जाएं' : 'Skip to main content'}
          </a>

          {/* Font Resizing Controls (A- | A | A+) */}
          <div className="flex items-center bg-[#07132B] border border-white/20 rounded px-0.5 sm:px-1 py-0.5" role="group" aria-label="Text Size Controls">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-1 sm:px-1.5 py-0.5 rounded text-[11px] sm:text-xs transition-colors ${fontSize === 'sm' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#A3B3C2] hover:text-white'}`}
              title="Decrease Font Size"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={`px-1 sm:px-1.5 py-0.5 rounded text-[11px] sm:text-xs transition-colors ${fontSize === 'md' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#A3B3C2] hover:text-white'}`}
              title="Standard Font Size"
              aria-label="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-1 sm:px-1.5 py-0.5 rounded text-[11px] sm:text-xs transition-colors ${fontSize === 'lg' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#A3B3C2] hover:text-white'}`}
              title="Increase Font Size"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Accessibility Mode */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`px-1.5 sm:px-2 py-0.5 rounded border text-[11px] sm:text-xs font-medium transition-all ${
              isHighContrast
                ? 'bg-yellow-400 text-black border-yellow-300 font-bold'
                : 'border-white/20 text-[#A3B3C2] hover:border-[#D4AF37] hover:text-white'
            }`}
            title="Toggle High Contrast Mode"
            aria-pressed={isHighContrast}
          >
            {isHighContrast ? 'Standard' : 'Contrast'}
          </button>

          {/* Bilingual English / Devanagari Switcher */}
          <div className="flex items-center bg-[#07132B] border border-white/20 rounded overflow-hidden">
            <button
              onClick={() => onLanguageToggle('hi')}
              className={`px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold transition-colors ${
                language === 'hi' ? 'bg-[#C83A22] text-white font-bold' : 'text-[#A3B3C2] hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageToggle('en')}
              className={`px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold transition-colors ${
                language === 'en' ? 'bg-[#C83A22] text-white font-bold' : 'text-[#A3B3C2] hover:text-white'
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
