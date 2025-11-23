'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Trip } from '../data/mockTripsData';

import Link from 'next/link';

interface TripCardProps {
    trip: Trip;
    index: number;
}

export function TripCard({ trip, index }: TripCardProps) {
    return (
        <Link href={`/trips/${trip.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-zinc-100"
            >
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={trip.coverImage}
                        alt={trip.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2 text-xs font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded-full w-fit mb-2">
                            <Calendar className="w-3 h-3" />
                            <span>{trip.date}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{trip.title}</h3>
                        <div className="flex items-center gap-1 text-zinc-200 text-sm">
                            <MapPin className="w-3 h-3" />
                            <span>{trip.location}</span>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex -space-x-2 overflow-hidden">
                            {trip.collectibles.map((emoji, i) => (
                                <div
                                    key={i}
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-50 border-2 border-white text-sm"
                                    title="Collectible"
                                >
                                    {emoji}
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-zinc-500 font-medium">
                            {trip.stats.duration}
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-zinc-600">
                        <div className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Distance</span>
                                <span className="font-semibold text-zinc-900">{trip.stats.distance}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Steps</span>
                                <span className="font-semibold text-zinc-900">{trip.stats.steps.toLocaleString()}</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ x: 3 }}
                            className="p-2 rounded-full bg-zinc-100 text-zinc-900 group-hover:bg-black group-hover:text-white transition-colors duration-300"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
