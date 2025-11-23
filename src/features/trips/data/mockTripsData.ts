export interface Trip {
    id: string;
    title: string;
    date: string;
    location: string;
    coverImage: string;
    images: string[];
    collectibles: string[];
    stats: {
        distance: string;
        duration: string;
        steps: number;
    };
    description: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    countryCode: string;
}

export const mockTrips: Trip[] = [
    {
        id: '1',
        title: 'Kyoto Cherry Blossoms',
        date: 'April 2024',
        location: 'Kyoto, Japan',
        coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2053&auto=format&fit=crop',
        ],
        collectibles: ['🌸', '⛩️', '🍵'],
        stats: {
            distance: '45 km',
            duration: '5 days',
            steps: 65000,
        },
        description: 'A magical journey through the ancient streets of Kyoto during the peak cherry blossom season. Visited Fushimi Inari, Kinkaku-ji, and Arashiyama Bamboo Grove.',
        coordinates: { lat: 35.0116, lng: 135.7681 },
        countryCode: 'JPN',
    },
    {
        id: '2',
        title: 'Iceland Road Trip',
        date: 'September 2023',
        location: 'Reykjavik, Iceland',
        coverImage: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2159&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1504893524553-bfa2070bd542?q=80&w=2069&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520699049698-acd2fcc51056?q=80&w=2070&auto=format&fit=crop',
        ],
        collectibles: ['🧊', '🌋', '🌌'],
        stats: {
            distance: '1200 km',
            duration: '7 days',
            steps: 80000,
        },
        description: 'Chasing waterfalls and northern lights along the Ring Road. The landscapes were otherworldly, from glaciers to black sand beaches.',
        coordinates: { lat: 64.1466, lng: -21.9426 },
        countryCode: 'ISL',
    },
    {
        id: '3',
        title: 'Amalfi Coast Summer',
        date: 'July 2023',
        location: 'Positano, Italy',
        coverImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2133&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2133&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1616035848937-234293f0b240?q=80&w=2070&auto=format&fit=crop',
        ],
        collectibles: ['🍋', '🍝', '🚤'],
        stats: {
            distance: '30 km',
            duration: '4 days',
            steps: 35000,
        },
        description: 'Sun, sea, and pasta. Exploring the colorful cliffside villages of Positano and Amalfi. Boat tours and lemon sorbets were the highlights.',
        coordinates: { lat: 40.6281, lng: 14.4850 },
        countryCode: 'ITA',
    },
    {
        id: '4',
        title: 'Swiss Alps Hiking',
        date: 'June 2023',
        location: 'Zermatt, Switzerland',
        coverImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
        ],
        collectibles: ['🏔️', '🥾', '🧀'],
        stats: {
            distance: '60 km',
            duration: '6 days',
            steps: 90000,
        },
        description: 'Conquering the trails around the Matterhorn. Fresh mountain air, stunning vistas, and delicious fondue after long days of hiking.',
        coordinates: { lat: 46.0207, lng: 7.7491 },
        countryCode: 'CHE',
    },
    {
        id: '5',
        title: 'New York City Break',
        date: 'December 2022',
        location: 'New York, USA',
        coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=2071&auto=format&fit=crop',
        ],
        collectibles: ['🗽', '🚕', '🍕'],
        stats: {
            distance: '50 km',
            duration: '5 days',
            steps: 75000,
        },
        description: 'Christmas in the city that never sleeps. Rockefeller Center, Central Park, and endless food tours.',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        countryCode: 'USA',
    },
];
