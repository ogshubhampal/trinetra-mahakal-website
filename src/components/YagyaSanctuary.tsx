'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/site';

interface YagyaSanctuaryProps {
  language: 'en' | 'hi';
}

export function YagyaSanctuary({ language }: YagyaSanctuaryProps) {
  const [selectedCatId, setSelectedCatId] = useState('tantrik_badha');
  const [formData, setFormData] = useState({
    name: '',
    gotra: '',
    phone: '',
    whatsapp: '',
    category: 'tantrik_badha',
    description: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeCategory = SITE_CONFIG.yagyaCategories.find((c) => c.id === selectedCatId)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const cleanPhone = SITE_CONFIG.contact.whatsappSeva.replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(
    `Pranam Acharya Ji, I am contacting Trinetra Mahakal Sanctuary regarding confidential Vedic Yagya consultation for Tantrik Badha / spiritual obstacle relief. Kindly guide me.`
  );

  return (
    <section id="yagya" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0F12] border-b border-[#D4AF37]/25 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header without repetitive pill */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1EA] tracking-tight mb-3">
            {language === 'hi'
              ? 'भगवान त्रिनेत्र महाकाल की पावन अग्नि से समस्त बाधाओं का निवारण'
              : 'Dissolution of Occult & Paranormal Afflictions Through Sacred Agni'}
          </h2>
          <p className="text-sm sm:text-base text-[#A39E93] leading-relaxed">
            {language === 'hi'
              ? 'बिना किसी अंधविश्वास या भय के—शुद्ध वैदिक एवं तांत्रिक पद्धतियों, अथर्ववेद एवं शिव महापुराण के प्रमाणिक मंत्रों द्वारा जीवन के अदृश्य अवरोधों, प्रेत बाधा एवं तंत्र दोषों से मुक्ति।'
              : 'With authentic scriptural dignity and zero superstition: initiated Vedic Acharyas conduct targeted Maha Havans in the consecrated Yagyashala to eliminate negative energies and psychic torment.'}
          </p>
        </div>

        {/* 2-Column Split: Interactive Tabs Left, Confidential Intake Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 Cols): Tabbed Category Selector & Scriptural Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Tab Buttons */}
            <div className="grid grid-cols-3 p-1.5 bg-[#161A22] rounded-xl border border-[#D4AF37]/30 gap-1.5">
              {SITE_CONFIG.yagyaCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all text-center leading-snug ${
                    selectedCatId === cat.id
                      ? 'bg-gradient-to-r from-[#C83A22] to-[#9E2010] text-white shadow-md border border-[#D4AF37]/50'
                      : 'text-[#A39E93] hover:text-[#F4F1EA] hover:bg-[#1E232E]'
                  }`}
                >
                  {cat.id === 'tantrik_badha'
                    ? language === 'hi' ? 'तांत्रिक बाधा' : 'Tantrik Badha'
                    : cat.id === 'paranormal'
                    ? language === 'hi' ? 'प्रेत / दृष्टि दोष' : 'Paranormal / Nazar'
                    : language === 'hi' ? 'ग्रह / पितृ दोष' : 'Graha / Pitra Shanti'}
                </button>
              ))}
            </div>

            {/* Active Category Showcase Card */}
            <div className="bg-stone-surface rounded-2xl border-2 border-[#D4AF37]/50 p-7 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider bg-[#0D0F12] px-3 py-1 rounded-full border border-white/10">
                  📖 {activeCategory.scripture}
                </span>
                <span className="text-xs font-bold text-[#E65C00] bg-[#C83A22]/20 px-3 py-1 rounded-full border border-[#E65C00]/40">
                  अग्नि संस्कार
                </span>
              </div>

              <h3 className="text-xl font-bold font-serif text-[#F4F1EA] mb-3">
                {language === 'hi' ? activeCategory.hindiTitle : activeCategory.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mb-6">
                {activeCategory.description}
              </p>

              {/* Ritual Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#0D0F12] border border-white/10 text-xs mb-6">
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <span>✓</span>
                  <span>{language === 'hi' ? 'गोत्र सहित वैयक्तिक आहुति' : 'Personalized Gotra Ahuti'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <span>✓</span>
                  <span>{language === 'hi' ? 'महामृत्युंजय भस्म रक्षा कवच' : 'Mahamrityunjaya Bhasma Kavach'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <span>✓</span>
                  <span>{language === 'hi' ? 'विशिष्ट वनौषधि एवं सर्षप हवन' : 'Special Herbal Samagri Havan'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <span>✓</span>
                  <span>{language === 'hi' ? 'लाइव वीडियो दर्शन (यदि अनुपस्थित)' : 'Live Video Darshan Option'}</span>
                </div>
              </div>

              {/* Direct Acharya WhatsApp CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-[#A39E93]">
                  {language === 'hi' ? 'सीधे आचार्य परामर्श:' : 'Direct Acharya Helpline:'}{' '}
                  <strong className="text-[#F4F1EA]">{SITE_CONFIG.contact.acharyaHelpline}</strong>
                </div>
                <a
                  href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#046A38] hover:bg-[#03582E] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>💬</span>
                  <span>WhatsApp Acharya</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Confidential Gotra Intake Form */}
          <div className="lg:col-span-5 bg-stone-surface rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-7 shadow-xl">
            <div className="mb-6">
              <span className="text-xs text-[#34A853] font-bold uppercase tracking-wider block mb-1">
                🔒 {language === 'hi' ? 'शत-प्रतिशत गोपनीय परामर्श' : '100% Confidential Intake'}
              </span>
              <h3 className="text-xl font-bold font-serif text-[#F4F1EA]">
                {language === 'hi' ? 'यज्ञ एवं बाधा निवारण संकल्प पत्र' : 'Yagya Consultation Request'}
              </h3>
              <p className="text-xs text-[#A39E93] mt-1">
                {language === 'hi'
                  ? 'अपना विवरण भरें। मंदिर के वरिष्ठ वैदिक आचार्य आपके गोत्र एवं कष्ट का अध्ययन कर मार्गदर्शन देंगे।'
                  : 'Submit your birth details and symptoms. Senior Acharyas will review your case with complete privacy.'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-[#0D0F12] border border-[#34A853]/50 text-center">
                <span className="text-3xl block mb-2">🙏</span>
                <h4 className="text-base font-bold text-[#F4F1EA] mb-2">
                  {language === 'hi' ? 'संकल्प पत्र सफलतापूर्वक प्राप्त हुआ' : 'Inquiry Successfully Received'}
                </h4>
                <p className="text-xs text-[#A39E93] leading-relaxed mb-4">
                  {language === 'hi'
                    ? `आचार्य जी २४ घंटे के भीतर आपसे ${formData.whatsapp || SITE_CONFIG.contact.acharyaHelpline} पर संपर्क कर मार्गदर्शन करेंगे।`
                    : `The presiding Acharya will contact you within 24 hours on ${formData.whatsapp || 'WhatsApp'} to schedule the Vedic Sankalpa.`}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#D4AF37] underline hover:text-white"
                >
                  {language === 'hi' ? 'नया विवरण दर्ज करें' : 'Submit another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EA] mb-1">
                    {language === 'hi' ? 'यजमान का पूरा नाम *' : 'Devotee Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0D0F12] border border-white/15 text-sm text-white placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#F4F1EA] mb-1">
                      {language === 'hi' ? 'गोत्र (Gotra) *' : 'Gotra *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.gotra}
                      onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                      placeholder="e.g. Kashyap"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0D0F12] border border-white/15 text-sm text-white placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#F4F1EA] mb-1">
                      {language === 'hi' ? 'व्हाट्सएप नंबर *' : 'WhatsApp Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="e.g. 7838959553"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0D0F12] border border-white/15 text-sm text-white placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EA] mb-1">
                    {language === 'hi' ? 'बाधा / कष्ट की श्रेणी *' : 'Category of Affliction *'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0D0F12] border border-white/15 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="tantrik_badha">Tantrik Badha / Occult Attack / Blockage</option>
                    <option value="paranormal">Paranormal Distress / Fear / Evil Eye (Nazar)</option>
                    <option value="graha_pitra_dosh">Graha Shanti / Kaalsarp / Pitra Dosh</option>
                    <option value="general_health">Chronic Stagnation / Family Peace</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F4F1EA] mb-1">
                    {language === 'hi' ? 'लक्षण अथवा समस्या का संक्षिप्त विवरण *' : 'Brief Description of Symptoms *'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={
                      language === 'hi'
                        ? 'जैसे: निरंतर अकारण भय, व्यापार में रुकावट, घर में अशांति...'
                        : 'e.g. Unexplained sudden life stagnation, recurring nightmares, severe domestic discord...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0D0F12] border border-white/15 text-sm text-white placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37]"
                  ></textarea>
                </div>

                <div className="text-[11px] text-[#A39E93] leading-snug">
                  🛡️ {language === 'hi' ? 'आपकी जानकारी शत-प्रतिशत गोपनीय रखी जाती है।' : 'Your spiritual details are kept strictly confidential.'}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#C83A22] to-[#9E2010] hover:from-[#D43F24] hover:to-[#B32412] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98]"
                >
                  {language === 'hi' ? 'गोपनीय संकल्प पत्र भेजें' : 'Submit Confidential Intake'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
