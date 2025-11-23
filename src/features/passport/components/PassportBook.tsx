'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IdentityPage } from './IdentityPage';
import { StampsPage } from './StampsPage';
import { StatsPage } from './StatsPage';
import { TiltContainer } from './TiltContainer';
import { FoilElement } from './FoilElement';
import { MOCK_PASSPORT_DATA } from '../data/mockPassportData';

// Cover Component
function PassportCover({ isOpen, onClick, zIndex }: { isOpen: boolean; onClick: () => void; zIndex: number }) {
    return (
        <motion.div
            className={cn(
                "absolute inset-0 h-full w-full cursor-pointer rounded-r-md shadow-2xl",
                "origin-left [transform-style:preserve-3d]"
            )}
            style={{ zIndex }}
            animate={{ rotateY: isOpen ? -180 : 0 }}
            transition={{ duration: 1.2, type: "spring", damping: 18, stiffness: 60 }}
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
    zIndex,
    onAnimationStart,
    onAnimationComplete
}: {
    front: React.ReactNode;
    back: React.ReactNode;
    index: number;
    isFlipped: boolean;
    zIndex: number;
    onAnimationStart?: () => void;
    onAnimationComplete?: () => void;
}) {
    return (
        <motion.div
            className="absolute inset-0 h-full w-full origin-left bg-[#fdfbf7]"
            style={{
                zIndex,
                transformStyle: 'preserve-3d',
            }}
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={{ duration: 1.0, type: "spring", damping: 20, stiffness: 60 }}
            onAnimationStart={onAnimationStart}
            onAnimationComplete={onAnimationComplete}
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
    const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
    const [coverZIndex, setCoverZIndex] = useState(50);

    // Pagination Logic
    const STAMPS_PER_PAGE = 6;
    const totalStamps = MOCK_PASSPORT_DATA.stamps.length;

    const stampChunks = [];
    for (let i = 0; i < totalStamps; i += STAMPS_PER_PAGE) {
        stampChunks.push(MOCK_PASSPORT_DATA.stamps.slice(i, i + STAMPS_PER_PAGE));
    }

    // New Page Order: Identity -> Stats -> Stamps...
    const pages = [
        <IdentityPage key="identity" profile={MOCK_PASSPORT_DATA.userProfile} />,
        <StatsPage key="stats" stats={MOCK_PASSPORT_DATA.travelStats} heatmap={MOCK_PASSPORT_DATA.activityHeatmap} />,
        ...stampChunks.map((chunk, i) => (
            <StampsPage key={`stamps-${i}`} stamps={chunk} pageNumber={i + 3} />
        )),
        <div key="notes" className="flex h-full w-full items-center justify-center bg-[#fdfbf7] p-8">
            <div className="text-center font-serif text-slate-400">Notes & Endorsements</div>
        </div>
    ];

    // Group pages into Sheets
    const sheets = [];
    for (let i = 0; i < pages.length; i += 2) {
        sheets.push({
            front: pages[i],
            back: pages[i + 1] || <div className="bg-[#fdfbf7] h-full w-full" />
        });
    }

    const totalSheets = sheets.length;

    const toggleBook = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);

        if (newIsOpen) {
            // Opening: Start with High Z (Cover on top), switch to Low Z halfway
            setCoverZIndex(50);
            setTimeout(() => setCoverZIndex(0), 600); // Half of 1.2s duration
            setFlippedIndex(-1);
        } else {
            // Closing: Start with Low Z (Cover behind), switch to High Z halfway
            setCoverZIndex(0);
            setTimeout(() => setCoverZIndex(50), 600);
            setFlippedIndex(-1);
        }
    };

    const nextPage = () => {
        if (!isOpen) return;
        if (flippedIndex < totalSheets - 1) {
            setFlippedIndex(flippedIndex + 1);
        } else {
            // Close book from last page
            setIsOpen(false);
            setCoverZIndex(0);
            setTimeout(() => setCoverZIndex(50), 600);
            setFlippedIndex(-1);
        }
    };

    const prevPage = () => {
        if (!isOpen) return;
        if (flippedIndex >= 0) {
            setFlippedIndex(flippedIndex - 1);
        } else {
            // Close book from first page (Identity)
            setIsOpen(false);
            setCoverZIndex(0);
            setTimeout(() => setCoverZIndex(50), 600);
            setFlippedIndex(-1);
        }
    };

    return (
        <div className="flex h-full w-full items-center justify-center bg-slate-200 p-8 perspective-[2000px]">
            <motion.div
                animate={{ x: isOpen ? '50%' : '0%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative"
            >
                <TiltContainer className="relative h-[600px] w-[420px]" tiltIntensity={10} glareIntensity={0.2}>
                    {/* Back Cover (Static base) */}
                    <div className="absolute inset-0 rounded-r-md bg-[#1a2b4b] shadow-2xl translate-z-[-4px]" />

                    {/* Pages Stack Effect (Thickness) */}
                    {Array.from({ length: totalSheets }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute right-0 top-1 bottom-1 w-3 bg-white rounded-r-sm shadow-sm"
                            style={{
                                transform: `translateX(${i * 0.5}px) translateZ(${-i}px)`
                            }}
                        />
                    ))}

                    {/* Pages */}
                    {sheets.map((sheet, index) => {
                        const isFlipped = flippedIndex >= index;

                        // Z-Index Logic:
                        let zIndex;
                        if (animatingIndex === index) {
                            zIndex = 100;
                        } else {
                            zIndex = isFlipped ? 10 + index : 10 + (totalSheets - index);
                        }

                        return (
                            <PassportSheet
                                key={index}
                                index={index}
                                isFlipped={isFlipped}
                                zIndex={zIndex}
                                front={sheet.front}
                                back={sheet.back}
                                onAnimationStart={() => setAnimatingIndex(index)}
                                onAnimationComplete={() => setAnimatingIndex(null)}
                            />
                        );
                    })}

                    {/* Cover */}
                    <PassportCover
                        isOpen={isOpen}
                        onClick={toggleBook}
                        zIndex={coverZIndex}
                    />

                    {/* Controls */}
                    {isOpen && (
                        <>
                            {/* Previous Page Button */}
                            <div
                                className="absolute -left-[480px] top-1/2 z-50 flex flex-col gap-2 -translate-y-1/2"
                            >
                                <button
                                    onClick={prevPage}
                                    className="h-14 w-14 rounded-full bg-white/90 text-slate-800 shadow-xl hover:bg-white hover:scale-110 flex items-center justify-center transition-all"
                                    title="Previous Page"
                                >
                                    ⬅️
                                </button>
                            </div>

                            {/* Next Page Button */}
                            <div
                                className="absolute -right-20 top-1/2 z-50 flex flex-col gap-2 -translate-y-1/2"
                            >
                                <button
                                    onClick={nextPage}
                                    className="h-14 w-14 rounded-full bg-white/90 text-slate-800 shadow-xl hover:bg-white hover:scale-110 flex items-center justify-center transition-all"
                                    title="Next Page"
                                >
                                    ➡️
                                </button>
                            </div>
                        </>
                    )}
                </TiltContainer>
            </motion.div>

            <div className="absolute bottom-8 font-serif text-slate-500 italic">
                {isOpen ? "Tap the arrow to turn the page." : "Tap the passport to open."}
            </div>
        </div>
    );
}
