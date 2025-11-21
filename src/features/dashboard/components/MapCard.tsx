import { cn } from '@/lib/utils';
import { WorldMap } from '@/features/map/components/WorldMap';
import { Maximize2 } from 'lucide-react';

interface MapCardProps {
    className?: string;
}

export function MapCard({ className }: MapCardProps) {
    return (
        <div
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all hover:shadow-xl',
                className
            )}
        >
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Live View
            </div>

            <button className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-slate-900">
                <Maximize2 className="h-4 w-4" />
            </button>

            <div className="h-full w-full min-h-[300px]">
                <WorldMap />
            </div>
        </div>
    );
}
