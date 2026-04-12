'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Auth Validation
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow flex items-center justify-center w-full px-6 py-12 relative z-10">
        <section className="w-full max-w-[480px]">
          <div className="glass-card border border-outline-variant/10 shadow-[0px_20px_50px_rgba(0,0,0,0.04)] rounded-lg p-10 md:p-14">
            
            <div className="mb-10 text-center">
              <span className="font-label text-[10px] tracking-[0.2em] text-primary-fixed uppercase block mb-2">
                Secure Gateway
              </span>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-3">
                Welcome back.
              </h1>
              <p className="text-secondary text-sm leading-relaxed">
                Enter your credentials to access your Nexus environment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group relative">
                <label className="font-label text-[10px] font-bold tracking-widest uppercase text-primary-fixed block mb-2 ml-1">
                  Email or Phone Number
                </label>
                <input
                  required
                  className="w-full bg-surface-container-lowest border border-outline-variant/10 text-on-surface py-4 px-4 rounded focus:ring-0 focus:border-primary transition-all placeholder:text-outline/50"
                  placeholder="identity@nexus.ai"
                  type="text"
                />
              </div>

              <div className="group relative">
                <div className="flex justify-between items-end mb-2 ml-1">
                  <label className="font-label text-[10px] font-bold tracking-widest uppercase text-primary-fixed">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="font-label text-[10px] tracking-widest uppercase text-secondary hover:text-primary transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    required
                    className="w-full bg-surface-container-lowest border border-outline-variant/10 text-on-surface py-4 px-4 rounded focus:ring-0 focus:border-primary transition-all placeholder:text-outline/50"
                    placeholder="••••••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/40 hover:text-primary transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-4 space-y-6">
                <button
                  disabled={loading}
                  className="obsidian-glass w-full py-5 rounded-full text-white font-label text-xs tracking-[0.15em] uppercase font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                  type="submit"
                >
                  {loading ? 'PROCESSING...' : 'Login'}
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-outline-variant/10"></div>
                  <span className="flex-shrink mx-4 font-label text-[10px] text-outline/50 uppercase tracking-widest">
                    or continue with
                  </span>
                  <div className="flex-grow border-t border-outline-variant/10"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant/10 py-3 rounded hover:bg-surface-container-low transition-colors active:scale-[0.98]"
                    type="button"
                  >
                    <span className="font-label text-[10px] tracking-widest uppercase font-bold">
                      Google
                    </span>
                  </button>
                  <button
                    className="flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant/10 py-3 rounded hover:bg-surface-container-low transition-colors active:scale-[0.98]"
                    type="button"
                  >
                    <span className="font-label text-[10px] tracking-widest uppercase font-bold">
                      Apple
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
