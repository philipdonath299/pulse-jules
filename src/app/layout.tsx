import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingTabBar } from "@/components/layout/FloatingTabBar";
import { DynamicIsland } from "@/components/layout/DynamicIsland";
import { PageTransition } from "@/components/layout/PageTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleMapsProvider } from "@/components/GoogleMapsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pulse — Social Discovery",
  description: "Discover trending places and hidden gems in your city.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pulse",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} overscroll-none`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GoogleMapsProvider>
            <div className="relative flex min-h-screen flex-col">
              <DynamicIsland />
              <main className="flex-1 pb-24">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <FloatingTabBar />
            </div>
          </GoogleMapsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
