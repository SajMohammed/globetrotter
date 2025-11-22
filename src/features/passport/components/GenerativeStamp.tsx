import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface GenerativeStampProps {
    city: string;
    country: string;
    date: string;
    color?: string;
    className?: string;
    rotation?: number;
}

export function GenerativeStamp({
    city,
    country,
    date,
    color = '#2c3e50',
    className,
    rotation,
}: GenerativeStampProps) {
    // Generate random values based on the city name to keep it consistent for the same city
    // In a real app, we might want to pass a seed or use a more robust hash
    const seed = useMemo(() => {
        return city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }, [city]);

    const finalRotation = useMemo(() => {
        if (rotation !== undefined) return rotation;
        // Random rotation between -15 and 15 degrees
        return (seed % 30) - 15;
    }, [seed, rotation]);

    const shapeVariant = seed % 3; // 0: Circle, 1: Rectangle, 2: Hexagon (simplified to rounded rect for now)

    return (
        <div
            className={cn(
                'relative flex flex-col items-center justify-center border-2 p-2 font-serif text-xs font-bold uppercase tracking-widest opacity-80 mix-blend-multiply',
                className
            )}
            style={{
                borderColor: color,
                color: color,
                transform: `rotate(${finalRotation}deg)`,
                borderRadius: shapeVariant === 0 ? '50%' : shapeVariant === 1 ? '4px' : '12px',
                width: shapeVariant === 0 ? '80px' : 'auto',
                height: shapeVariant === 0 ? '80px' : 'auto',
                minWidth: '80px',
                maskImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==")', // Simple noise mask attempt, might need refinement
                WebkitMaskImage: 'radial-gradient(circle, black 40%, rgba(0,0,0,0.8) 100%)', // Fallback/Simple grunge effect
            }}
        >
            {/* Inner border for double-ring effect on circles */}
            {shapeVariant === 0 && (
                <div
                    className="absolute inset-1 rounded-full border border-dashed opacity-70"
                    style={{ borderColor: color }}
                />
            )}

            <span className="text-[0.6rem] leading-tight">{country}</span>
            <span className="my-0.5 text-[0.5rem] font-normal">{date}</span>
            <span className="text-[0.65rem] font-black">{city}</span>

            {/* "Ink" imperfections */}
            <div className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
                    backgroundSize: '4px 4px'
                }}
            />
        </div>
    );
}
