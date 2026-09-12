'use client';

import React from 'react';
import { SITE_CONFIG } from '@/config/site';

interface ConstructionRoadmapProps {
  language: 'en' | 'hi';
  onOpenDonateModal: (sevaId?: string) => void;
}

export function ConstructionRoadmap({ language, onOpenDonateModal }: ConstructionRoadmapProps) {
  return (
    <section id="nirman" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0F12] border-b border-[#D4AF37]/25 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Title without repetitive pill */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1EA] tracking-tight mb-3">
            {language === 'hi'
              ? 'मंदिर निर्माण की चार पावन अवस्थाएं'
              : 'Four Sacred Phases of Mandir Construction'}
          </h2>
          <p className="text-sm sm:text-base text-[#A39E93] leading-relaxed">
            {language === 'hi'
              ? 'प्रत्येक दानदाता का एक-एक रुपया पूर्ण पारदर्शिता के साथ गर्भगृह एवं यज्ञशाला के पत्थरों में रूपायित हो रहा है।'
              : 'Every rupee is consecrated with complete sovereign transparency from foundation laying to the final Swarna Kalash.'}
          </p>
        </div>

        {/* Connected Sacred Stepper / Pathway Architecture */}
        <div className="relative mb-12">
          {/* Connecting Brass Conduit Line on Desktop */}
          <div className="hidden lg:block absolute top-12 left-8 right-8 h-1 bg-gradient-to-r from-[#046A38] via-[#D4AF37] to-white/10 z-0 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {SITE_CONFIG.construction.phases.map((phase) => {
              const isCompleted = phase.status === 'completed';
              const isInProgress = phase.status === 'in_progress';

              return (
                <div
                  key={phase.phaseNumber}
                  className={`rounded-xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                    isInProgress
                      ? 'bg-gradient-to-b from-[#1E2433] to-[#121620] border-[#D4AF37] shadow-xl shadow-[#C83A22]/15 ring-2 ring-[#D4AF37]/40 -translate-y-1'
                      : isCompleted
                      ? 'bg-stone-card border-[#046A38]/60 shadow-md'
                      : 'bg-[#101217] border-white/10 opacity-75'
                  }`}
                >
                  <div>
                    {/* Stepper Node & Status */}
                    <div className="flex justify-between items-center mb-4">
                      {/* Step Indicator Node */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-md ${
                          isCompleted
                            ? 'bg-[#046A38] text-white border-2 border-[#34A853]'
                            : isInProgress
                            ? 'bg-[#C83A22] text-white border-2 border-[#D4AF37] animate-pulse'
                            : 'bg-[#161A22] text-[#A39E93] border border-white/20'
                        }`}
                      >
                        {isCompleted ? '✓' : `0${phase.phaseNumber}`}
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-[#046A38]/20 text-[#34A853] border border-[#046A38]/50'
                            : isInProgress
                            ? 'bg-[#C83A22]/20 text-[#E65C00] border border-[#E65C00]/50'
                            : 'bg-white/5 text-[#A39E93] border border-white/10'
                        }`}
                      >
                        {isCompleted ? 'Completed' : isInProgress ? 'Active Construction' : 'Upcoming'}
                      </span>
                    </div>

                    {/* Phase Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#F4F1EA] font-serif mb-1.5 leading-snug">
                      {language === 'hi' ? phase.hindiName : phase.name}
                    </h3>

                    <div className="text-xs font-semibold text-[#D4AF37] mb-3">{phase.completionDate}</div>

                    <p className="text-xs text-[#A39E93] leading-relaxed mb-6">{phase.description}</p>
                  </div>

                  {/* Progress Meter & Action */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-[#A39E93] mb-1.5">
                      <span>{language === 'hi' ? 'कार्य प्रगति:' : 'Completion:'}</span>
                      <span className={isInProgress ? 'text-[#D4AF37] font-bold' : isCompleted ? 'text-[#34A853]' : ''}>
                        {phase.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0D0F12] rounded-full overflow-hidden mb-4 border border-white/5">
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
                        className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#C83A22] to-[#9E2010] hover:from-[#D43F24] hover:to-[#B32412] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                      >
                        {language === 'hi' ? 'गर्भगृह निर्माण में सहयोग करें' : 'Support Phase 3 (Sanctum)'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Ground Documentation Callout with Realistic Photo Slots */}
        <div className="p-6 rounded-xl bg-stone-surface border border-[#D4AF37]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#0D0F12] border border-[#D4AF37]/50 flex items-center justify-center text-2xl shadow-inner shrink-0">
              📸
            </div>
            <div>
              <h4 className="text-base font-bold text-[#F4F1EA] font-serif">
                {language === 'hi'
                  ? 'भूमि पूजन एवं नीव स्थापना के वास्तविक छायाचित्र एवं प्रमाण'
                  : 'Official Bhumi Pujan & Neev Consecration Photo Archive'}
              </h4>
              <p className="text-xs text-[#A39E93] mt-0.5">
                {language === 'hi'
                  ? 'मंदिर निर्माण के आधिकारिक वीडियो एवं १००+ वैदिक आचार्यों द्वारा संपन्न अनुष्ठान का प्रत्यक्ष विवरण।'
                  : 'Documentary verification photos of the 12-foot foundation excavation and Navratna Shila sthapana.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenDonateModal('shila')}
            className="shrink-0 px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#C29D29] text-black font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98]"
          >
            {language === 'hi' ? 'आधार शिला संकल्प लें (₹1,100)' : 'Pledge Sacred Shila (₹1,100)'}
          </button>
        </div>
      </div>
    </section>
  );
}
