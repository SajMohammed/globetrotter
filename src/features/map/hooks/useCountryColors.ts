/**
 * useCountryColors Hook
 *
 * Hook for highlighting countries on the map by graying out non-dataset countries.
 * Countries in the dataset keep their default Mapbox colors.
 */

import { useEffect } from "react";
import type { Map as MapboxMap, ExpressionSpecification } from "mapbox-gl";

interface UseCountryColorsOptions {
  countryCodes: string[]; // Array of country codes to highlight
  colorExpression?: ExpressionSpecification; // Mapbox expression for coloring dataset countries
  grayColor?: string; // Color for non-dataset countries
  grayOpacity?: number; // Opacity for gray overlay
  colorOpacity?: number; // Opacity for colored countries
  layerId?: string;
}

/**
 * Hook to highlight countries by graying out others
 *
 * @param map - Mapbox map instance
 * @param isLoaded - Whether map is fully loaded
 * @param options - Configuration
 *
 * @example
 * ```tsx
 * import { getCountryCodes } from '@/data/sampleCountryData';
 *
 * useCountryColors(map, isLoaded, {
 *   countryCodes: getCountryCodes(),
 *   grayOpacity: 0.7
 * });
 * ```
 */
export function useCountryColors(
  map: MapboxMap | null,
  isLoaded: boolean,
  options: UseCountryColorsOptions
) {
  const {
    countryCodes,
    colorExpression,
    grayColor = "#e5e7eb",
    grayOpacity = 0.7,
    colorOpacity = 0.8,
    layerId = "country-gray-overlay",
  } = options;

  const colorLayerId = "country-color-layer";

  useEffect(() => {
    if (!map || !isLoaded) {
      return;
    }

    // Wait a bit to ensure map style is fully loaded
    const timeoutId = setTimeout(() => {
      try {
        // Log existing layers for debugging
        const layers = map.getStyle().layers;
        console.log("Available map layers:", layers?.map(l => l.id));
        console.log("Dataset country codes:", countryCodes);

        // Create filter expression: only show countries NOT in the dataset
        // This will gray out countries that are NOT in countryCodes array
        const filterExpression = ["!", ["in", ["get", "iso_3166_1_alpha_3"], ["literal", countryCodes]]];

        // Check if layer already exists
        if (map.getLayer(layerId)) {
          // Update existing layer
          map.setFilter(layerId, filterExpression);
          map.setPaintProperty(layerId, "fill-color", grayColor);
          map.setPaintProperty(layerId, "fill-opacity", grayOpacity);
          console.log("Updated existing gray overlay layer");
          return;
        }

        // Find a good layer to insert before (try to find the first label layer)
        const labelLayer = layers?.find(layer =>
          layer.id.includes('label') || layer.id.includes('place')
        );
        const insertBeforeLayer = labelLayer?.id || undefined;

        console.log("Inserting gray overlay before layer:", insertBeforeLayer);

        // Add a gray overlay layer for countries NOT in the dataset
        // This uses Mapbox's built-in country boundaries
        map.addLayer(
          {
            id: layerId,
            type: "fill",
            source: {
              type: "vector",
              url: "mapbox://mapbox.country-boundaries-v1",
            },
            "source-layer": "country_boundaries",
            filter: filterExpression,
            paint: {
              "fill-color": grayColor,
              "fill-opacity": grayOpacity,
            },
          },
          insertBeforeLayer
        );

        console.log(`Gray overlay added: ${countryCodes.length} countries will be colored, others grayed out`);

        // Add colored layer for dataset countries if colorExpression is provided
        if (colorExpression) {
          if (map.getLayer(colorLayerId)) {
            map.setPaintProperty(colorLayerId, "fill-color", colorExpression);
            map.setPaintProperty(colorLayerId, "fill-opacity", colorOpacity);
            console.log("Updated existing color layer");
          } else {
            map.addLayer(
              {
                id: colorLayerId,
                type: "fill",
                source: {
                  type: "vector",
                  url: "mapbox://mapbox.country-boundaries-v1",
                },
                "source-layer": "country_boundaries",
                paint: {
                  "fill-color": colorExpression,
                  "fill-opacity": colorOpacity,
                },
              },
              insertBeforeLayer
            );
            console.log("Colored layer added for dataset countries");
          }
        }
      } catch (error) {
        console.error("Error applying country highlight:", error);
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      // Clean up layers on unmount
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }
      if (map.getLayer(colorLayerId)) {
        map.removeLayer(colorLayerId);
      }
    };
  }, [map, isLoaded, countryCodes, colorExpression, grayColor, grayOpacity, colorOpacity, layerId, colorLayerId]);
}
