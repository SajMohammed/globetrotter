/**
 * MapControls Component
 *
 * Adds standard Mapbox controls to the map (navigation, geolocate, fullscreen, scale).
 */

"use client";

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import type { MapControlsConfig } from "@/features/map/types";

interface MapControlsProps {
  map: mapboxgl.Map | null;
  config?: MapControlsConfig;
}

/**
 * MapControls Component
 *
 * Adds navigation and other controls to the map.
 *
 * @example
 * ```tsx
 * <MapControls
 *   map={map}
 *   config={{
 *     showNavigation: true,
 *     showGeolocate: true,
 *     showFullscreen: true,
 *     showScale: true,
 *     position: 'top-right'
 *   }}
 * />
 * ```
 */
export function MapControls({ map, config = {} }: MapControlsProps) {
  const {
    showNavigation = true,
    showGeolocate = false,
    showFullscreen = false,
    showScale = true,
    position = "top-right",
  } = config;

  // Add navigation control (zoom +/-)
  useEffect(() => {
    if (!map || !showNavigation) {
      return;
    }

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, position);

    return () => {
      map.removeControl(nav);
    };
  }, [map, showNavigation, position]);

  // Add geolocate control (user location)
  useEffect(() => {
    if (!map || !showGeolocate) {
      return;
    }

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.addControl(geolocate, position);

    return () => {
      map.removeControl(geolocate);
    };
  }, [map, showGeolocate, position]);

  // Add fullscreen control
  useEffect(() => {
    if (!map || !showFullscreen) {
      return;
    }

    const fullscreen = new mapboxgl.FullscreenControl();
    map.addControl(fullscreen, position);

    return () => {
      map.removeControl(fullscreen);
    };
  }, [map, showFullscreen, position]);

  // Add scale control
  useEffect(() => {
    if (!map || !showScale) {
      return;
    }

    const scale = new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: "metric",
    });

    // Scale is usually at bottom-left
    map.addControl(scale, "bottom-left");

    return () => {
      map.removeControl(scale);
    };
  }, [map, showScale]);

  // This component doesn't render anything visible
  return null;
}
