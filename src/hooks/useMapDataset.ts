/**
 * useMapDataset Hook
 *
 * Manages GeoJSON datasets, sources, and layers on the map.
 * Handles adding, removing, and toggling datasets.
 *
 * CRITICAL: Only adds sources/layers after map is loaded (Mapbox requirement)
 */

import { useEffect, useCallback, useState } from "react";
import type { Map as MapboxMap } from "mapbox-gl";
import type { DatasetConfig } from "@/types";
import { sourceExists, layerExists, removeLayer, removeSource } from "@/utils/mapbox";

/**
 * Return type for useMapDataset hook
 */
export interface UseMapDatasetReturn {
  addDataset: (dataset: DatasetConfig) => void;
  removeDataset: (datasetId: string) => void;
  toggleDataset: (datasetId: string) => void;
  isDatasetActive: (datasetId: string) => boolean;
  activeDatasets: Set<string>;
}

/**
 * Hook for managing datasets on a Mapbox map
 *
 * @param map - Mapbox map instance
 * @param isLoaded - Whether map is fully loaded
 * @returns Dataset management functions
 *
 * @example
 * ```tsx
 * const { addDataset, removeDataset, toggleDataset } = useMapDataset(map, isLoaded);
 *
 * // Add a dataset
 * addDataset({
 *   id: 'my-dataset',
 *   name: 'My Dataset',
 *   source: {
 *     id: 'my-source',
 *     type: 'geojson',
 *     data: { type: 'FeatureCollection', features: [...] }
 *   },
 *   layers: [{
 *     id: 'my-layer',
 *     type: 'circle',
 *     source: 'my-source',
 *     paint: { 'circle-radius': 5, 'circle-color': '#007cbf' }
 *   }]
 * });
 * ```
 */
export function useMapDataset(
  map: MapboxMap | null,
  isLoaded: boolean
): UseMapDatasetReturn {
  const [activeDatasets, setActiveDatasets] = useState<Set<string>>(new Set());
  const [loadedDatasets, setLoadedDatasets] = useState<Map<string, DatasetConfig>>(
    new Map()
  );

  /**
   * Adds a dataset to the map
   * IMPORTANT: Can only be called after map is loaded
   */
  const addDataset = useCallback(
    (dataset: DatasetConfig) => {
      if (!map || !isLoaded) {
        console.warn(
          "Cannot add dataset: Map is not loaded yet. Wait for isLoaded to be true."
        );
        return;
      }

      // Double-check that map is fully initialized
      if (!map.getSource || !map.addSource || !map.addLayer) {
        console.warn("Map methods not available yet. Try again after map is fully loaded.");
        return;
      }

      try {
        // Add source if it doesn't exist
        if (!sourceExists(map, dataset.source.id)) {
          // Build source config, only including defined properties
          const sourceConfig: any = {
            type: dataset.source.type,
            data: dataset.source.data,
          };

          // Only add clustering properties if they're defined
          if (dataset.source.cluster !== undefined) {
            sourceConfig.cluster = dataset.source.cluster;
          }
          if (dataset.source.clusterMaxZoom !== undefined) {
            sourceConfig.clusterMaxZoom = dataset.source.clusterMaxZoom;
          }
          if (dataset.source.clusterRadius !== undefined) {
            sourceConfig.clusterRadius = dataset.source.clusterRadius;
          }

          map.addSource(dataset.source.id, sourceConfig as mapboxgl.AnySourceData);
        }

        // Add all layers for this dataset
        dataset.layers.forEach((layer) => {
          if (!layerExists(map, layer.id)) {
            const layerConfig: any = {
              id: layer.id,
              type: layer.type,
              source: layer.source,
            };

            // Only add optional properties if they exist
            if (layer["source-layer"]) {
              layerConfig["source-layer"] = layer["source-layer"];
            }
            if (layer.minzoom !== undefined) {
              layerConfig.minzoom = layer.minzoom;
            }
            if (layer.maxzoom !== undefined) {
              layerConfig.maxzoom = layer.maxzoom;
            }
            if (layer.filter) {
              layerConfig.filter = layer.filter;
            }
            if (layer.layout) {
              layerConfig.layout = layer.layout;
            }
            if (layer.paint) {
              layerConfig.paint = layer.paint;
            }

            map.addLayer(layerConfig);
          }
        });

        // Track dataset
        setLoadedDatasets((prev) => new Map(prev).set(dataset.id, dataset));
        setActiveDatasets((prev) => new Set(prev).add(dataset.id));
      } catch (error) {
        console.error(`Failed to add dataset ${dataset.id}:`, error);
      }
    },
    [map, isLoaded]
  );

  /**
   * Removes a dataset from the map
   */
  const removeDataset = useCallback(
    (datasetId: string) => {
      if (!map) {
        return;
      }

      const dataset = loadedDatasets.get(datasetId);
      if (!dataset) {
        return;
      }

      try {
        // Remove all layers
        dataset.layers.forEach((layer) => {
          removeLayer(map, layer.id);
        });

        // Remove source
        removeSource(map, dataset.source.id);

        // Update state
        setLoadedDatasets((prev) => {
          const next = new Map(prev);
          next.delete(datasetId);
          return next;
        });

        setActiveDatasets((prev) => {
          const next = new Set(prev);
          next.delete(datasetId);
          return next;
        });
      } catch (error) {
        console.error(`Failed to remove dataset ${datasetId}:`, error);
      }
    },
    [map, loadedDatasets]
  );

  /**
   * Toggles dataset visibility
   */
  const toggleDataset = useCallback(
    (datasetId: string) => {
      if (!map) {
        return;
      }

      const dataset = loadedDatasets.get(datasetId);
      if (!dataset) {
        return;
      }

      const isActive = activeDatasets.has(datasetId);
      const newVisibility = isActive ? "none" : "visible";

      try {
        dataset.layers.forEach((layer) => {
          if (layerExists(map, layer.id)) {
            map.setLayoutProperty(layer.id, "visibility", newVisibility);
          }
        });

        setActiveDatasets((prev) => {
          const next = new Set(prev);
          if (isActive) {
            next.delete(datasetId);
          } else {
            next.add(datasetId);
          }
          return next;
        });
      } catch (error) {
        console.error(`Failed to toggle dataset ${datasetId}:`, error);
      }
    },
    [map, loadedDatasets, activeDatasets]
  );

  /**
   * Checks if a dataset is currently active (visible)
   */
  const isDatasetActive = useCallback(
    (datasetId: string): boolean => {
      return activeDatasets.has(datasetId);
    },
    [activeDatasets]
  );

  // Cleanup all datasets on unmount
  useEffect(() => {
    return () => {
      if (map) {
        loadedDatasets.forEach((dataset) => {
          dataset.layers.forEach((layer) => {
            removeLayer(map, layer.id);
          });
          removeSource(map, dataset.source.id);
        });
      }
    };
  }, [map, loadedDatasets]);

  return {
    addDataset,
    removeDataset,
    toggleDataset,
    isDatasetActive,
    activeDatasets,
  };
}
