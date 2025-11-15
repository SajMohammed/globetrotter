/**
 * Environment Configuration
 *
 * Centralized environment variable management with validation.
 * This ensures type safety and provides helpful error messages.
 */

/**
 * Validates and retrieves the Mapbox access token
 * @throws Error if token is not configured
 */
export function getMapboxToken(): string {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    throw new Error(
      "Mapbox token is not configured. " +
        "Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file. " +
        "Get your token from: https://account.mapbox.com/access-tokens/"
    );
  }

  return token;
}

/**
 * Gets the default Mapbox style URL
 * Can be overridden via environment variable
 */
export function getDefaultMapStyle(): string {
  return (
    process.env.NEXT_PUBLIC_MAPBOX_STYLE || "mapbox://styles/mapbox/streets-v12"
  );
}

/**
 * Environment configuration object
 */
export const env = {
  mapbox: {
    token: getMapboxToken,
    defaultStyle: getDefaultMapStyle,
  },
} as const;
