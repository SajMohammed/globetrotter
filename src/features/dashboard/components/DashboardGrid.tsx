import { StatsCard } from './StatsCard';
import { TripsCard } from './TripsCard';
import { PassportCard } from './PassportCard';
import { BucketListCard } from './BucketListCard';
import { MapCard } from './MapCard';

export function DashboardGrid() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Top Section: Map Centerpiece (Full Width) */}
            <MapCard className="h-[450px] w-full shadow-md hover:shadow-lg" />

            {/* Bottom Section: Widgets Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard className="h-full min-h-[200px]" />
                <PassportCard className="h-full min-h-[200px]" />
                <TripsCard className="h-full min-h-[200px]" />
                <BucketListCard className="h-full min-h-[200px]" />
            </div>
        </div>
    );
}
