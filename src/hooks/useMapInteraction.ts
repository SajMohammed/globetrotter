/**
 * useMapInteraction Hook
 *
 * Manages map event handlers and user interactions.
 * Properly attaches and cleans up event listeners.
 */

import { useEffect } from "react";
import type { Map as MapboxMap } from "mapbox-gl";
import type { MapEventHandlers } from "@/types";

/**
 * Hook for attaching event handlers to a Mapbox map
 *
 * @param map - Mapbox map instance
 * @param handlers - Event handler functions
 *
 * @example
 * ```tsx
 * useMapInteraction(map, {
 *   onClick: (e) => console.log('Clicked at:', e.lngLat),
 *   onZoom: () => console.log('Zoom level:', map.getZoom()),
 * });
 * ```
 */
export function useMapInteraction(
  map: MapboxMap | null,
  handlers: MapEventHandlers
): void {
  const { onClick, onMouseMove, onMouseEnter, onMouseLeave, onZoom, onMove } =
    handlers;

  // Click handler
  useEffect(() => {
    if (!map || !onClick) {
      return;
    }

    map.on("click", onClick);

    return () => {
      map.off("click", onClick);
    };
  }, [map, onClick]);

  // Mouse move handler
  useEffect(() => {
    if (!map || !onMouseMove) {
      return;
    }

    map.on("mousemove", onMouseMove);

    return () => {
      map.off("mousemove", onMouseMove);
    };
  }, [map, onMouseMove]);

  // Mouse enter handler
  useEffect(() => {
    if (!map || !onMouseEnter) {
      return;
    }

    map.on("mouseenter", onMouseEnter);

    return () => {
      map.off("mouseenter", onMouseEnter);
    };
  }, [map, onMouseEnter]);

  // Mouse leave handler
  useEffect(() => {
    if (!map || !onMouseLeave) {
      return;
    }

    map.on("mouseleave", onMouseLeave);

    return () => {
      map.off("mouseleave", onMouseLeave);
    };
  }, [map, onMouseLeave]);

  // Zoom handler
  useEffect(() => {
    if (!map || !onZoom) {
      return;
    }

    map.on("zoom", onZoom);

    return () => {
      map.off("zoom", onZoom);
    };
  }, [map, onZoom]);

  // Move handler
  useEffect(() => {
    if (!map || !onMove) {
      return;
    }

    map.on("move", onMove);

    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);
}
