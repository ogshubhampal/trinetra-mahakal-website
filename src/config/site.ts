/**
 * Site Configuration & Sovereign Trust Data
 * Shri Trinetra Mahakal Mandir & Registered Charitable Trust
 */

export const SITE_CONFIG = {
  name: 'Shri Trinetra Mahakal Mandir',
  hindiName: 'श्री त्रिनेत्र महाकाल मंदिर एवं धर्मार्थ ट्रस्ट',
  tagline: 'Sacred Mandir Construction, Vedic Yagya & Humanitarian Seva',
  hindiTagline: 'पावन मंदिर निर्माण, वैदिक महायज्ञ एवं सर्वकल्याणकारी धर्मार्थ सेवा',
  
  // Official Registered Trust Details (GIGW 3.0 / Sovereign Trust)
  trust: {
    registeredName: 'Trinetra Mahakal Dharmic & Charitable Trust',
    hindiRegisteredName: 'त्रिनेत्र महाकाल धार्मिक एवं जनकल्याण चैरिटेबल ट्रस्ट',
    registrationNo: 'REG/ND/TRUST/2024/78291',
    nitiAayogDarpanId: 'DL/2024/0391824',
    section80GNo: 'CIT(E)/80G/2024-25/DEL/99120',
    section12ANo: 'CIT(E)/12A/2024-25/DEL/44312',
    taxBenefitDescription: 'All donations are 50% tax exempt under Section 80G of the Indian Income Tax Act.',
    hindiTaxBenefit: 'सभी दान आयकर अधिनियम की धारा 80जी के तहत 50% कर मुक्त हैं।',
  },

  // Physical Pilgrimage & Mandir Coordinates
  location: {
    address: 'Shri Trinetra Mahakal Kshetra, Near Sacred Agni Kund Complex, Tapovan Marg',
    city: 'Ujjain / Haridwar Sanctuary Corridor',
    state: 'Madhya Pradesh / Uttarakhand',
    pincode: '456006',
    darshanTimings: '04:00 AM - 12:30 PM | 04:30 PM - 09:30 PM (Daily)',
    bhasmaAartiTimings: '04:15 AM (Morning Brahma Muhurta)',
    sandhyaAartiTimings: '07:00 PM (Evening Twilight)',
  },

  // Official Communication & Helpline Rails
  contact: {
    acharyaHelpline: '+91 78389 59553',
    whatsappSeva: '+91 78389 59553',
    tollFreeTrust: '+91 78389 59553',
    officialEmail: 'seva@trinetramahakal.org',
    treasuryEmail: 'treasury@trinetramahakal.org',
  },

  // Dual-Rail Payment Engine Configuration
  payment: {
    upiId: 'trinetramahakal@sbi',
    bankName: 'State Bank of India',
    accountName: 'SHREE TRINETRA MAHAKAL MANDIR TRUST',
    accountNumber: '419827364512',
    ifscCode: 'SBIN0001234',
    branch: 'Temple Sanctuary Branch',
    accountType: 'Current Account (Charitable Trust)',
  },

  // Construction Milestone Roadmap (From Neev to Shikhar)
  construction: {
    currentStatusSummary: 'Bhumi Pujan & Consecrated Neev (Foundation) Completed. Active fundraising for Garbhagriha (Sanctum) & Maha Yagyashala.',
    targetAmount: 5100000, // ₹51 Lakhs
    collectedAmount: 2150000, // ₹21.5 Lakhs
    shilasPledged: 842,
    mealsServed: 54200,
    phases: [
      {
        phaseNumber: 1,
        name: 'Bhumi Pujan & Consecration',
        hindiName: 'भूमि पूजन एवं भूमि शोधन',
        status: 'completed',
        completionDate: 'June 2024',
        progressPercent: 100,
        description: 'Vedic Bhoomi Shodhan, 108 Kanya Pujan, and sacred foundation consecration ceremonies conducted by initiated Vedic Acharyas.',
      },
      {
        phaseNumber: 2,
        name: 'Neev (Foundation Stone) Laying',
        hindiName: 'नीव स्थापना एवं आधार शिला',
        status: 'completed',
        completionDate: 'September 2024',
        progressPercent: 100,
        description: '12-foot reinforced basalt rock foundation with consecrated Navratna Shilas laid beneath the Garbhagriha sanctum ground.',
      },
      {
        phaseNumber: 3,
        name: 'Garbhagriha & Maha Yagyashala',
        hindiName: 'गर्भगृह एवं महा यज्ञशाला निर्माण',
        status: 'in_progress',
        completionDate: 'In Progress (Target: Q2 2025)',
        progressPercent: 42,
        description: 'Chiseled black granite sanctum walls, nine-sacred-fire (Navakunda) Vedic Yagyashala, and consecrated Jaladhari construction.',
      },
      {
        phaseNumber: 4,
        name: 'Sabha Mandap & Shikhar Kalash',
        hindiName: 'सभा मंडप, धर्मशाला एवं शिखर कलश',
        status: 'upcoming',
        completionDate: 'Upcoming (Target: 2026)',
        progressPercent: 0,
        description: 'Devotee meditation hall (Sabha Mandapa), Sadhu Dharamshala, 51-foot carved stone Shikhara, and Swarna Kalash Sthapana.',
      },
    ],
  },

  // Itemized Tangible Seva Packages (Radical Transparency)
  itemizedSeva: [
    {
      id: 'shila',
      title: '1 Sacred Shila (Foundation Stone)',
      hindiTitle: '१ पावन आधार शिला दान',
      amount: 1100,
      badge: 'Most Revered',
      description: 'Consecrated chiseled stone inscribed with your Gotra & Family Sankalpa permanently placed in the Mandir foundation.',
      deliverable: 'Digital Consecration Certificate + Consecrated Bhasma Prasad via Speed Post',
    },
    {
      id: 'cement',
      title: '1 Bag Sacred Temple Cement',
      hindiTitle: '१ बोरी पावन मंदिर निर्माण सीमेंट',
      amount: 350,
      badge: 'Micro Seva',
      description: 'Direct contribution to the sanctum wall mortar and reinforced pillar construction of the Garbhagriha.',
      deliverable: 'Instant 80G Tax Exemption Receipt + Name in Donors Wall',
    },
    {
      id: 'sqft',
      title: '1 Sq. Ft. Sanctum Floor',
      hindiTitle: '१ वर्ग फीट गर्भगृह शिला तल',
      amount: 2100,
      badge: 'Sacred Sanctum',
      description: 'Sponsor one square foot of the sacred black granite floor surrounding the holy Trinetra Mahakal Shiva Lingam.',
      deliverable: 'Donor Name Plaque Inscription + 80G Tax Exemption Certificate',
    },
    {
      id: 'pillar',
      title: '1 Maha Yagyashala Pillar Seva',
      hindiTitle: '१ महा यज्ञशाला स्तंभ सेवा',
      amount: 21000,
      badge: 'Grand Patron',
      description: 'Carved stone pillar bearing the sacred motifs of Bhagwan Shiva supporting the eternal Vedic Havan Kund pavilion.',
      deliverable: 'Permanent Family Stone Inscription + Annual Special Rudrabhishek Sankalpa',
    },
  ],

  // Registered NGO Humanitarian Seva Initiatives
  ngoSeva: [
    {
      id: 'anna_daan',
      title: 'Anna Daan (Mahaprasad Bhandara)',
      hindiTitle: 'अन्न दान महाप्रसाद भंडारा',
      costPerUnit: 25, // ₹25 per meal
      presets: [
        { count: 51, amount: 1275, label: 'Feed 51 Pilgrims / Sadhus' },
        { count: 101, amount: 2525, label: 'Feed 101 Devotees' },
        { count: 501, amount: 12525, label: 'Full Day Grand Bhandara' },
      ],
      description: 'Wholesome, satvik Mahaprasad prepared in pure desi ghee and distributed daily to visiting sadhus, pilgrims, and impoverished families.',
    },
    {
      id: 'granth_daan',
      title: 'Granth Daan (Vedic Literature)',
      hindiTitle: 'शास्त्र एवं भगवद्गीता वितरण',
      costPerUnit: 100, // ₹100 per Gita
      presets: [
        { count: 11, amount: 1100, label: '11 Holy Bhagavad Gitas' },
        { count: 51, amount: 5100, label: '51 Spiritual Granths' },
        { count: 108, amount: 10800, label: '108 Upanishad / Gita Sets' },
      ],
      description: 'Spreading Sanatana Dharma wisdom by placing authorized copies of the Bhagavad Gita and Vedic stotras in schools, ashrams, and youth centers.',
    },
    {
      id: 'shiksha_seva',
      title: 'Shiksha Seva (Education for Needy Children)',
      hindiTitle: 'निर्धन बालक शिक्षा एवं संस्कार सेवा',
      costPerUnit: 1500, // ₹1,500 per kit/child/month
      presets: [
        { count: 1, amount: 1500, label: 'Sponsor 1 Child (1 Month)' },
        { count: 5, amount: 7500, label: 'Sponsor 5 Children Study Kits' },
        { count: 11, amount: 16500, label: 'Digital Literacy & Coaching' },
      ],
      description: 'Free textbooks, stationery, uniform, and digital coaching for underprivileged children under the registered NGO educational wing.',
    },
  ],

  // Vedic Yagya & Tantrik Badha Nivaran Categories
  yagyaCategories: [
    {
      id: 'tantrik_badha',
      title: 'Tantrik Badha & Negative Energy Mukti',
      hindiTitle: 'तांत्रिक बाधा एवं नकारात्मक ऊर्जा मुक्ति',
      scripture: 'Atharva Veda & Shiva Maha Purana',
      description: 'Sacred Agni Havan using special samagri (Sarshap, Guggul, Bilva Patra) to dissolve occult afflictions, psychic attacks, and persistent house blockages.',
    },
    {
      id: 'paranormal',
      title: 'Paranormal Distress & Evil Eye (Nazar) Shanti',
      hindiTitle: 'अज्ञात भय, प्रेत बाधा एवं तीव्र दृष्टि दोष शमन',
      scripture: 'Bhairav & Rudra Yamala Tantra',
      description: 'Consecrated Mahamrityunjaya and Bhairav Kavach path performed to bestow unshakeable psychological fearlessness (Abhaya) and psychic shield.',
    },
    {
      id: 'graha_pitra_dosh',
      title: 'Severe Graha Dosha & Pitra Shanti',
      hindiTitle: 'कालसर्प, शनि पीड़ा एवं पितृ दोष निवारण',
      scripture: 'Vedic Samhita & Garud Purana',
      description: 'Calming planetary afflictions (Shani Sade Sati, Rahu/Ketu Dosh) through specialized herbal havan and tarpan in the sacred Yagyashala.',
    },
  ],
};
