import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { siteUrl } from "../lib/site-url";
import "./globals.css";

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "VITALIS — Care that moves you forward.", template: "%s · VITALIS" },
  description:
    "VITALIS is a fictional premium medical center concept — a calm, modern healthcare experience with a demo appointment flow.",
  keywords: ["VITALIS", "medical center", "healthcare", "patient experience", "portfolio demo"],
  openGraph: { type: "website", url: siteUrl, siteName: "VITALIS Medical Center", title: "VITALIS — Care that moves you forward.", description: "A premium, accessible healthcare website concept." },
  twitter: { card: "summary_large_image", title: "VITALIS — Care that moves you forward." },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f4f3ee", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
