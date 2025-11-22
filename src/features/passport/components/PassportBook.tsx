'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IdentityPage } from './IdentityPage';
import { StampsPage } from './StampsPage';
import { StatsPage } from './StatsPage';
import { TiltContainer } from './TiltContainer';
import { FoilElement } from './FoilElement';

// Cover Component
function PassportCover({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
    return (
        <motion.div
            className={cn(
                "absolute inset-0 z-50 h-full w-full cursor-pointer rounded-r-md shadow-2xl",
                "origin-left [transform-style:preserve-3d]"
            )}
            animate={{ rotateY: isOpen ? -180 : 0 }}
            transition={{ duration: 1.2, type: "spring", damping: 18, stiffness: 80 }}
            onClick={onClick}
        >
            {/* Front of Cover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-r-md bg-[#1a2b4b] [backface-visibility:hidden] overflow-hidden">
                {/* Deep Leather Texture */}
                <div className="absolute inset-0 opacity-60 mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                        filter: 'contrast(120%) brightness(80%)'
                    }}
                />

                {/* Gold Foil Content */}
                <div className="relative z-10 flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <FoilElement as="span" className="font-serif text-sm font-bold tracking-[0.25em]">UNITED KINGDOM OF</FoilElement>
                        <FoilElement as="span" className="font-serif text-4xl font-black tracking-[0.2em] drop-shadow-lg">EARTH</FoilElement>
                    </div>

                    <div className="relative my-4 h-36 w-36">
                        <FoilElement className="absolute inset-0 rounded-full border-[4px] border-current opacity-30">{null}</FoilElement>
                        <div className="absolute inset-2 flex items-center justify-center rounded-full border border-[#cfb53b]/40 bg-[#cfb53b]/5 backdrop-blur-sm">
                            <FoilElement>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="h-20 w-20">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </FoilElement>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <FoilElement as="span" className="font-serif text-3xl font-bold tracking-[0.35em]">PASSPORT</FoilElement>
                        <div className="h-5 w-9 rounded-sm border border-[#cfb53b]/60 flex items-center justify-center bg-[#cfb53b]/10">
                            <div className="h-2.5 w-5 rounded-[1px] bg-[#cfb53b] shadow-[0_0_10px_rgba(207,181,59,0.5)]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Inside of Cover */}
            <div
                className="absolute inset-0 flex items-center justify-center bg-[#fdfbf7] [backface-visibility:hidden]"
                style={{ transform: 'rotateY(180deg)' }}
            >
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}
                />
                <div className="relative z-10 max-w-[80%] text-center font-serif text-sm italic leading-loose text-slate-600">
                    "The Secretary of State requests and requires in the Name of His Majesty all those whom it may concern to allow the bearer to pass freely without let or hindrance."
                </div>
            </div>
        </motion.div>
    );
}

// Sheet Component
function PassportSheet({
    front,
    back,
    index,
    isFlipped,
    zIndex
}: {
    front: React.ReactNode;
    back: React.ReactNode;
    index: number;
    isFlipped: boolean;
    zIndex: number;
}) {
    return (
        <motion.div
            className="absolute inset-0 h-full w-full origin-left bg-[#fdfbf7]"
            style={{
                zIndex,
                transformStyle: 'preserve-3d',
            }}
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={{ duration: 1.2, delay: index * 0.05, type: "spring", damping: 18, stiffness: 80 }}
        >
            {/* Front Page */}
            <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] shadow-sm overflow-hidden rounded-r-sm">
                {front}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Back Page */}
            <div
                className="absolute inset-0 h-full w-full [backface-visibility:hidden] shadow-sm overflow-hidden rounded-l-sm"
                style={{ transform: 'rotateY(180deg)' }}
            >
                {back}
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
            </div>
        </motion.div>
    );
}

export function PassportBook() {
    const [isOpen, setIsOpen] = useState(false);
    const [flippedIndex, setFlippedIndex] = useState(-1);

    const toggleBook = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setFlippedIndex(0);
        } else {
            setFlippedIndex(-1);
        }
    };

    const flipPage = () => {
        if (!isOpen) return;
        if (flippedIndex < 1) {
            setFlippedIndex(flippedIndex + 1);
        } else {
            setIsOpen(false);
            setFlippedIndex(-1);
        }
    };

    return (
        <div className="flex h-full w-full items-center justify-center bg-slate-200 p-8 perspective-[2000px]">
            <TiltContainer className="relative h-[600px] w-[420px]" tiltIntensity={10} glareIntensity={0.2}>
                {/* Back Cover (Static base) */}
                <div className="absolute inset-0 rounded-r-md bg-[#1a2b4b] shadow-2xl translate-z-[-4px]" />

                {/* Pages Stack Effect (Thickness) */}
                <div className="absolute right-0 top-1 bottom-1 w-3 bg-white rounded-r-sm shadow-sm translate-x-[2px] translate-z-[-1px]" />
                <div className="absolute right-0 top-2 bottom-2 w-3 bg-white rounded-r-sm shadow-sm translate-x-[4px] translate-z-[-2px]" />

                {/* Pages */}
                <PassportSheet
                    index={1}
                    isFlipped={flippedIndex >= 1}
                    zIndex={flippedIndex >= 1 ? 20 : 10}
                    front={<StatsPage />}
                    back={
                        <div className="flex h-full w-full items-center justify-center bg-[#fdfbf7] p-8">
                            <div className="text-center font-serif text-slate-400">Notes & Endorsements</div>
                        </div>
                    }
                />

                <PassportSheet
                    index={0}
                    isFlipped={flippedIndex >= 0}
                    zIndex={flippedIndex >= 0 ? 30 : 20}
                    front={<IdentityPage />}
                    back={<StampsPage />}
                />

                {/* Cover */}
                <PassportCover isOpen={isOpen} onClick={toggleBook} />

                {/* Controls */}
                {isOpen && (
                    <div
                        className="absolute -right-20 top-1/2 z-50 flex flex-col gap-2 -translate-y-1/2"
                    >
                        <button
                            onClick={flipPage}
                            className="h-14 w-14 rounded-full bg-white/90 text-slate-800 shadow-xl hover:bg-white hover:scale-110 flex items-center justify-center transition-all"
                            title="Flip Page"
                        >
                            ➡️
                        </button>
                    </div>
                )}
            </TiltContainer>

            <div className="absolute bottom-8 font-serif text-slate-500 italic">
                {isOpen ? "Tap the arrow to turn the page." : "Tap the passport to open."}
            </div>
        </div>
    );
}
