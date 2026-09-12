'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/site';

interface NgoSevaBentoProps {
  language: 'en' | 'hi';
  onSelectNgoSeva: (initiativeId: string, amount: number) => void;
}

export function NgoSevaBento({ language, onSelectNgoSeva }: NgoSevaBentoProps) {
  const [calcAmount, setCalcAmount] = useState<number>(5000);

  const taxDeduction = Math.round(calcAmount * 0.5);
  const mealsCount = Math.floor(calcAmount / 25);
  const booksCount = Math.floor(calcAmount / 100);

  return (
    <section id="ngo-seva" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#10131A] border-b border-[#D4AF37]/25">
      <div className="max-w-6xl mx-auto">
        {/* Header without repetitive pill */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1EA] tracking-tight mb-3">
            {language === 'hi'
              ? 'मानव सेवा ही माधव सेवा: अन्न, शास्त्र एवं विद्या दान'
              : 'Humanitarian Seva: Anna Daan, Granth Daan & Shiksha Seva'}
          </h2>
          <p className="text-sm sm:text-base text-[#A39E93] leading-relaxed">
            {language === 'hi'
              ? 'त्रिनेत्र महाकाल ट्रस्ट द्वारा संचालित निःशुल्क महाप्रसाद भंडारा, ग्रंथ वितरण एवं निर्धन बालकों हेतु शिक्षा सेवा में भागीदार बनें। आयकर धारा ८०जी के अंतर्गत ५०% कर छूट।'
              : 'Empowering pilgrims, youth, and underprivileged children through transparent daily Bhandara, Gita distribution, and free study kits. 100% compliant with instant 80G tax certificates.'}
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SITE_CONFIG.ngoSeva.map((seva) => (
            <div
              key={seva.id}
              className="bg-stone-card rounded-2xl border border-[#D4AF37]/30 p-6 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 shadow-md"
            >
              <div>
                {/* Header Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0D0F12] border border-[#D4AF37]/40 flex items-center justify-center text-2xl shadow-inner">
                    {seva.id === 'anna_daan' ? '🍲' : seva.id === 'granth_daan' ? '📖' : '🎓'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F4F1EA] font-serif leading-tight">
                      {language === 'hi' ? seva.hindiTitle : seva.title}
                    </h3>
                    <span className="text-[11px] text-[#34A853] font-bold">✓ 80G Tax Deductible</span>
                  </div>
                </div>

                <p className="text-xs text-[#A39E93] leading-relaxed mb-6">{seva.description}</p>

                {/* Presets List */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                    {language === 'hi' ? 'सेवा संकल्प विकल्प:' : 'Sponsorship Tiers:'}
                  </span>
                  {seva.presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectNgoSeva(seva.id, preset.amount)}
                      className="w-full text-left p-2.5 rounded-lg bg-[#0D0F12] border border-white/10 hover:border-[#D4AF37] hover:bg-[#1E232E] transition-all flex justify-between items-center group"
                    >
                      <span className="text-xs text-[#F4F1EA] group-hover:text-[#D4AF37] transition-colors">
                        {preset.label}
                      </span>
                      <span className="text-xs font-bold text-[#D4AF37]">₹{preset.amount.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectNgoSeva(seva.id, seva.presets[0].amount)}
                className="w-full py-2.5 rounded-lg bg-[#161A22] hover:bg-[#C83A22] text-[#D4AF37] hover:text-white border border-[#D4AF37]/40 hover:border-[#C83A22] text-xs font-bold uppercase tracking-wider transition-all"
              >
                {language === 'hi' ? 'संकल्प लें' : 'Sponsor Now'}
              </button>
            </div>
          ))}
        </div>

        {/* Dynamic 80G Tax Exemption Calculator with Live Social Impact */}
        <div className="bg-stone-surface rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-8 mb-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[#34A853] block mb-1">
                ⚖️ {language === 'hi' ? 'आयकर धारा ८०जी गणना' : 'Section 80G Tax Benefit Calculator'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#F4F1EA] mb-2">
                {language === 'hi'
                  ? 'धर्मार्थ दान पर ५०% आयकर छूट का प्रत्यक्ष लाभ'
                  : 'Claim 50% Tax Deduction on Every Contribution'}
              </h3>
              <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mb-6">
                {language === 'hi'
                  ? 'त्रिनेत्र महाकाल चैरिटेबल ट्रस्ट आयकर विभाग द्वारा विधिवत पंजीकृत है। दान पश्चात तत्काल डिजिटल ८०जी रसीद आपके पैन कार्ड विवरण सहित उपलब्ध कराई जाती है।'
                  : 'Approved under Section 80G & 12A. Generate instant verifiable tax receipts bearing your PAN number directly upon payment.'}
              </p>

              {/* Slider Input with Custom Brass Thumb */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-[#F4F1EA]">
                  <span>{language === 'hi' ? 'दान राशि निर्धारित करें:' : 'Adjust Donation Amount:'}</span>
                  <span className="font-bold text-[#D4AF37] text-lg font-mono">₹{calcAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#A39E93] font-mono">
                  <span>₹500</span>
                  <span>₹50,000</span>
                  <span>₹1,00,000+</span>
                </div>
              </div>

              {/* Live Impact Feedback */}
              <div className="mt-4 p-3 rounded-lg bg-[#0D0F12] border border-white/10 text-xs text-[#F4F1EA] flex items-center gap-2">
                <span className="text-lg">🌟</span>
                <span>
                  {language === 'hi'
                    ? `इस दान से लगभग ${mealsCount} साधु/भक्तों को महाप्रसाद अथवा ${booksCount} गीता वितरण संभव होगा।`
                    : `This donation sponsors approximately ${mealsCount} Mahaprasad meals or ${booksCount} Holy Gitas.`}
                </span>
              </div>
            </div>

            {/* Calculated Deduction Display */}
            <div className="md:col-span-5 bg-[#0D0F12] rounded-xl p-6 border border-[#D4AF37]/30 text-center shadow-inner">
              <span className="text-xs text-[#A39E93] uppercase tracking-wider block mb-1">
                {language === 'hi' ? 'आपकी कर योग्य आय में छूट:' : 'Effective Taxable Income Deduction:'}
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#34A853] mb-2">
                ₹{taxDeduction.toLocaleString()}
              </div>
              <span className="text-[11px] text-[#A39E93] block mb-5">
                (50% of ₹{calcAmount.toLocaleString()} under Section 80G)
              </span>
              <button
                onClick={() => onSelectNgoSeva('anna_daan', calcAmount)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#C83A22] to-[#9E2010] hover:from-[#D43F24] hover:to-[#B32412] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98]"
              >
                {language === 'hi' ? `₹${calcAmount.toLocaleString()} दान करें` : `Contribute ₹${calcAmount.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>

        {/* Legal Trust Badges & Transparency Manifest */}
        <div className="p-6 rounded-xl bg-[#0D0F12] border border-white/10 flex flex-wrap justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📜</span>
            <div>
              <span className="font-bold text-[#F4F1EA] block">
                {language === 'hi' ? 'ट्रस्ट पंजीकरण एवं वैधानिक दस्तावेज' : 'Official Trust Deed & Certifications'}
              </span>
              <span className="text-[#A39E93]">
                Reg: {SITE_CONFIG.trust.registrationNo} | Darpan ID: {SITE_CONFIG.trust.nitiAayogDarpanId}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#D4AF37] font-semibold">
            <span className="px-3 py-1 rounded bg-[#161A22] border border-white/10">✓ 12A Certified</span>
            <span className="px-3 py-1 rounded bg-[#161A22] border border-white/10">✓ 80G Certified</span>
            <span className="px-3 py-1 rounded bg-[#161A22] border border-white/10">✓ Darpan Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
