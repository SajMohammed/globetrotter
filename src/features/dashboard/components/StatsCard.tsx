import { cn } from '@/lib/utils';

interface StatsCardProps {
    className?: string;
}

export function StatsCard({ className }: StatsCardProps) {
    return (
        <div
            className={cn(
                'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all hover:shadow-xl',
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-slate-500">
                        Countries Visited
                    </h3>
                    <p className="mt-2 font-serif text-5xl font-medium text-slate-900">12</p>
                </div>
                <div className="rounded-full bg-[#c5a028]/10 p-3 text-[#c5a028]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" x2="22" y1="12" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="font-medium text-emerald-600">+2 this year</span>
                    <span>•</span>
                    <span>6% of the world</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[6%] rounded-full bg-[#c5a028]" />
                </div>
            </div>
        </div>
    );
}
