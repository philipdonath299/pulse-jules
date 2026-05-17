export interface Place {
  id: string
  name: string
  category: string
  rating: number
  reviews: number
  image: string
  description: string
  location: {
    lat: number
    lng: number
    address: string
  }
  isTrending?: boolean
}

export interface User {
  name: string
  avatar: string
  savedPlaces: string[]
}
