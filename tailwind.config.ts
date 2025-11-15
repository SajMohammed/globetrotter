import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // Custom spacing for map controls
      spacing: {
        "map-control": "10px",
      },
      // Z-index scale for layering
      zIndex: {
        "map": "0",
        "map-controls": "10",
        "map-popup": "20",
        "modal": "30",
      },
    },
  },
  plugins: [],
};

export default config;
