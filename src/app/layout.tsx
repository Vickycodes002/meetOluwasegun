import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import { site } from "@/lib/content";
import { CursorDot } from "@/components/CursorDot";
import "./globals.css";

// Display face: Imbue, a condensed high-contrast serif (variable, OFL licence).
const imbue = localFont({
  src: "../fonts/imbue-latin-opsz-normal.woff2",
  weight: "100 900",
  variable: "--font-imbue",
  display: "swap",
});

// Where the site lives. Link previews need a full address to find the share image.
// Order: the domain set in content.ts, then the address Vercel assigns, then local dev.
const siteUrl =
  site.url ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// The share image and icons are picked up from the files next to this one:
// opengraph-image.png, twitter-image.png, icon.png, apple-icon.png, favicon.ico.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.description,
    type: "website",
    siteName: site.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Browser extensions add their own attributes to <html> before React loads.
      // This keeps that from showing up as a hydration warning. It only covers this one tag.
      suppressHydrationWarning
      className={`${GeistSans.variable} ${imbue.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        {children}
        <CursorDot />
      </body>
    </html>
  );
}
