import { notFound } from 'next/navigation';
import { mockTrips } from '@/features/trips/data/mockTripsData';
import { TripDetails } from '@/features/trips/components/TripDetails';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateStaticParams() {
    return mockTrips.map((trip) => ({
        id: trip.id,
    }));
}

export default async function TripPage({ params }: PageProps) {
    const { id } = await params;
    const trip = mockTrips.find((t) => t.id === id);

    if (!trip) {
        notFound();
    }

    return <TripDetails trip={trip} />;
}
