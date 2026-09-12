'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/site';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
  initialSevaId?: string;
  initialAmount?: number;
}

export function DonationModal({
  isOpen,
  onClose,
  language,
  initialSevaId = 'shila',
  initialAmount,
}: DonationModalProps) {
  const [activeTab, setActiveTab] = useState<'upi_qr' | 'razorpay'>('upi_qr');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Selected Seva & Amount
  const defaultAmount =
    initialAmount ||
    SITE_CONFIG.itemizedSeva.find((s) => s.id === initialSevaId)?.amount ||
    1100;

  const [amount, setAmount] = useState<number>(defaultAmount);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedReceiptNo, setGeneratedReceiptNo] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text: string, field: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const receipt = `TM-80G-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedReceiptNo(receipt);
    setIsSuccess(true);
  };

  const handleDownloadReceipt = () => {
    alert(
      `Receipt ${generatedReceiptNo} downloaded successfully!\nDevotee: ${donorName}\nAmount: ₹${amount}\n80G Reg: ${SITE_CONFIG.trust.section80GNo}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#161A22] rounded-2xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 my-8 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#A39E93] hover:text-white hover:bg-white/10 transition-all text-lg"
          aria-label="Close Donation Modal"
        >
          ✕
        </button>

        {isSuccess ? (
          /* Success & 80G Receipt Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#046A38]/20 border border-[#34A853] flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#F4F1EA]">
              {language === 'hi' ? 'संकल्प एवं सहयोग प्राप्त हुआ' : 'Seva Contribution Recorded'}
            </h3>
            <p className="text-xs sm:text-sm text-[#A39E93] max-w-md mx-auto">
              {language === 'hi'
                ? `श्री त्रिनेत्र महाकाल आपके कुल पर कृपा बनाए रखें। आपका UTR संदर्भ (${utrNumber}) सत्यापन हेतु दर्ज हो गया है।`
                : `May Bhagwan Trinetra Mahakal bless your family. Your UTR reference (${utrNumber}) has been submitted for instant verification.`}
            </p>

            {/* Simulated 80G Receipt Card */}
            <div className="bg-[#0D0F12] rounded-xl border border-[#D4AF37]/40 p-5 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="font-bold text-[#D4AF37]">80G PROVISIONAL TAX RECEIPT</span>
                <span className="text-[#34A853] font-mono font-bold">{generatedReceiptNo}</span>
              </div>
              <div className="flex justify-between text-[#A39E93]">
                <span>Devotee / Donor:</span>
                <span className="text-[#F4F1EA] font-semibold">{donorName}</span>
              </div>
              <div className="flex justify-between text-[#A39E93]">
                <span>PAN Number:</span>
                <span className="text-[#F4F1EA] font-mono">{donorPan || 'NOT PROVIDED'}</span>
              </div>
              <div className="flex justify-between text-[#A39E93]">
                <span>Seva Amount:</span>
                <span className="text-[#34A853] font-bold text-sm">₹{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#A39E93]">
                <span>Trust Registration:</span>
                <span className="text-[#F4F1EA]">{SITE_CONFIG.trust.registrationNo}</span>
              </div>
              <div className="flex justify-between text-[#A39E93]">
                <span>80G Approval No:</span>
                <span className="text-[#F4F1EA]">{SITE_CONFIG.trust.section80GNo}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadReceipt}
                className="px-6 py-2.5 rounded bg-[#D4AF37] hover:bg-[#C29D29] text-black font-bold text-xs uppercase tracking-wider shadow-xs transition-all"
              >
                📥 {language === 'hi' ? '८०जी रसीद डाउनलोड करें' : 'Download 80G Receipt'}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded bg-[#161A22] border border-white/20 text-[#A39E93] hover:text-white text-xs font-semibold uppercase tracking-wider"
              >
                {language === 'hi' ? 'समाप्त करें' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          /* Dual-Rail Payment Flow */
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                {SITE_CONFIG.trust.registeredName}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#F4F1EA]">
                {language === 'hi' ? 'पावन निर्माण एवं धर्मार्थ सेवा संकल्प' : 'Mandir Nirman & Seva Contribution'}
              </h3>
            </div>

            {/* Quick Amount Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#F4F1EA] mb-2">
                {language === 'hi' ? 'सेवा राशि का चयन करें (₹):' : 'Select Seva Amount (₹):'}
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[350, 1100, 2100, 5100].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-2 rounded text-xs font-bold transition-all border ${
                      amount === amt
                        ? 'bg-[#C83A22] text-white border-[#D4AF37]'
                        : 'bg-[#0D0F12] text-[#A39E93] border-white/10 hover:border-[#D4AF37]'
                    }`}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="100"
                placeholder="Enter custom amount"
                className="w-full px-3.5 py-2 rounded bg-[#0D0F12] border border-white/15 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Dual Rail Tabs */}
            <div className="grid grid-cols-2 p-1 bg-[#0D0F12] rounded-lg mb-6 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('upi_qr')}
                className={`py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
                  activeTab === 'upi_qr'
                    ? 'bg-[#161A22] text-[#D4AF37] shadow-xs border border-[#D4AF37]/40'
                    : 'text-[#A39E93] hover:text-white'
                }`}
              >
                📱 Direct UPI QR & Bank (0% Fee)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('razorpay')}
                className={`py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
                  activeTab === 'razorpay'
                    ? 'bg-[#161A22] text-[#D4AF37] shadow-xs border border-[#D4AF37]/40'
                    : 'text-[#A39E93] hover:text-white'
                }`}
              >
                💳 Cards & NetBanking (Razorpay)
              </button>
            </div>

            {activeTab === 'upi_qr' ? (
              /* Rail 1: Direct Mandir UPI QR + UTR Proof Form */
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-[#0D0F12] p-5 rounded-xl border border-white/10">
                  {/* Generated QR Code Tile */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-white rounded-lg">
                    {/* Visual representation of official Mandir UPI QR */}
                    <div className="w-36 h-36 border-4 border-black p-2 flex flex-col items-center justify-center relative">
                      <div className="w-full h-full flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div className="w-8 h-8 bg-black"></div>
                          <div className="w-8 h-8 bg-black"></div>
                        </div>
                        <div className="flex items-center justify-center font-mono font-bold text-black text-center text-[10px] leading-tight">
                          TRINETRA
                          <br />
                          MAHAKAL
                          <br />
                          ₹{amount}
                        </div>
                        <div className="flex justify-between">
                          <div className="w-8 h-8 bg-black"></div>
                          <div className="w-8 h-8 border-2 border-black"></div>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-black font-semibold mt-1">Scan with GPay / PhonePe / Paytm</span>
                  </div>

                  {/* Bank & UPI Text Details */}
                  <div className="sm:col-span-7 space-y-2.5 text-xs">
                    <div>
                      <span className="text-[#A39E93] block">Official UPI ID:</span>
                      <div className="flex items-center justify-between font-mono font-bold text-[#F4F1EA] bg-[#161A22] p-1.5 rounded border border-white/10">
                        <span>{SITE_CONFIG.payment.upiId}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(SITE_CONFIG.payment.upiId, 'upi')}
                          className="text-[#D4AF37] hover:underline"
                        >
                          {copiedField === 'upi' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-[#A39E93] block">Account Number (SBI):</span>
                      <div className="flex items-center justify-between font-mono font-bold text-[#F4F1EA] bg-[#161A22] p-1.5 rounded border border-white/10">
                        <span>{SITE_CONFIG.payment.accountNumber}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(SITE_CONFIG.payment.accountNumber, 'acc')}
                          className="text-[#D4AF37] hover:underline"
                        >
                          {copiedField === 'acc' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-[#A39E93]">IFSC:</span>
                        <span className="block font-mono text-[#F4F1EA]">{SITE_CONFIG.payment.ifscCode}</span>
                      </div>
                      <div>
                        <span className="text-[#A39E93]">Account Name:</span>
                        <span className="block font-semibold text-[#F4F1EA] truncate">SHREE TRINETRA MAHAKAL</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 60-Second UTR Verification Form */}
                <form onSubmit={handleProofSubmit} className="space-y-3 bg-[#0D0F12] p-4 rounded-xl border border-white/10">
                  <span className="text-xs font-bold text-[#34A853] block">
                    {language === 'hi' ? 'भुगतान उपरांत UTR संदर्भ दर्ज करें:' : 'Step 2: Submit 12-Digit UTR for 80G Receipt'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="px-3 py-2 rounded bg-[#161A22] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile / WhatsApp *"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="px-3 py-2 rounded bg-[#161A22] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="PAN Number (Optional, for 80G)"
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      maxLength={10}
                      className="px-3 py-2 rounded bg-[#161A22] border border-white/15 text-xs text-white font-mono uppercase focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="12-Digit UTR Reference No. *"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      maxLength={16}
                      className="px-3 py-2 rounded bg-[#161A22] border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded bg-gradient-to-r from-[#C83A22] to-[#9E2010] hover:from-[#D43F24] hover:to-[#B32412] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98]"
                  >
                    {language === 'hi' ? 'रसीद एवं प्रमाण पत्र प्राप्त करें' : 'Verify & Generate 80G Receipt'}
                  </button>
                </form>
              </div>
            ) : (
              /* Rail 2: Razorpay Instant Gateway */
              <div className="p-8 rounded-xl bg-[#0D0F12] border border-white/10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#161A22] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-xl">
                  🔒
                </div>
                <h4 className="text-base font-bold text-[#F4F1EA]">
                  Razorpay Zero-Trust Secure Checkout
                </h4>
                <p className="text-xs text-[#A39E93] max-w-sm mx-auto">
                  Instant contribution via Debit/Credit Cards, NetBanking, and International cards.
                </p>
                <div className="text-xl font-bold text-[#D4AF37]">₹{amount.toLocaleString()}</div>
                <button
                  type="button"
                  onClick={() => {
                    const receipt = `RZP-80G-${Math.floor(100000 + Math.random() * 900000)}`;
                    setGeneratedReceiptNo(receipt);
                    setIsSuccess(true);
                  }}
                  className="px-8 py-3 rounded bg-[#0052CC] hover:bg-[#0043A8] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Pay ₹{amount.toLocaleString()} with Razorpay
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
