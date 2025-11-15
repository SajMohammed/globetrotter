/**
 * Home Page
 *
 * Example implementation of the Map component with world view and sample dataset.
 * Demonstrates best practices for enterprise-grade Mapbox integration.
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import type { Map as MapboxMap } from "mapbox-gl";
import { Map, MapControls, MapDataLayer } from "@/components/map";
import { createDefaultMapConfig } from "@/utils/mapbox";
import type { DatasetConfig } from "@/types";
import { LAYER_COLORS } from "@/config/constants";
import { useCountryColors } from "@/hooks/useCountryColors";
import {
  SAMPLE_COUNTRY_DATA,
  getCountryCodes,
  createCountryColorExpression,
} from "@/data/sampleCountryData";

// Sample GeoJSON dataset: Major world cities
const WORLD_CITIES_DATASET: DatasetConfig = {
  id: "world-cities",
  name: "World Cities",
  description: "Major cities around the world",
  source: {
    id: "cities-source",
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [-74.006, 40.7128] },
          properties: { name: "New York", country: "USA", population: 8336817 },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [-0.1276, 51.5074] },
          properties: { name: "London", country: "UK", population: 8982000 },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [139.6917, 35.6895] },
          properties: { name: "Tokyo", country: "Japan", population: 13960000 },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [2.3522, 48.8566] },
          properties: { name: "Paris", country: "France", population: 2161000 },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [77.209, 28.6139] },
          properties: { name: "Delhi", country: "India", population: 11007835 },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [-43.1729, -22.9068] },
          properties: {
            name: "Rio de Janeiro",
            country: "Brazil",
            population: 6748000,
          },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [151.2093, -33.8688] },
          properties: {
            name: "Sydney",
            country: "Australia",
            population: 5312000,
          },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [18.4241, -33.9249] },
          properties: {
            name: "Cape Town",
            country: "South Africa",
            population: 4618000,
          },
        },
      ],
    },
  },
  layers: [
    {
      id: "cities-circles",
      type: "circle",
      source: "cities-source",
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["get", "population"],
          0,
          4,
          10000000,
          12,
        ],
        "circle-color": LAYER_COLORS.PRIMARY,
        "circle-opacity": 0.8,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    },
    {
      id: "cities-labels",
      type: "symbol",
      source: "cities-source",
      layout: {
        "text-field": ["get", "name"],
        "text-size": 12,
        "text-offset": [0, 1.5],
        "text-anchor": "top",
      },
      paint: {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 2,
      },
    },
  ],
};

export default function HomePage() {
  const [map, setMap] = useState<MapboxMap | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create map configuration with world view (memoized to prevent re-renders)
  const mapConfig = useMemo(
    () =>
      createDefaultMapConfig({
        // Using light-v11 for neutral background (no blue ocean)
        style: "mapbox://styles/mapbox/light-v11",
      }),
    []
  );

  const handleMapLoad = useCallback((loadedMap: MapboxMap) => {
    setMap(loadedMap);
    setIsLoaded(true);
    console.log("Map loaded successfully!");

    // Optional: Set custom background color
    // Uncomment to use a custom background color
    // loadedMap.setPaintProperty('water', 'fill-color', '#e0f2fe'); // Light blue
    // loadedMap.setPaintProperty('land', 'background-color', '#f0f9ff'); // Very light blue
  }, []);

  const handleMapError = useCallback((error: Error) => {
    console.error("Map error:", error);
  }, []);

  // Highlight countries in dataset with beautiful colors, gray out others
  useCountryColors(map, isLoaded, {
    countryCodes: getCountryCodes(), // Countries to color
    colorExpression: createCountryColorExpression(), // Colors for dataset countries
    grayColor: "#b0b0b0", // Medium gray for non-dataset countries
    grayOpacity: 0.85, // High opacity for clear distinction
    colorOpacity: 0.8, // Opacity for colored countries
  });

  return (
    <main style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Map Container - Full viewport */}
      <Map
        config={mapConfig}
        onLoad={handleMapLoad}
        onError={handleMapError}
        style={{ width: "100%", height: "100%" }}
      >
          {/* Add map controls when loaded */}
          {map && isLoaded && (
            <>
              <MapControls
                map={map}
                config={{
                  showNavigation: true,
                  showGeolocate: true,
                  showFullscreen: true,
                  showScale: true,
                  position: "top-right",
                }}
              />

              {/* Add world cities dataset */}
              <MapDataLayer
                map={map}
                isLoaded={isLoaded}
                dataset={WORLD_CITIES_DATASET}
                onAdd={(id) => console.log("Dataset added:", id)}
              />
            </>
          )}
        </Map>

        {/* Info Panel */}
        {isLoaded && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10">
            <h2 className="font-bold text-gray-900 mb-2">
              Country Dataset
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              {SAMPLE_COUNTRY_DATA.length} countries are highlighted with
              beautiful colors. All others are grayed out.
            </p>
            <div className="space-y-2 text-xs">
              <div className="font-semibold text-gray-700 mb-1">
                Dataset Countries:
              </div>
              {SAMPLE_COUNTRY_DATA.slice(0, 6).map((country) => (
                <div key={country.countryCode} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: country.color }}
                  />
                  <span className="text-gray-700">{country.countryName}</span>
                </div>
              ))}
              <div className="text-gray-400 mt-2 italic">
                + {SAMPLE_COUNTRY_DATA.length - 6} more countries
              </div>
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200">
                <div className="w-3 h-3 rounded bg-gray-400" />
                <span className="text-gray-500">Other countries</span>
              </div>
            </div>
          </div>
        )}
    </main>
  );
}
