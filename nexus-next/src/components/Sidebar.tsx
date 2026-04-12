'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col bg-surface/80 backdrop-blur-xl w-64 border-r border-outline-variant/10 z-50">
      <div className="p-8">
        <h1 className="text-2xl font-bold tracking-tighter font-headline uppercase">
          <Link href="/dashboard">Nexus AI</Link>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-1 font-label">
          Celestial Precision
        </p>
      </div>
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <Link
          href="/dashboard"
          className={`nav-item flex items-center gap-3 px-4 py-3 font-headline tracking-tight cursor-pointer ${
            pathname === '/dashboard'
              ? 'bg-zinc-100/50 text-zinc-900 font-bold active'
              : 'text-zinc-400 hover:text-zinc-900'
          }`}
        >
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span className="text-sm">Dashboard</span>
        </Link>
        
        <Link
          href="/dashboard/chat"
          className={`nav-item flex items-center gap-3 px-4 py-3 font-headline tracking-tight cursor-pointer ${
            pathname === '/dashboard/chat'
              ? 'bg-zinc-100/50 text-zinc-900 font-bold active'
              : 'text-zinc-400 hover:text-zinc-900'
          }`}
        >
          <span className="material-symbols-outlined text-xl">chat_bubble</span>
          <span className="text-sm">Workspace</span>
        </Link>

        <Link
          href="#"
          className="nav-item flex items-center justify-between gap-3 px-4 py-3 text-zinc-400 hover:text-zinc-900 font-headline tracking-tight cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="text-sm">Notifications</span>
          </div>
          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
        </Link>

        <div className="my-4 border-t border-zinc-200/50"></div>

        <Link
          href="#"
          className="nav-item flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-zinc-900 font-headline tracking-tight cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">settings</span>
          <span className="text-sm">Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
