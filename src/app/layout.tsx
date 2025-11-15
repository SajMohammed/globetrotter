/**
 * Root Layout
 *
 * Next.js root layout component.
 * Wraps all pages with global styles and error boundaries.
 */

import type { Metadata } from "next";
import "./globals.css";
import "@/styles/mapbox.css";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

export const metadata: Metadata = {
  title: "Mapbox Next.js App",
  description: "Enterprise-grade Next.js application with Mapbox GL JS integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
