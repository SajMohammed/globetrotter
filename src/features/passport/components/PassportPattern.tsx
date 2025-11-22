import { useMemo } from 'react';

interface PassportPatternProps {
    color?: string;
    opacity?: number;
}

export function PassportPattern({ color = "#64748b", opacity = 0.1 }: PassportPatternProps) {
    // Generate a complex path for the guilloche pattern
    const pathData = useMemo(() => {
        let d = "";
        const width = 400;
        const height = 600;
        const steps = 100;

        // Create a wave pattern
        for (let y = 0; y < height; y += 20) {
            d += `M 0 ${y} `;
            for (let x = 0; x <= width; x += width / steps) {
                const yOffset = Math.sin(x * 0.05 + y * 0.1) * 10;
                d += `L ${x} ${y + yOffset} `;
            }
        }

        // Create a secondary intersecting wave
        for (let x = 0; x < width; x += 20) {
            d += `M ${x} 0 `;
            for (let y = 0; y <= height; y += height / steps) {
                const xOffset = Math.cos(y * 0.05 + x * 0.1) * 10;
                d += `L ${x + xOffset} ${y} `;
            }
        }

        return d;
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-r-md">
            <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity }}>
                <defs>
                    <pattern id="guilloche" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M0 50 Q 25 0 50 50 T 100 50" fill="none" stroke={color} strokeWidth="0.5" />
                        <path d="M0 50 Q 25 100 50 50 T 100 50" fill="none" stroke={color} strokeWidth="0.5" />
                    </pattern>
                </defs>

                {/* Base fine pattern */}
                <rect width="100%" height="100%" fill="url(#guilloche)" />

                {/* Large sweeping curves overlay */}
                <path d={pathData} fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />

                {/* Central Emblem Watermark Effect */}
                <circle cx="50%" cy="50%" r="80" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
                <circle cx="50%" cy="50%" r="60" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
            </svg>

            {/* Radial Gradient Overlay for "Paper" feel */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)]" />
        </div>
    );
}
