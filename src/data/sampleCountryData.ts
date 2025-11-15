/**
 * Sample Country Dataset
 *
 * Example data structure for coloring countries on the map.
 * Replace this with your actual dataset.
 */

export interface CountryData {
  countryCode: string; // ISO 3166-1 alpha-3 code (e.g., "USA", "GBR", "FRA")
  countryName: string;
  color: string; // Color for this country
  value?: number; // Optional: for storing associated data
}

/**
 * Sample dataset: Countries with beautiful colors
 * These countries will be colored, all others will be grayed out
 */
export const SAMPLE_COUNTRY_DATA: CountryData[] = [
  {
    countryCode: "USA",
    countryName: "United States",
    color: "#3b82f6", // Blue
    value: 100,
  },
  {
    countryCode: "CAN",
    countryName: "Canada",
    color: "#8b5cf6", // Purple
    value: 80,
  },
  {
    countryCode: "GBR",
    countryName: "United Kingdom",
    color: "#10b981", // Emerald
    value: 90,
  },
  {
    countryCode: "FRA",
    countryName: "France",
    color: "#f59e0b", // Amber
    value: 75,
  },
  {
    countryCode: "DEU",
    countryName: "Germany",
    color: "#06b6d4", // Cyan
    value: 85,
  },
  {
    countryCode: "JPN",
    countryName: "Japan",
    color: "#ec4899", // Pink
    value: 95,
  },
  {
    countryCode: "AUS",
    countryName: "Australia",
    color: "#f97316", // Orange
    value: 70,
  },
  {
    countryCode: "BRA",
    countryName: "Brazil",
    color: "#14b8a6", // Teal
    value: 65,
  },
  {
    countryCode: "IND",
    countryName: "India",
    color: "#a855f7", // Violet
    value: 88,
  },
  {
    countryCode: "ZAF",
    countryName: "South Africa",
    color: "#22c55e", // Green
    value: 60,
  },
];

/**
 * Get all country codes in the dataset
 */
export function getCountryCodes(): string[] {
  return SAMPLE_COUNTRY_DATA.map((c) => c.countryCode);
}

/**
 * Get country data by country code
 */
export function getCountryData(countryCode: string): CountryData | undefined {
  return SAMPLE_COUNTRY_DATA.find((c) => c.countryCode === countryCode);
}

/**
 * Check if a country is in the dataset
 */
export function isCountryInDataset(countryCode: string): boolean {
  return SAMPLE_COUNTRY_DATA.some((c) => c.countryCode === countryCode);
}

/**
 * Create a Mapbox color expression for dataset countries
 * This maps country codes to their colors
 */
export function createCountryColorExpression(): any[] {
  const expression: any[] = ["match", ["get", "iso_3166_1_alpha_3"]];

  SAMPLE_COUNTRY_DATA.forEach((country) => {
    expression.push(country.countryCode);
    expression.push(country.color);
  });

  // Default: transparent (won't be visible)
  expression.push("rgba(0,0,0,0)");

  return expression;
}
