'use client';

import React, { useState } from 'react';
import { TrustHeader } from '@/components/TrustHeader';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ConstructionRoadmap } from '@/components/ConstructionRoadmap';
import { ItemizedSevaGrid } from '@/components/ItemizedSevaGrid';
import { YagyaSanctuary } from '@/components/YagyaSanctuary';
import { NgoSevaBento } from '@/components/NgoSevaBento';
import { StatusTracker } from '@/components/StatusTracker';
import { CivicFooter } from '@/components/CivicFooter';
import { DonationModal } from '@/components/DonationModal';

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
    const el = document.getElementById('yagya');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0F12] text-[#F4F1EA]">
      {/* ZONE 0: GIGW 3.0 Sovereign Trust & Accessibility Strip */}
      <TrustHeader language={language} onLanguageToggle={(lang) => setLanguage(lang)} />

      {/* ZONE 1: Sovereign Sanctum Navigation */}
      <Navbar language={language} onOpenDonateModal={handleOpenDonate} />

      {/* MAIN SANCTUARY CONTENT CONTAINER */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* ZONE 2: Sanctum Hero & Transparent Milestone Counter */}
        <HeroSection
          language={language}
          onOpenDonateModal={handleOpenDonate}
          onOpenYagyaModal={handleOpenYagyaModal}
        />

        {/* ZONE 3: "Neev to Shikhar" Interactive Construction Roadmap */}
        <ConstructionRoadmap language={language} onOpenDonateModal={handleOpenDonate} />

        {/* ZONE 4: Tangible Itemized Seva Packages (Shila, Cement, Sq Ft, Pillar) */}
        <ItemizedSevaGrid language={language} onSelectSeva={handleOpenDonate} />

        {/* ZONE 5: Vedic Yagya & Tantrik Badha Nivaran Sanctuary */}
        <YagyaSanctuary language={language} />

        {/* ZONE 6: Registered NGO Humanitarian Seva Bento (Anna Daan, Shiksha Seva) */}
        <NgoSevaBento
          language={language}
          onSelectNgoSeva={(initiativeId, amt) => handleOpenDonate(initiativeId, amt)}
        />

        {/* ZONE 8: GovTech UTR / Sankalpa Status Tracker */}
        <StatusTracker language={language} />
      </main>

      {/* ZONE 9: Civic & Sovereign Trust Footer */}
      <CivicFooter language={language} />

      {/* ZONE 7: Dual-Rail Donation Engine & 80G Tax Receipt Modal */}
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
