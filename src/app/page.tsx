'use client';

import React, { useState } from 'react';
import { TrustHeader } from '@/components/TrustHeader';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { DonationModal } from '@/components/DonationModal';
import { SITE_CONFIG } from '@/config/site';

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [selectedSevaId, setSelectedSevaId] = useState<string>('shila');
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);

  const handleOpenDonate = (sevaId: string = 'shila', amount?: number) => {
    setSelectedSevaId(sevaId);
    setSelectedAmount(amount);
    setIsDonateModalOpen(true);
  };

  const handleOpenYagyaModal = () => {
    const text = encodeURIComponent(
      language === 'hi'
        ? 'प्रणाम आचार्य जी, मुझे भगवान त्रिनेत्र महाकाल के पावन यज्ञ एवं तांत्रिक बाधा/ग्रह दोष निवारण परामर्श हेतु जानकारी चाहिए।'
        : 'Pranam Acharya Ji, I would like to consult regarding Bhagwan Trinetra Mahakal Vedic Yagya and spiritual/tantrik badha relief.'
    );
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsappSeva.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0F12] text-[#F4F1EA] selection:bg-[#C83A22] selection:text-white">
      {/* ZONE 0: GIGW 3.0 Sovereign Trust & Accessibility Strip */}
      <TrustHeader language={language} onLanguageToggle={(lang) => setLanguage(lang)} />

      {/* ZONE 1: Sovereign Sanctum Navigation */}
      <Navbar language={language} onOpenDonateModal={handleOpenDonate} />

      {/* MAIN SANCTUARY CONTAINER: FOLD 1 ONLY */}
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
        {/* ZONE 2: First Fold - Sanctum Hero, Consecrated Emblem & Live Construction Meter */}
        <HeroSection
          language={language}
          onOpenDonateModal={handleOpenDonate}
          onOpenYagyaModal={handleOpenYagyaModal}
        />
      </main>

      {/* ZONE 7: Dual-Rail Donation Engine & 80G Tax Receipt Modal (Triggered from Fold 1 CTAs) */}
      <DonationModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        language={language}
        initialSevaId={selectedSevaId}
        initialAmount={selectedAmount}
      />
    </div>
  );
}

