'use client';

import React from 'react';
import { SITE_CONFIG } from '@/config/site';

interface ItemizedSevaGridProps {
  language: 'en' | 'hi';
  onSelectSeva: (sevaId: string) => void;
}

export function ItemizedSevaGrid({ language, onSelectSeva }: ItemizedSevaGridProps) {
  return (
    <section id="shila-seva" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#10131A] border-b border-[#D4AF37]/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A22] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">
            <span>🪨</span>
            <span>{language === 'hi' ? 'प्रत्यक्ष निर्माण सेवा' : 'Tangible Itemized Seva'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1EA] tracking-tight mb-4">
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

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SITE_CONFIG.itemizedSeva.map((item) => (
            <div
              key={item.id}
              className="bg-[#161A22] rounded-xl border border-[#D4AF37]/30 p-6 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#C83A22]/10 transition-all duration-300 group"
            >
              <div>
                {/* Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C83A22]/20 text-[#D4AF37] border border-[#C83A22]/40">
                    {item.badge}
                  </span>
                  <span className="text-xs text-[#34A853] font-semibold">80G Exempt</span>
                </div>

                {/* Amount */}
                <div className="text-3xl font-serif font-bold text-[#F4F1EA] mb-2 group-hover:text-[#D4AF37] transition-colors">
                  ₹{item.amount.toLocaleString()}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#F4F1EA] mb-3 leading-snug">
                  {language === 'hi' ? item.hindiTitle : item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#A39E93] leading-relaxed mb-6">{item.description}</p>
              </div>

              <div>
                {/* Deliverable Pill */}
                <div className="p-2.5 rounded bg-[#0D0F12] border border-white/5 text-[11px] text-[#D4AF37] mb-5">
                  <span className="font-semibold block mb-0.5">
                    {language === 'hi' ? 'पुण्य फल एवं प्रसादम:' : 'Devotee Prasaad:'}
                  </span>
                  <span className="text-[#A39E93] leading-tight block">{item.deliverable}</span>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onSelectSeva(item.id)}
                  className="w-full py-2.5 px-4 rounded bg-gradient-to-r from-[#C83A22] to-[#9E2010] hover:from-[#D43F24] hover:to-[#B32412] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-all active:scale-[0.98]"
                >
                  {language === 'hi' ? 'यह सेवा संकल्प लें' : `Sponsor for ₹${item.amount.toLocaleString()}`}
                </button>
              </div>
            </div>
          ))}
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
            className="px-6 py-2.5 rounded bg-[#161A22] hover:bg-[#1E2433] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider transition-all"
          >
            {language === 'hi' ? 'अन्य राशि समर्पित करें' : 'Custom Devotion'}
          </button>
        </div>
      </div>
    </section>
  );
}
