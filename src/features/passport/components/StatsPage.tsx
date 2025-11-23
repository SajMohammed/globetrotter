'use client';

import { Globe, MapPin } from 'lucide-react';
import { MOCK_PASSPORT_DATA } from '../data/mockPassportData';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatsPageProps {
    stats: typeof MOCK_PASSPORT_DATA.travelStats;
    heatmap: typeof MOCK_PASSPORT_DATA.activityHeatmap;
}

export function StatsPage({ stats, heatmap }: StatsPageProps) {
    const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

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
                        <div className="mt-1 text-2xl font-bold text-slate-900">{stats.worldSeen}%</div>
                    </div>
                    <div className="rounded-lg bg-slate-100 p-3">
                        <div className="flex items-center gap-2 text-slate-500">
                            <MapPin className="h-4 w-4" />
                            <span className="text-[0.6rem] font-bold uppercase">Furthest</span>
                        </div>
                        <div className="mt-1 text-lg font-bold text-slate-900">{stats.furthestPoint.distance}</div>
                        <div className="text-[0.6rem] text-slate-400">{stats.furthestPoint.location}</div>
                    </div>
                </div>

                {/* Heatmap Visualization */}
                <div className="relative">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-500">Activity Heatmap</span>
                        <span className="text-[0.6rem] text-slate-400">2023-2024</span>
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                        {heatmap.map((week, i) => {
                            let bgClass = 'bg-slate-100';
                            if (week.intensity > 0.8) bgClass = 'bg-emerald-600';
                            else if (week.intensity > 0.6) bgClass = 'bg-emerald-500';
                            else if (week.intensity > 0.4) bgClass = 'bg-emerald-400';
                            else if (week.intensity > 0.2) bgClass = 'bg-emerald-300';

                            return (
                                <div
                                    key={i}
                                    className={`relative aspect-square rounded-sm ${bgClass} cursor-pointer transition-colors hover:ring-2 hover:ring-emerald-400 hover:ring-offset-1`}
                                    onMouseEnter={() => setHoveredWeek(i)}
                                    onMouseLeave={() => setHoveredWeek(null)}
                                >
                                    <AnimatePresence>
                                        {hoveredWeek === i && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="absolute bottom-full left-1/2 mb-2 z-50 w-32 -translate-x-1/2 rounded bg-slate-900 p-2 text-center shadow-xl"
                                            >
                                                <div className="text-[0.6rem] font-bold uppercase text-slate-400">{week.month} • Week {week.week}</div>
                                                <div className="text-[0.7rem] font-bold text-white">{week.activity}</div>
                                                {/* Arrow */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Flag Collection */}
                <div>
                    <div className="mb-2 text-xs font-bold uppercase text-slate-500">Collection</div>
                    <div className="flex flex-wrap gap-2">
                        {stats.flags.map((flag, i) => (
                            <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow-sm ring-1 ring-slate-200">
                                {flag}
                            </div>
                        ))}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-xs font-bold text-slate-400 ring-1 ring-slate-200">
                            +{stats.flagCount - stats.flags.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
