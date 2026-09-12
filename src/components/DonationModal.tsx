'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SITE_CONFIG } from '@/config/site';
import { generateQrMatrix, generateQrSvgPath } from '@/utils/qr';

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

  // Derive initial amount based on props
  const getInitialAmount = () => {
    if (initialAmount && initialAmount > 0) return initialAmount;
    const item = SITE_CONFIG.itemizedSeva.find((s) => s.id === initialSevaId);
    if (item) return item.amount;
    const ngo = SITE_CONFIG.ngoSeva.find((s) => s.id === initialSevaId);
    if (ngo && ngo.presets[0]) return ngo.presets[0].amount;
    return 1100;
  };

  const [amount, setAmount] = useState<number>(getInitialAmount());
  const [customAmountStr, setCustomAmountStr] = useState<string>(getInitialAmount().toString());
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [donorGotra, setDonorGotra] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedReceiptNo, setGeneratedReceiptNo] = useState('');

  // Sync state whenever modal opens or props change
  useEffect(() => {
    if (isOpen) {
      const newAmt = getInitialAmount();
      setAmount(newAmt);
      setCustomAmountStr(newAmt.toString());
      setIsSuccess(false);
    }
  }, [isOpen, initialSevaId, initialAmount]);

  // Find active seva item if any
  const matchedItemized = SITE_CONFIG.itemizedSeva.find((s) => s.id === initialSevaId);
  const matchedNgo = SITE_CONFIG.ngoSeva.find((s) => s.id === initialSevaId);
  const currentSevaTitle = matchedItemized
    ? (language === 'hi' ? matchedItemized.hindiTitle : matchedItemized.title)
    : matchedNgo
    ? (language === 'hi' ? matchedNgo.hindiTitle : matchedNgo.title)
    : (language === 'hi' ? 'पावन मंदिर निर्माण सेवा' : 'Mandir Nirman Seva');

  // Dynamic UPI Payment URL following NPCI standard
  const upiUrl = `upi://pay?pa=${SITE_CONFIG.payment.upiId}&pn=${encodeURIComponent(
    'SHREE TRINETRA MAHAKAL MANDIR TRUST'
  )}&am=${amount || 0}&cu=INR&tn=${encodeURIComponent(
    `Mandir Seva - ${currentSevaTitle.slice(0, 25)}`
  )}`;

  // Pure SVG QR Vector generation
  const qrSvg = useMemo(() => {
    if (!isOpen || !amount) return null;
    try {
      const matrix = generateQrMatrix(upiUrl);
      return generateQrSvgPath(matrix);
    } catch (err) {
      console.error('Failed to generate pure QR vector:', err);
      return null;
    }
  }, [upiUrl, isOpen, amount]);

  if (!isOpen) return null;

  const handleCopy = (text: string, field: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleAmountSelect = (amt: number) => {
    setAmount(amt);
    setCustomAmountStr(amt.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmountStr(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const handleAddAmount = (extra: number) => {
    const newAmt = (amount || 0) + extra;
    setAmount(newAmt);
    setCustomAmountStr(newAmt.toString());
  };

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorPhone.trim() || !utrNumber.trim()) {
      alert(language === 'hi' ? 'कृपया सभी आवश्यक विवरण भरें।' : 'Please fill all required fields.');
      return;
    }
    const receipt = `TM-80G-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedReceiptNo(receipt);
    setIsSuccess(true);
  };

  const handleRazorpayMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorPhone.trim()) {
      alert(language === 'hi' ? 'कृपया अपना नाम एवं संपर्क नंबर दर्ज करें।' : 'Please enter your name and contact number.');
      return;
    }
    const receipt = `RZP-80G-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedReceiptNo(receipt);
    setIsSuccess(true);
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `
================================================================================
           SHRI TRINETRA MAHAKAL MANDIR & CHARITABLE TRUST
                PROVISIONAL 80G TAX EXEMPTION RECEIPT
================================================================================
Receipt No:      ${generatedReceiptNo}
Date & Time:     ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
Trust Reg No:    ${SITE_CONFIG.trust.registrationNo}
Section 80G No:  ${SITE_CONFIG.trust.section80GNo}
Section 12A No:  ${SITE_CONFIG.trust.section12ANo}
NITI Darpan ID:  ${SITE_CONFIG.trust.nitiAayogDarpanId}

DEVOTEE DETAILS:
--------------------------------------------------------------------------------
Name:            ${donorName || 'Devotee of Trinetra Mahakal'}
Mobile/WhatsApp: ${donorPhone || 'N/A'}
Gotra:           ${donorGotra || 'Kashyapa / Devotee Gotra'}
PAN Number:      ${donorPan || 'NOT PROVIDED (Tax exemption subject to PAN verification)'}

SEVA & CONTRIBUTION:
--------------------------------------------------------------------------------
Seva Type:       ${currentSevaTitle}
Amount:          INR ₹${amount.toLocaleString('en-IN')} (Rupees ${amount} Only)
Payment Mode:    ${activeTab === 'upi_qr' ? 'Direct UPI / Bank Transfer' : 'Razorpay Secure Gateway'}
Reference/UTR:   ${utrNumber || 'RZP-DIRECT-AUTH'}
Tax Exemption:   Eligible for 50% deduction under Section 80G of Income Tax Act 1961

BLESSING SHLOKA:
--------------------------------------------------------------------------------
"ॐ हौं जूँ सः भूर्भुवः स्वः त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।
उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥"

May Bhagwan Trinetra Mahakal bestow health, longevity, fearlessness,
and supreme prosperity upon your family.
================================================================================
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedReceiptNo}_Trinetra_Mahakal_80G.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Preset donation amounts
  const standardPresets = [350, 1100, 2100, 5100, 11000, 21000];
  const allPresets = Array.from(new Set([...standardPresets, amount])).sort((a, b) => a - b);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#181C26] via-[#12151E] to-[#0D0F13] rounded-2xl border border-[#D4AF37]/40 shadow-2xl p-5 sm:p-8 my-6 text-left max-h-[92vh] overflow-y-auto">
        {/* Ornate Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-2xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] rounded-br-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#0D0F12] border border-[#D4AF37]/30 text-[#A39E93] hover:text-white hover:border-[#D4AF37] hover:bg-[#1E232E] transition-all flex items-center justify-center text-sm shadow-md"
          aria-label="Close Donation Modal"
        >
          ✕
        </button>

        {isSuccess ? (
          /* Success Screen: Consecrated 80G Tax Exemption Receipt */
          <div className="py-4 space-y-6 text-center animate-fadeIn">
            {/* Auspicious Consecration Badge */}
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#046A38] to-[#024021] border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-4xl shadow-xl">
                ✓
              </div>
              <span className="absolute -bottom-1 -right-1 text-xl">🔱</span>
            </div>

            <div>
              <span className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                {language === 'hi' ? '॥ श्री त्रिनेत्र महाकाल विजयते ॥' : '॥ Om Shri Trinetra Mahakalay Namah ॥'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1EA]">
                {language === 'hi' ? 'संकल्प एवं सहयोग विधिवत दर्ज हुआ' : 'Seva Contribution Consecrated'}
              </h3>
              <p className="text-xs sm:text-sm text-[#A39E93] max-w-lg mx-auto mt-2 leading-relaxed">
                {language === 'hi'
                  ? `भगवान त्रिनेत्र महाकाल की कृपा आपके कुल पर सदा बनी रहे। आपका संदर्भ संख्या (${utrNumber || 'RZP-ONLINE'}) मंदिर ट्रस्ट के खाता बही में दर्ज हो चुका है।`
                  : `May Bhagwan Trinetra Mahakal shower fearlessness and prosperity upon your family. Your donation reference (${utrNumber || 'RZP-ONLINE'}) is recorded.`}
              </p>
            </div>

            {/* Sacred 80G Certificate Card */}
            <div className="bg-[#090B0E] rounded-xl border-2 border-[#D4AF37]/60 p-5 sm:p-6 text-left max-w-xl mx-auto space-y-4 shadow-inner relative overflow-hidden">
              {/* Background Watermark Trishul */}
              <div className="absolute right-4 bottom-2 text-8xl opacity-5 pointer-events-none text-[#D4AF37]">
                🔱
              </div>

              {/* Certificate Header */}
              <div className="flex flex-wrap justify-between items-center border-b border-[#D4AF37]/30 pb-3 gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#D4AF37] block">
                    {SITE_CONFIG.trust.registeredName}
                  </span>
                  <span className="text-xs font-serif font-bold text-[#F4F1EA]">
                    80G PROVISIONAL TAX EXEMPTION CERTIFICATE
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#A39E93] block">Receipt ID</span>
                  <span className="text-xs font-mono font-bold text-[#34A853]">{generatedReceiptNo}</span>
                </div>
              </div>

              {/* Devotee & Transaction Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#A39E93] text-[11px] block">Devotee / Yajman:</span>
                  <span className="text-[#F4F1EA] font-semibold">{donorName || 'Shri Devotee'}</span>
                </div>
                <div>
                  <span className="text-[#A39E93] text-[11px] block">Family Gotra:</span>
                  <span className="text-[#D4AF37] font-semibold">{donorGotra || 'Kashyapa / Gotra'}</span>
                </div>
                <div>
                  <span className="text-[#A39E93] text-[11px] block">PAN Number:</span>
                  <span className="text-[#F4F1EA] font-mono font-semibold">{donorPan || 'NOT PROVIDED'}</span>
                </div>
                <div>
                  <span className="text-[#A39E93] text-[11px] block">Mobile / WhatsApp:</span>
                  <span className="text-[#F4F1EA] font-mono">{donorPhone || 'N/A'}</span>
                </div>
                <div className="col-span-2 bg-[#12151D] p-2.5 rounded border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-[#A39E93] uppercase block">Consecrated Seva:</span>
                    <span className="text-xs font-bold text-[#F4F1EA]">{currentSevaTitle}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#A39E93] uppercase block">Amount:</span>
                    <span className="text-base font-bold text-[#34A853]">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Statutory Compliance Footer */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap justify-between items-center gap-2 text-[10px] text-[#A39E93]">
                <span>Trust Reg: {SITE_CONFIG.trust.registrationNo}</span>
                <span className="text-[#34A853] font-semibold">✓ 50% Tax Exempt under Sec 80G</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadReceipt}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#E2C365] to-[#B38F1E] hover:from-[#E2C365] hover:to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>📥</span>
                <span>{language === 'hi' ? '८०जी रसीद डाउनलोड करें' : 'Download 80G Receipt'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-[#161A22] border border-white/20 text-[#A39E93] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                {language === 'hi' ? 'मंदिर पृष्ठ पर वापस जाएं' : 'Return to Sanctuary'}
              </button>
            </div>
          </div>
        ) : (
          /* Payment Intake Flow */
          <div className="space-y-6">
            {/* Modal Header & Trust Badge */}
            <div className="border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#046A38]/20 border border-[#34A853]/40 text-[#34A853] text-[10px] font-bold uppercase tracking-wider">
                  ✓ Section 80G Tax Exempt
                </span>
                <span className="text-[11px] text-[#D4AF37] font-serif">
                  {SITE_CONFIG.trust.registeredName}
                </span>
              </div>
              <h3 id="donation-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-[#F4F1EA]">
                {language === 'hi'
                  ? 'पावन मंदिर निर्माण एवं धर्मार्थ सेवा संकल्प'
                  : 'Mandir Nirman & Seva Contribution'}
              </h3>
            </div>

            {/* Active Seva Highlight Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#1E2330] via-[#171B26] to-[#12151E] border border-[#D4AF37]/35 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0D0F12] border border-[#D4AF37]/40 flex items-center justify-center text-xl shadow-inner shrink-0">
                  {matchedItemized ? '🪨' : matchedNgo ? '🍲' : '🔱'}
                </div>
                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-bold block">
                    {language === 'hi' ? 'चयनित पावन सेवा:' : 'Selected Seva:'}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#F4F1EA]">
                    {currentSevaTitle}
                  </h4>
                </div>
              </div>
              <div className="text-right ml-auto sm:ml-0">
                <span className="text-[10px] text-[#A39E93] uppercase block">
                  {language === 'hi' ? 'संकल्प राशि' : 'Seva Amount'}
                </span>
                <span className="text-base font-serif font-bold text-[#D4AF37]">
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Seva Amount Picker & Custom Amount Field */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#F4F1EA]">
                {language === 'hi' ? 'सेवा राशि चुनें अथवा अपनी इच्छा अनुसार दर्ज करें:' : 'Choose or Enter Seva Devotion Amount (₹):'}
              </label>

              {/* Preset Chips */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {allPresets.map((amt) => {
                  const isSelected = amount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold transition-all border flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#C83A22] to-[#961F0F] text-white border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/50 scale-[1.02]'
                          : 'bg-[#0D0F12] text-[#A39E93] border-white/10 hover:border-[#D4AF37]/50 hover:text-white'
                      }`}
                    >
                      <span>₹{amt.toLocaleString('en-IN')}</span>
                      {isSelected && <span className="text-[9px] text-[#D4AF37] leading-none mt-0.5">●</span>}
                    </button>
                  );
                })}
              </div>

              {/* Elegant Custom Amount Input with Quick Add Chips */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="text-base font-bold text-[#D4AF37] font-serif">₹</span>
                  </div>
                  <input
                    type="number"
                    min="51"
                    step="1"
                    value={customAmountStr}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter custom devotion amount"
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-[#0D0F12] border border-[#D4AF37]/30 text-sm text-[#F4F1EA] font-mono font-bold focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>

                {/* Quick Increment Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleAddAmount(500)}
                    className="px-2.5 py-2 rounded bg-[#161A22] hover:bg-[#202633] text-[#D4AF37] text-xs font-semibold border border-white/10 transition-colors"
                  >
                    +₹500
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddAmount(1000)}
                    className="px-2.5 py-2 rounded bg-[#161A22] hover:bg-[#202633] text-[#D4AF37] text-xs font-semibold border border-white/10 transition-colors"
                  >
                    +₹1,000
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddAmount(5000)}
                    className="px-2.5 py-2 rounded bg-[#161A22] hover:bg-[#202633] text-[#D4AF37] text-xs font-semibold border border-white/10 transition-colors"
                  >
                    +₹5,000
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 p-1.5 bg-[#0A0C10] rounded-xl border border-[#D4AF37]/25 shadow-inner gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('upi_qr')}
                className={`py-2.5 px-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'upi_qr'
                    ? 'bg-gradient-to-r from-[#1A202C] to-[#141822] text-[#D4AF37] shadow-md border border-[#D4AF37]/50'
                    : 'text-[#A39E93] hover:text-white'
                }`}
              >
                <span>📱</span>
                <span className="truncate">Direct UPI QR & Bank (0% Fee)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('razorpay')}
                className={`py-2.5 px-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'razorpay'
                    ? 'bg-gradient-to-r from-[#1A202C] to-[#141822] text-[#D4AF37] shadow-md border border-[#D4AF37]/50'
                    : 'text-[#A39E93] hover:text-white'
                }`}
              >
                <span>💳</span>
                <span className="truncate">Cards & NetBanking</span>
              </button>
            </div>

            {activeTab === 'upi_qr' ? (
              /* RAIL 1: DIRECT MANDIR UPI QR + UTR RECEIPT FORM */
              <div className="space-y-6">
                {/* Step 1: QR & Bank Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#0A0C10] border border-white/10 shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                      <span>🔱</span>
                      <span>{language === 'hi' ? 'चरण १: क्यूआर स्कैन करें या बैंक में ट्रांसफर करें' : 'Step 1: Scan & Pay with Any UPI App'}</span>
                    </span>
                    <span className="text-[11px] text-[#34A853] font-semibold">
                      0% Gateway Fee
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    {/* Left: Dynamic High-Resolution Vector QR Code */}
                    <div className="sm:col-span-5 flex flex-col items-center justify-center p-3.5 bg-white rounded-xl shadow-lg relative group">
                      {qrSvg ? (
                        <div className="relative flex flex-col items-center">
                          <svg
                            viewBox={`-2 -2 ${qrSvg.size + 4} ${qrSvg.size + 4}`}
                            className="w-40 h-40 sm:w-44 sm:h-44 object-contain"
                            shapeRendering="crispEdges"
                          >
                            <rect
                              x="-2"
                              y="-2"
                              width={qrSvg.size + 4}
                              height={qrSvg.size + 4}
                              fill="#FFFFFF"
                            />
                            <path d={qrSvg.path} fill="#0D0F12" />
                          </svg>
                          {/* Centered Micro Seal */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center text-sm shadow-xs pointer-events-none">
                            🔱
                          </div>
                        </div>
                      ) : (
                        <div className="w-40 h-40 flex items-center justify-center text-xs text-black font-semibold">
                          Scan to Pay
                        </div>
                      )}

                      <div className="w-full text-center mt-2 pt-1.5 border-t border-gray-200">
                        <span className="text-[11px] text-gray-900 font-bold block">
                          ₹{amount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-gray-600 font-medium">
                          GPay • PhonePe • Paytm • BHIM
                        </span>
                      </div>

                      {/* Mobile Deep-Link Trigger */}
                      <a
                        href={upiUrl}
                        className="mt-2.5 w-full py-1.5 px-2 rounded bg-[#0D0F12] hover:bg-[#1E232E] text-white text-[11px] font-bold text-center transition-colors flex items-center justify-center gap-1 sm:hidden shadow-xs"
                      >
                        <span>⚡</span>
                        <span>Open in UPI App</span>
                      </a>
                    </div>

                    {/* Right: Bank Details with 1-Click Copy */}
                    <div className="sm:col-span-7 space-y-2.5 text-xs">
                      <div>
                        <span className="text-[#A39E93] text-[11px] block mb-1">Official Mandir UPI ID:</span>
                        <div className="flex items-center justify-between font-mono font-bold text-[#F4F1EA] bg-[#141822] px-3 py-2 rounded-lg border border-white/15">
                          <span className="text-xs sm:text-sm text-[#D4AF37]">{SITE_CONFIG.payment.upiId}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(SITE_CONFIG.payment.upiId, 'upi')}
                            className="px-2.5 py-1 rounded bg-[#0D0F12] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-[11px] transition-all"
                          >
                            {copiedField === 'upi' ? 'Copied! ✓' : 'Copy UPI'}
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-[#A39E93] text-[11px] block mb-1">State Bank of India (SBI) Account:</span>
                        <div className="flex items-center justify-between font-mono font-bold text-[#F4F1EA] bg-[#141822] px-3 py-2 rounded-lg border border-white/15">
                          <span className="text-xs sm:text-sm">{SITE_CONFIG.payment.accountNumber}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(SITE_CONFIG.payment.accountNumber, 'acc')}
                            className="px-2.5 py-1 rounded bg-[#0D0F12] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-[11px] transition-all"
                          >
                            {copiedField === 'acc' ? 'Copied! ✓' : 'Copy Acc'}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-[#141822] p-2.5 rounded-lg border border-white/10 text-[11px]">
                        <div>
                          <span className="text-[#A39E93] block">IFSC Code:</span>
                          <span className="font-mono font-bold text-[#F4F1EA]">{SITE_CONFIG.payment.ifscCode}</span>
                        </div>
                        <div>
                          <span className="text-[#A39E93] block">Account Type:</span>
                          <span className="font-semibold text-[#F4F1EA]">Charitable Trust</span>
                        </div>
                        <div className="col-span-2 pt-1 border-t border-white/10">
                          <span className="text-[#A39E93] block text-[10px]">Beneficiary Name:</span>
                          <span className="font-semibold text-[#D4AF37] truncate block">{SITE_CONFIG.payment.accountName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: 60-Second UTR Verification & 80G Form */}
                <form onSubmit={handleProofSubmit} className="p-4 sm:p-5 rounded-xl bg-[#0A0C10] border border-[#D4AF37]/30 shadow-lg space-y-4">
                  <div className="border-b border-white/10 pb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#34A853] flex items-center gap-1.5">
                      <span>📝</span>
                      <span>{language === 'hi' ? 'चरण २: ८०जी रसीद हेतु UTR संदर्भ एवं यजमान विवरण दर्ज करें' : 'Step 2: Submit UTR Reference for 80G Receipt'}</span>
                    </span>
                    <p className="text-[11px] text-[#A39E93] mt-1">
                      {language === 'hi'
                        ? 'भुगतान पश्चात अपने यूपीआई / बैंक ऐप में प्रदर्शित १२-अंकीय UTR नंबर यहां दर्ज करें।'
                        : 'Enter the 12-digit UTR / UPI Reference ID from your payment confirmation to generate your instant 80G tax receipt.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] text-[#A39E93] mb-1">
                        {language === 'hi' ? 'यजमान / भक्त का पूरा नाम *' : 'Devotee Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar Sharma"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#141822] border border-white/15 text-xs text-white placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#A39E93] mb-1">
                        {language === 'hi' ? 'मोबाइल / व्हाट्सएप नंबर *' : 'Mobile / WhatsApp Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#141822] border border-white/15 text-xs text-white placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#A39E93] mb-1">
                        {language === 'hi' ? 'गोत्र (शिला / संकल्प हेतु - ऐच्छिक)' : 'Family Gotra (Optional for Sankalpa)'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kashyapa / Vashistha"
                        value={donorGotra}
                        onChange={(e) => setDonorGotra(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#141822] border border-white/15 text-xs text-white placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#A39E93] mb-1">
                        {language === 'hi' ? 'पैन कार्ड नंबर (८०जी कर छूट हेतु - ऐच्छिक)' : 'PAN Number (Optional, for 80G Tax Deduction)'}
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        placeholder="e.g. ABCDE1234F"
                        value={donorPan}
                        onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#141822] border border-white/15 text-xs text-white font-mono uppercase placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-[#D4AF37] font-semibold mb-1">
                        {language === 'hi' ? '१२-अंकीय बैंक UTR / UPI संदर्भ संख्या *' : '12-Digit Bank UTR / UPI Reference Number *'}
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={22}
                        placeholder="e.g. 423981298412"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#141822] border border-[#D4AF37]/50 text-xs text-white font-mono placeholder-[#A39E93]/60 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#C83A22] via-[#B32412] to-[#8E1C0E] hover:from-[#D63E26] hover:to-[#9E2010] text-[#F4F1EA] font-bold text-xs uppercase tracking-wider shadow-lg border border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>✨</span>
                    <span>{language === 'hi' ? 'सत्यापित करें एवं ८०जी रसीद प्राप्त करें' : 'Verify & Generate 80G Tax Receipt'}</span>
                  </button>
                </form>
              </div>
            ) : (
              /* RAIL 2: RAZORPAY ZERO-TRUST GATEWAY FLOW */
              <form onSubmit={handleRazorpayMockSubmit} className="p-5 rounded-xl bg-[#0A0C10] border border-[#D4AF37]/30 shadow-lg space-y-5 text-center">
                <div className="w-14 h-14 rounded-full bg-[#141822] border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-2xl shadow-inner">
                  🔒
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-[#F4F1EA]">
                    Razorpay Zero-Trust Payment Rail
                  </h4>
                  <p className="text-xs text-[#A39E93] max-w-md mx-auto mt-1 leading-relaxed">
                    Instant automated devotion via Debit Cards, Credit Cards, 50+ NetBanking banks, RuPay, and International cards.
                  </p>
                </div>

                {/* Quick Devotee Inputs for Razorpay Receipt */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
                  <div>
                    <label className="block text-[11px] text-[#A39E93] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Devotee Name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#141822] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A39E93] mb-1">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#141822] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A39E93] mb-1">Email (For Receipt)</label>
                    <input
                      type="email"
                      placeholder="devotee@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#141822] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A39E93] mb-1">PAN (Optional for 80G)</label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 rounded bg-[#141822] border border-white/15 text-xs text-white font-mono uppercase focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#141822] rounded-lg border border-white/10 max-w-md mx-auto flex justify-between items-center text-xs">
                  <span className="text-[#A39E93]">Total Devotion Amount:</span>
                  <span className="text-base font-bold text-[#D4AF37] font-serif">₹{amount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-center gap-2 text-[10px] text-[#A39E93]">
                  <span>💳 RuPay</span>
                  <span>•</span>
                  <span>Visa / MasterCard</span>
                  <span>•</span>
                  <span>NetBanking</span>
                  <span>•</span>
                  <span>Int'l Cards</span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#0052CC] to-[#003B99] hover:from-[#0065FF] hover:to-[#0052CC] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-[0.98]"
                >
                  Proceed to Pay ₹{amount.toLocaleString('en-IN')} with Razorpay
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
