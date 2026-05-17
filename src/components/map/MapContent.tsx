"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary
} from "@vis.gl/react-google-maps"
import { MapPin, Search, RefreshCw, Navigation } from "lucide-react"
import { PlaceDetails } from "@/components/ui/PlaceDetails"
import { Place } from "@/types"
import { mapGooglePlaceToPulse } from "@/lib/services"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { DemoMap } from "./DemoMap"

const PARIS_CENTER = { lat: 48.8584, lng: 2.3488 }

export function MapContent() {
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSearchHere, setShowSearchHere] = useState(false)

  const map = useMap()
  const placesLib = useMapsLibrary('places')
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null)
  const [isApiAvailable, setIsApiAvailable] = useState(true)

  useEffect(() => {
    // Check if Google Maps is actually loaded
    if (typeof google === 'undefined' || !google.maps) {
      setIsApiAvailable(false)
      return
    }
    if (!map || !placesLib) return
    setPlacesService(new placesLib.PlacesService(map))
  }, [map, placesLib])

  const fetchNearbyPlaces = useCallback(() => {
    if (!placesService || !map || !placesLib) return

    setLoading(true)
    const center = map.getCenter()
    if (!center) return

    placesService.nearbySearch(
      {
        location: center,
        radius: 2000,
        type: 'restaurant'
      },
      (results, status) => {
        if (status === placesLib.PlacesServiceStatus.OK && results) {
          const mapped = results.slice(0, 15).map(mapGooglePlaceToPulse)
          setPlaces(mapped)
        }
        setLoading(false)
        setShowSearchHere(false)
      }
    )
  }, [placesService, map, placesLib])

  useEffect(() => {
    if (placesService) fetchNearbyPlaces()
  }, [placesService, fetchNearbyPlaces])

  if (!isApiAvailable) {
    return <DemoMap />
  }

  return (
    <>
      <Map
        defaultCenter={PARIS_CENTER}
        defaultZoom={14}
        mapId="PULSE_MAP_ID"
        disableDefaultUI={true}
        onCameraChanged={() => {
          if (!showSearchHere) setShowSearchHere(true)
        }}
      >
        {places.map((place) => (
          <AdvancedMarker
            key={place.id}
            position={{ lat: place.location.lat, lng: place.location.lng }}
            onClick={() => setSelectedPlace(place)}
          >
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white dark:bg-ios-tertiary-bg px-3 py-1.5 rounded-full shadow-lg border border-ios-secondary-bg flex items-center gap-2 group-active:scale-95 transition-transform"
              >
                <MapPin className="w-4 h-4 text-ios-blue fill-ios-blue/20" />
                <span className="text-xs font-bold whitespace-nowrap">{place.name}</span>
              </motion.div>
              <div className="w-0.5 h-2 bg-ios-blue/40 shadow-sm" />
            </div>
          </AdvancedMarker>
        ))}
      </Map>

      {/* Floating Controls */}
      <div className="absolute top-20 left-4 right-16 pointer-events-none">
        <div className="bg-white/80 dark:bg-ios-tertiary-bg/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/20 flex items-center gap-3 pointer-events-auto">
          <Search className="w-5 h-5 text-ios-secondary-label" />
          <input
            placeholder="Search all real places..."
            className="bg-transparent border-none outline-none text-sm w-full font-medium"
          />
        </div>
      </div>

      <div className="absolute top-20 right-4 flex flex-col gap-2">
        <button
          onClick={() => map?.panTo(PARIS_CENTER)}
          className="bg-white/80 dark:bg-ios-tertiary-bg/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/20 active:scale-95 transition-transform"
        >
          <Navigation className="w-6 h-6 text-ios-blue" />
        </button>
      </div>

      <AnimatePresence>
        {showSearchHere && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-32 left-1/2 -translate-x-1/2 z-10"
          >
            <button
              onClick={fetchNearbyPlaces}
              className="bg-white dark:bg-ios-tertiary-bg px-4 py-2 rounded-full shadow-xl border border-ios-secondary-bg flex items-center gap-2 text-sm font-bold text-ios-blue active:scale-95 transition-transform"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              Search this area
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedPlace && (
        <PlaceDetails
          place={selectedPlace}
          isOpen={!!selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </>
  )
}
