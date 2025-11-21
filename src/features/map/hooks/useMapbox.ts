/**
 * useMapbox Hook
 *
 * Core hook for managing Mapbox GL JS lifecycle in React.
 * Handles initialization, loading, cleanup, and error states.
 *
 * CRITICAL: This hook implements Mapbox best practices:
 * 1. Initializes map in useEffect
 * 2. Waits for 'load' event before marking as ready
 * 3. Properly cleans up with map.remove() on unmount
 * 4. Handles errors gracefully
 */

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type { MapConfig, MapLoadingState, MapError } from "@/features/map/types";
import { validateViewport } from "@/utils/mapbox";

/**
 * Return type for useMapbox hook
 */
export interface UseMapboxReturn {
  mapContainer: React.RefObject<HTMLDivElement | null>;
  map: mapboxgl.Map | null;
  isLoaded: boolean;
  loadingState: MapLoadingState;
  error: MapError | null;
}

/**
 * Hook for initializing and managing a Mapbox map instance
 *
 * @param config - Map configuration object
 * @returns Map container ref, map instance, and state
 *
 * @example
 * ```tsx
 * const { mapContainer, map, isLoaded, error } = useMapbox({
 *   accessToken: 'pk.xxx',
 *   style: 'mapbox://styles/mapbox/streets-v12',
 *   initialViewport: { longitude: 0, latitude: 0, zoom: 2 }
 * });
 *
 * // Wait for map to load before adding layers
 * useEffect(() => {
 *   if (map && isLoaded) {
 *     map.addSource('my-data', { ... });
 *   }
 * }, [map, isLoaded]);
 * ```
 */
export function useMapbox(config: MapConfig): UseMapboxReturn {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [loadingState, setLoadingState] = useState<MapLoadingState>("idle");
  const [error, setError] = useState<MapError | null>(null);

  // Validate configuration
  useEffect(() => {
    try {
      validateViewport(config.initialViewport);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Invalid configuration",
        code: "INVALID_CONFIG",
        timestamp: new Date(),
      });
      setLoadingState("error");
    }
  }, [config.initialViewport]);

  // Initialize map
  useEffect(() => {
    // Don't initialize if container is not ready or already initialized
    if (!mapContainer.current || mapInstance.current) {
      return;
    }

    // Don't initialize if there's a config error
    if (error) {
      return;
    }

    setLoadingState("loading");

    try {
      // Set access token
      mapboxgl.accessToken = config.accessToken;

      // Create map instance
      const mapboxMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: config.style,
        center: [
          config.initialViewport.longitude,
          config.initialViewport.latitude,
        ],
        zoom: config.initialViewport.zoom,
        pitch: config.initialViewport.pitch,
        bearing: config.initialViewport.bearing,
        minZoom: config.minZoom,
        maxZoom: config.maxZoom,
        maxBounds: config.maxBounds,
        interactive: config.interactive,
        attributionControl: config.attributionControl,
        logoPosition: config.logoPosition,
      });

      // Store reference
      mapInstance.current = mapboxMap;

      // Wait for map to load (CRITICAL: Mapbox requirement)
      mapboxMap.on("load", () => {
        setMap(mapboxMap);
        setLoadingState("loaded");
      });

      // Handle errors
      mapboxMap.on("error", (e) => {
        setError({
          message: e.error?.message || "Map error occurred",
          code: "MAP_ERROR",
          timestamp: new Date(),
        });
        setLoadingState("error");
      });
    } catch (err) {
      setError({
        message:
          err instanceof Error ? err.message : "Failed to initialize map",
        code: "INIT_ERROR",
        timestamp: new Date(),
      });
      setLoadingState("error");
    }

    // Cleanup function (CRITICAL: Prevents memory leaks)
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  return {
    mapContainer,
    map,
    isLoaded: loadingState === "loaded",
    loadingState,
    error,
  };
}
