/**
 * MapDataLayer Component
 *
 * Component for adding and managing GeoJSON data layers on the map.
 */

"use client";

import { useEffect } from "react";
import type { Map as MapboxMap } from "mapbox-gl";
import type { DatasetConfig } from "@/types";
import { useMapDataset } from "@/hooks";

interface MapDataLayerProps {
  map: MapboxMap | null;
  isLoaded: boolean;
  dataset: DatasetConfig;
  onAdd?: (datasetId: string) => void;
  onRemove?: (datasetId: string) => void;
}

/**
 * MapDataLayer Component
 *
 * Automatically adds a dataset to the map when mounted and removes it when unmounted.
 *
 * @example
 * ```tsx
 * const myDataset: DatasetConfig = {
 *   id: 'cities',
 *   name: 'World Cities',
 *   source: {
 *     id: 'cities-source',
 *     type: 'geojson',
 *     data: {
 *       type: 'FeatureCollection',
 *       features: [...]
 *     }
 *   },
 *   layers: [{
 *     id: 'cities-layer',
 *     type: 'circle',
 *     source: 'cities-source',
 *     paint: {
 *       'circle-radius': 6,
 *       'circle-color': '#007cbf'
 *     }
 *   }]
 * };
 *
 * <MapDataLayer
 *   map={map}
 *   isLoaded={isLoaded}
 *   dataset={myDataset}
 *   onAdd={(id) => console.log('Dataset added:', id)}
 * />
 * ```
 */
export function MapDataLayer({
  map,
  isLoaded,
  dataset,
  onAdd,
  onRemove,
}: MapDataLayerProps) {
  const { addDataset, removeDataset } = useMapDataset(map, isLoaded);

  // Add dataset when component mounts
  useEffect(() => {
    if (!map || !isLoaded) {
      return;
    }

    // Ensure map is fully ready before adding dataset
    if (!map.getSource || !map.addSource || !map.addLayer) {
      console.warn("Map not fully initialized yet");
      return;
    }

    // Small delay to ensure map is completely ready
    const timeoutId = setTimeout(() => {
      addDataset(dataset);
      onAdd?.(dataset.id);
    }, 100);

    // Remove dataset when component unmounts
    return () => {
      clearTimeout(timeoutId);
      removeDataset(dataset.id);
      onRemove?.(dataset.id);
    };
    // Note: addDataset and removeDataset are intentionally omitted from dependencies
    // to prevent re-running when internal hook state changes. They're stable functions
    // that always perform the same action.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isLoaded, dataset]);

  // This component doesn't render anything visible
  return null;
}
