/**
 * Map Component
 *
 * Core Mapbox GL JS map component for Next.js.
 * Handles map initialization, loading states, and error handling.
 *
 * MUST be a client component due to Mapbox GL JS browser dependencies.
 */

"use client";

import { useEffect } from "react";
import type { MapProps } from "@/types";
import { useMapbox } from "@/hooks";
import { MAP_CONTAINER_STYLES } from "@/config/constants";

/**
 * Map Component
 *
 * Enterprise-grade map component with proper error handling and loading states.
 *
 * @example
 * ```tsx
 * <Map
 *   config={{
 *     accessToken: env.mapbox.token(),
 *     style: 'mapbox://styles/mapbox/streets-v12',
 *     initialViewport: { longitude: 0, latitude: 20, zoom: 1.5 }
 *   }}
 *   onLoad={(map) => console.log('Map loaded!', map)}
 *   onError={(error) => console.error('Map error:', error)}
 * />
 * ```
 */
export function Map({
  config,
  onLoad,
  onError,
  className = "",
  style = {},
  children,
}: MapProps) {
  const { mapContainer, map, isLoaded, loadingState, error } = useMapbox(config);

  // Call onLoad callback when map is ready
  useEffect(() => {
    if (map && isLoaded && onLoad) {
      onLoad(map);
    }
  }, [map, isLoaded, onLoad]);

  // Call onError callback when error occurs
  useEffect(() => {
    if (error && onError) {
      const errorObj = new Error(error.message);
      onError(errorObj);
    }
  }, [error, onError]);

  // Render error state
  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-red-50 border-2 border-red-200 rounded-lg ${className}`}
        style={{ ...MAP_CONTAINER_STYLES, ...style }}
      >
        <div className="text-center p-6">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Map Error
          </div>
          <div className="text-red-800 text-sm">{error.message}</div>
          {error.code && (
            <div className="text-red-600 text-xs mt-2">Code: {error.code}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '100%', ...style }}>
      {/* Map container */}
      <div
        ref={mapContainer}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
        data-testid="map-container"
      />

      {/* Loading overlay */}
      {loadingState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-gray-700 font-medium">Loading map...</div>
          </div>
        </div>
      )}

      {/* Children (controls, markers, etc.) - only render when loaded */}
      {isLoaded && children}
    </div>
  );
}
