import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { RevealObserver } from "@/components/motion/RevealObserver";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Facilitator Support Program | Learn. Lead. Impact.",
    template: "%s | FSP",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  creator: site.founder,
  keywords: [
    "Facilitator Support Program",
    "FSP",
    "facilitation skills",
    "trainer development",
    "experiential learning",
    "Karunai Prakash",
    "train the trainer",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: "Facilitator Support Program | Learn. Lead. Impact.",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={archivo.variable} suppressHydrationWarning>
      <head>
        {/* Enables JS-only reveal states; without JS all content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <SmoothScroll />
        <RevealObserver />
      </body>
    </html>
  );
}
