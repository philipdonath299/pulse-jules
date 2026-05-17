import { Place } from '@/types'
import { REAL_PLACES } from './data'

export const mapGooglePlaceToPulse = (googlePlace: google.maps.places.PlaceResult): Place => {
  let photoUrl = `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80`

  if (googlePlace.photos && googlePlace.photos.length > 0) {
    try {
      // Use the first photo if available
      photoUrl = googlePlace.photos[0].getUrl({ maxWidth: 800, maxHeight: 1200 })
    } catch (e) {
      console.warn("Could not get photo URL from Google Place", e)
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
  async getAll() {
    return REAL_PLACES
  },

  async search(query: string, category: string = "All") {
    // Fallback to internal search if needed, but the components now use Google directly
    const normalizedQuery = query.toLowerCase()
    return REAL_PLACES.filter(p => {
      const matchQuery = p.name.toLowerCase().includes(normalizedQuery) ||
                         p.category.toLowerCase().includes(normalizedQuery)
      const matchCategory = category === "All" || p.category === category
      return matchQuery && matchCategory
    })
  },

  async getTrending() {
    return REAL_PLACES.filter(p => p.isTrending)
  }
}
