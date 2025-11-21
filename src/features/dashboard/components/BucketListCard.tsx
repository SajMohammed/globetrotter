import { cn } from '@/lib/utils';
import { Check, Plus } from 'lucide-react';

interface BucketListCardProps {
    className?: string;
}

const BUCKET_ITEMS = [
    { id: 1, label: 'See the Northern Lights', completed: true },
    { id: 2, label: 'Safari in Kenya', completed: false },
    { id: 3, label: 'Hike Machu Picchu', completed: false },
    { id: 4, label: 'Dive in the Great Barrier Reef', completed: false },
];

export function BucketListCard({ className }: BucketListCardProps) {
    return (
        <div
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all hover:shadow-xl',
                className
            )}
        >
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-500">
                    Bucket List
                </h3>
                <button className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                    <Plus className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {BUCKET_ITEMS.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                        <div
                            className={cn(
                                'flex h-5 w-5 items-center justify-center rounded-full border transition-colors',
                                item.completed
                                    ? 'border-[#c5a028] bg-[#c5a028] text-white'
                                    : 'border-slate-300 bg-transparent'
                            )}
                        >
                            {item.completed && <Check className="h-3 w-3" />}
                        </div>
                        <span
                            className={cn(
                                'text-sm font-medium transition-colors',
                                item.completed ? 'text-slate-400 line-through' : 'text-slate-700'
                            )}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-4">
                <div className="text-xs font-medium text-slate-400 text-center">
                    24 items remaining
                </div>
            </div>
        </div>
    );
}
