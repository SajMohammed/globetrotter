import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Plane } from 'lucide-react';

interface PassportCardProps {
    className?: string;
}

export function PassportCard({ className }: PassportCardProps) {
    return (
        <Link href="/passport" className="block h-full">
            <div
                className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/50 bg-[#fdfbf7] p-6 shadow-lg transition-all hover:shadow-xl',
                    className
                )}
            >
                {/* Paper texture overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                                <Plane className="h-4 w-4" />
                            </div>
                            <span className="font-serif text-lg font-bold tracking-wide text-slate-900">PASSPORT</span>
                        </div>
                        <div className="text-xs font-medium text-slate-400">Valid until 2030</div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100">
                                {/* Placeholder for user avatar */}
                                <div className="h-full w-full bg-slate-300" />
                            </div>
                            <div>
                                <div className="text-xs font-medium uppercase text-slate-400">Name</div>
                                <div className="font-serif text-lg font-medium text-slate-900">SajMo Explorer</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs font-medium uppercase text-slate-400">Nationality</div>
                                <div className="font-medium text-slate-900">Global Citizen</div>
                            </div>
                            <div>
                                <div className="text-xs font-medium uppercase text-slate-400">ID No.</div>
                                <div className="font-medium text-slate-900">GT-882910</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
