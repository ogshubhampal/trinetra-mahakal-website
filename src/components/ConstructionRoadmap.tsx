'use client';

import React from 'react';
import { SITE_CONFIG } from '@/config/site';

interface ConstructionRoadmapProps {
  language: 'en' | 'hi';
  onOpenDonateModal: (sevaId?: string) => void;
}

export function ConstructionRoadmap({ language, onOpenDonateModal }: ConstructionRoadmapProps) {
  return (
    <section id="nirman" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0F12] border-b border-[#D4AF37]/20 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title & Context */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A22] border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">
            <span>🏛️</span>
            <span>{language === 'hi' ? 'नीव से शिखर तक' : 'Neev to Shikhar Roadmap'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1EA] tracking-tight mb-4">
            {language === 'hi'
              ? 'मंदिर निर्माण की चार पावन अवस्थाएं'
              : 'Four Sacred Phases of Mandir Construction'}
          </h2>
          <p className="text-sm sm:text-base text-[#A39E93] leading-relaxed">
            {language === 'hi'
              ? 'प्रत्येक दानदाता का एक-एक रुपया पूर्ण पारदर्शिता के साथ गर्भगृह एवं यज्ञशाला के पत्थरों में रूपायित हो रहा है। भूमि पूजन एवं नीव पूर्ण हो चुकी है।'
              : 'Every rupee is accounted for with complete sovereign transparency. Following the consecration of Bhumi Pujan and Neev, we are now erecting the sacred Garbhagriha walls.'}
          </p>
        </div>

        {/* 4-Phase Grid Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {SITE_CONFIG.construction.phases.map((phase) => {
            const isCompleted = phase.status === 'completed';
            const isInProgress = phase.status === 'in_progress';

            return (
              <div
                key={phase.phaseNumber}
                className={`relative rounded-xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                  isInProgress
                    ? 'bg-[#181C26] border-[#D4AF37] shadow-lg shadow-[#C83A22]/10 ring-1 ring-[#D4AF37]/50'
                    : isCompleted
                    ? 'bg-[#13161D] border-[#046A38]/50'
                    : 'bg-[#101217] border-white/10 opacity-75'
                }`}
              >
                <div>
                  {/* Top Status Header */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                      Phase 0{phase.phaseNumber}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        isCompleted
                          ? 'bg-[#046A38]/20 text-[#34A853] border border-[#046A38]/40'
                          : isInProgress
                          ? 'bg-[#C83A22]/20 text-[#E65C00] border border-[#E65C00]/40 animate-pulse'
                          : 'bg-white/5 text-[#A39E93] border border-white/10'
                      }`}
                    >
                      {isCompleted ? '✓ Completed' : isInProgress ? '● Active Construction' : '⏳ Upcoming'}
                    </span>
                  </div>

                  {/* Phase Title */}
                  <h3 className="text-lg font-bold text-[#F4F1EA] font-serif mb-2 leading-snug">
                    {language === 'hi' ? phase.hindiName : phase.name}
                  </h3>

                  <div className="text-xs font-medium text-[#D4AF37] mb-3">{phase.completionDate}</div>

                  <p className="text-xs text-[#A39E93] leading-relaxed mb-6">{phase.description}</p>
                </div>

                {/* Progress Bar & CTA */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-[#A39E93] mb-1.5">
                    <span>{language === 'hi' ? 'प्रगति:' : 'Progress:'}</span>
                    <span className={isInProgress ? 'text-[#D4AF37]' : isCompleted ? 'text-[#34A853]' : ''}>
                      {phase.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0D0F12] rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full ${
                        isCompleted
                          ? 'bg-[#046A38]'
                          : isInProgress
                          ? 'bg-gradient-to-r from-[#C83A22] to-[#D4AF37]'
                          : 'bg-transparent'
                      }`}
                      style={{ width: `${phase.progressPercent}%` }}
                    ></div>
                  </div>

                  {isInProgress && (
                    <button
                      onClick={() => onOpenDonateModal('shila')}
                      className="w-full py-2 px-3 rounded bg-[#C83A22] hover:bg-[#B32412] text-white text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      {language === 'hi' ? 'इस चरण में सहयोग करें' : 'Support Phase 3'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Ground Documentation Callout */}
        <div className="mt-12 p-6 rounded-xl bg-[#161A22] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#0D0F12] border border-[#D4AF37]/40 flex items-center justify-center text-2xl">
              📸
            </div>
            <div>
              <h4 className="text-base font-bold text-[#F4F1EA]">
                {language === 'hi'
                  ? 'भूमि पूजन एवं नीव स्थापना के वास्तविक छायाचित्र'
                  : 'Official Bhumi Pujan & Neev Ground Photo Archive'}
              </h4>
              <p className="text-xs text-[#A39E93]">
                {language === 'hi'
                  ? 'मंदिर निर्माण के आधिकारिक वीडियो एवं वैदिक आचार्यों के संकल्प का प्रत्यक्ष दर्शन।'
                  : 'Authentic documentary photos and video recordings of the consecration ceremony.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenDonateModal('shila')}
            className="shrink-0 px-5 py-2.5 rounded bg-[#D4AF37] hover:bg-[#C29D29] text-black font-bold text-xs uppercase tracking-wider shadow-xs transition-all"
          >
            {language === 'hi' ? 'शिला दान संकल्प लें' : 'Pledge Sacred Shila (₹1,100)'}
          </button>
        </div>
      </div>
    </section>
  );
}
