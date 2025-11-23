'use client';

import { User } from 'lucide-react';
import { PassportPattern } from './PassportPattern';
import { motion } from 'framer-motion';
import { MOCK_PASSPORT_DATA } from '../data/mockPassportData';

interface IdentityPageProps {
    profile: typeof MOCK_PASSPORT_DATA.userProfile;
}

export function IdentityPage({ profile }: IdentityPageProps) {
    return (
        <div className="relative h-full w-full overflow-hidden bg-[#fdfbf7] p-5 text-slate-900">
            <PassportPattern color="#64748b" opacity={0.08} />

            <div className="relative z-10 flex h-full flex-col">
                {/* Header */}
                <div className="flex items-end justify-between border-b-2 border-slate-900 pb-2">
                    <div className="font-serif text-2xl font-black tracking-widest">PASSPORT</div>
                    <div className="flex flex-col items-end">
                        <span className="text-[0.5rem] font-bold uppercase tracking-wider text-slate-500">Type / Type</span>
                        <span className="font-mono text-xs font-bold">{profile.type}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[0.5rem] font-bold uppercase tracking-wider text-slate-500">Code / Code</span>
                        <span className="font-mono text-xs font-bold">{profile.code}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[0.5rem] font-bold uppercase tracking-wider text-slate-500">Passport No.</span>
                        <span className="font-mono text-sm font-bold text-red-900">{profile.passportNo}</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-4 flex gap-4">
                    {/* Photo Area with Hologram */}
                    <div className="relative h-40 w-32 shrink-0 overflow-hidden rounded border border-slate-300 bg-slate-200 grayscale filter">
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
                            <User className="h-16 w-16" />
                        </div>

                        {/* Reactive Hologram Overlay */}
                        <motion.div
                            className="absolute inset-0 opacity-40 mix-blend-color-dodge pointer-events-none"
                            animate={{
                                background: [
                                    "linear-gradient(115deg, transparent 20%, rgba(0,255,255,0.4) 40%, transparent 60%)",
                                    "linear-gradient(115deg, transparent 30%, rgba(255,0,255,0.4) 50%, transparent 70%)",
                                    "linear-gradient(115deg, transparent 20%, rgba(0,255,255,0.4) 40%, transparent 60%)"
                                ]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Security Pattern on Photo */}
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #000 2px, #000 3px)' }}
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-3">
                        <div>
                            <div className="text-[0.5rem] font-bold uppercase text-slate-500">Surname / Nom</div>
                            <div className="font-serif text-xl font-bold tracking-wide">{profile.surname}</div>
                        </div>
                        <div>
                            <div className="text-[0.5rem] font-bold uppercase text-slate-500">Given Names / Prénoms</div>
                            <div className="font-serif text-xl font-bold tracking-wide">{profile.givenNames}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <div className="text-[0.5rem] font-bold uppercase text-slate-500">Nationality</div>
                                <div className="font-serif font-bold">{profile.nationality}</div>
                            </div>
                            <div>
                                <div className="text-[0.5rem] font-bold uppercase text-slate-500">Sex</div>
                                <div className="font-serif font-bold">{profile.sex}</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-[0.5rem] font-bold uppercase text-slate-500">Date of Birth</div>
                            <div className="font-serif font-bold">{profile.dob}</div>
                        </div>
                    </div>
                </div>

                {/* Secondary Details */}
                <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-4">
                    <div>
                        <div className="text-[0.5rem] font-bold uppercase text-slate-500">Place of Birth</div>
                        <div className="font-serif font-bold">{profile.pob}</div>
                    </div>
                    <div></div>
                    <div>
                        <div className="text-[0.5rem] font-bold uppercase text-slate-500">Date of Issue</div>
                        <div className="font-serif font-bold">{profile.doi}</div>
                    </div>
                    <div>
                        <div className="text-[0.5rem] font-bold uppercase text-slate-500">Date of Expiry</div>
                        <div className="font-serif font-bold">{profile.doe}</div>
                    </div>
                    <div className="col-span-2">
                        <div className="text-[0.5rem] font-bold uppercase text-slate-500">Authority</div>
                        <div className="font-serif font-bold">{profile.authority}</div>
                    </div>
                </div>

                {/* Machine Readable Zone */}
                <div className="mt-auto pt-4">
                    <div className="font-ocr text-sm tracking-[0.15em] text-slate-900/90 leading-relaxed select-all selection:bg-blue-200">
                        {profile.mrz.line1}<br />
                        {profile.mrz.line2}
                    </div>
                </div>
            </div>
        </div>
    );
}
