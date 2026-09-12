'use client';

import React from 'react';
import { SITE_CONFIG } from '@/config/site';

interface CivicFooterProps {
  language: 'en' | 'hi';
}

export function CivicFooter({ language }: CivicFooterProps) {
  return (
    <footer id="contact" className="bg-[#080A0D] border-t border-[#D4AF37]/25 text-[#A39E93] text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Trust Identity & Mandir */}
          <div className="space-y-3">
            <h4 className="text-base font-serif font-bold text-[#F4F1EA]">
              {language === 'hi' ? SITE_CONFIG.hindiName : SITE_CONFIG.name}
            </h4>
            <p className="text-xs text-[#A39E93] leading-relaxed">
              {SITE_CONFIG.trust.registeredName}
            </p>
            <div className="space-y-1 text-[11px] pt-1">
              <div>
                <span className="text-[#D4AF37]">Trust Reg:</span> {SITE_CONFIG.trust.registrationNo}
              </div>
              <div>
                <span className="text-[#D4AF37]">Darpan ID:</span> {SITE_CONFIG.trust.nitiAayogDarpanId}
              </div>
              <div>
                <span className="text-[#D4AF37]">80G Approval:</span> {SITE_CONFIG.trust.section80GNo}
              </div>
            </div>
          </div>

          {/* Col 2: Darshan Timings & Aarti */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#F4F1EA] uppercase tracking-wider">
              {language === 'hi' ? 'दर्शन एवं आरती समय' : 'Darshan & Aarti Timings'}
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#D4AF37] block font-semibold">
                  {language === 'hi' ? 'दैनिक दर्शन:' : 'Daily Darshan:'}
                </span>
                <span>{SITE_CONFIG.location.darshanTimings}</span>
              </div>
              <div>
                <span className="text-[#D4AF37] block font-semibold">
                  {language === 'hi' ? 'भस्म आरती (ब्रह्म मुहूर्त):' : 'Bhasma Aarti:'}
                </span>
                <span>{SITE_CONFIG.location.bhasmaAartiTimings}</span>
              </div>
              <div>
                <span className="text-[#D4AF37] block font-semibold">
                  {language === 'hi' ? 'संध्या महाआरती:' : 'Sandhya Aarti:'}
                </span>
                <span>{SITE_CONFIG.location.sandhyaAartiTimings}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Helplines & Direct Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#F4F1EA] uppercase tracking-wider">
              {language === 'hi' ? 'आचार्य एवं ट्रस्ट हेल्पलाइन' : 'Acharya & Trust Helplines'}
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#A39E93] block">Vedic Yagya Helpline:</span>
                <a href={`tel:${SITE_CONFIG.contact.acharyaHelpline}`} className="text-[#F4F1EA] font-semibold hover:text-[#D4AF37]">
                  {SITE_CONFIG.contact.acharyaHelpline}
                </a>
              </div>
              <div>
                <span className="text-[#A39E93] block">Toll-Free Trust Desk:</span>
                <a href={`tel:${SITE_CONFIG.contact.tollFreeTrust}`} className="text-[#D4AF37] font-semibold hover:underline">
                  {SITE_CONFIG.contact.tollFreeTrust}
                </a>
              </div>
              <div>
                <span className="text-[#A39E93] block">Treasury Email:</span>
                <a href={`mailto:${SITE_CONFIG.contact.treasuryEmail}`} className="text-[#F4F1EA] hover:underline">
                  {SITE_CONFIG.contact.treasuryEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Anti-Fraud Sovereign Advisory */}
          <div className="space-y-3 bg-[#11141C] p-4 rounded-xl border border-[#C83A22]/30">
            <span className="text-xs font-bold text-[#E65C00] uppercase tracking-wider block">
              ⚠️ Official Advisory
            </span>
            <p className="text-[11px] text-[#A39E93] leading-relaxed">
              {language === 'hi'
                ? 'मंदिर निर्माण हेतु दान केवल आधिकारिक ट्रस्ट खाते (SBI) अथवा आधिकारिक UPI QR कोड द्वारा ही स्वीकार किया जाता है।'
                : 'Donations are accepted strictly via the official SBI Trust Account and verified UPI QR. Beware of fraudulent personal payment links.'}
            </p>
            <div className="text-[11px] text-[#34A853] font-semibold">
              ✓ Verified Sovereign Account
            </div>
          </div>
        </div>

        {/* Bottom GIGW 3.0 & Compliance Strip */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#A39E93]">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.trust.registeredName}. All Rights Reserved.
          </div>

          {/* Policy Links */}
          <div className="flex flex-wrap gap-4 text-[#A39E93]">
            <a href="#nirman" className="hover:text-[#D4AF37]">Terms of Seva</a>
            <span>•</span>
            <a href="#ngo-seva" className="hover:text-[#D4AF37]">80G Tax Policy</a>
            <span>•</span>
            <a href="#track" className="hover:text-[#D4AF37]">UTR Reconciliation</a>
            <span>•</span>
            <a href="#contact" className="hover:text-[#D4AF37]">Grievance Redressal</a>
          </div>

          <div className="text-[#D4AF37]/80">
            GIGW 3.0 & WCAG 2.1 AA Compliant Sanctuary
          </div>
        </div>
      </div>
    </footer>
  );
}
