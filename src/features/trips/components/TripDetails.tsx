'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Clock, Footprints, Navigation } from 'lucide-react';
import { Trip } from '../data/mockTripsData';
import { Map } from '@/features/map/components';
import { useCountryColors } from '@/features/map/hooks/useCountryColors';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo, useState } from 'react';

interface TripDetailsProps {
    trip: Trip;
}

export function TripDetails({ trip }: TripDetailsProps) {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const mapConfig = useMemo(() => ({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
        style: 'mapbox://styles/mapbox/light-v11' as const,
        initialViewport: {
            longitude: trip.coordinates.lng,
            latitude: trip.coordinates.lat,
            zoom: 4, // Zoom out to see the country better
            pitch: 0,
            bearing: 0
        },
        projection: 'mercator',
        interactive: true
    }), [trip]);

    // Highlight the trip's country
    useCountryColors(map, isLoaded, {
        countryCodes: [trip.countryCode],
        colorExpression: ['literal', '#4f46e5'], // Indigo-600
        grayColor: '#ffffff', // White mask
        grayOpacity: 0.8,
        colorOpacity: 0.2
    });

    const handleMapLoad = (loadedMap: mapboxgl.Map) => {
        setMap(loadedMap);
        setIsLoaded(true);

        new mapboxgl.Marker({ color: "#4f46e5" })
            .setLngLat([trip.coordinates.lng, trip.coordinates.lat])
            .addTo(loadedMap);
    };

    return (
        <div className="min-h-screen bg-zinc-50 pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={trip.coverImage}
                    alt={trip.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-8 left-8 z-10">
                    <Link
                        href="/trips"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Trips</span>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <div className="max-w-7xl mx-auto space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center gap-4 text-sm font-medium"
                        >
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                                <Calendar className="w-4 h-4" />
                                <span>{trip.date}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                                <MapPin className="w-4 h-4" />
                                <span>{trip.location}</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold tracking-tight"
                        >
                            {trip.title}
                        </motion.h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 -mt-10 relative z-10">
                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-2xl p-6 shadow-xl border border-zinc-100 mb-12"
                >
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                            <Navigation className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Distance</div>
                            <div className="text-2xl font-bold text-zinc-900">{trip.stats.distance}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Duration</div>
                            <div className="text-2xl font-bold text-zinc-900">{trip.stats.duration}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                            <Footprints className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Steps</div>
                            <div className="text-2xl font-bold text-zinc-900">{trip.stats.steps.toLocaleString()}</div>
                        </div>
                    </div>
                </motion.div>

                {/* Map Section - Full Width */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-zinc-900 mb-6">Location</h2>
                    <div className="h-[600px] rounded-2xl overflow-hidden shadow-xl border border-zinc-100 relative">
                        <Map
                            config={mapConfig}
                            onLoad={handleMapLoad}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-6">About this Trip</h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                {trip.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Photo Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {trip.images.map((image, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        className="relative h-64 rounded-xl overflow-hidden shadow-md"
                                    >
                                        <Image
                                            src={image}
                                            alt={`Gallery image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 mb-4">Collectibles</h2>
                            <div className="flex flex-wrap gap-3">
                                {trip.collectibles.map((emoji, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-center w-12 h-12 text-2xl bg-white rounded-xl shadow-sm border border-zinc-100"
                                    >
                                        {emoji}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
