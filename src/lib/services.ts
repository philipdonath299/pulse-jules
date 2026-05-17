import { Place } from '@/types'
import { REAL_PLACES } from './data'

export const mapGooglePlaceToPulse = (googlePlace: google.maps.places.PlaceResult): Place => {
  let photoUrl = `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80`

  if (googlePlace.photos && googlePlace.photos.length > 0) {
    try {
      photoUrl = googlePlace.photos[0].getUrl({ maxWidth: 800, maxHeight: 1200 })
    } catch (e) {
      console.warn("Photo error", e)
    }
  }

  const getLat = (loc: google.maps.LatLng | google.maps.LatLngLiteral | undefined) => {
     if (!loc) return 0
     return typeof loc.lat === 'function' ? loc.lat() : loc.lat
  }
  const getLng = (loc: google.maps.LatLng | google.maps.LatLngLiteral | undefined) => {
    if (!loc) return 0
    return typeof loc.lng === 'function' ? loc.lng() : loc.lng
  }

  return {
    id: googlePlace.place_id || Math.random().toString(),
    name: googlePlace.name || "Premium Spot",
    category: googlePlace.types?.[0]?.replace(/_/g, ' ') || "Trending",
    rating: googlePlace.rating || 0,
    reviews: googlePlace.user_ratings_total || 0,
    image: photoUrl,
    description: googlePlace.vicinity || googlePlace.formatted_address || "A hand-picked discovery in your city.",
    location: {
      lat: getLat(googlePlace.geometry?.location) || 0,
      lng: getLng(googlePlace.geometry?.location) || 0,
      address: googlePlace.formatted_address || googlePlace.vicinity || ""
    },
    isTrending: (googlePlace.rating || 0) > 4.5
  }
}

export const placeService = {
  // Discovery Engine that handles both Google and Demo data
  async getExploreFeed(placesService?: google.maps.places.PlacesService | null): Promise<Place[]> {
    if (placesService) {
      return new Promise((resolve) => {
        placesService.textSearch(
          { query: "Trending restaurants and hidden gems in Paris" },
          (results, status) => {
            if (status === 'OK' && results) {
              resolve(results.map(mapGooglePlaceToPulse))
            } else {
              resolve(REAL_PLACES)
            }
          }
        )
      })
    }
    await new Promise(r => setTimeout(r, 600))
    return REAL_PLACES
  },

  async searchPlaces(query: string, category: string = "All", placesService?: google.maps.places.PlacesService | null): Promise<Place[]> {
    if (placesService && query) {
      return new Promise((resolve) => {
        placesService.textSearch(
          { query: `${category === "All" ? "" : category} ${query}` },
          (results, status) => {
            if (status === 'OK' && results) {
              resolve(results.map(mapGooglePlaceToPulse))
            } else {
              resolve([])
            }
          }
        )
      })
    }

    // Demo Search
    await new Promise(r => setTimeout(r, 400))
    const normalizedQuery = query.toLowerCase()
    return REAL_PLACES.filter(p => {
      const matchQuery = !query || p.name.toLowerCase().includes(normalizedQuery) || p.category.toLowerCase().includes(normalizedQuery)
      const matchCategory = category === "All" || p.category.includes(category)
      return matchQuery && matchCategory
    })
  }
}
