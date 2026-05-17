"use client"

import { Drawer } from "vaul"
import { Place } from "@/types"
import { Star, MapPin, Clock, Phone, Globe, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { usePulseStore } from "@/store/useStore"
import { cn } from "@/lib/utils"

interface PlaceDetailsProps {
  place: Place
  isOpen: boolean
  onClose: () => void
}

export function PlaceDetails({ place, isOpen, onClose }: PlaceDetailsProps) {
  const { savePlace, savedPlaces, removePlace } = usePulseStore()
  const isSaved = savedPlaces.some(p => p.id === place.id)

  return (
    <Drawer.Root open={isOpen} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
        <Drawer.Content className="bg-ios-bg flex flex-col rounded-t-[32px] h-[90dvh] mt-24 fixed bottom-0 left-0 right-0 z-[101] outline-none">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-ios-secondary-label/20 my-4" />

          <div className="flex-1 overflow-y-auto smooth-scroll px-6 pb-12">
            <div className="relative h-64 -mx-6 mb-6">
              <img src={place.image} className="w-full h-full object-cover" alt={place.name} />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => isSaved ? removePlace(place.id) : savePlace(place)}
                  className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white"
                >
                  <Heart className={cn("w-5 h-5", isSaved && "fill-ios-red text-ios-red")} />
                </button>
                <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{place.name}</h2>
                <p className="text-ios-secondary-label font-medium">{place.category}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-ios-yellow fill-ios-yellow" />
                    <span className="font-bold">{place.rating}</span>
                    <span className="text-ios-secondary-label text-sm">({place.reviews} reviews)</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-ios-secondary-label" />
                  <span className="text-ios-green font-semibold text-sm">Open Now</span>
                </div>
              </div>

              <p className="text-ios-secondary-label leading-relaxed">
                {place.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="secondary" className="gap-2">
                  <Phone className="w-4 h-4" /> Call
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Globe className="w-4 h-4" /> Website
                </Button>
              </div>

              <div className="space-y-4 pt-4 border-t border-ios-secondary-bg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-ios-blue mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Location</p>
                    <p className="text-sm text-ios-secondary-label">{place.location.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-ios-blue mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Hours</p>
                    <p className="text-sm text-ios-secondary-label">Open 09:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-bold mb-4">Popular Photos</h3>
                <div className="flex gap-2 overflow-x-auto -mx-6 px-6 no-scrollbar">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-32 h-32 rounded-2xl bg-ios-secondary-bg flex-shrink-0 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${place.id + i}/200/200`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
