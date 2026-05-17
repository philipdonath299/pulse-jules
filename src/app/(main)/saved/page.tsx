"use client"

import { usePulseStore } from "@/store/useStore"
import { Card } from "@/components/ui/Card"
import { Star, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function SavedPage() {
  const { savedPlaces } = usePulseStore()

  return (
    <div className="p-6 space-y-8">
      <header className="pt-12">
        <h1 className="text-4xl font-bold tracking-tight">Saved</h1>
        <p className="text-ios-secondary-label">Your curated collections</p>
      </header>

      {savedPlaces.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-ios-secondary-bg rounded-full flex items-center justify-center">
            <Star className="w-10 h-10 text-ios-tertiary-label" />
          </div>
          <div>
            <h3 className="font-bold text-lg">No saved places yet</h3>
            <p className="text-ios-secondary-label px-12">Start exploring and save your favorite spots to see them here.</p>
          </div>
          <Link href="/explore" className="text-ios-blue font-semibold">
            Go to Explore
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {savedPlaces.map((place) => (
            <Card key={place.id} padding="none" className="flex items-center gap-4 group overflow-hidden">
              <div className="w-24 h-24 shrink-0">
                <img src={place.image} className="w-full h-full object-cover" alt={place.name} />
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-bold truncate">{place.name}</h3>
                <p className="text-xs text-ios-secondary-label mb-1">{place.category}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-ios-yellow fill-ios-yellow" />
                  <span className="text-xs font-bold">{place.rating}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-ios-tertiary-label mr-4 group-active:translate-x-1 transition-transform" />
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
