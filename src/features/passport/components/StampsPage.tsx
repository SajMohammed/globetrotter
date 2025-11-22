'use client';

import { GenerativeStamp } from './GenerativeStamp';
import { PassportPattern } from './PassportPattern';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MOCK_STAMPS = [
    { city: 'Tokyo', country: 'JPN', date: '2023-11-12', color: '#c0392b', rotation: -12, x: 10, y: 20 },
    { city: 'Paris', country: 'FRA', date: '2024-01-05', color: '#2980b9', rotation: 5, x: 140, y: 40 },
    { city: 'New York', country: 'USA', date: '2024-03-22', color: '#27ae60', rotation: -8, x: 20, y: 150 },
    { city: 'London', country: 'GBR', date: '2024-05-10', color: '#8e44ad', rotation: 15, x: 160, y: 130 },
    { city: 'Berlin', country: 'DEU', date: '2024-07-18', color: '#d35400', rotation: -2, x: 50, y: 280 },
    { city: 'Sydney', country: 'AUS', date: '2024-09-30', color: '#16a085', rotation: 8, x: 180, y: 260 },
];

export function StampsPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative h-full w-full overflow-hidden bg-[#fdfbf7]">
            <PassportPattern color="#94a3b8" opacity={0.15} />

            {/* Page Number */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-serif text-xs font-bold text-slate-400">
                2
            </div>

            <h3 className="absolute top-6 w-full text-center font-serif text-sm font-bold uppercase tracking-widest text-slate-400/80">
                Visas
            </h3>

            {/* Stamps Container */}
            <div className="relative h-full w-full p-4">
                {MOCK_STAMPS.map((stamp, i) => (
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
