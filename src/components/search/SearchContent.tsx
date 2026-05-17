"use client"

import { useState, useEffect, useCallback } from "react"
import { Search as SearchIcon, X, SlidersHorizontal, Star } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { SegmentedControl } from "@/components/ui/SegmentedControl"
import { Place } from "@/types"
import { placeService } from "@/lib/services"
import { Skeleton } from "@/components/ui/Skeleton"
import Image from "next/image"
import { useMapsLibrary } from "@vis.gl/react-google-maps"

const categories = ["All", "Restaurant", "Cafe", "Bar", "Museum", "Park"]

export function SearchContent() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [results, setResults] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  const placesLib = useMapsLibrary('places')
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null)

  useEffect(() => {
    if (!placesLib) {
        const timer = setTimeout(() => {
          if (loading) {
            placeService.searchPlaces(query, category).then(data => {
              setResults(data)
              setLoading(false)
            })
          }
        }, 2000)
        return () => clearTimeout(timer)
    }
    const dummy = document.createElement('div')
    setPlacesService(new placesLib.PlacesService(dummy))
  }, [placesLib, query, category, loading])

  const performSearch = useCallback(async () => {
    setLoading(true)
    const data = await placeService.searchPlaces(query, category, placesService)
    setResults(data)
    setLoading(false)
  }, [query, category, placesService])

  useEffect(() => {
    const timer = setTimeout(performSearch, 500)
    return () => clearTimeout(timer)
  }, [performSearch])

  return (
    <div className="p-6 space-y-6">
      <header className="pt-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Discovery</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-ios-secondary-label" />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the world or try demo..."
            className="w-full bg-ios-secondary-bg dark:bg-ios-tertiary-bg h-14 pl-12 pr-12 rounded-2xl outline-none font-medium focus:ring-2 focus:ring-ios-blue transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <X className="w-5 h-5 text-ios-secondary-label bg-ios-tertiary-label rounded-full p-1" />
            </button>
          )}
        </div>
      </header>

      <div className="overflow-x-auto -mx-6 px-6 no-scrollbar">
        <SegmentedControl
          options={categories}
          value={category}
          onChange={setCategory}
          className="min-w-max"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Results</h2>
          <button className="text-ios-blue flex items-center gap-1 text-sm font-semibold">
            <SlidersHorizontal className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="grid gap-4 pb-24">
          {loading ? (
            [1, 2, 3].map(i => (
              <Card key={i} padding="none" className="overflow-hidden h-64">
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </Card>
            ))
          ) : (
            <>
              {results.map((place) => (
                <Card key={place.id} padding="none" className="overflow-hidden flex flex-col active:scale-[0.98] transition-transform relative h-72">
                  <div className="h-52 relative bg-ios-secondary-bg">
                    {place.image && (
                      <Image
                        src={place.image}
                        fill
                        className="object-cover"
                        alt={place.name}
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="min-w-0 flex-1 pr-2">
                      <h3 className="font-bold truncate">{place.name}</h3>
                      <p className="text-xs text-ios-secondary-label capitalize truncate">{place.category}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-ios-secondary-bg dark:bg-white/10 px-2 py-1 rounded-lg shrink-0">
                      <Star className="w-3 h-3 text-ios-yellow fill-ios-yellow" />
                      <span className="text-xs font-bold">{place.rating || 'N/A'}</span>
                    </div>
                  </div>
                </Card>
              ))}
              {results.length === 0 && !loading && (
                <div className="text-center py-20 text-ios-secondary-label">
                  No places found. Try a different search.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
