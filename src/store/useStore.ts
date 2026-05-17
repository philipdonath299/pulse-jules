import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Place, User } from '@/types'

interface PulseStore {
  user: User | null
  savedPlaces: Place[]
  activePlace: Place | null
  isOnboarded: boolean

  setUser: (user: User | null) => void
  savePlace: (place: Place) => void
  removePlace: (placeId: string) => void
  setActivePlace: (place: Place | null) => void
  setOnboarded: (value: boolean) => void
}

export const usePulseStore = create<PulseStore>()(
  persist(
    (set) => ({
      user: {
        name: "Alex River",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        savedPlaces: []
      },
      savedPlaces: [],
      activePlace: null,
      isOnboarded: false,

      setUser: (user) => set({ user }),
      savePlace: (place) => set((state) => ({
        savedPlaces: [...state.savedPlaces, place]
      })),
      removePlace: (placeId) => set((state) => ({
        savedPlaces: state.savedPlaces.filter(p => p.id !== placeId)
      })),
      setActivePlace: (place) => set({ activePlace: place }),
      setOnboarded: (value) => set({ isOnboarded: value }),
    }),
    {
      name: 'pulse-storage',
    }
  )
)
