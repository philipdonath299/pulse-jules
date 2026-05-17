"use client"

import { motion } from "framer-motion"
import { MOCK_PLACES } from "@/lib/data"
import { Star, MapPin, Heart, Share2 } from "lucide-react"
import { usePulseStore } from "@/store/useStore"
import { cn } from "@/lib/utils"

export default function ExplorePage() {
  const { savePlace, savedPlaces, removePlace } = usePulseStore()

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory smooth-scroll bg-black">
      {MOCK_PLACES.map((place) => {
        const isSaved = savedPlaces.some(p => p.id === place.id)

        return (
          <section
            key={place.id}
            className="h-screen w-full snap-start relative flex flex-col justify-end p-6"
          >
            <div className="absolute inset-0 -z-10">
              <img
                src={place.image}
                alt={place.name}
                className="h-full w-full object-cover"
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
                  <span className="text-white text-xs font-bold">{place.rating}</span>
                </div>
                {place.isTrending && (
                  <div className="bg-ios-blue px-3 py-1 rounded-full text-[10px] font-bold text-white">
                    TRENDING
                  </div>
                )}
              </motion.div>

              <div className="space-y-1">
                <h2 className="text-4xl font-bold text-white tracking-tight leading-none">
                  {place.name}
                </h2>
                <p className="text-white/80 font-medium">{place.category}</p>
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
                  <div className="bg-white/20 px-2 py-1 rounded-lg text-[10px] font-bold text-white shrink-0">
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
