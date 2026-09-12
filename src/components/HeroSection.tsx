'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/site';

interface HeroSectionProps {
  language: 'en' | 'hi';
  onOpenDonateModal: (sevaId?: string) => void;
  onOpenYagyaModal: () => void;
}

export function HeroSection({ language, onOpenDonateModal, onOpenYagyaModal }: HeroSectionProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleSacredAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    // Audio synthesizer simulation using Web Audio API for an authentic meditative temple drone
    if (typeof window !== 'undefined') {
      const audioCtx = (window as any)._sanctumAudioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
      (window as any)._sanctumAudioCtx = audioCtx;

      if (!isPlayingAudio) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(108, audioCtx.currentTime); // 108Hz sacred root tone
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        (window as any)._sanctumOsc = osc;
      } else {
        if ((window as any)._sanctumOsc) {
          (window as any)._sanctumOsc.stop();
          (window as any)._sanctumOsc.disconnect();
        }
      }
    }
  };

  const percent = Math.round(
    (SITE_CONFIG.construction.collectedAmount / SITE_CONFIG.construction.targetAmount) * 100
  );

  return (
    <section className="relative min-h-[92dvh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden bg-sanctum-gradient border-b border-[#D4AF37]/20">
      {/* Sacred Subtle Agni & Smoke Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C83A22]/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Milestone Indicator Banner (GovTech Transparency) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161A22] border border-[#D4AF37]/40 shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-[#046A38] animate-pulse"></span>
          <span className="text-xs text-[#F4F1EA] font-medium tracking-wide">
            {language === 'hi'
              ? 'भूमि पूजन एवं नीव (आधार) पूर्ण — गर्भगृह निर्माण जारी'
              : 'Bhumi Pujan & Neev Laid — Garbhagriha Construction Underway'}
          </span>
          <span className="text-[11px] bg-[#C83A22]/20 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold">
            Phase 3
          </span>
        </div>

        {/* Sacred Sanskrit Shloka */}
        <div className="mb-4">
          <p className="text-sm sm:text-base font-serif text-[#D4AF37] tracking-widest uppercase">
            ॐ हौं जूँ सः भूर्भुवः स्वः त्र्यम्बकं यजामहे
          </p>
          <p className="text-xs text-[#A39E93] italic tracking-wider">
            {language === 'hi'
              ? 'समस्त भय, तंत्र बाधा एवं काल दोष निवारक — भगवान त्रिनेत्र महाकाल'
              : 'The Supreme Three-Eyed Transcendent — Dissolver of Fear, Occult Bonds & Negativity'}
          </p>
        </div>

        {/* Grand Sanctum Display Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#F4F1EA] tracking-tight leading-[1.15] mb-6 max-w-4xl">
          {language === 'hi' ? (
            <>
              श्री त्रिनेत्र महाकाल के पावन मंदिर निर्माण में{' '}
              <span className="text-[#D4AF37] underline decoration-[#C83A22]/60 decoration-2 underline-offset-8">
                अपनी आधार शिला
              </span>{' '}
              समर्पित करें
            </>
          ) : (
            <>
              Consecrate Your Sacred Shila in the Holy Sanctuary of{' '}
              <span className="text-[#D4AF37] underline decoration-[#C83A22]/60 decoration-2 underline-offset-8">
                Bhagwan Trinetra Mahakal
              </span>
            </>
          )}
        </h1>

        {/* Narrative Subtext */}
        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl mx-auto leading-relaxed mb-8">
          {language === 'hi'
            ? 'पवित्र नीव स्थापित हो चुकी है। अब त्रिनेत्र महाकाल के भव्य गर्भगृह, वैदिक यज्ञशाला एवं निर्धनों के लिए नित्य अन्न क्षेत्र (भंडारे) के निर्माण में अपना पवित्र योगदान दें। धारा ८०जी के अंतर्गत शत-प्रतिशत कर छूट।'
            : 'The sacred foundation stone is consecrated. Join thousands of devotees in constructing the sanctum sanctorum, nine-fire Vedic Yagyashala, and daily sadhu bhandara. Verified 80G tax benefits with instant digital receipts.'}
        </p>

        {/* Primary Action Button Matrix */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <button
            onClick={() => onOpenDonateModal('shila')}
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-gradient-to-r from-[#C83A22] via-[#B32412] to-[#8E1C0E] hover:from-[#D63E26] hover:to-[#9E2010] text-[#F4F1EA] font-bold text-sm tracking-wider uppercase border border-[#D4AF37]/50 shadow-md hover:shadow-[#C83A22]/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>🪨</span>
            <span>{language === 'hi' ? 'शिला दान / निर्माण सहयोग' : 'Sponsor 1 Sacred Shila (₹1,100)'}</span>
          </button>

          <button
            onClick={onOpenYagyaModal}
            className="w-full sm:w-auto px-6 py-3.5 rounded bg-[#161A22] hover:bg-[#1E232E] text-[#D4AF37] hover:text-white font-semibold text-sm tracking-wider uppercase border border-[#D4AF37]/40 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>🔥</span>
            <span>{language === 'hi' ? 'तांत्रिक बाधा परामर्श लें' : 'Consult Acharya for Yagya'}</span>
          </button>

          {/* Ambient Chant Audio Toggle */}
          <button
            onClick={toggleSacredAudio}
            className={`p-3.5 rounded-full border transition-all ${
              isPlayingAudio
                ? 'bg-[#C83A22] text-white border-[#D4AF37]'
                : 'bg-[#161A22] text-[#A39E93] hover:text-[#D4AF37] border-[#D4AF37]/30'
            }`}
            title={isPlayingAudio ? 'Mute Sacred Tone' : 'Play Sacred 108Hz Tone'}
            aria-label="Toggle Sacred Sound Ambiance"
          >
            {isPlayingAudio ? '🔊' : '🔈'}
          </button>
        </div>

        {/* Transparent Construction Meter & Live Civic Counters */}
        <div className="w-full max-w-3xl bg-[#161A22]/90 border border-[#D4AF37]/25 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-xl">
          <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="text-[#A39E93]">
              {language === 'hi' ? 'गर्भगृह निर्माण निधि संचयन:' : 'Garbhagriha Nirman Phase Progress:'}
            </span>
            <span className="text-[#D4AF37]">
              ₹{(SITE_CONFIG.construction.collectedAmount / 100000).toFixed(1)} Lakhs / ₹
              {(SITE_CONFIG.construction.targetAmount / 100000).toFixed(0)} Lakhs ({percent}%)
            </span>
          </div>

          {/* Progress Bar with Sacred Agni Glow */}
          <div className="w-full h-3 bg-[#0D0F12] rounded-full overflow-hidden border border-white/10 p-0.5 mb-5">
            <div
              className="h-full bg-gradient-to-r from-[#C83A22] via-[#E65C00] to-[#D4AF37] rounded-full transition-all duration-1000"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          {/* Three Live Transparency Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#F4F1EA]">
                {SITE_CONFIG.construction.shilasPledged.toLocaleString()}+
              </div>
              <div className="text-xs text-[#A39E93]">
                {language === 'hi' ? 'पावन शिलाएं समर्पित' : 'Sacred Shilas Consecrated'}
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#D4AF37]">
                {SITE_CONFIG.construction.mealsServed.toLocaleString()}+
              </div>
              <div className="text-xs text-[#A39E93]">
                {language === 'hi' ? 'भंडारा महाप्रसाद वितरित' : 'Bhandara Meals Distributed'}
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#34A853]">100%</div>
              <div className="text-xs text-[#A39E93]">
                {language === 'hi' ? '८०जी आयकर छूट रसीद' : '80G Tax Exemption Receipts'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
