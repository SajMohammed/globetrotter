import { DashboardGrid } from '@/features/dashboard/components/DashboardGrid';

export default function DashboardPage() {
    return (
        <div className="relative h-full w-full overflow-y-auto bg-slate-50/50">
            <div className="mx-auto max-w-[1600px] pt-8">
                <div className="mb-8 px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome back, SajMo.
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Here's your travel summary for 2025.
                    </p>
                </div>

                <DashboardGrid />
            </div>
        </div>
    );
}
