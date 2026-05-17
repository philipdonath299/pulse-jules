"use client"

import { useState, useEffect, useCallback } from "react"
import { MOCK_PLACES } from "@/lib/data"
import { Search as SearchIcon, X, SlidersHorizontal, Star } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { SegmentedControl } from "@/components/ui/SegmentedControl"
import { Place } from "@/types"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [results, setResults] = useState<Place[]>(MOCK_PLACES)

  const handleSearch = useCallback(() => {
    const filtered = MOCK_PLACES.filter(place =>
      place.name.toLowerCase().includes(query.toLowerCase()) &&
      (category === "All" || place.category === category)
    )
    setResults(filtered)
  }, [query, category])

  useEffect(() => {
    const timer = setTimeout(handleSearch, 300)
    return () => clearTimeout(timer)
  }, [handleSearch])

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
            placeholder="Search places, categories..."
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

      <SegmentedControl
        options={["All", "French Cuisine", "Brunch Spot", "Wine Bar"]}
        value={category}
        onChange={setCategory}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Results</h2>
          <button className="text-ios-blue flex items-center gap-1 text-sm font-semibold">
            <SlidersHorizontal className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="grid gap-4">
          {results.map((place) => (
            <Card key={place.id} padding="none" className="overflow-hidden flex flex-col active:scale-[0.98] transition-transform">
              <div className="h-48">
                <img src={place.image} className="w-full h-full object-cover" alt={place.name} />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{place.name}</h3>
                  <p className="text-xs text-ios-secondary-label">{place.category}</p>
                </div>
                <div className="flex items-center gap-1 bg-ios-secondary-bg dark:bg-white/10 px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 text-ios-yellow fill-ios-yellow" />
                  <span className="text-xs font-bold">{place.rating}</span>
                </div>
              </div>
            </Card>
          ))}
          {results.length === 0 && (
            <div className="text-center py-20 text-ios-secondary-label">
              No results found for &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
