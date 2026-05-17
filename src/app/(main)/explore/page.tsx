"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, Heart, Share2 } from "lucide-react"
import { usePulseStore } from "@/store/useStore"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { mapGooglePlaceToPulse } from "@/lib/services"
import { Place } from "@/types"
import { Skeleton } from "@/components/ui/Skeleton"
import { useMapsLibrary } from "@vis.gl/react-google-maps"

export default function ExplorePage() {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const { savePlace, savedPlaces, removePlace } = usePulseStore()

  const placesLib = useMapsLibrary('places')
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null)

  useEffect(() => {
    if (!placesLib) return
    const dummy = document.createElement('div')
    setPlacesService(new placesLib.PlacesService(dummy))
  }, [placesLib])

  useEffect(() => {
    if (!placesService || !placesLib) return

    setLoading(true)
    placesService.textSearch(
      {
        query: "Trending restaurants and cafes in Paris",
        location: { lat: 48.8584, lng: 2.3488 },
        radius: 5000
      },
      (results, status) => {
        if (status === placesLib.PlacesServiceStatus.OK && results) {
          setPlaces(results.map(mapGooglePlaceToPulse))
        }
        setLoading(false)
      }
    )
  }, [placesService, placesLib])

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col p-6 space-y-6">
        <div className="flex-1 rounded-3xl bg-white/5 animate-pulse" />
        <div className="h-40 space-y-4">
          <Skeleton className="h-8 w-1/2 bg-white/10" />
          <Skeleton className="h-4 w-3/4 bg-white/10" />
          <div className="flex gap-4">
            <Skeleton className="h-14 w-14 rounded-full bg-white/10" />
            <Skeleton className="h-14 flex-1 rounded-3xl bg-white/10" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory smooth-scroll bg-black">
      {places.map((place) => {
        const isSaved = savedPlaces.some(p => p.id === place.id)

        return (
          <section
            key={place.id}
            className="h-screen w-full snap-start relative flex flex-col justify-end p-6"
          >
            <div className="absolute inset-0 -z-10">
              <Image
                src={place.image}
                alt={place.name}
                fill
                priority
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
            </div>

            <div className="space-y-4 mb-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <div className="glass px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 text-ios-yellow fill-ios-yellow" />
                  <span className="text-white text-xs font-bold">{place.rating || 'N/A'}</span>
                </div>
                {place.isTrending && (
                  <div className="bg-ios-blue px-3 py-1 rounded-full text-[10px] font-bold text-white">
                    TRENDING
                  </div>
                )}
              </motion.div>

              <div className="space-y-1">
                <h2 className="text-4xl font-bold text-white tracking-tight leading-none truncate max-w-[90%]">
                  {place.name}
                </h2>
                <p className="text-white/80 font-medium capitalize">{place.category}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => isSaved ? removePlace(place.id) : savePlace(place)}
                  className="glass-dark p-4 rounded-full active:scale-90 transition-transform"
                >
                  <Heart
                    className={cn(
                      "w-6 h-6 transition-colors",
                      isSaved ? "fill-ios-red text-ios-red" : "text-white"
                    )}
                  />
                </button>
                <button className="glass-dark p-4 rounded-full active:scale-90 transition-transform">
                  <Share2 className="w-6 h-6 text-white" />
                </button>
                <div className="flex-1 glass-dark rounded-3xl p-4 flex items-center justify-between overflow-hidden">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <MapPin className="w-4 h-4 text-white shrink-0" />
                    <span className="text-white text-xs truncate">{place.location.address}</span>
                  </div>
                  <div className="bg-white/20 px-2 py-1 rounded-lg text-[10px] font-bold text-white shrink-0 ml-2">
                    350m
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
