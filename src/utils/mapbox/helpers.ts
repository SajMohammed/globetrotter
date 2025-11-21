/**
 * Mapbox Helper Utilities
 *
 * Common helper functions for Mapbox operations like coordinate conversion,
 * bounds calculation, and camera movements.
 */

import mapboxgl from "mapbox-gl";
import type { MapViewport } from "@/features/map/types";
import { ANIMATION_DURATION } from "@/config/constants";

/**
 * Converts viewport to Mapbox camera options
 * @param viewport - Viewport configuration
 * @returns Mapbox camera options object
 */
export function viewportToCameraOptions(
  viewport: MapViewport
): mapboxgl.CameraOptions {
  return {
    center: [viewport.longitude, viewport.latitude],
    zoom: viewport.zoom,
    pitch: viewport.pitch,
    bearing: viewport.bearing,
  };
}

/**
 * Extracts viewport from map instance
 * @param map - Mapbox map instance
 * @returns Current viewport configuration
 */
export function getViewportFromMap(map: mapboxgl.Map): MapViewport {
  const center = map.getCenter();
  return {
    longitude: center.lng,
    latitude: center.lat,
    zoom: map.getZoom(),
    pitch: map.getPitch(),
    bearing: map.getBearing(),
  };
}

/**
 * Smoothly flies the map to a new viewport
 * @param map - Mapbox map instance
 * @param viewport - Target viewport
 * @param duration - Animation duration in ms (default: 2000)
 */
export function flyToViewport(
  map: mapboxgl.Map,
  viewport: Partial<MapViewport>,
  duration: number = ANIMATION_DURATION.FLY_TO
): void {
  const options: any = {
    duration,
  };

  if (viewport.longitude !== undefined && viewport.latitude !== undefined) {
    options.center = [viewport.longitude, viewport.latitude];
  }

  if (viewport.zoom !== undefined) {
    options.zoom = viewport.zoom;
  }

  if (viewport.pitch !== undefined) {
    options.pitch = viewport.pitch;
  }

  if (viewport.bearing !== undefined) {
    options.bearing = viewport.bearing;
  }

  map.flyTo(options);
}

/**
 * Smoothly eases the map to a new viewport
 * @param map - Mapbox map instance
 * @param viewport - Target viewport
 * @param duration - Animation duration in ms (default: 600)
 */
export function easeToViewport(
  map: mapboxgl.Map,
  viewport: Partial<MapViewport>,
  duration: number = ANIMATION_DURATION.NORMAL
): void {
  const options: any = {
    duration,
  };

  if (viewport.longitude !== undefined && viewport.latitude !== undefined) {
    options.center = [viewport.longitude, viewport.latitude];
  }

  if (viewport.zoom !== undefined) {
    options.zoom = viewport.zoom;
  }

  if (viewport.pitch !== undefined) {
    options.pitch = viewport.pitch;
  }

  if (viewport.bearing !== undefined) {
    options.bearing = viewport.bearing;
  }

  map.easeTo(options);
}

/**
 * Instantly jumps the map to a new viewport (no animation)
 * @param map - Mapbox map instance
 * @param viewport - Target viewport
 */
export function jumpToViewport(
  map: mapboxgl.Map,
  viewport: Partial<MapViewport>
): void {
  const options: mapboxgl.CameraOptions = {};

  if (viewport.longitude !== undefined && viewport.latitude !== undefined) {
    options.center = [viewport.longitude, viewport.latitude];
  }

  if (viewport.zoom !== undefined) {
    options.zoom = viewport.zoom;
  }

  if (viewport.pitch !== undefined) {
    options.pitch = viewport.pitch;
  }

  if (viewport.bearing !== undefined) {
    options.bearing = viewport.bearing;
  }

  map.jumpTo(options);
}

/**
 * Fits map to show all provided coordinates
 * @param map - Mapbox map instance
 * @param coordinates - Array of [longitude, latitude] coordinates
 * @param padding - Padding around bounds in pixels (default: 50)
 */
export function fitBounds(
  map: mapboxgl.Map,
  coordinates: [number, number][],
  padding: number = 50
): void {
  if (coordinates.length === 0) {
    return;
  }

  const bounds = coordinates.reduce(
    (bounds, coord) => bounds.extend(coord as mapboxgl.LngLatLike),
    new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
  );

  map.fitBounds(bounds, {
    padding,
    duration: ANIMATION_DURATION.NORMAL,
  });
}

/**
 * Checks if a layer exists on the map
 * @param map - Mapbox map instance
 * @param layerId - Layer ID to check
 * @returns true if layer exists
 */
export function layerExists(map: mapboxgl.Map, layerId: string): boolean {
  if (!map || !map.getLayer) {
    return false;
  }
  try {
    return !!map.getLayer(layerId);
  } catch {
    return false;
  }
}

/**
 * Checks if a source exists on the map
 * @param map - Mapbox map instance
 * @param sourceId - Source ID to check
 * @returns true if source exists
 */
export function sourceExists(map: mapboxgl.Map, sourceId: string): boolean {
  if (!map || !map.getSource) {
    return false;
  }
  try {
    return !!map.getSource(sourceId);
  } catch {
    return false;
  }
}

/**
 * Safely removes a layer from the map
 * @param map - Mapbox map instance
 * @param layerId - Layer ID to remove
 */
export function removeLayer(map: mapboxgl.Map, layerId: string): void {
  if (layerExists(map, layerId)) {
    map.removeLayer(layerId);
  }
}

/**
 * Safely removes a source from the map
 * NOTE: All layers using this source must be removed first
 * @param map - Mapbox map instance
 * @param sourceId - Source ID to remove
 */
export function removeSource(map: mapboxgl.Map, sourceId: string): void {
  if (sourceExists(map, sourceId)) {
    map.removeSource(sourceId);
  }
}

/**
 * Toggles layer visibility
 * @param map - Mapbox map instance
 * @param layerId - Layer ID to toggle
 */
export function toggleLayerVisibility(
  map: mapboxgl.Map,
  layerId: string
): void {
  if (!layerExists(map, layerId)) {
    return;
  }

  const visibility = map.getLayoutProperty(layerId, "visibility");
  const newVisibility = visibility === "visible" ? "none" : "visible";
  map.setLayoutProperty(layerId, "visibility", newVisibility);
}

/**
 * Calculates distance between two coordinates in kilometers
 * Uses the Haversine formula
 * @param coord1 - First coordinate [lng, lat]
 * @param coord2 - Second coordinate [lng, lat]
 * @returns Distance in kilometers
 */
export function calculateDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(coord2[1] - coord1[1]);
  const dLon = toRadians(coord2[0] - coord1[0]);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1[1])) *
    Math.cos(toRadians(coord2[1])) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Converts degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
