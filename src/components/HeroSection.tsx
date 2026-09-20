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
      {/* Background Sacred Agni & Sunbeam Radiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C83A22]/5 rounded-full blur-[140px] animate-agni"></div>
        <div className="absolute top-1/2 right-1/4 w-[480px] h-[480px] bg-[#B8860B]/8 rounded-full blur-[130px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Sovereign Asymmetric Split (55% Content / 45% 3D Mandir Centerpiece) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* =========================================================================
              LEFT COLUMN (55% Width / col-span-7): Sacred Typography & Action Matrix
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-2.5"
          >
            {/* Sovereign Status & Consecration Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#B8860B]/30 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#046A38] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#046A38]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-serif font-bold text-[#8B5A00] uppercase tracking-wider">
                {language === 'hi'
                  ? '✧ नीव प्रतिष्ठा सम्पन्न ✧ गर्भगृह निर्माण सक्रिय'
                  : '✧ Neev Consecrated ✧ Garbhagriha Construction Active'}
              </span>
            </div>

            {/* Sacred Vedic Mahamrityunjaya Shloka */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-serif font-bold text-[#8B5A00] tracking-widest uppercase">
                <span>ॐ हौं जूँ सः भूर्भुवः स्वः त्र्यम्बकं यजामहे</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#5C5549] font-medium tracking-wide mt-0.5">
                {language === 'hi'
                  ? 'समस्त भय, तंत्र बाधा एवं काल दोष निवारक — भगवान त्रिनेत्र महाकाल'
                  : 'The Supreme Three-Eyed Transcendent — Dissolver of Fear, Occult Bonds & Negativity'}
              </p>
            </div>

            {/* High-Reverence Display Headline */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.35rem] font-serif font-bold text-[#161A22] tracking-tight leading-[1.18] max-w-2xl">
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

            {/* Concise Narrative Subtext (<20 words) */}
            <p className="text-[11px] sm:text-xs text-[#4A453C] max-w-xl leading-relaxed font-medium">
              {language === 'hi'
                ? 'पवित्र नीव स्थापित। अब भव्य गर्भगृह, वैदिक यज्ञशाला एवं नित्य अन्न क्षेत्र निर्माण में योगदान दें। धारा ८०जी कर छूट मान्य।'
                : 'Foundation stone consecrated. Join devotees in constructing the sanctum sanctorum, nine-fire Vedic Yagyashala, and sadhu bhandara. 80G tax exempt.'}
            </p>

            {/* Primary Action Button Matrix */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full pt-1">
              <button
                onClick={() => onOpenDonateModal('shila')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C83A22] via-[#B32412] to-[#8E1C0E] hover:from-[#D63E26] hover:to-[#9E2010] text-white font-bold text-xs uppercase tracking-wider border border-[#B8860B]/40 shadow-md hover:shadow-[#C83A22]/25 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
              >
                <span>🪨</span>
                <span>{language === 'hi' ? 'शिला दान / निर्माण सहयोग' : 'Sponsor 1 Sacred Shila (₹1,100)'}</span>
              </button>

              <button
                onClick={onOpenYagyaModal}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white hover:bg-[#F4EFE6] text-[#8B5A00] hover:text-[#161A22] font-semibold text-xs tracking-wider uppercase border border-[#B8860B]/35 shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
              >
                <span>🔥</span>
                <span>{language === 'hi' ? 'तांत्रिक बाधा परामर्श लें' : 'Consult Acharya for Yagya'}</span>
              </button>

              {/* Sacred 108Hz Audio Toggle */}
              <button
                onClick={toggleSacredAudio}
                className={`p-2.5 rounded-lg border transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                  isPlayingAudio
                    ? 'bg-[#C83A22] text-white border-[#B8860B] ring-2 ring-[#B8860B]/40'
                    : 'bg-white text-[#5C5549] hover:text-[#8B5A00] border-[#B8860B]/30'
                }`}
                title={isPlayingAudio ? 'Mute Sacred Tone' : 'Play Sacred 108Hz Tone'}
                aria-label="Toggle Sacred Sound Ambiance"
              >
                <span>{isPlayingAudio ? '🔊' : '🔈'}</span>
                <span className="text-[10px] font-semibold">{isPlayingAudio ? '108Hz Active' : 'Chant Sound'}</span>
              </button>
            </div>

            {/* Live Construction Meter & Civic Transparency Card */}
            <div className="w-full max-w-xl bg-white border border-[#B8860B]/25 rounded-xl p-3 sm:p-3.5 shadow-md mt-1">
              <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1">
                <span className="text-[#5C5549]">
                  {language === 'hi' ? 'गर्भगृह निर्माण निधि संचयन:' : 'Garbhagriha Nirman Phase Progress:'}
                </span>
                <span className="text-[#8B5A00] font-mono">
                  ₹{(SITE_CONFIG.construction.collectedAmount / 100000).toFixed(1)}L / ₹
                  {(SITE_CONFIG.construction.targetAmount / 100000).toFixed(0)}L ({percent}%)
                </span>
              </div>

              {/* Progress Bar with Radiant Agni/Saffron Gradient */}
              <div className="w-full h-2.5 bg-[#EAE4D7] rounded-full overflow-hidden border border-gray-200 p-0.5 mb-2">
                <div
                  className="h-full bg-gradient-to-r from-[#C83A22] via-[#E65C00] to-[#B8860B] rounded-full transition-all duration-1000 shadow-xs"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* Three Live Transparency Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100 text-center sm:text-left">
                <div>
                  <div className="text-xs sm:text-sm font-bold font-serif text-[#161A22]">
                    {SITE_CONFIG.construction.shilasPledged.toLocaleString()}+
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#5C5549] font-medium">
                    {language === 'hi' ? 'शिलाएं समर्पित' : 'Shilas Consecrated'}
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold font-serif text-[#8B5A00]">
                    {SITE_CONFIG.construction.mealsServed.toLocaleString()}+
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#5C5549] font-medium">
                    {language === 'hi' ? 'भंडारा महाप्रसाद' : 'Meals Distributed'}
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold font-serif text-[#046A38]">100%</div>
                  <div className="text-[9px] sm:text-[10px] text-[#5C5549] font-medium">
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
            className="lg:col-span-5 relative flex flex-col items-center justify-center mt-1 lg:mt-0"
          >
            {/* Sacred Backlight Sunbeam Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-[#C83A22]/10 via-[#B8860B]/12 to-transparent rounded-full blur-[60px] pointer-events-none"></div>

            {/* Architectural Model Frame with Responsive Aspect Ratio */}
            <div className="relative w-full max-w-[320px] sm:max-w-[370px] lg:max-w-[400px] flex flex-col items-center group">
              {/* Consecrated 3D Mandir Model Image */}
              <div className="relative w-full aspect-[518/746] drop-shadow-[0_15px_30px_rgba(40,25,15,0.22)] filter hover:brightness-105 transition-all duration-300">
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
                  className="absolute top-[11%] left-[42%] z-20 cursor-pointer -translate-x-1/2"
                  onMouseEnter={() => setActiveHotspot('shikhara')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => onOpenDonateModal('floor')}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#B8860B] opacity-60"></span>
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#B8860B] flex items-center justify-center text-[10px] text-[#B8860B] font-bold shadow-md hover:scale-115 transition-transform">
                      🚩
                    </div>
                  </div>

                  {/* Hotspot Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-white/95 border border-[#B8860B] text-[#161A22] whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none ${
                      activeHotspot === 'shikhara' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'
                    }`}
                  >
                    <div className="text-[10px] font-serif font-bold text-[#8B5A00]">
                      {language === 'hi' ? 'स्वर्ण शिखर एवं कलश' : 'Swarna Shikhara & Kalash'}
                    </div>
                    <div className="text-[8px] text-[#5C5549] font-medium">
                      {language === 'hi' ? '५१ फुट नागर शिखर निर्माण' : '51-Ft Nagara Spire Seva'}
                    </div>
                  </div>
                </div>

                {/* ===================================================================
                    INTERACTIVE ARCHITECTURAL HOTSPOT 2: VEDIC YAGYASHALA & PILLARS
                   =================================================================== */}
                <div
                  className="absolute top-[62%] left-[22%] z-20 cursor-pointer -translate-x-1/2"
                  onMouseEnter={() => setActiveHotspot('pillar')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => onOpenDonateModal('pillar')}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#D97706] opacity-60"></span>
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#D97706] flex items-center justify-center text-[10px] text-[#D97706] font-bold shadow-md hover:scale-115 transition-transform">
                      🏛️
                    </div>
                  </div>

                  {/* Hotspot Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-white/95 border border-[#D97706] text-[#161A22] whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none ${
                      activeHotspot === 'pillar' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'
                    }`}
                  >
                    <div className="text-[10px] font-serif font-bold text-[#D97706]">
                      {language === 'hi' ? 'वैदिक यज्ञशाला स्तम्भ' : 'Vedic Yagyashala Pillar'}
                    </div>
                    <div className="text-[8px] text-[#5C5549] font-medium">
                      {language === 'hi' ? '₹२१,००० स्तम्भ सेवा (गोत्र उत्कीर्ण)' : '₹21,000 Pillar Seva (Gotra Inscribed)'}
                    </div>
                  </div>
                </div>

                {/* ===================================================================
                    INTERACTIVE ARCHITECTURAL HOTSPOT 3: CONSECRATED FOUNDATION (NEEV)
                   =================================================================== */}
                <div
                  className="absolute bottom-[9%] left-[64%] z-20 cursor-pointer -translate-x-1/2"
                  onMouseEnter={() => setActiveHotspot('shila')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() => onOpenDonateModal('shila')}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#C83A22] opacity-75"></span>
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#C83A22] flex items-center justify-center text-[10px] text-[#C83A22] font-bold shadow-md hover:scale-115 transition-transform">
                      🪨
                    </div>
                  </div>

                  {/* Hotspot Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-white/95 border border-[#C83A22] text-[#161A22] whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none ${
                      activeHotspot === 'shila' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'
                    }`}
                  >
                    <div className="text-[10px] font-serif font-bold text-[#161A22]">
                      {language === 'hi' ? 'पवित्र आधार शिला (Neev)' : 'Consecrated Shila (Neev)'}
                    </div>
                    <div className="text-[8px] text-[#046A38] font-bold">
                      {language === 'hi' ? '₹१,१०० प्रति शिला • ८०जी कर छूट' : '₹1,100 per Shila • 80G Tax Exempt'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Architectural Sub-Caption Ribbon */}
              <div className="mt-1 px-3 py-1 rounded-full bg-white border border-[#B8860B]/30 shadow-xs flex items-center gap-1.5 text-[9px] sm:text-[10px] text-[#5C5549]">
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
