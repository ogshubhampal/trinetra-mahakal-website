import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F4F1EA] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-[#161A22] border border-[#D4AF37]/50 flex items-center justify-center text-4xl mb-6 shadow-2xl">
        🔱
      </div>
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#D4AF37] mb-3">
        404 - पृष्ठ प्राप्त नहीं हुआ
      </h1>
      <p className="text-sm text-[#A39E93] max-w-md mb-8">
        The sacred page you are searching for does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#C83A22] to-[#9E2010] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:from-[#D43F24] hover:to-[#B32412] transition-all"
      >
        मंदिर मुख्य पृष्ठ पर लौटें (Return Home)
      </Link>
    </div>
  );
}
