import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface RecentMemoryCardProps {
    className?: string;
}

export function RecentMemoryCard({ className }: RecentMemoryCardProps) {
    return (
        <div
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-4 shadow-lg backdrop-blur-md transition-all hover:shadow-xl',
                className
            )}
        >
            <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-500">
                    Recent Memory
                </h3>
                <span className="text-xs font-medium text-slate-400">2 days ago</span>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Placeholder for an actual image - using a colored div for now if no image is available, 
            but in a real app this would be next/image */}
                <div className="absolute inset-0 bg-slate-200">
                    {/* In a real scenario, use a real image. For now, a placeholder gradient. */}
                    <div className="h-full w-full bg-gradient-to-br from-blue-100 to-slate-200" />
                </div>

                <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-900 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-[#c5a028]" />
                        Kyoto, Japan
                    </div>
                </div>
            </div>

            <div className="mt-4 px-1">
                <p className="font-serif text-lg font-medium italic text-slate-900">
                    "Golden Pavilion at sunset..."
                </p>
            </div>
        </div>
    );
}
