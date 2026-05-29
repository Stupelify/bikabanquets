import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-10 py-32">
      <span className="text-[11px] tracking-[4px] uppercase text-gold font-medium mb-4 inline-flex items-center gap-3">
        <span className="w-6 h-px bg-gold" />
        404
      </span>
      <h1 className="font-serif font-light text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.02em] mb-6">
        Page Not Found
      </h1>
      <p className="text-cream-dim text-base max-w-md mb-10 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist. Try navigating back to the homepage or exploring our venues.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="inline-flex items-center gap-3 bg-gold text-bg px-8 py-4 rounded-full text-xs tracking-widest uppercase font-semibold hover:bg-gold-bright transition-all duration-300">
          Back to Home
        </Link>
        <Link href="/venues" className="inline-flex items-center gap-3 border border-line-strong text-cream px-8 py-4 rounded-full text-xs tracking-widest uppercase font-light hover:border-gold hover:text-gold transition-all duration-300">
          Explore Venues
        </Link>
      </div>
    </div>
  );
}
