"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation } from "lucide-react"
import { REAL_PLACES } from "@/lib/data"
import { Place } from "@/types"
import { useState } from "react"
import { PlaceDetails } from "@/components/ui/PlaceDetails"

export function DemoMap() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  return (
    <div className="relative h-screen w-full bg-ios-secondary-bg overflow-hidden flex items-center justify-center">
      {/* Decorative Grid / Map Aesthetic */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(#007AFF 1px, transparent 1px), radial-gradient(#007AFF 1px, #F2F2F7 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      <div className="relative w-full h-full">
        {REAL_PLACES.map((place, idx) => (
          <motion.button
            key={place.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1, type: "spring" }}
            onClick={() => setSelectedPlace(place)}
            className="absolute flex flex-col items-center gap-1"
            style={{
              top: `${25 + (idx % 3) * 20}%`,
              left: `${15 + (idx % 4) * 25}%`,
            }}
          >
            <div className="bg-white dark:bg-ios-tertiary-bg px-3 py-1.5 rounded-full shadow-lg border border-ios-secondary-bg flex items-center gap-2 active:scale-95 transition-transform">
              <MapPin className="w-4 h-4 text-ios-blue fill-ios-blue/20" />
              <span className="text-[10px] font-bold whitespace-nowrap">{place.name}</span>
            </div>
            <div className="w-0.5 h-2 bg-ios-blue/40" />
          </motion.button>
        ))}

        {/* User Location Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute -inset-8 bg-ios-blue/10 rounded-full animate-ping" />
            <div className="relative w-5 h-5 bg-ios-blue rounded-full border-4 border-white shadow-xl" />
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-4">
        <div className="bg-white/80 dark:bg-ios-tertiary-bg/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/20">
          <Navigation className="w-6 h-6 text-ios-blue" />
        </div>
      </div>

      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[80%]">
        <div className="glass rounded-2xl p-4 text-center space-y-1 shadow-xl border border-white/20">
          <p className="text-xs font-bold text-ios-blue uppercase tracking-widest">Demo Mode</p>
          <p className="text-[10px] text-ios-secondary-label leading-tight">
            Map is currently in preview mode. Add an API key to enable live global navigation.
          </p>
        </div>
      </div>

      {selectedPlace && (
        <PlaceDetails
          place={selectedPlace}
          isOpen={!!selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  )
}
