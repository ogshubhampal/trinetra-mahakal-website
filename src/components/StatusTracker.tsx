'use client';

import React, { useState } from 'react';

interface StatusTrackerProps {
  language: 'en' | 'hi';
}

export function StatusTracker({ language }: StatusTrackerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 500);
  };

  return (
    <section id="track" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0F12] border-b border-[#D4AF37]/25">
      <div className="max-w-4xl mx-auto">
        {/* Header without redundant pill */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1EA] tracking-tight mb-2">
            {language === 'hi' ? 'अपनी दान रसीद एवं शिला संकल्प की स्थिति जानें' : 'Track Your Donation & Sankalpa Status'}
          </h2>
          <p className="text-xs sm:text-sm text-[#A39E93]">
            {language === 'hi'
              ? 'अपना १२-अंकीय बैंक UTR संदर्भ अथवा पंजीकृत मोबाइल नंबर दर्ज कर सत्यापन देखें।'
              : 'Enter your 12-digit bank UTR reference or registered mobile number to verify consecration and re-download 80G certificate.'}
          </p>
        </div>

        {/* GovTech-Style Search Box */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
          <input
            type="text"
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? '१२-अंकीय UTR नंबर अथवा मोबाइल नंबर दर्ज करें...'
                : 'Enter 12-digit UTR No. (e.g. 423981298412)...'
            }
            className="flex-1 px-4 py-3 rounded-lg bg-[#161A22] border border-white/20 text-sm text-white font-mono placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-lg bg-[#046A38] hover:bg-[#03582E] text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 shrink-0 shadow-md active:scale-[0.98]"
          >
            {isLoading ? 'Checking...' : language === 'hi' ? 'स्थिति जांचें' : 'Check Status'}
          </button>
        </form>

        {/* Verification Result Card */}
        {hasSearched && (
          <div className="bg-stone-surface rounded-2xl border border-[#34A853]/60 p-6 sm:p-7 shadow-2xl animate-fadeIn">
            <div className="flex flex-wrap justify-between items-center border-b border-white/10 pb-4 mb-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#34A853] animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#34A853]">
                  ✓ {language === 'hi' ? 'सत्यापित एवं संकल्पित' : 'Verified & Consecrated'}
                </span>
              </div>
              <span className="text-xs font-mono text-[#D4AF37]">
                Receipt No: TM-80G-{Math.abs(searchQuery.split('').reduce((a, b) => a + b.charCodeAt(0), 100000))}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-6">
              <div>
                <span className="text-[#A39E93] block mb-0.5">Devotee Name:</span>
                <span className="font-bold text-[#F4F1EA] text-sm">Shri R. K. Sharma</span>
              </div>
              <div>
                <span className="text-[#A39E93] block mb-0.5">Seva Inscribed:</span>
                <span className="font-semibold text-[#D4AF37]">1 Sacred Shila (Foundation)</span>
              </div>
              <div>
                <span className="text-[#A39E93] block mb-0.5">Amount & Tax Status:</span>
                <span className="font-bold text-[#34A853]">₹1,100 (80G Issued)</span>
              </div>
              <div>
                <span className="text-[#A39E93] block mb-0.5">Acharya Sankalpa:</span>
                <span className="font-semibold text-[#F4F1EA]">Completed by Vedic Acharyas</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
              <span className="text-[#A39E93]">
                Consecration Certificate and sacred Bhasma Prasad dispatched via India Post.
              </span>
              <button
                onClick={() => alert('Certificate downloaded with official Trust & 80G seal!')}
                className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#C29D29] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                📥 Download Consecration Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
