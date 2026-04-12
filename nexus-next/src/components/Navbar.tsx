'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex justify-between items-center px-8 py-5 w-full max-w-screen-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-black uppercase font-headline">
            NEXUS AI
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-xs font-label uppercase tracking-widest text-primary hover:opacity-70 transition-opacity font-bold"
            >
              Gateway
            </Link>
            <Link
              href="#"
              className="text-xs font-label uppercase tracking-widest text-secondary hover:text-primary transition-opacity font-bold"
            >
              Help Center
            </Link>
            <Link
              href="#"
              className="text-xs font-label uppercase tracking-widest text-secondary hover:text-primary transition-opacity font-bold"
            >
              System Status
            </Link>
            <Link
              href="/dashboard"
              className="text-xs font-label uppercase tracking-widest text-secondary hover:text-primary transition-opacity font-bold"
            >
              Settings
            </Link>
          </nav>
          <Link
            href="/dashboard"
            className="material-symbols-outlined text-black cursor-pointer hover:opacity-70 transition-opacity"
          >
            account_circle
          </Link>
        </div>
      </div>
    </header>
  );
}
