'use client';

import { motion } from 'framer-motion';
import { TripGrid } from '@/features/trips/components/TripGrid';
import { Sparkles } from 'lucide-react';

export default function TripsPage() {
    return (
        <div className="min-h-screen bg-zinc-50/50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-2"
                >
                    <div className="flex items-center gap-2 text-indigo-600 font-medium">
                        <Sparkles className="w-5 h-5" />
                        <span>Your Adventures</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
                        Travel Collection
                    </h1>
                    <p className="text-zinc-500 max-w-2xl">
                        A curated gallery of your journeys, memories, and the collectibles you've gathered along the way.
                    </p>
                </motion.div>

                <TripGrid />
            </div>
        </div>
    );
}
