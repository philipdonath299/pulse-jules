"use client"

import { APIProvider } from "@vis.gl/react-google-maps"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

export function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-screen w-full bg-ios-bg flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="bg-ios-red/10 text-ios-red p-4 rounded-2xl font-bold">
          API Key Required
        </div>
        <p className="text-ios-secondary-label text-sm max-w-xs">
          To enable real-world discovery and maps, please set <b>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</b> in your environment.
        </p>
        <div className="pt-4 opacity-50 text-[10px] uppercase tracking-widest font-bold">
          Pulse Social Discovery
        </div>
      </div>
    )
  }

  return (
    <APIProvider
      apiKey={GOOGLE_MAPS_API_KEY}
      libraries={['places', 'marker', 'geometry']}
      onLoad={() => console.log('Google Maps API Loaded')}
    >
      {children}
    </APIProvider>
  )
}
