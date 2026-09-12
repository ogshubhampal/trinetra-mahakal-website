import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F4F1EA] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#161A22] border border-[#D4AF37]/50 flex items-center justify-center text-3xl mb-4">
        🕉️
      </div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1EA] mb-2">
        Page Not Found | पृष्ठ उपलब्ध नहीं है
      </h2>
      <p className="text-xs sm:text-sm text-[#A39E93] max-w-md mb-6">
        The sacred page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-lg bg-[#C83A22] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#B32412] transition-all"
      >
        Return to Sanctum Sanctuary
      </Link>
    </div>
  );
}
