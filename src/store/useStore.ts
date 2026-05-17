import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Place, User } from '@/types'
import { supabase } from '@/lib/supabase'

interface PulseStore {
  user: User | null
  savedPlaces: Place[]
  activePlace: Place | null
  isOnboarded: boolean
  isLoading: boolean

  setUser: (user: User | null) => void
  savePlace: (place: Place) => void
  removePlace: (placeId: string) => void
  setActivePlace: (place: Place | null) => void
  setOnboarded: (value: boolean) => void
  setLoading: (value: boolean) => void

  // Real actions
  syncUser: () => Promise<void>
}

export const usePulseStore = create<PulseStore>()(
  persist(
    (set, get) => ({
      user: null,
      savedPlaces: [],
      activePlace: null,
      isOnboarded: false,
      isLoading: false,

      setUser: (user) => set({ user }),
      savePlace: (place) => set((state) => ({
        savedPlaces: [...state.savedPlaces, place]
      })),
      removePlace: (placeId) => set((state) => ({
        savedPlaces: state.savedPlaces.filter(p => p.id !== placeId)
      })),
      setActivePlace: (place) => set({ activePlace: place }),
      setOnboarded: (value) => set({ isOnboarded: value }),
      setLoading: (value) => set({ isLoading: value }),

      syncUser: async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          set({
            user: {
              name: user.user_metadata.full_name || user.email?.split('@')[0] || 'User',
              avatar: user.user_metadata.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
              savedPlaces: []
            }
          })
        }
      }
    }),
    {
      name: 'pulse-storage',
    }
  )
)
