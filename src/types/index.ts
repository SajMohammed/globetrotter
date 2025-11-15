/**
 * Central export point for all TypeScript types
 *
 * Import types from this file throughout the application:
 * import type { MapConfig, DatasetConfig } from '@/types';
 */

// Map types
export type {
  MapViewport,
  MapStylePreset,
  MapStyle,
  MapConfig,
  MapProps,
  ControlPosition,
  MapControlsConfig,
  MarkerConfig,
  PopupConfig,
  MapEventHandlers,
  MapLoadingState,
  MapError,
  MapState,
  MapContextValue,
} from "./map.types";

// Dataset types
export type {
  DatasetSource,
  LayerType,
  LayerPaintProperties,
  LayerLayoutProperties,
  DataLayerConfig,
  DatasetConfig,
  DatasetState,
  FeatureProperties,
  DatasetAction,
} from "./dataset.types";
