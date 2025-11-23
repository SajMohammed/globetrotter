'use client';

import { GenerativeStamp } from './GenerativeStamp';
import { PassportPattern } from './PassportPattern';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MOCK_PASSPORT_DATA } from '../data/mockPassportData';

interface StampsPageProps {
    stamps: typeof MOCK_PASSPORT_DATA.stamps;
    pageNumber: number;
}

export function StampsPage({ stamps, pageNumber }: StampsPageProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative h-full w-full overflow-hidden bg-[#fdfbf7]">
            <PassportPattern color="#94a3b8" opacity={0.15} />

            {/* Page Number */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-serif text-xs font-bold text-slate-400">
                {pageNumber}
            </div>

            <h3 className="absolute top-6 w-full text-center font-serif text-sm font-bold uppercase tracking-widest text-slate-400/80">
                Visas
            </h3>

            {/* Stamps Container */}
            <div className="relative h-full w-full p-4">
                {stamps.map((stamp, i) => (
                    <motion.div
                        key={i}
                        className="absolute cursor-pointer"
                        style={{
                            left: stamp.x,
                            top: stamp.y,
                            zIndex: hoveredIndex === i ? 50 : 1
                        }}
                        initial={{ rotate: stamp.rotation }}
                        whileHover={{
                            scale: 1.1,
                            rotate: 0,
                            filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.2))"
                        }}
                        onHoverStart={() => setHoveredIndex(i)}
                        onHoverEnd={() => setHoveredIndex(null)}
                    >
                        <div style={{ mixBlendMode: hoveredIndex === i ? 'normal' : 'multiply' }}>
                            <GenerativeStamp
                                {...stamp}
                                rotation={0}
                                className="opacity-90 blur-[0.3px] transition-all duration-300"
                            />
                        </div>

                        {/* Tooltip on Hover */}
                        {hoveredIndex === i && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[0.6rem] text-white shadow-lg"
                            >
                                {stamp.city}, {stamp.country} • {stamp.date}
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
