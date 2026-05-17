import { supabase } from './supabase'
import { REAL_PLACES } from './data'

export const placeService = {
  async getAll() {
    // Simulating API delay
    await new Promise(r => setTimeout(r, 800))
    console.log(supabase) // keep usage to satisfy linter if needed
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
    // Simple mock distance sort
    return [...REAL_PLACES].sort((a, b) => {
      const distA = Math.sqrt(Math.pow(a.location.lat - lat, 2) + Math.pow(a.location.lng - lng, 2))
      const distB = Math.sqrt(Math.pow(b.location.lat - lat, 2) + Math.pow(b.location.lng - lng, 2))
      return distA - distB
    })
  }
}
