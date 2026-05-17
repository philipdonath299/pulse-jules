"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MOCK_PLACES } from "@/lib/data"
import { MapPin, Navigation, Search } from "lucide-react"
import { PlaceDetails } from "@/components/ui/PlaceDetails"
import { Place } from "@/types"

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  return (
    <div className="relative h-screen w-full bg-ios-secondary-bg overflow-hidden">
      {/* Mock Map Background */}
      <div
        className="absolute inset-0 opacity-40 grayscale-[0.5] contrast-[1.1]"
        style={{
          backgroundImage: `radial-gradient(#007AFF 0.5px, transparent 0.5px), radial-gradient(#007AFF 0.5px, #F2F2F7 0.5px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      />

      {/* Map Content Mock */}
      <div className="relative h-full w-full">
        {MOCK_PLACES.map((place, idx) => (
          <motion.button
            key={place.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedPlace(place)}
            className="absolute flex flex-col items-center gap-1"
            style={{
              top: `${20 + idx * 25}%`,
              left: `${15 + idx * 30}%`,
            }}
          >
            <div className="bg-white dark:bg-ios-tertiary-bg px-3 py-1.5 rounded-full shadow-lg border border-ios-secondary-bg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-ios-blue fill-ios-blue/20" />
              <span className="text-xs font-bold whitespace-nowrap">{place.name}</span>
            </div>
            <div className="w-0.5 h-3 bg-ios-blue/40" />
          </motion.button>
        ))}

        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute -inset-4 bg-ios-blue/20 rounded-full animate-ping" />
            <div className="relative w-4 h-4 bg-ios-blue rounded-full border-2 border-white shadow-lg" />
          </div>
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute top-20 right-4 flex flex-col gap-2">
        <button className="bg-white/80 dark:bg-ios-tertiary-bg/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/20">
          <Navigation className="w-6 h-6 text-ios-blue" />
        </button>
      </div>

      <div className="absolute top-20 left-4 right-16">
        <div className="bg-white/80 dark:bg-ios-tertiary-bg/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/20 flex items-center gap-3">
          <Search className="w-5 h-5 text-ios-secondary-label" />
          <input
            placeholder="Search for places..."
            className="bg-transparent border-none outline-none text-sm w-full font-medium"
          />
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
