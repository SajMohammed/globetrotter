/**
 * Application Constants
 *
 * Centralized configuration values used throughout the application.
 */

import type { MapViewport } from "@/types";

/**
 * Default map viewport - World view
 * NOTE: Mapbox uses [longitude, latitude] order
 */
export const DEFAULT_VIEWPORT: MapViewport = {
  longitude: 0,
  latitude: 20,
  zoom: 1.5, // World view
  pitch: 0,
  bearing: 0,
};

/**
 * Map zoom level constraints
 */
export const ZOOM_CONSTRAINTS = {
  MIN: 0, // Maximum zoom out (world view)
  MAX: 22, // Maximum zoom in (building level)
  DEFAULT: 1.5,
} as const;

/**
 * Map style URLs
 */
export const MAP_STYLES = {
  STREETS: "mapbox://styles/mapbox/streets-v12",
  OUTDOORS: "mapbox://styles/mapbox/outdoors-v12",
  LIGHT: "mapbox://styles/mapbox/light-v11",
  DARK: "mapbox://styles/mapbox/dark-v11",
  SATELLITE: "mapbox://styles/mapbox/satellite-v9",
  SATELLITE_STREETS: "mapbox://styles/mapbox/satellite-streets-v12",
  NAVIGATION_DAY: "mapbox://styles/mapbox/navigation-day-v1",
  NAVIGATION_NIGHT: "mapbox://styles/mapbox/navigation-night-v1",
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 300,
  NORMAL: 600,
  SLOW: 1000,
  FLY_TO: 2000,
} as const;

/**
 * Dataset layer default colors
 */
export const LAYER_COLORS = {
  PRIMARY: "#3b82f6", // Blue
  SECONDARY: "#8b5cf6", // Purple
  SUCCESS: "#10b981", // Green
  WARNING: "#f59e0b", // Amber
  DANGER: "#ef4444", // Red
  INFO: "#06b6d4", // Cyan
} as const;

/**
 * Control positions
 */
export const CONTROL_POSITIONS = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
} as const;

/**
 * Map container default styles
 */
export const MAP_CONTAINER_STYLES = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
} as const;
