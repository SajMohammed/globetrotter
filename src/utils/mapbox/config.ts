/**
 * Mapbox Configuration Utilities
 *
 * Helper functions for creating and validating Mapbox configurations.
 */

import type { MapConfig, MapViewport } from "@/features/map/types";
import { DEFAULT_VIEWPORT, MAP_STYLES, ZOOM_CONSTRAINTS } from "@/config/constants";
import { env } from "@/config/env";

/**
 * Creates a default map configuration
 * @param overrides - Optional configuration overrides
 * @returns Complete MapConfig object
 */
export function createDefaultMapConfig(
  overrides?: Partial<MapConfig>
): MapConfig {
  return {
    accessToken: env.mapbox.token(),
    style: MAP_STYLES.STREETS,
    initialViewport: DEFAULT_VIEWPORT,
    minZoom: ZOOM_CONSTRAINTS.MIN,
    maxZoom: ZOOM_CONSTRAINTS.MAX,
    interactive: true,
    attributionControl: true,
    logoPosition: "bottom-left",
    ...overrides,
  };
}

/**
 * Validates viewport configuration
 * @param viewport - Viewport to validate
 * @throws Error if viewport is invalid
 */
export function validateViewport(viewport: MapViewport): void {
  const { longitude, latitude, zoom, pitch, bearing } = viewport;

  // Validate longitude (-180 to 180)
  if (longitude < -180 || longitude > 180) {
    throw new Error(
      `Invalid longitude: ${longitude}. Must be between -180 and 180.`
    );
  }

  // Validate latitude (-90 to 90)
  if (latitude < -90 || latitude > 90) {
    throw new Error(
      `Invalid latitude: ${latitude}. Must be between -90 and 90.`
    );
  }

  // Validate zoom
  if (zoom < ZOOM_CONSTRAINTS.MIN || zoom > ZOOM_CONSTRAINTS.MAX) {
    throw new Error(
      `Invalid zoom: ${zoom}. Must be between ${ZOOM_CONSTRAINTS.MIN} and ${ZOOM_CONSTRAINTS.MAX}.`
    );
  }

  // Validate pitch (0 to 60 degrees)
  if (pitch !== undefined && (pitch < 0 || pitch > 60)) {
    throw new Error(`Invalid pitch: ${pitch}. Must be between 0 and 60.`);
  }

  // Validate bearing (0 to 360 degrees)
  if (bearing !== undefined && (bearing < 0 || bearing > 360)) {
    throw new Error(`Invalid bearing: ${bearing}. Must be between 0 and 360.`);
  }
}

/**
 * Converts a style preset name to full Mapbox style URL
 * @param style - Style preset name or full URL
 * @returns Full Mapbox style URL
 */
export function getStyleUrl(style: string): string {
  // If already a full URL, return as-is
  if (style.startsWith("mapbox://")) {
    return style;
  }

  // Convert preset name to URL
  const styleMap: Record<string, string> = {
    "streets-v12": MAP_STYLES.STREETS,
    "outdoors-v12": MAP_STYLES.OUTDOORS,
    "light-v11": MAP_STYLES.LIGHT,
    "dark-v11": MAP_STYLES.DARK,
    "satellite-v9": MAP_STYLES.SATELLITE,
    "satellite-streets-v12": MAP_STYLES.SATELLITE_STREETS,
    "navigation-day-v1": MAP_STYLES.NAVIGATION_DAY,
    "navigation-night-v1": MAP_STYLES.NAVIGATION_NIGHT,
  };

  return styleMap[style] || MAP_STYLES.STREETS;
}

/**
 * Checks if the Mapbox token is valid (basic check)
 * @param token - Mapbox access token
 * @returns true if token appears valid
 */
export function isValidToken(token: string): boolean {
  // Mapbox tokens start with 'pk.' for public tokens
  return token.startsWith("pk.") && token.length > 20;
}
