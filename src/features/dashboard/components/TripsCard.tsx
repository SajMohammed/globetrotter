import { cn } from '@/lib/utils';
import { Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TripsCardProps {
    className?: string;
}

export function TripsCard({ className }: TripsCardProps) {
    return (
        <Link
            href="/trips"
            className={cn(
                'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all hover:shadow-xl hover:-translate-y-1',
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-50" />

            <div className="relative z-10 flex items-start justify-between">
                <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
                    <Briefcase className="h-6 w-6" />
                </div>
                <div className="rounded-full bg-white/50 p-2 text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    <ArrowRight className="h-5 w-5" />
                </div>
            </div>

            <div className="relative z-10 mt-4">
                <h3 className="text-lg font-bold text-slate-900">My Trips</h3>
                <p className="mt-1 text-sm text-slate-500">
                    View your travel collection
                </p>
            </div>
        </Link>
    );
}
