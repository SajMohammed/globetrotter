export const MOCK_PASSPORT_DATA = {
    userProfile: {
        surname: 'EXPLORER',
        givenNames: 'SAJMO',
        nationality: 'EARTHLING',
        sex: 'M',
        dob: '01 JAN 1995',
        pob: 'LONDON, UK',
        doi: '12 NOV 2023',
        doe: '12 NOV 2033',
        authority: 'IPSO',
        passportNo: 'E88291042',
        code: 'UKE',
        type: 'P',
        mrz: {
            line1: 'P<UKEEXPLORER<<SAJMO<<<<<<<<<<<<<<<<<<<<<<<<',
            line2: 'E882910428UKE9501018M3311125<<<<<<<<<<<<<<<<06'
        }
    },
    stamps: [
        { city: 'Tokyo', country: 'JPN', date: '2023-11-12', color: '#c0392b', rotation: -12, x: 10, y: 20 },
        { city: 'Paris', country: 'FRA', date: '2024-01-05', color: '#2980b9', rotation: 5, x: 140, y: 40 },
        { city: 'New York', country: 'USA', date: '2024-03-22', color: '#27ae60', rotation: -8, x: 20, y: 150 },
        { city: 'London', country: 'GBR', date: '2024-05-10', color: '#8e44ad', rotation: 15, x: 160, y: 130 },
        { city: 'Berlin', country: 'DEU', date: '2024-07-18', color: '#d35400', rotation: -2, x: 50, y: 280 },
        { city: 'Sydney', country: 'AUS', date: '2024-09-30', color: '#16a085', rotation: 8, x: 180, y: 260 },
        { city: 'Cairo', country: 'EGY', date: '2024-10-12', color: '#d35400', rotation: 12, x: 40, y: 40 },
        { city: 'Rio', country: 'BRA', date: '2024-11-05', color: '#27ae60', rotation: -5, x: 120, y: 80 },
        { city: 'Dubai', country: 'UAE', date: '2024-12-01', color: '#f39c12', rotation: 10, x: 30, y: 200 },
        { city: 'Mumbai', country: 'IND', date: '2025-01-15', color: '#8e44ad', rotation: -15, x: 150, y: 180 },
        { city: 'Rome', country: 'ITA', date: '2025-02-20', color: '#c0392b', rotation: 6, x: 60, y: 300 },
        { city: 'Oslo', country: 'NOR', date: '2025-03-10', color: '#2980b9', rotation: -4, x: 170, y: 290 },
        { city: 'Lima', country: 'PER', date: '2025-04-05', color: '#c0392b', rotation: 18, x: 20, y: 100 },
        { city: 'Seoul', country: 'KOR', date: '2025-05-22', color: '#2c3e50', rotation: -10, x: 140, y: 220 },
        { city: 'Nairobi', country: 'KEN', date: '2025-06-14', color: '#27ae60', rotation: 5, x: 80, y: 160 },
    ],
    travelStats: {
        worldSeen: 12, // percentage
        furthestPoint: {
            distance: '12,400km',
            location: 'from London'
        },
        flags: ['🇬🇧', '🇫🇷', '🇺🇸', '🇯🇵', '🇩🇪', '🇦🇺', '🇮🇹', '🇪🇸', '🇨🇦', '🇧🇷'],
        flagCount: 22
    },
    activityHeatmap: Array.from({ length: 52 }).map((_, i) => {
        // Deterministic pseudo-random based on index
        const seededRandom = (seed: number) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        const intensity = seededRandom(i + 1); // Use index as seed
        // Mock some specific data for tooltips
        const weeks = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = weeks[Math.floor(i / 4.5)];

        let activity = 'No travel';
        if (intensity > 0.8) activity = '3 Countries Visited';
        else if (intensity > 0.6) activity = 'Long-haul Trip';
        else if (intensity > 0.4) activity = 'Weekend Getaway';
        else if (intensity > 0.2) activity = 'Local Exploration';

        return {
            week: i + 1,
            month,
            intensity,
            activity
        };
    })
};
