import type { Metadata } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.trust.registeredName}`,
  description:
    'Official digital sanctuary for Shri Trinetra Mahakal Mandir construction, authentic Vedic Yagya for Tantrik Badha relief, and registered NGO Anna Daan & Shiksha Seva with 80G tax exemption.',
  keywords: [
    'Trinetra Mahakal',
    'Mahakal Mandir Construction',
    'Shila Daan',
    'Vedic Yagya',
    'Tantrik Badha Nivaran',
    'Paranormal Protection Shiva',
    'Anna Daan Bhandara',
    '80G Donation',
    'Garbhagriha Construction',
  ],
  authors: [{ name: SITE_CONFIG.trust.registeredName }],
  openGraph: {
    title: `${SITE_CONFIG.name} - Mandir Nirman & Vedic Yagya`,
    description:
      'Consecrate your sacred Shila in the Garbhagriha of Bhagwan Trinetra Mahakal. Authentic Vedic Yagya for Tantrik Badha relief & registered NGO Anna Daan.',
    url: 'https://trinetramahakal.org',
    siteName: SITE_CONFIG.name,
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="font-scale-md">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0D0F12] text-[#F4F1EA] antialiased selection:bg-[#C83A22] selection:text-white">
        {children}
      </body>
    </html>
  );
}
