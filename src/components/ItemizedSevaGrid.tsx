'use client';

import React from 'react';
import { SITE_CONFIG } from '@/config/site';

interface ItemizedSevaGridProps {
  language: 'en' | 'hi';
  onSelectSeva: (sevaId: string) => void;
}

export function ItemizedSevaGrid({ language, onSelectSeva }: ItemizedSevaGridProps) {
  const shila = SITE_CONFIG.itemizedSeva.find((s) => s.id === 'shila')!;
  const otherSevas = SITE_CONFIG.itemizedSeva.filter((s) => s.id !== 'shila');

  return (
    <section id="shila-seva" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#10131A] border-b border-[#D4AF37]/25">
      <div className="max-w-6xl mx-auto">
        {/* Header without repetitive pill */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1EA] tracking-tight mb-3">
            {language === 'hi'
              ? 'मंदिर निर्माण में अपनी प्रत्यक्ष इकाई चुनें'
              : 'Choose Your Tangible Unit of Temple Seva'}
          </h2>
          <p className="text-sm sm:text-base text-[#A39E93] leading-relaxed">
            {language === 'hi'
              ? 'अस्पष्ट दान की जगह अपने हाथों से १ शिला, १ बोरी सीमेंट अथवा गर्भगृह के १ वर्ग फीट तल का प्रायोजन करें। प्रत्येक इकाई की रसीद एवं ८०जी प्रमाणपत्र प्राप्त करें।'
              : 'Instead of opaque donation pools, sponsor concrete physical units: 1 Foundation Shila, 1 Bag Cement, or 1 Sq. Ft. of Sanctum floor with instant 80G tax receipt.'}
          </p>
        </div>

        {/* Asymmetric Bento Layout: Hero Shila Card (2 cols) + 3 Secondary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Featured Hero Bento Tile: 1 Sacred Foundation Shila (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1E2433] via-[#161B26] to-[#10131B] rounded-2xl border-2 border-[#D4AF37] p-7 sm:p-9 shadow-2xl relative flex flex-col justify-between group">
            {/* Top Badge & 80G Pill */}
            <div>
              <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C83A22] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                  <span>⭐</span>
                  <span>{language === 'hi' ? 'सर्वाधिक पुण्यमय सेवा' : 'Most Revered Seva'}</span>
                </div>
                <span className="text-xs text-[#34A853] font-bold bg-[#046A38]/20 px-3 py-1 rounded-full border border-[#046A38]/40">
                  ✓ 100% 80G Tax Exempt
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start mb-6">
                <div className="sm:col-span-7">
                  <div className="text-4xl sm:text-5xl font-serif font-bold text-[#D4AF37] mb-2">
                    ₹{shila.amount.toLocaleString()}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#F4F1EA] mb-3">
                    {language === 'hi' ? shila.hindiTitle : shila.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mb-4">
                    {shila.description}
                  </p>
                </div>

                {/* Visual Gotra Inscription Preview Mockup */}
                <div className="sm:col-span-5 bg-[#0D0F12] border border-[#D4AF37]/40 rounded-xl p-4 text-center shadow-inner relative overflow-hidden">
                  <div className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                    शिला पर अंकित विवरण
                  </div>
                  <div className="font-serif text-sm font-bold text-[#F4F1EA] mb-1">
                    {language === 'hi' ? 'श्री त्रिनेत्र महाकाल आधार शिला' : 'Shri Trinetra Mahakal Shila'}
                  </div>
                  <div className="text-xs text-[#A39E93] italic mb-2">
                    {language === 'hi' ? 'गोत्र: [यजमान का गोत्र] | संकल्पित' : 'Gotra: [Devotee Gotra] | Consecrated'}
                  </div>
                  <div className="text-[10px] text-[#34A853] font-semibold bg-[#046A38]/20 py-0.5 rounded">
                    सदा-सर्वदा के लिए गर्भगृह में स्थापित
                  </div>
                </div>
              </div>
            </div>

            {/* Deliverable Bar & CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#D4AF37] flex items-center gap-2">
                <span>📦</span>
                <span>{shila.deliverable}</span>
              </div>
              <button
                onClick={() => onSelectSeva(shila.id)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#C83A22] to-[#9E2010] hover:from-[#D43F24] hover:to-[#B32412] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-[0.98] shrink-0"
              >
                {language === 'hi' ? '१ आधार शिला दान करें (₹1,100)' : 'Sponsor 1 Shila (₹1,100)'}
              </button>
            </div>
          </div>

          {/* Right Column Stack of 3 Secondary Seva Cards (1 col) */}
          <div className="space-y-4 flex flex-col justify-between">
            {otherSevas.map((item) => (
              <div
                key={item.id}
                className="bg-stone-card rounded-xl border border-[#D4AF37]/30 p-5 hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#161A22] text-[#D4AF37] border border-[#D4AF37]/30 mr-2">
                      {item.badge}
                    </span>
                    <span className="text-base font-serif font-bold text-[#F4F1EA]">
                      {language === 'hi' ? item.hindiTitle : item.title}
                    </span>
                  </div>
                  <span className="text-lg font-bold font-serif text-[#D4AF37]">
                    ₹{item.amount.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-[#A39E93] leading-relaxed mb-3">{item.description}</p>
                <button
                  onClick={() => onSelectSeva(item.id)}
                  className="w-full py-2 rounded bg-[#161A22] hover:bg-[#C83A22] text-[#D4AF37] hover:text-white border border-[#D4AF37]/40 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  {language === 'hi' ? `₹${item.amount.toLocaleString()} सेवा संकल्प` : `Sponsor (₹${item.amount.toLocaleString()})`}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Devotion Callout */}
        <div className="rounded-xl p-6 bg-[#13161F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-[#F4F1EA] mb-1">
              {language === 'hi' ? 'स्वेच्छा अनुसार कोई भी राशि समर्पित करें' : 'Contribute Any Custom Devotion Amount'}
            </h4>
            <p className="text-xs text-[#A39E93]">
              {language === 'hi'
                ? 'श्रद्धा अनुसार कोई भी राशि सीधे मंदिर निर्माण ट्रस्ट के खाते में समर्पित कर सकते हैं।'
                : 'Every rupee of shraddha directly supports the stone carvers and construction material.'}
            </p>
          </div>
          <button
            onClick={() => onSelectSeva('custom')}
            className="px-6 py-2.5 rounded-lg bg-[#161A22] hover:bg-[#1E2433] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider transition-all shrink-0"
          >
            {language === 'hi' ? 'अन्य राशि समर्पित करें' : 'Custom Devotion'}
          </button>
        </div>
      </div>
    </section>
  );
}
