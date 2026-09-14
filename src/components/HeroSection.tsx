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
    <section className="relative flex-1 min-h-[calc(100dvh-100px)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-2 sm:py-4 overflow-hidden bg-sanctum-gradient">
      {/* Background Sacred Agni Atmosphere & Subtle Sparks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C83A22]/12 rounded-full blur-[130px] animate-agni"></div>
        <div className="absolute top-10 right-10 w-[280px] h-[280px] bg-[#D4AF37]/8 rounded-full blur-[90px]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Sacred Visual Centerpiece: Consecrated Trinetra Mahakal Trishul & Third Eye */}
        <div className="relative mb-2 group cursor-pointer" onClick={() => onOpenDonateModal('shila')}>
          {/* Outer Radiant Brass Ring */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#12151D] border-2 border-[#D4AF37]/70 flex items-center justify-center shadow-lg relative glow-gold group-hover:border-[#D4AF37] transition-all">
            {/* Pulsating Fire Glow */}
            <div className="absolute inset-1.5 rounded-full bg-gradient-to-t from-[#C83A22]/40 via-[#E65C00]/20 to-transparent blur-xs"></div>

            {/* Sacred Trishul & Trinetra SVG Vector */}
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 text-[#D4AF37] relative z-10"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              {/* Central Trishul Prong */}
              <path d="M50 12 L50 88" strokeLinecap="round" />
              <polygon points="50,6 45,18 55,18" fill="#D4AF37" stroke="none" />
              
              {/* Left & Right Crescent Prongs */}
              <path d="M30 22 C30 45 42 55 50 60 C58 55 70 45 70 22" strokeLinecap="round" />
              <polygon points="30,16 26,26 34,26" fill="#D4AF37" stroke="none" />
              <polygon points="70,16 66,26 74,26" fill="#D4AF37" stroke="none" />

              {/* Damru Motif at Base */}
              <polygon points="43,62 57,62 43,72 57,72" fill="#D4AF37" opacity="0.8" />

              {/* Radiant Third Eye (Trinetra) */}
              <ellipse cx="50" cy="38" rx="6" ry="10" fill="#C83A22" stroke="#D4AF37" strokeWidth="1.5" />
              <ellipse cx="50" cy="38" rx="2" ry="5" fill="#F4F1EA" stroke="none" />
            </svg>

            {/* Micro Badge for Active Consecration */}
            <span className="absolute -bottom-2 px-1.5 py-0.2 rounded-full bg-[#C83A22] text-white text-[8px] font-bold uppercase tracking-wider border border-[#D4AF37]/60 shadow-xs">
              नीव प्रतिष्ठा
            </span>
          </div>
        </div>

        {/* Sacred Sanskrit Shloka Header */}
        <div className="mb-1.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-serif text-[#D4AF37] tracking-widest uppercase">
            <span>✧</span>
            <span>ॐ हौं जूँ सः भूर्भुवः स्वः त्र्यम्बकं यजामहे</span>
            <span>✧</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#A39E93] italic tracking-wider mt-0.5">
            {language === 'hi'
              ? 'समस्त भय, तंत्र बाधा एवं काल दोष निवारक — भगवान त्रिनेत्र महाकाल'
              : 'The Supreme Three-Eyed Transcendent — Dissolver of Fear, Occult Bonds & Negativity'}
          </p>
        </div>

        {/* Grand Sanctum Display Headline */}
        <h1 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F4F1EA] tracking-tight leading-[1.15] mb-2 max-w-2xl">
          {language === 'hi' ? (
            <>
              श्री त्रिनेत्र महाकाल मंदिर निर्माण में{' '}
              <span className="text-[#D4AF37] underline decoration-[#C83A22]/70 decoration-2 underline-offset-4">
                अपनी आधार शिला
              </span>{' '}
              समर्पित करें
            </>
          ) : (
            <>
              Consecrate Your Sacred Shila in the Sanctuary of{' '}
              <span className="text-[#D4AF37] underline decoration-[#C83A22]/70 decoration-2 underline-offset-4">
                Bhagwan Trinetra Mahakal
              </span>
            </>
          )}
        </h1>

        {/* Narrative Subtext */}
        <p className="text-[11px] sm:text-xs md:text-sm text-[#A39E93] max-w-xl mx-auto leading-relaxed mb-3">
          {language === 'hi'
            ? 'पवित्र नीव स्थापित हो चुकी है। अब त्रिनेत्र महाकाल के भव्य गर्भगृह, वैदिक यज्ञशाला एवं नित्य अन्न क्षेत्र (भंडारे) के निर्माण में अपना पवित्र योगदान दें। धारा ८०जी के अंतर्गत शत-प्रतिशत कर छूट।'
            : 'The sacred foundation stone is consecrated. Join thousands of devotees in constructing the sanctum sanctorum, nine-fire Vedic Yagyashala, and daily sadhu bhandara. Verified 80G tax benefits with instant digital receipts.'}
        </p>

        {/* Primary Action Button Matrix */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto mb-3">
          <button
            onClick={() => onOpenDonateModal('shila')}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-[#C83A22] via-[#B32412] to-[#8E1C0E] hover:from-[#D63E26] hover:to-[#9E2010] text-[#F4F1EA] font-bold text-xs uppercase tracking-wider border border-[#D4AF37]/60 shadow-lg hover:shadow-[#C83A22]/30 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <span>🪨</span>
            <span>{language === 'hi' ? 'शिला दान / निर्माण सहयोग' : 'Sponsor 1 Sacred Shila (₹1,100)'}</span>
          </button>

          <button
            onClick={onOpenYagyaModal}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#161A22] hover:bg-[#1E232E] text-[#D4AF37] hover:text-white font-semibold text-xs tracking-wider uppercase border border-[#D4AF37]/40 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
          >
            <span>🔥</span>
            <span>{language === 'hi' ? 'तांत्रिक बाधा परामर्श लें' : 'Consult Acharya for Yagya'}</span>
          </button>

          {/* Ambient Chant Audio Toggle with Active Animation */}
          <button
            onClick={toggleSacredAudio}
            className={`p-2 rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
              isPlayingAudio
                ? 'bg-[#C83A22] text-white border-[#D4AF37] ring-2 ring-[#D4AF37]/40'
                : 'bg-[#161A22] text-[#A39E93] hover:text-[#D4AF37] border-[#D4AF37]/30'
            }`}
            title={isPlayingAudio ? 'Mute Sacred Tone' : 'Play Sacred 108Hz Tone'}
            aria-label="Toggle Sacred Sound Ambiance"
          >
            <span>{isPlayingAudio ? '🔊' : '🔈'}</span>
            <span className="text-[10px] font-semibold">{isPlayingAudio ? '108Hz Active' : 'Chant Sound'}</span>
          </button>
        </div>

        {/* Transparent Construction Meter & Live Civic Counters */}
        <div className="w-full max-w-xl bg-stone-surface border border-[#D4AF37]/30 rounded-xl p-3 sm:p-3.5 backdrop-blur-sm shadow-xl">
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1">
            <span className="text-[#A39E93]">
              {language === 'hi' ? 'गर्भगृह निर्माण निधि संचयन:' : 'Garbhagriha Nirman Phase Progress:'}
            </span>
            <span className="text-[#D4AF37] font-mono">
              ₹{(SITE_CONFIG.construction.collectedAmount / 100000).toFixed(1)}L / ₹
              {(SITE_CONFIG.construction.targetAmount / 100000).toFixed(0)}L ({percent}%)
            </span>
          </div>

          {/* Progress Bar with Sacred Agni Glow */}
          <div className="w-full h-2 bg-[#0D0F12] rounded-full overflow-hidden border border-white/10 p-0.5 mb-2">
            <div
              className="h-full bg-gradient-to-r from-[#C83A22] via-[#E65C00] to-[#D4AF37] rounded-full transition-all duration-1000 shadow-sm"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          {/* Three Live Transparency Pillars */}
          <div className="grid grid-cols-3 gap-2 pt-1.5 border-t border-white/10 text-center sm:text-left">
            <div>
              <div className="text-sm sm:text-base font-bold font-serif text-[#F4F1EA]">
                {SITE_CONFIG.construction.shilasPledged.toLocaleString()}+
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#A39E93]">
                {language === 'hi' ? 'शिलाएं समर्पित' : 'Shilas Consecrated'}
              </div>
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold font-serif text-[#D4AF37]">
                {SITE_CONFIG.construction.mealsServed.toLocaleString()}+
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#A39E93]">
                {language === 'hi' ? 'भंडारा महाप्रसाद' : 'Meals Distributed'}
              </div>
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold font-serif text-[#34A853]">100%</div>
              <div className="text-[9px] sm:text-[10px] text-[#A39E93]">
                {language === 'hi' ? '८०जी कर छूट' : '80G Tax Exempt'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
