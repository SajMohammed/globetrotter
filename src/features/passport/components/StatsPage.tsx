import { Globe, MapPin } from 'lucide-react';

export function StatsPage() {
    return (
        <div className="relative h-full w-full bg-[#fdfbf7] p-6 text-slate-900">
            {/* Page Number */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-serif text-xs text-slate-400">
                3
            </div>

            <h3 className="mb-6 text-center font-serif text-sm font-bold uppercase tracking-widest text-slate-400">Travel Stats</h3>

            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-slate-100 p-3">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Globe className="h-4 w-4" />
                            <span className="text-[0.6rem] font-bold uppercase">World Seen</span>
                        </div>
                        <div className="mt-1 text-2xl font-bold text-slate-900">12%</div>
                    </div>
                    <div className="rounded-lg bg-slate-100 p-3">
                        <div className="flex items-center gap-2 text-slate-500">
                            <MapPin className="h-4 w-4" />
                            <span className="text-[0.6rem] font-bold uppercase">Furthest</span>
                        </div>
                        <div className="mt-1 text-lg font-bold text-slate-900">12,400km</div>
                        <div className="text-[0.6rem] text-slate-400">from London</div>
                    </div>
                </div>

                {/* Heatmap Visualization */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-500">Activity Heatmap</span>
                        <span className="text-[0.6rem] text-slate-400">2023-2024</span>
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                        {Array.from({ length: 48 }).map((_, i) => {
                            // Generate pseudo-random intensity
                            const intensity = Math.random();
                            let bgClass = 'bg-slate-100';
                            if (intensity > 0.8) bgClass = 'bg-emerald-500';
                            else if (intensity > 0.6) bgClass = 'bg-emerald-400';
                            else if (intensity > 0.4) bgClass = 'bg-emerald-300';
                            else if (intensity > 0.2) bgClass = 'bg-emerald-200';

                            return (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-sm ${bgClass}`}
                                    title={`Week ${i + 1}`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Flag Collection */}
                <div>
                    <div className="mb-2 text-xs font-bold uppercase text-slate-500">Collection</div>
                    <div className="flex flex-wrap gap-2">
                        {['🇬🇧', '🇫🇷', '🇺🇸', '🇯🇵', '🇩🇪', '🇦🇺', '🇮🇹', '🇪🇸', '🇨🇦', '🇧🇷'].map((flag, i) => (
                            <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow-sm ring-1 ring-slate-200">
                                {flag}
                            </div>
                        ))}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-xs font-bold text-slate-400 ring-1 ring-slate-200">
                            +12
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
