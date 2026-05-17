"use client"

import { useState } from "react"
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox"
import "mapbox-gl/dist/mapbox-gl.css"
import { MOCK_PLACES } from "@/lib/data"
import { MapPin, Search } from "lucide-react"
import { PlaceDetails } from "@/components/ui/PlaceDetails"
import { Place } from "@/types"

// In a real app, this would be an env variable
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "pk.eyJ1IjoibW9ja2VyLWFwcGxlIiwiYSI6ImNsdzF4eHh4eDAxNXkyam8xNXg0eDAxNXgifQ.mock_token"

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [viewState, setViewState] = useState({
    latitude: 48.8584,
    longitude: 2.3488,
    zoom: 13
  })

  return (
    <div className="relative h-screen w-full bg-ios-secondary-bg overflow-hidden">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
      >
        {MOCK_PLACES.map((place) => (
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

      {/* Floating Controls */}
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
