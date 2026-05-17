"use client"

import { useState, useEffect, useCallback } from "react"
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { MapPin, Search, RefreshCw } from "lucide-react"
import { PlaceDetails } from "@/components/ui/PlaceDetails"
import { Place } from "@/types"
import { placeService } from "@/lib/services"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "pk.eyJ1IjoibW9ja2VyLWFwcGxlIiwiYSI6ImNsdzF4eHh4eDAxNXkyam8xNXg0eDAxNXgifQ.mock_token"

export default function MapPage() {
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(false)
  const [viewState, setViewState] = useState({
    latitude: 48.8584,
    longitude: 2.3488,
    zoom: 13
  })
  const [showSearchHere, setShowSearchHere] = useState(false)

  const fetchPlaces = useCallback(async () => {
    setLoading(true)
    const data = await placeService.getNearby(viewState.latitude, viewState.longitude)
    setPlaces(data)
    setLoading(false)
    setShowSearchHere(false)
  }, [viewState.latitude, viewState.longitude])

  useEffect(() => {
    fetchPlaces()
  }, [fetchPlaces])

  return (
    <div className="relative h-screen w-full bg-ios-secondary-bg overflow-hidden">
      <Map
        {...viewState}
        onMove={evt => {
          setViewState(evt.viewState)
          if (!showSearchHere) setShowSearchHere(true)
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            latitude={place.location.lat}
            longitude={place.location.lng}
            onClick={e => {
              e.originalEvent.stopPropagation()
              setSelectedPlace(place)
            }}
          >
            <button className="flex flex-col items-center gap-1 group">
              <div className="bg-white dark:bg-ios-tertiary-bg px-3 py-1.5 rounded-full shadow-lg border border-ios-secondary-bg flex items-center gap-2 group-active:scale-95 transition-transform">
                <MapPin className="w-4 h-4 text-ios-blue fill-ios-blue/20" />
                <span className="text-xs font-bold whitespace-nowrap">{place.name}</span>
              </div>
              <div className="w-0.5 h-2 bg-ios-blue/40 shadow-sm" />
            </button>
          </Marker>
        ))}

        <div className="absolute top-20 right-4">
          <NavigationControl showCompass={false} />
        </div>
      </Map>

      {/* Search Here Button */}
      <AnimatePresence>
        {showSearchHere && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-32 left-1/2 -translate-x-1/2 z-10"
          >
            <button
              onClick={fetchPlaces}
              className="bg-white dark:bg-ios-tertiary-bg px-4 py-2 rounded-full shadow-xl border border-ios-secondary-bg flex items-center gap-2 text-sm font-bold text-ios-blue active:scale-95 transition-transform"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              Search in this area
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-20 left-4 right-16 pointer-events-none">
        <div className="bg-white/80 dark:bg-ios-tertiary-bg/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/20 flex items-center gap-3 pointer-events-auto">
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
