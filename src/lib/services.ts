import { Place } from '@/types'
import { REAL_PLACES } from './data'

// This would typically use the Google Maps Places Service (Client-side)
// We'll provide a helper to map Google Place objects to our internal type

export const mapGooglePlaceToPulse = (googlePlace: google.maps.places.PlaceResult): Place => {
  return {
    id: googlePlace.place_id || Math.random().toString(),
    name: googlePlace.name || "Unknown Place",
    category: googlePlace.types?.[0]?.replace(/_/g, ' ') || "Trending",
    rating: googlePlace.rating || 0,
    reviews: googlePlace.user_ratings_total || 0,
    image: googlePlace.photos?.[0]?.getUrl() || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80`,
    description: googlePlace.vicinity || "Discover this amazing location.",
    location: {
      lat: googlePlace.geometry?.location?.lat() || 0,
      lng: googlePlace.geometry?.location?.lng() || 0,
      address: googlePlace.formatted_address || googlePlace.vicinity || ""
    },
    isTrending: (googlePlace.rating || 0) > 4.5
  }
}

export const placeService = {
  async getAll() {
    await new Promise(r => setTimeout(r, 800))
    return REAL_PLACES
  },

  async search(query: string, category: string = "All") {
    await new Promise(r => setTimeout(r, 500))
    return REAL_PLACES.filter(p => {
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
                         p.category.toLowerCase().includes(query.toLowerCase())
      const matchCategory = category === "All" || p.category === category
      return matchQuery && matchCategory
    })
  },

  async getTrending() {
    await new Promise(r => setTimeout(r, 600))
    return REAL_PLACES.filter(p => p.isTrending)
  },

  async getNearby(lat: number, lng: number) {
    return [...REAL_PLACES].sort((a, b) => {
      const distA = Math.sqrt(Math.pow(a.location.lat - lat, 2) + Math.pow(a.location.lng - lng, 2))
      const distB = Math.sqrt(Math.pow(b.location.lat - lat, 2) + Math.pow(b.location.lng - lng, 2))
      return distA - distB
    })
  }
}
