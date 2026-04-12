'use client';

export default function DashboardPage() {
  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between px-8 bg-surface/80 backdrop-blur-md h-16 border-b border-outline-variant/10">
        <h2 className="text-xl font-bold tracking-tighter text-zinc-900 font-headline uppercase">
          System Overview
        </h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Status: Nominal
          </button>
        </div>
      </header>

      <main className="p-12 relative z-10 max-w-7xl mx-auto w-full space-y-12">
        <div>
          <h3 className="text-sm font-label font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">
            Real-time Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-zinc-400">memory</span>
                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded">
                  +12.5%
                </span>
              </div>
              <h4 className="text-3xl font-headline font-bold mb-1">1.24m</h4>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Tokens Processed</p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-zinc-400">speed</span>
                <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                  Optimum
                </span>
              </div>
              <h4 className="text-3xl font-headline font-bold mb-1">14ms</h4>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Avg Latency</p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-zinc-400">group</span>
                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded">
                  +3 Active
                </span>
              </div>
              <h4 className="text-3xl font-headline font-bold mb-1">12</h4>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Active Agents</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-label font-bold uppercase tracking-[0.2em] text-zinc-400">
                Weekly Utilization
              </h3>
            </div>
            <div className="h-64 flex items-center justify-center bg-zinc-50 rounded border border-zinc-100">
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Chart Integration Pending</span>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-label font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 hover:bg-zinc-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex justify-center items-center shrink-0">
                  <span className="material-symbols-outlined">data_object</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-800">Dataset Parsing</h4>
                  <p className="text-xs text-zinc-500 mt-0.5 max-w-[200px] truncate">
                    Processed 14,000 rows in customer_data.csv
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-3 hover:bg-zinc-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex justify-center items-center shrink-0">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-800">API Key Generated</h4>
                  <p className="text-xs text-zinc-500 mt-0.5 max-w-[200px] truncate">
                    Production key (sk_live_***)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
