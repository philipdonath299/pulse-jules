import { supabase } from './supabase'
import { Place } from '@/types'

export const placeService = {
  async getAll() {
    const { data, error } = await supabase
      .from('places')
      .select('*')
    if (error) throw error
    return data as Place[]
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .ilike('name', `%${query}%`)
    if (error) throw error
    return data as Place[]
  },

  async getTrending() {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('isTrending', true)
    if (error) throw error
    return data as Place[]
  }
}
