/**
 * Dataset Type Definitions
 *
 * Types for managing GeoJSON datasets and data layers on the map.
 * GeoJSON is the recommended format for custom datasets in Mapbox GL JS.
 */

import type { GeoJSON } from "geojson";

/**
 * Dataset source configuration
 * Uses GeoJSON as the primary data format
 */
export interface DatasetSource {
  id: string;
  type: "geojson";
  data: GeoJSON | string; // GeoJSON object or URL
  cluster?: boolean;
  clusterMaxZoom?: number;
  clusterRadius?: number;
}

/**
 * Layer types supported by Mapbox GL JS
 */
export type LayerType =
  | "fill"
  | "line"
  | "symbol"
  | "circle"
  | "heatmap"
  | "fill-extrusion"
  | "raster"
  | "hillshade"
  | "background";

/**
 * Paint properties for different layer types
 * These are applied later in rendering (cheaper performance)
 */
export interface LayerPaintProperties {
  // Fill layer
  "fill-color"?: string | any[];
  "fill-opacity"?: number | any[];
  "fill-outline-color"?: string | any[];

  // Line layer
  "line-color"?: string | any[];
  "line-width"?: number | any[];
  "line-opacity"?: number | any[];

  // Circle layer
  "circle-radius"?: number | any[];
  "circle-color"?: string | any[];
  "circle-opacity"?: number | any[];
  "circle-stroke-width"?: number | any[];
  "circle-stroke-color"?: string | any[];

  // Symbol layer
  "text-color"?: string | any[];
  "text-halo-color"?: string | any[];
  "text-halo-width"?: number | any[];
  "icon-color"?: string | any[];
  "icon-opacity"?: number | any[];

  // Heatmap layer
  "heatmap-weight"?: number | any[];
  "heatmap-intensity"?: number | any[];
  "heatmap-color"?: string | any[];
  "heatmap-radius"?: number | any[];
}

/**
 * Layout properties for different layer types
 * These are applied early in rendering (more expensive)
 */
export interface LayerLayoutProperties {
  visibility?: "visible" | "none";

  // Symbol layer
  "text-field"?: string | any[];
  "text-font"?: string[];
  "text-size"?: number | any[];
  "text-offset"?: any[];
  "text-anchor"?: string;
  "icon-image"?: string | any[];
  "icon-size"?: number | any[];
  "icon-allow-overlap"?: boolean;
  "text-allow-overlap"?: boolean;

  // Line layer
  "line-join"?: "bevel" | "round" | "miter";
  "line-cap"?: "butt" | "round" | "square";
}

/**
 * Complete layer configuration
 */
export interface DataLayerConfig {
  id: string;
  type: LayerType;
  source: string; // Reference to source ID
  "source-layer"?: string; // For vector tiles
  minzoom?: number;
  maxzoom?: number;
  filter?: unknown[]; // Mapbox expression
  layout?: LayerLayoutProperties;
  paint?: LayerPaintProperties;
}

/**
 * Complete dataset configuration (source + layer)
 */
export interface DatasetConfig {
  id: string;
  name: string;
  description?: string;
  source: DatasetSource;
  layers: DataLayerConfig[];
}

/**
 * Dataset state management
 */
export interface DatasetState {
  datasets: Map<string, DatasetConfig>;
  activeDatasets: Set<string>;
  loadingDatasets: Set<string>;
  errors: Map<string, Error>;
}

/**
 * Feature properties for GeoJSON features
 * Generic type that can be extended for specific use cases
 */
export interface FeatureProperties {
  id?: string | number;
  name?: string;
  description?: string;
  [key: string]: unknown;
}

/**
 * Dataset action types for state management
 */
export type DatasetAction =
  | { type: "ADD_DATASET"; payload: DatasetConfig }
  | { type: "REMOVE_DATASET"; payload: string }
  | { type: "TOGGLE_DATASET"; payload: string }
  | { type: "SET_LOADING"; payload: { id: string; loading: boolean } }
  | { type: "SET_ERROR"; payload: { id: string; error: Error } };
