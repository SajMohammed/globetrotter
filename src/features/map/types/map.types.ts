/**
 * Map Type Definitions
 *
 * Comprehensive TypeScript types for Mapbox GL JS integration.
 * Based on Mapbox GL JS official documentation and best practices.
 */

import type { Map as MapboxMap, LngLatBoundsLike, PointLike, Anchor } from "mapbox-gl";

/**
 * Map viewport configuration
 * NOTE: Mapbox uses [longitude, latitude] order (not lat/lng)
 */
export interface MapViewport {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number; // Tilt angle (0-60 degrees)
  bearing?: number; // Rotation angle (0-360 degrees)
}

/**
 * Mapbox style presets
 * Full list: https://docs.mapbox.com/api/maps/styles/
 */
export type MapStylePreset =
  | "streets-v12"
  | "outdoors-v12"
  | "light-v11"
  | "dark-v11"
  | "satellite-v9"
  | "satellite-streets-v12"
  | "navigation-day-v1"
  | "navigation-night-v1";

/**
 * Map style can be a preset or custom style URL
 */
export type MapStyle = MapStylePreset | `mapbox://styles/${string}`;

/**
 * Map configuration object
 */
export interface MapConfig {
  accessToken: string;
  style?: MapStyle;
  initialViewport: MapViewport;
  minZoom?: number;
  maxZoom?: number;
  maxBounds?: LngLatBoundsLike;
  interactive?: boolean;
  attributionControl?: boolean;
  logoPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Map component props
 */
export interface MapProps {
  config: MapConfig;
  onLoad?: (map: MapboxMap) => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Map controls position
 */
export type ControlPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/**
 * Map controls configuration
 */
export interface MapControlsConfig {
  showNavigation?: boolean;
  showGeolocate?: boolean;
  showFullscreen?: boolean;
  showScale?: boolean;
  position?: ControlPosition;
}

/**
 * Marker configuration
 */
export interface MarkerConfig {
  id: string;
  longitude: number;
  latitude: number;
  color?: string;
  draggable?: boolean;
  onClick?: (id: string) => void;
  popup?: PopupConfig;
}

/**
 * Popup configuration
 */
export interface PopupConfig {
  content: string | HTMLElement;
  closeButton?: boolean;
  closeOnClick?: boolean;
  maxWidth?: string;
  offset?: number | PointLike;
  anchor?: Anchor;
}

/**
 * Map event handlers
 */
export interface MapEventHandlers {
  onClick?: (event: any) => void;
  onMouseMove?: (event: any) => void;
  onMouseEnter?: (event: any) => void;
  onMouseLeave?: (event: any) => void;
  onZoom?: (event: any) => void;
  onMove?: (event: any) => void;
}

/**
 * Map loading states
 */
export type MapLoadingState = "idle" | "loading" | "loaded" | "error";

/**
 * Map error information
 */
export interface MapError {
  message: string;
  code?: string;
  timestamp: Date;
}

/**
 * Map instance state
 */
export interface MapState {
  isLoaded: boolean;
  loadingState: MapLoadingState;
  error: MapError | null;
  viewport: MapViewport | null;
}

/**
 * Map context value for React Context API
 */
export interface MapContextValue {
  map: MapboxMap | null;
  mapState: MapState;
  setMap: (map: MapboxMap | null) => void;
  updateViewport: (viewport: Partial<MapViewport>) => void;
}
