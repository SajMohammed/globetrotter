'use client';

import { mockTrips } from '../data/mockTripsData';
import { TripCard } from './TripCard';

export function TripGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {mockTrips.map((trip, index) => (
                <TripCard key={trip.id} trip={trip} index={index} />
            ))}
        </div>
    );
}
