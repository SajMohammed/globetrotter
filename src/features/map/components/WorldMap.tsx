'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Map as MapboxMap } from 'mapbox-gl';
import { Map, MapControls } from '@/features/map/components';
import { createDefaultMapConfig } from '@/utils/mapbox';
import { useCountryColors } from '@/features/map/hooks/useCountryColors';
import {
    getCountryCodes,
    createCountryColorExpression,
} from '@/data/sampleCountryData';

export function WorldMap() {
    const [map, setMap] = useState<MapboxMap | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Create map configuration with world view
    const mapConfig = useMemo(
        () =>
            createDefaultMapConfig({
                // Using default streets style
                style: 'mapbox://styles/mapbox/streets-v12',
                // Disable some interactions for a background map if desired, 
                // but keeping them enabled as per "interactive background" requirement
                interactive: true,
            }),
        []
    );

    const handleMapLoad = useCallback((loadedMap: MapboxMap) => {
        setMap(loadedMap);
        setIsLoaded(true);
    }, []);

    // Highlight countries in dataset with beautiful colors, gray out others
    // This preserves the "existing world view" logic
    /* 
    useCountryColors(map, isLoaded, {
        countryCodes: getCountryCodes(),
        colorExpression: createCountryColorExpression(),
        grayColor: '#b0b0b0',
        grayOpacity: 0.85,
        colorOpacity: 0.8,
    });
    */

    return (
        <div className="h-full w-full">
            <Map
                config={mapConfig}
                onLoad={handleMapLoad}
                style={{ width: '100%', height: '100%' }}
            >
                {map && isLoaded && (
                    <MapControls
                        map={map}
                        config={{
                            showNavigation: false, // Hide controls for cleaner background look, or enable if needed
                            showGeolocate: false,
                            showFullscreen: false,
                            showScale: false,
                            position: 'bottom-right',
                        }}
                    />
                )}
            </Map>
            {/* Overlay gradient to soften the map edges */}
            <div className="pointer-events-none absolute inset-0 bg-white/10" />
        </div>
    );
}
