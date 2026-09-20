'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '@/config/site';

interface HeroSectionProps {
  language: 'en' | 'hi';
  onOpenDonateModal: (sevaId?: string) => void;
  onOpenYagyaModal: () => void;
}

export function HeroSection({ language, onOpenDonateModal, onOpenYagyaModal }: HeroSectionProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const toggleSacredAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (typeof window !== 'undefined') {
      const audioCtx =
        (window as any)._sanctumAudioCtx ||
        new (window.AudioContext || (window as any).webkitAudioContext)();
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
    <section className="relative flex-1 min-h-[calc(100dvh-95px)] flex flex-col justify-center items-center px-3 sm:px-6 lg:px-8 py-2 sm:py-3 overflow-hidden bg-sanctum-gradient">
      {/* Background Sacred Jaali Geometric Watermark & Sunbeam Radiance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Vedic Temple Jaali Pattern Watermark */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035] text-[#8B5A00]"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <pattern id="sacred-jaali" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M40 0 L80 40 L40 80 L0 40 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="40" cy="40" r="16" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="40" cy="40" r="6" fill="currentColor" opacity="0.4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#sacred-jaali)" />
        </svg>

        {/* Ambient Agni & Sunbeam Halo */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C83A22]/5 rounded-full blur-[140px] animate-agni"></div>
        <div className="absolute top-1/2 right-1/4 w-[480px] h-[480px] bg-[#B8860B]/8 rounded-full blur-[130px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full py-2 sm:py-0">
        {/* Sovereign Asymmetric Split (55% Content / 45% 3D Mandir Centerpiece) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* =========================================================================
              LEFT COLUMN (55% Width / col-span-7): Sacred Typography & Action Matrix
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-3.5"
          >
            {/* Sovereign Status & Consecration Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#B8860B]/35 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#046A38] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#046A38]"></span>
              </span>
              <span className="text-xs sm:text-xs font-serif font-bold text-[#8B5A00] uppercase tracking-wider">
                {language === 'hi'
                  ? '✧ नीव प्रतिष्ठा सम्पन्न • गर्भगृह निर्माण सक्रिय ✧'
                  : '✧ Neev Consecrated • Garbhagriha Construction Active ✧'}
              </span>
            </div>

            {/* Sacred Vedic Mahamrityunjaya Shloka */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-[#8B5A00] tracking-widest uppercase">
                <span>॥ ॐ हौं जूँ सः भूर्भुवः स्वः त्र्यम्बकं यजामहे ॥</span>
              </div>
              <p className="text-[11.5px] sm:text-xs text-[#5C5549] font-medium tracking-wide mt-0.5">
                {language === 'hi'
                  ? 'समस्त भय, तंत्र बाधा एवं काल दोष निवारक — भगवान त्रिनेत्र महाकाल'
                  : 'The Supreme Three-Eyed Transcendent — Dissolver of Fear, Occult Bonds & Negativity'}
              </p>
            </div>

            {/* High-Reverence Display Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] font-serif font-bold text-[#161A22] tracking-tight leading-[1.24] max-w-2xl">
              {language === 'hi' ? (
                <>
                  श्री त्रिनेत्र महाकाल मंदिर निर्माण में{' '}
                  <span className="text-[#8B5A00] underline decoration-[#C83A22] decoration-2 underline-offset-4">
                    अपनी आधार शिला
                  </span>{' '}
                  समर्पित करें
                </>
              ) : (
                <>
                  Consecrate Your Sacred Shila in the Sanctuary of{' '}
                  <span className="text-[#8B5A00] underline decoration-[#C83A22] decoration-2 underline-offset-4">
                    Bhagwan Trinetra Mahakal
                  </span>
                </>
              )}
            </h1>

            {/* Concise Narrative Subtext (14px–15px for comfortable mobile reading) */}
            <p className="text-[13px] sm:text-sm md:text-base text-[#4A453C] max-w-xl leading-relaxed font-medium">
              {language === 'hi'
                ? 'पवित्र नीव स्थापित। अब भव्य गर्भगृह, वैदिक यज्ञशाला एवं नित्य अन्न क्षेत्र निर्माण में सहयोग दें। धारा ८०जी कर छूट मान्य।'
                : 'Foundation stone consecrated. Join devotees in constructing the sanctum sanctorum, nine-fire Vedic Yagyashala, and sadhu bhandara. 80G tax exempt.'}
            </p>

            {/* Primary Action Button Matrix: Clean Mobile-First Layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 w-full pt-1">
              {/* Primary Seva CTA */}
              <button
                onClick={() => onOpenDonateModal('shila')}
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gradient-to-r from-[#C83A22] via-[#B32412] to-[#8E1C0E] hover:from-[#D63E26] hover:to-[#9E2010] text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#B8860B]/40 shadow-md hover:shadow-[#C83A22]/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <span>🪨</span>
                <span>{language === 'hi' ? 'शिला दान / निर्माण सहयोग' : 'Sponsor 1 Sacred Shila (₹1,100)'}</span>
              </button>

              {/* Secondary Actions Row */}
              <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
                <button
                  onClick={onOpenYagyaModal}
                  className="h-12 sm:h-12 px-3 sm:px-4 rounded-xl bg-white hover:bg-[#F4EFE6] text-[#8B5A00] hover:text-[#161A22] font-bold text-xs tracking-wider uppercase border border-[#B8860B]/35 shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
                >
                  <span>🔥</span>
                  <span className="truncate">{language === 'hi' ? 'तांत्रिक बाधा परामर्श' : 'Yagya Relief'}</span>
                </button>

                {/* Bilingual Sacred 108Hz Audio Toggle */}
                <button
                  onClick={toggleSacredAudio}
                  className={`h-12 sm:h-12 px-3 sm:px-4 rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                    isPlayingAudio
                      ? 'bg-[#C83A22] text-white border-[#B8860B] ring-2 ring-[#B8860B]/40'
                      : 'bg-white text-[#5C5549] hover:text-[#8B5A00] border-[#B8860B]/30'
                  }`}
                  title={isPlayingAudio ? 'Mute Sacred Tone' : 'Play Sacred 108Hz Tone'}
                  aria-label="Toggle Sacred Sound Ambiance"
                >
                  <span>{isPlayingAudio ? '🔊' : '🔈'}</span>
                  <span className="text-xs font-semibold">
                    {language === 'hi'
                      ? isPlayingAudio ? '१०८Hz सक्रिय' : '१०८Hz नाद'
                      : isPlayingAudio ? '108Hz Active' : '108Hz Tone'}
                  </span>
                </button>
              </div>
            </div>

            {/* Live Construction Ledger Card with High Legibility */}
            <div className="w-full max-w-xl bg-white border border-[#B8860B]/25 rounded-xl p-4 sm:p-4.5 shadow-md mt-1">
              <div className="flex justify-between items-center text-xs sm:text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-[#5C5549] flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>{language === 'hi' ? 'गर्भगृह निर्माण निधि कोष:' : 'Sanctum Construction Ledger:'}</span>
                </span>
                <span className="text-[#8B5A00] font-mono font-bold text-xs sm:text-sm">
                  ₹{(SITE_CONFIG.construction.collectedAmount / 100000).toFixed(1)}L / ₹
                  {(SITE_CONFIG.construction.targetAmount / 100000).toFixed(0)}L ({percent}%)
                </span>
              </div>

              {/* Progress Bar with Radiant Agni/Saffron Gradient */}
              <div className="w-full h-2.5 bg-[#EAE4D7] rounded-full overflow-hidden border border-gray-200 p-0.5 mb-3">
                <div
                  className="h-full bg-gradient-to-r from-[#C83A22] via-[#E65C00] to-[#B8860B] rounded-full transition-all duration-1000 shadow-xs"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* Three Live Transparency Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center sm:text-left">
                <div>
                  <div className="text-sm sm:text-base font-bold font-serif text-[#161A22]">
                    {SITE_CONFIG.construction.shilasPledged.toLocaleString()}+
                  </div>
                  <div className="text-[10.5px] sm:text-xs text-[#5C5549] font-medium">
                    {language === 'hi' ? 'शिलाएं समर्पित' : 'Shilas Consecrated'}
                  </div>
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold font-serif text-[#8B5A00]">
                    {SITE_CONFIG.construction.mealsServed.toLocaleString()}+
                  </div>
                  <div className="text-[10.5px] sm:text-xs text-[#5C5549] font-medium">
                    {language === 'hi' ? 'भंडारा महाप्रसाद' : 'Meals Distributed'}
                  </div>
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold font-serif text-[#046A38]">100%</div>
                  <div className="text-[10.5px] sm:text-xs text-[#5C5549] font-medium">
                    {language === 'hi' ? '८०जी कर छूट' : '80G Tax Exempt'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN (45% Width / col-span-5): 3D Mandir Model with Interactive Hotspots
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center mt-2 lg:mt-0"
          >
            {/* Sacred Backlight Sunbeam Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-[#C83A22]/10 via-[#B8860B]/12 to-transparent rounded-full blur-[60px] pointer-events-none"></div>

            {/* Architectural Model Frame with Responsive Aspect Ratio */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[380px] flex flex-col items-center group">
              {/* Consecrated 3D Mandir Model Image */}
              <div className="relative w-full aspect-[518/746] drop-shadow-[0_12px_24px_rgba(40,25,15,0.18)] filter hover:brightness-105 transition-all duration-300">
                <Image
                  src="/images/mandir-render.png"
                  alt="Official 3D Architectural Model of Shri Trinetra Mahakal Mandir"
                  fill
                  priority
                  className="object-contain"
                />

                {/* ===================================================================
                    INTERACTIVE ARCHITECTURAL HOTSPOT 1: SWARNA SHIKHARA & KALASH
                   =================================================================== */}
                <div
                  className="absolute top-[8%] left-[46%] z-20 cursor-pointer -translate-x-1/2 group/pin"
                  onMouseEnter={() => setActiveHotspot('shikhara')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => onOpenDonateModal('floor')}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[#B8860B] opacity-60"></span>
                    <div className="px-2 py-0.5 rounded-full bg-white/95 border-2 border-[#B8860B] flex items-center gap-1 shadow-md group-hover/pin:scale-105 transition-transform">
                      <span className="text-[10px]">🚩</span>
                      <span className="text-[9.5px] font-serif font-bold text-[#8B5A00] whitespace-nowrap">
                        {language === 'hi' ? 'स्वर्ण शिखर' : 'Swarna Spire'}
                      </span>
                    </div>
                  </div>

                  {/* Hotspot Tooltip (Positioned below to prevent top clipping) */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 rounded-md bg-white/98 border border-[#B8860B] text-[#161A22] whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none z-30 ${
                      activeHotspot === 'shikhara' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="text-[10.5px] font-serif font-bold text-[#8B5A00]">
                      {language === 'hi' ? 'स्वर्ण शिखर एवं कलश प्रतिष्ठा' : 'Swarna Shikhara & Kalash'}
                    </div>
                    <div className="text-[9px] text-[#5C5549] font-medium">
                      {language === 'hi' ? '५१ फुट नागर शिखर निर्माण सेवा' : '51-Ft Nagara Spire Construction'}
                    </div>
                  </div>
                </div>

                {/* ===================================================================
                    INTERACTIVE ARCHITECTURAL HOTSPOT 2: VEDIC YAGYASHALA & PILLARS
                   =================================================================== */}
                <div
                  className="absolute top-[62%] left-[20%] z-20 cursor-pointer -translate-x-1/2 group/pin"
                  onMouseEnter={() => setActiveHotspot('pillar')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => onOpenDonateModal('pillar')}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[#D97706] opacity-60"></span>
                    <div className="px-2 py-0.5 rounded-full bg-white/95 border-2 border-[#D97706] flex items-center gap-1 shadow-md group-hover/pin:scale-105 transition-transform">
                      <span className="text-[10px]">🏛️</span>
                      <span className="text-[9.5px] font-serif font-bold text-[#D97706] whitespace-nowrap">
                        {language === 'hi' ? 'स्तम्भ: ₹२१,०००' : 'Pillar: ₹21,000'}
                      </span>
                    </div>
                  </div>

                  {/* Hotspot Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-md bg-white/98 border border-[#D97706] text-[#161A22] whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none z-30 ${
                      activeHotspot === 'pillar' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="text-[10.5px] font-serif font-bold text-[#D97706]">
                      {language === 'hi' ? 'वैदिक यज्ञशाला स्तम्भ सेवा' : 'Vedic Yagyashala Pillar Seva'}
                    </div>
                    <div className="text-[9px] text-[#5C5549] font-medium">
                      {language === 'hi' ? '₹२१,००० स्तम्भ सेवा (गोत्र उत्कीर्ण)' : '₹21,000 Pillar Seva (Gotra Inscribed)'}
                    </div>
                  </div>
                </div>

                {/* ===================================================================
                    INTERACTIVE ARCHITECTURAL HOTSPOT 3: CONSECRATED FOUNDATION (NEEV)
                   =================================================================== */}
                <div
                  className="absolute bottom-[10%] left-[64%] z-20 cursor-pointer -translate-x-1/2 group/pin"
                  onMouseEnter={() => setActiveHotspot('shila')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => onOpenDonateModal('shila')}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[#C83A22] opacity-75"></span>
                    <div className="px-2 py-0.5 rounded-full bg-white/95 border-2 border-[#C83A22] flex items-center gap-1 shadow-md group-hover/pin:scale-105 transition-transform">
                      <span className="text-[10px]">🪨</span>
                      <span className="text-[9.5px] font-serif font-bold text-[#C83A22] whitespace-nowrap">
                        {language === 'hi' ? 'शिला: ₹१,१००' : 'Shila: ₹1,100'}
                      </span>
                    </div>
                  </div>

                  {/* Hotspot Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-md bg-white/98 border border-[#C83A22] text-[#161A22] whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none z-30 ${
                      activeHotspot === 'shila' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="text-[10.5px] font-serif font-bold text-[#161A22]">
                      {language === 'hi' ? 'पवित्र आधार शिला (Neev)' : 'Consecrated Shila (Neev)'}
                    </div>
                    <div className="text-[9px] text-[#046A38] font-bold">
                      {language === 'hi' ? '₹१,१०० प्रति शिला • ८०जी कर छूट' : '₹1,100 per Shila • 80G Tax Exempt'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Natural Plinth Ambient Occlusion Shadow */}
              <div className="w-[85%] h-4 -mt-2.5 bg-gradient-to-r from-transparent via-[#4A3B2C]/20 to-transparent blur-md rounded-full pointer-events-none"></div>

              {/* Architectural Sub-Caption Ribbon */}
              <div className="mt-2 px-3 py-1 rounded-full bg-white border border-[#B8860B]/30 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#5C5549]">
                <span className="text-[#8B5A00]">✧</span>
                <span className="font-serif font-medium">
                  {language === 'hi'
                    ? 'बंसी पहाड़पुर बलुआ पत्थर • नागर शैली स्थापत्य'
                    : 'Bansi Paharpur Sandstone • Nagara Style Architecture'}
                </span>
                <span className="text-[#8B5A00]">✧</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
